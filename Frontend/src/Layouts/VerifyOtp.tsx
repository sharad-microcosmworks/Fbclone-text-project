import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically call an API to verify the OTP
    // For now, we'll just show a success message and redirect
    if (otp.length === 6) {
      toast.success('OTP verified successfully');
      navigate('/reset-password'); // Assuming you have a reset password route
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Verify OTP</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            className="w-full px-3 py-2 bg-richblack-800 border border-richblack-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 6-digit OTP"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
