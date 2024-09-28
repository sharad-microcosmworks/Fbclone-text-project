import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  userName: string;
  dateOfBirth: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/facebook/user/profile`, {
          withCredentials: true
        });
        setUser(response.data as User); // Cast response.data to User
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [baseUrl, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/facebook/user/logout`, {}, {
        withCredentials: true
      });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">User Profile</h2>
        <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Username:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
