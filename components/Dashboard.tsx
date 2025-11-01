
import React, { useState } from 'react';
import { View, Contract } from '../types';
import Sidebar from './Sidebar';
import UploadView from './UploadView';
import SearchView from './SearchView';
import GenerateView from './GenerateView';
import { UserIcon } from './icons/UserIcon';
import { LogoIcon } from './icons/LogoIcon';

const SAMPLE_CONTRACT_CONTENT = `
MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is made and entered into as of January 1, 2024 ("Effective Date"), by and between Innovate Corp. ("Client"), a Delaware corporation with its principal place of business at 123 Tech Avenue, Silicon Valley, CA 94105, and Solutions LLC ("Provider"), a California limited liability company with its principal place of business at 456 Service Road, San Francisco, CA 94107.

1. SERVICES.
Provider agrees to perform the services ("Services") as described in one or more Statements of Work ("SOW") to be mutually agreed upon and executed by the parties from time to time. Each SOW shall be incorporated into and become a part of this Agreement.

2. TERM.
This Agreement shall commence on the Effective Date and shall continue for a period of three (3) years, unless terminated earlier as provided herein.

3. PAYMENT.
Client shall pay Provider the fees set forth in each SOW. Invoices are due and payable within thirty (30) days of receipt. A late fee of 1.5% per month will be applied to all overdue balances.

4. CONFIDENTIALITY.
Each party agrees not to disclose the other party's Confidential Information. Confidential Information includes all non-public information, including but not limited to, business strategies, customer lists, and financial data. This obligation shall survive the termination of this Agreement for a period of five (5) years.

5. INTELLECTUAL PROPERTY.
All pre-existing intellectual property shall remain the sole property of the originating party. Any work product developed specifically for the Client under an SOW ("Deliverables") shall be the property of the Client upon full payment of all associated fees. Provider retains the right to use its general knowledge, skills, and experience.

6. TERMINATION.
Either party may terminate this Agreement for cause if the other party breaches a material term and fails to cure such breach within thirty (30) days of written notice. Client may terminate any SOW for convenience with sixty (60) days' written notice.

7. GOVERNING LAW.
This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.
`;

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SEARCH);
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      name: 'Master Services Agreement - Innovate Corp.json',
      content: SAMPLE_CONTRACT_CONTENT,
      uploadedAt: new Date(),
    },
     {
      id: '2',
      name: 'NDA - Project Titan.pdf',
      content: 'This Non-Disclosure Agreement is between ACME Corp and Project Titan stakeholders...',
      uploadedAt: new Date(),
    },
  ]);

  const handleAddContract = (file: File) => {
    // In a real app, you'd read the file content here.
    // For this demo, we'll use placeholder content.
    const newContract: Contract = {
        id: new Date().toISOString(),
        name: file.name,
        content: `Content of ${file.name}. (File content reading is not implemented in this demo environment).`,
        uploadedAt: new Date(),
    };
    setContracts(prev => [newContract, ...prev]);
  };


  const renderView = () => {
    switch (currentView) {
      case View.UPLOAD:
        return <UploadView contracts={contracts} onAddContract={handleAddContract} />;
      case View.SEARCH:
        return <SearchView contracts={contracts} />;
      case View.GENERATE:
        return <GenerateView />;
      default:
        return <SearchView contracts={contracts} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-surface border-b border-gray-200">
           <div className="flex items-center gap-2">
            <LogoIcon className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-text-primary">Solversa ContractAI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">demo@solversa.ai</span>
            <div className="p-2 bg-gray-200 rounded-full">
                <UserIcon className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
