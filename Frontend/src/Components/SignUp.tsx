import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SignupProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignupProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const purpose: string = 'registration';
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    userName: '',
    otp: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleVerifyEmail = async (email: string) => {
    console.log(email);
    console.log(baseUrl);
    try {
      const response = await axios.post(`${baseUrl}/facebook/user/registration/send-otp`, {
        email: email,
        purpose: purpose
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      setShowOtpField(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
    console.log(formData);
    console.log(typeof(formData.dateOfBirth));
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(`${baseUrl}/facebook/user/registration`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        otp: formData.otp,
        purpose: purpose
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      setIsLoggedIn(true);
      toast.success("Account created successfully");
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error registering user:", error);
      console.log(error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (!showOtpField) {
      await handleVerifyEmail(formData.email);
    } else {
      await registerUser();
    }
  };

  return (
    <div className='w-full -gap-y-3'>
      <form onSubmit={submitHandler} className="flex flex-col w-full mt-6 gap-y-3">
        <div className='flex w-full gap-x-3'>
          {/* First Name */}
          <label>
            <p>
              First Name<sup className="text-red-600">*</sup>
            </p>
            <input
              type='text'
              required
              placeholder='First Name'
              value={formData.firstName}
              name='firstName'
              onChange={changeHandler}
              className="w-full rounded-lg border border-b-blue-500 h-10 bg-richblack-800 p-[8px]"
            />
          </label>
          {/* Last Name */}
          <label>
            <p>
              Last Name <sup className="text-red-600">*</sup>
            </p>
            <input
              type='text'
              required
              placeholder='Last Name'
              value={formData.lastName}
              name='lastName'
              onChange={changeHandler}
              className="w-full rounded-lg h-10 border border-b-blue-500 bg-richblack-800 p-[8px]"
            />
          </label>
        </div>

        <label>
          <p>
            Username<sup className="text-red-600">*</sup>
          </p>
          <input
            type='text'
            required
            placeholder='Username'
            value={formData.userName}
            name='userName'
            onChange={changeHandler}
            className="w-full rounded-lg h-10 border border-b-blue-500 bg-richblack-800 p-[8px]"
          />
        </label>
        {/* Date of Birth */}
        <label>
          <p>
            Date of Birth<sup className="text-red-600">*</sup>
          </p>
          <input
            type='date'
            required
            value={formData.dateOfBirth}
            name='dateOfBirth'
            onChange={changeHandler}
            className="w-full rounded-lg h-10 border border-b-blue-500 bg-richblack-800 p-[8px] placeholder:text-white"
          />
        </label>

        {/* Email Added */}
        <label>
          <p>
            Email Address<sup className="text-red-600">*</sup>
          </p>
          <input
            type='email'
            required
            placeholder='Email Address'
            value={formData.email}
            name='email'
            onChange={changeHandler}
            className="w-full rounded-lg h-10 border border-b-blue-500 bg-richblack-800 p-[8px]"
          />
        </label>
        {/* OTP Field */}
        {showOtpField && ( 
          <label>
            <p>
              OTP<sup className="text-red-600">*</sup>
            </p>
            <input
              type='text'
              required
              value={formData.otp}
              name='otp'
              onChange={changeHandler}
              placeholder='Enter 6 digit OTP'
              className="w-full rounded-lg h-10 border border-b-blue-500 bg-richblack-800 p-[8px]"
            />
          </label>
        )}
        {/* Password and confirm password */}
        <div className='relative flex space-x-3'>
          <label className='relative'>
            <p>
              Password<sup className="text-red-600">*</sup>
            </p>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter password"
              value={formData.password}
              name="password"
              onChange={changeHandler}
              className="w-full rounded-lg border capitalize h-10 border-b-blue-500 bg-richblack-800 p-[8px]"
            />
            <span className="absolute right-3 top-[38px] cursor-pointer text-black" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<BsFillEyeSlashFill />) : (<BsFillEyeFill />)}
            </span>
          </label>

          <label className="relative">
            <p>
              Confirm Password<sup className="text-red-600">*</sup>
            </p>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="Confirm password"
              value={formData.confirmPassword}
              name="confirmPassword"
              className="w-full rounded-lg  h-10 bg-richblack-800 p-[8px] placeholder:text-sm"
              onChange={changeHandler}
            />
            <span className="absolute right-3 top-[38px] cursor-pointer text-black" onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? (<BsFillEyeSlashFill />) : (<BsFillEyeFill />)}
            </span>
          </label>
        </div>
        <button 
          type="submit"
          className="w-full rounded-sm font-medium bg-blue-500 text-white px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-blue-600"
        >
          {showOtpField ? "Create Account" : "Generate OTP"}
        </button>
      </form>
      <div className='flex flex-col w-full mt-6 gap-y-3'>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
