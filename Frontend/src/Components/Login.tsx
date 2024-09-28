import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // Added missing import

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState<any>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
    console.log(FormData);
    console.log(typeof(FormData.email));
    console.log(typeof(FormData.password));
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await axios.post(`${baseUrl}/facebook/user/login`, 
        {
          email:FormData.email,
          password:FormData.password
        }
      );
      setResponse(result);
      console.log("came from the backend",result);
      console.log(response);
      toast.success("Logged In");
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
      setResponse(null); 
      setIsLoggedIn(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full mt-6 gap-y-1">
      <label className="w-full">
        <p className="text-[0.75rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize">
          Email Address<sup className="text-red-600">*</sup>
        </p>
        <input
          required
          type="text"
          placeholder="Enter email address"
          value={FormData.email}
          name="email"
          onChange={changeHandler}
          className="w-full rounded-lg border border-b-blue-500 bg-richblack-800 p-[12px]"
        />
      </label>

      <label className="relative w-full">
        <p className="text-[0.75rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize">
          Password<sup className="text-red-600">*</sup>
        </p>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          placeholder="Enter password"
          value={FormData.password}
          name="password"
          onChange={changeHandler}
          className="w-full rounded-lg border border-b-blue-500 bg-richblack-800 p-[12px]"
        />
        <span className="absolute right-3 top-[40px] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? 
            (<BsFillEyeSlashFill fontSize={24} fill="#AFB2BF" />) :
            (<BsFillEyeFill fontSize={24} fill="#AFB2BF" />)}
        </span>
        <Link to="/reset-password" className="flex justify-end">
          <p className="text-blue-300">Forgot Password</p>
        </Link>
      </label>

      <button className="w-full rounded-sm font-medium bg-blue-500 text-white px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default Login;
