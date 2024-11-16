// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string>('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch('http://127.0.0.1:6565/api/v1/auth/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Login failed');
//       }
  
//       const data = await response.json();
//       // Simpan token dan profil pengguna ke localStorage
//       localStorage.setItem('sessionToken', data.data.token);
//       localStorage.setItem('user', JSON.stringify({ name: data.data.name, email: data.data.email }));
  
//       console.log("Token:", data.data.token);
//       console.log("User Profile:", { name: data.data.name, email: data.data.email });
  
//       window.location.href = '/';
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               placeholder="Enter your email"
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               placeholder="Enter your password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm mt-2">{error}</p>
//           )}
          
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md font-semibold"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don’t have an account?{' '}
//           <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


'use client';

import { useState } from 'react';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:6565/api/v1/auth/login/', {
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
