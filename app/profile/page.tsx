'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

const ProfilePage: React.FC = () => {
  const { name, setUser } = useUser();
  const [newName, setNewName] = useState(''); // Nama baru
  const [email, setEmail] = useState('');
  const [score, setScore] = useState('');

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Untuk mengontrol mode edit
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  interface ProfileResponse {
    data: {
      name: string;
      email: string;
      score: string;
    };
  }
  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('sessionToken');
      if (!token) {
        setErrorMessage('You are not logged in.');
        return;
      }
  
      try {
        setLoading(true);
        const response = await fetch('http://217.196.49.173:6560/api/v1/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
  
        const responseBody: ProfileResponse = await response.json();
        setNewName(responseBody.data.name);
        setScore(responseBody.data.score);
        setEmail(responseBody.data.email);
        setUser({ name: responseBody.data.name, email: responseBody.data.email });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [setUser]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('sessionToken');
    if (!token) return;

    try {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const response = await fetch('http://217.196.49.173:6560/api/v1/profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ new_name: newName }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const responseBody = await response.json();
      setUser({ name: responseBody.data.name, email: responseBody.data.email });
      
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false); // Selesai mengedit
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl pt-24 mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {errorMessage && (
          <div className="text-red-500 text-sm font-medium text-center">{errorMessage}</div>
        )}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={!isEditing} // Input hanya aktif jika dalam mode edit
              className={`mt-1 block w-full border ${
                isEditing ? 'border-gray-300' : 'border-gray-200'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 ${
                !isEditing && 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              disabled
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm bg-gray-100 sm:text-sm p-2 cursor-not-allowed"
            />
          </div>
          {/* Score */}
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700">
              Latest Score
            </label>
            <input
              id="score"
              type="text"
              value={score}
              disabled
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm bg-gray-100 sm:text-sm p-2 cursor-not-allowed"
            />
          </div>

          {/* Buttons */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={handleUpdateProfile}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewName(name); // Reset ke nama asli jika dibatalkan
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {successMessage && (
          <div className="text-green-500 text-sm font-medium text-center">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
