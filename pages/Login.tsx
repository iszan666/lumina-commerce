import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, Mail } from 'lucide-react';

export const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulating password check (any password works for demo as long as email matches)
    const success = await login(email);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try user@demo.com');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl shadow-black/40 border border-slate-800 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Sign in to access your account</p>
        </div>

        {error && (
          <div role="alert" className="bg-red-900/20 text-red-400 border border-red-900/50 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
              <input 
                id="email"
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" 
                placeholder="user@demo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
              <input 
                id="password"
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/30 disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800">
           <p className="text-xs text-center text-slate-500 mb-3 uppercase tracking-wider">Demo Credentials</p>
           <div className="flex justify-between gap-4 text-xs">
              <button onClick={() => { setEmail('user@demo.com'); setPassword('123456'); }} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2.5 rounded border border-slate-700 text-slate-300 transition-colors">
                User: user@demo.com
              </button>
              <button onClick={() => { setEmail('admin@demo.com'); setPassword('123456'); }} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2.5 rounded border border-slate-700 text-slate-300 transition-colors">
                Admin: admin@demo.com
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};