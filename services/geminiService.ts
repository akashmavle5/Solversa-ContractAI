
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const queryContract = async (contractContent: string, question: string): Promise<string> => {
  try {
    const prompt = `
      You are Solversa AI, an expert legal assistant specializing in contract analysis.
      Your task is to analyze the provided contract and answer the user's question with precision and clarity.
      
      **INSTRUCTIONS:**
      1. Carefully read the entire contract text provided.
      2. Understand the user's question and identify the relevant clauses or sections.
      3. Provide a direct and concise answer to the question.
      4. If possible, quote the specific part of the contract that supports your answer.
      5. If the information is not available in the contract, state that clearly.
      
      **CONTRACT TEXT:**
      ---
      ${contractContent}
      ---
      
      **USER'S QUESTION:**
      "${question}"
      
      **YOUR ANALYSIS:**
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error querying contract:", error);
    return "An error occurred while analyzing the contract. Please check the console for details.";
  }
};

export interface ContractDetails {
    type: string;
    partyA: string;
    partyB: string;
    effectiveDate: string;
    term: string;
    paymentTerms: string;
    scope: string;
}

export const generateContract = async (details: ContractDetails): Promise<string> => {
    try {
        const prompt = `
        You are Solversa AI, an expert legal assistant specializing in contract generation.
        Your task is to generate a professional, well-structured contract based on the user-provided details.

        **INSTRUCTIONS:**
        1.  Generate a formal '${details.type}' agreement.
        2.  The parties are '${details.partyA}' (Party A) and '${details.partyB}' (Party B).
        3.  The contract becomes effective on ${details.effectiveDate}.
        4.  The term of the agreement is ${details.term}.
        5.  Use the following key details to draft the main clauses:
            -   **Scope of Work/Services:** ${details.scope}
            -   **Payment Terms:** ${details.paymentTerms}
        6.  Include standard boilerplate clauses such as: Confidentiality, Termination, Governing Law, Dispute Resolution, and Entire Agreement.
        7.  The tone should be formal and legally precise.
        8.  Format the output in Markdown for readability, including headers for each section.

        **CONTRACT GENERATION REQUEST:**
        -   **Contract Type:** ${details.type}
        -   **Party A:** ${details.partyA}
        -   **Party B:** ${details.partyB}
        -   **Effective Date:** ${details.effectiveDate}
        -   **Term:** ${details.term}
        -   **Scope of Services:** ${details.scope}
        -   **Payment:** ${details.paymentTerms}

        Generate the full contract text now.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating contract:", error);
        return "An error occurred while generating the contract. Please check the console for details.";
    }
};
