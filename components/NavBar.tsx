'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

const NavBar: React.FC = () => {
  const { name, setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    setIsLoggedIn(!!token);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ name: parsedUser.name, email: parsedUser.email });
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    window.location.href = '/login';
  };

  return (
    <header className="shadow-md fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white z-50">
      <nav className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src="wanlogo-nobg.png" alt="Wan Logo" className="w-8 h-8" />
          <img src="wanlab-name-nobg.png" alt="Wan Lab Name" className="w-[160px] h-[40px]" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="font-bold hover:bg-white hover:text-blue-600 px-3 py-2 rounded">
            Home
          </Link>
          <Link href="/about" className="font-bold hover:bg-white hover:text-blue-600 px-3 py-2 rounded">
            About
          </Link>
          <Link href="/#Subjects" className="font-bold hover:bg-white hover:text-blue-600 px-3 py-2 rounded">
            Subjects
          </Link>
          {/* <Link href="/#Feedback" className="font-bold hover:bg-white hover:text-blue-600 px-3 py-2 rounded">
            Contact
          </Link> */}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                <span>{name}</span>
                <img src="profilePicture.png" alt="Profile" className="w-8 h-8 rounded-full" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-700 rounded shadow-lg">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="font-bold bg-blue-500 hover:bg-white hover:text-blue-600 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
