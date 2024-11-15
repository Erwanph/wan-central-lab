'use client'
import { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:6565/api/v1/auth/register/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData); // Log for debugging
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      console.log('Success:', data); // Log for debugging
      setSuccess(true);
      setError(null); // Clear any error message
    } catch (err: any) {
      console.error('Catch error:', err); // Log for debugging
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        
        {success ? (
          <div className="text-center text-green-600">Registration successful! You can now login.</div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
