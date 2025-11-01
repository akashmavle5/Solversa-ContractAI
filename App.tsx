
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary">
      {isAuthenticated ? <Dashboard /> : <LoginScreen onLogin={handleLogin} />}
    </div>
  );
};

export default App;
