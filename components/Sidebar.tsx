
import React from 'react';
import { View } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { SearchIcon } from './icons/SearchIcon';
import { GenerateIcon } from './icons/GenerateIcon';
import { LogoIcon } from './icons/LogoIcon';


interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white'
          : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-64 bg-surface border-r border-gray-200 flex flex-col p-4">
      <div className="flex items-center justify-center h-16 mb-6">
        {/* Placeholder for logo */}
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem
          icon={<UploadIcon className="w-5 h-5" />}
          label="Upload Contracts"
          isActive={currentView === View.UPLOAD}
          onClick={() => setCurrentView(View.UPLOAD)}
        />
        <NavItem
          icon={<SearchIcon className="w-5 h-5" />}
          label="Search & Analyze"
          isActive={currentView === View.SEARCH}
          onClick={() => setCurrentView(View.SEARCH)}
        />
        <NavItem
          icon={<GenerateIcon className="w-5 h-5" />}
          label="Generate Contract"
          isActive={currentView === View.GENERATE}
          onClick={() => setCurrentView(View.GENERATE)}
        />
      </nav>
      <div className="mt-auto text-center text-xs text-gray-400">
        <p>&copy; 2024 Solversa AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
