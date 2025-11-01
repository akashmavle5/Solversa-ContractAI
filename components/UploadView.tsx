
import React, { useState, useCallback } from 'react';
import { Contract } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface UploadViewProps {
  contracts: Contract[];
  onAddContract: (file: File) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ contracts, onAddContract }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onAddContract(e.target.files[0]);
            // Reset file input value to allow uploading the same file again
            e.target.value = '';
        }
    };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onAddContract(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [onAddContract]);


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Upload Contracts</h2>
        <p className="mt-1 text-text-secondary">Add new documents to your repository for analysis and search.</p>
      </div>
      
      <div 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative block w-full border-2 ${isDragging ? 'border-primary' : 'border-gray-300'} border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}>
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-text-secondary">
          Drag and drop files here, or
        </span>
        <label htmlFor="file-upload" className="font-medium text-primary hover:text-blue-700 cursor-pointer">
          <span> click to browse</span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt,.json" />
        </label>
         <p className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT, JSON up to 10MB</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-text-primary">Uploaded Documents</h3>
        <div className="mt-4 bg-surface rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {contracts.length > 0 ? (
                contracts.map((contract) => (
              <li key={contract.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary truncate">{contract.name}</p>
                    <p className="text-sm text-text-secondary">Uploaded on {contract.uploadedAt.toLocaleDateString()}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Processed
                  </span>
                </div>
              </li>
            ))
            ) : (
                <li className="px-6 py-10 text-center text-text-secondary">No contracts uploaded yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadView;
