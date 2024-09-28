import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-richblack-900">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-blue-400 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
