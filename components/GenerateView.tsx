
import React, { useState } from 'react';
import { generateContract, ContractDetails } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';

const GenerateView: React.FC = () => {
  const [details, setDetails] = useState<ContractDetails>({
    type: 'Non-Disclosure Agreement (NDA)',
    partyA: '',
    partyB: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    term: '5 years',
    paymentTerms: '',
    scope: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    setError('');

    try {
      const response = await generateContract(details);
      setResult(response);
    } catch (err) {
      setError('Failed to generate the contract. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      <div className="w-1/3 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Generate Contract</h2>
          <p className="mt-1 text-text-secondary">Provide the key details and let AI draft the contract for you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-6 rounded-lg shadow">
          {/* Form fields */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-text-primary">Contract Type</label>
            <select id="type" name="type" value={details.type} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                <option>Non-Disclosure Agreement (NDA)</option>
                <option>Master Services Agreement (MSA)</option>
                <option>Statement of Work (SOW)</option>
                <option>Independent Contractor Agreement</option>
            </select>
          </div>
          <div>
            <label htmlFor="partyA" className="block text-sm font-medium text-text-primary">Party A</label>
            <input type="text" name="partyA" id="partyA" value={details.partyA} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="e.g., Innovate Corp." />
          </div>
          <div>
            <label htmlFor="partyB" className="block text-sm font-medium text-text-primary">Party B</label>
            <input type="text" name="partyB" id="partyB" value={details.partyB} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="e.g., Solutions LLC" />
          </div>
          <div>
            <label htmlFor="scope" className="block text-sm font-medium text-text-primary">Scope / Purpose</label>
            <textarea name="scope" id="scope" rows={4} value={details.scope} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Describe the services or purpose of the agreement..."></textarea>
          </div>
          <div>
            <label htmlFor="paymentTerms" className="block text-sm font-medium text-text-primary">Payment Terms</label>
            <input type="text" name="paymentTerms" id="paymentTerms" value={details.paymentTerms} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="e.g., Net 30, $5000 upon completion" />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isLoading} className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400">
              {isLoading && <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />}
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
      </div>

      <div className="w-2/3">
        <h3 className="text-xl font-bold text-text-primary mb-4">Generated Document</h3>
        <div className="bg-surface p-6 rounded-lg shadow h-full overflow-y-auto" style={{maxHeight: '80vh'}}>
            {isLoading && (
                 <div className="flex items-center justify-center h-full text-text-secondary">
                    <SpinnerIcon className="animate-spin mr-3 h-5 w-5" />
                    <span>Drafting your contract...</span>
                </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {result ? (
                 <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }}></div>
            ) : !isLoading && (
                <div className="flex items-center justify-center h-full text-text-secondary">
                    <p>Your generated contract will appear here.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GenerateView;
