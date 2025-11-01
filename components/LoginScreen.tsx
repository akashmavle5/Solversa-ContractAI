
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <LogoIcon className="w-20 h-20 text-primary" />
          <h1 className="mt-4 text-4xl font-bold text-text-primary">
            Solversa <span className="text-primary">ContractAI</span>
          </h1>
          <p className="mt-2 text-text-secondary">
            Intelligent Contract Management, Powered by AI
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue="demo@solversa.ai"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                defaultValue="password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-blue-700">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
