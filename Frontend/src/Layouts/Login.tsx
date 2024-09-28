import React from "react";
import LoginImg from '../assets/login.png';
import Template from "../Components/Template";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  return (
    <div className="">
      <Template
        title="Login"
        desc1="she is waiting for you"
        desc2="login Now "
        img={LoginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Login;
