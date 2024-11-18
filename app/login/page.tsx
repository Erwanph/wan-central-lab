'use client';

import { useState } from 'react';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('debugging start');
    try {
      const response = await fetch('https://wan-central-lab.vercel.app/api/proxy?api=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('sessionToken', data.data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.data.name, email: data.data.email }));

      window.location.href = '/';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
/>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-700">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
