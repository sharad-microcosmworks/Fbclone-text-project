import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const purpose: string = 'reset_password';
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleVerifyEmail();
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(`${baseUrl}/facebook/user/reset-password`, { email, purpose });
      console.log(response);
      if (response.status === 200) {
        toast.success("OTP sent to your email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-richblack-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-richblack-800 border border-richblack-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;