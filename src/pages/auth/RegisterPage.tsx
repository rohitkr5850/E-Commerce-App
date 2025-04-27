import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo purposes, we're using mock register function
      // In a real app, this would validate and send data to a backend
      await register(name, email, password, role);
      navigate(role === 'vendor' ? '/vendor/dashboard' : '/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Store className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-neutral-600 mt-2">Join our marketplace today</p>
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
            <label htmlFor="name" className="label">
              Full name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-10"
                placeholder="John Doe"
                required
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>
          
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
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Must be at least 6 characters long
            </p>
          </div>
          
          <div className="mb-6">
            <label className="label">Account type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`p-4 border rounded-md flex flex-col items-center justify-center text-center transition-colors ${
                  role === 'user'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 hover:border-neutral-400'
                }`}
              >
                <User className={`h-6 w-6 mb-2 ${role === 'user' ? 'text-primary-600' : 'text-neutral-500'}`} />
                <span className="font-medium">Customer</span>
                <span className="text-xs mt-1 text-neutral-500">Shop from our marketplace</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('vendor')}
                className={`p-4 border rounded-md flex flex-col items-center justify-center text-center transition-colors ${
                  role === 'vendor'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-300 hover:border-neutral-400'
                }`}
              >
                <Store className={`h-6 w-6 mb-2 ${role === 'vendor' ? 'text-primary-600' : 'text-neutral-500'}`} />
                <span className="font-medium">Vendor</span>
                <span className="text-xs mt-1 text-neutral-500">Sell your products</span>
              </button>
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
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
          
          <div className="text-center">
            <span className="text-neutral-500">Already have an account? </span>
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Sign in
            </Link>
          </div>
          
          <div className="mt-6 text-xs text-neutral-500 text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-800">Terms of Service</a> and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-800">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
};