import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Signup from './Layouts/Signup';
import Login from './Layouts/Login';
import Home from './Layouts/Home';
import NotFound from "./Layouts/NotFound";
import ForgetPassword from "./Layouts/ForgetPassword";
import Dashboard from "./Layouts/Dashboard";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
      <div className=" inset-0 -z-10 min-h-screen w-full items-center px-5 py-4 [background:radial-gradient(125%_125%_at_10%_10%,#000_71%,#63e_100%)]">

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ForgetPassword/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
