import React from 'react';
import {  useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate(); // {{ edit_1 }}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Facebook</h1>
      <p className="text-xl mb-8">Connect with friends and the world around you on Facebook.</p>
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
      <p className="mt-8 text-sm">
        Facebook helps you connect and share with the people in your life.
      </p>
    </div>
  );
};

export default Home;



