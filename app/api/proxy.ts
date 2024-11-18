// pages/api/proxy.ts

export default async function handler(req, res) {
    const { method, body, query } = req;
  
    let apiUrl = '';
    
    // Tentukan URL API berdasarkan path yang diminta
    if (query.api === 'login') {
      apiUrl = 'http://217.196.49.173:6560/api/v1/auth/login/';
    } else if (query.api === 'register') {
      apiUrl = 'http://217.196.49.173:6560/api/v1/auth/register/';
    } else if (query.api === 'getProfile') {
      apiUrl = 'http://217.196.49.173:6560/api/v1/profile/'; // GET Profile
    } else if (query.api === 'updateProfile') {
      apiUrl = 'http://217.196.49.173:6560/api/v1/profile/'; // PATCH Update Profile
    } else {
      return res.status(404).json({ message: 'API not found' });
    }
  
    try {
      let response;
      
      if (method === 'GET' || method === 'POST' || method === 'PATCH') {
        const fetchOptions: RequestInit = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        if (method === 'PATCH' && body) {
          fetchOptions.body = JSON.stringify(body); // Mengirimkan data baru untuk profil
        }
        
        response = await fetch(apiUrl, fetchOptions);
  
        const data = await response.json();
  
        if (!response.ok) {
          return res.status(response.status).json({ message: data.message || 'Request failed' });
        }
  
        res.status(response.status).json(data); // Mengirimkan data ke frontend
      } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Jika metode tidak diizinkan
      }
    } catch (error) {
      console.error('Error connecting to API:', error);
      res.status(500).json({ message: 'Error connecting to API' });
    }
  }
  
