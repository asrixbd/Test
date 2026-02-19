'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(''); // Simplified: using email as username for Supabase
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = `${username}@example.com`; // Pseudo-username for MVP logic

    const { data, error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-serif mb-2">{isLogin ? 'Welcome Back' : 'Join the Club'}</h2>
        <p className="text-slate-500 mb-8">{isLogin ? 'Sign in to your library.' : 'Start sharing your PDFs.'}</p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="text" placeholder="Username" 
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-100">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-indigo-600 font-medium text-sm"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
