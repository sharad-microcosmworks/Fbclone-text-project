import React from "react";
import Template from "../Components/Template";
import signupImg from "../assets/signup.png";

interface SignupProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignupProps> = ({ setIsLoggedIn }) => {
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Create an to join the Virtual World"
        desc2="share you'r life with friend"
        img={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Signup;
