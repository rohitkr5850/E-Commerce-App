import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Store, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home page
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo, we're using preset credentials
      // In a real app, these would be validated against a backend
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };
  
  // Demo credentials for testing
  const setDemoUser = () => {
    setEmail('user@example.com');
    setPassword('password');
  };
  
  const setDemoVendor = () => {
    setEmail('vendor@example.com');
    setPassword('password');
  };
  
  return (
    <div className="max-w-md mx-auto my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Store className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-neutral-600 mt-2">Sign in to your account to continue</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-error-50 border-l-4 border-error-500 text-error-700 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="your@email.com"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="label">
                Password
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-800">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
          
          <div className="text-center mb-6">
            <span className="text-neutral-500">Don't have an account? </span>
            <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium">
              Sign up
            </Link>
          </div>
          
          <div className="border-t border-neutral-200 my-6"></div>
          
          <div className="text-center mb-4">
            <p className="text-neutral-500 text-sm">Demo accounts for testing:</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={setDemoUser}
              className="btn btn-outline text-sm"
            >
              User Demo
            </button>
            <button
              type="button"
              onClick={setDemoVendor}
              className="btn btn-outline text-sm"
            >
              Vendor Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};