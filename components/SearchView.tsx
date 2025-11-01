
import React, { useState } from 'react';
import { Contract } from '../types';
import { queryContract } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface SearchViewProps {
  contracts: Contract[];
}

const SearchView: React.FC<SearchViewProps> = ({ contracts }) => {
  const [selectedContractId, setSelectedContractId] = useState<string>(contracts[0]?.id || '');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractId || !query) {
      setError('Please select a contract and enter a query.');
      return;
    }

    const selectedContract = contracts.find(c => c.id === selectedContractId);
    if (!selectedContract) {
      setError('Selected contract not found.');
      return;
    }

    setIsLoading(true);
    setResult('');
    setError('');

    try {
      const response = await queryContract(selectedContract.content, query);
      setResult(response);
    } catch (err) {
      setError('Failed to get a response from the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatResult = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-bold my-2">{line.replace(/\*\*/g, '')}</p>
        }
        if (line.trim() === '') {
            return <br key={index}/>
        }
        return <p key={index} className="mb-2">{line}</p>
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Search & Analyze</h2>
        <p className="mt-1 text-text-secondary">Use the power of RAG to ask questions about your uploaded contracts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-6 rounded-lg shadow">
        <div>
          <label htmlFor="contract-select" className="block text-sm font-medium text-text-primary">
            Select a Contract
          </label>
          <select
            id="contract-select"
            value={selectedContractId}
            onChange={(e) => setSelectedContractId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            disabled={contracts.length === 0}
          >
            {contracts.length > 0 ? (
                contracts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
            ) : (
                <option>No contracts uploaded</option>
            )}
            
          </select>
        </div>
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-text-primary">
            Your Question
          </label>
          <textarea
            id="query"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="e.g., What is the termination clause? or When does the agreement end?"
          />
        </div>
        <div className="flex justify-end">
            <button
                type="submit"
                disabled={isLoading || !query || !selectedContractId}
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading && <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />}
                {isLoading ? 'Analyzing...' : 'Ask AI'}
            </button>
        </div>
      </form>

      {(result || isLoading || error) && (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">AI Analysis</h3>
            <div className="bg-surface p-6 rounded-lg shadow prose prose-sm max-w-none">
                {isLoading && (
                    <div className="flex items-center justify-center text-text-secondary">
                        <SpinnerIcon className="animate-spin mr-3 h-5 w-5" />
                        <span>Generating analysis...</span>
                    </div>
                )}
                {error && <p className="text-red-600">{error}</p>}
                {result && <div>{formatResult(result)}</div>}
            </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;
