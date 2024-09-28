import React from "react";
import FrameImg from '../assets/frame.png';
import Signup from './SignUp';
import Login from './Login';

interface TemplateProps {
  title: string;
  desc1: string;
  desc2: string;
  formtype: "signup" | "login"; 
  img: string; 
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Template: React.FC<TemplateProps> = ({ title, desc1, desc2, formtype, img, setIsLoggedIn }) => {
  return (
    <div className="flex justify-around py-4 max-w-[1160px] mx-auto gap-x-12">
      <div className='w-11/12 max-w-[450px] mx-0'>
        <h2 className="my-2 text-3xl capitalize">{title}</h2>
        <p className="flex flex-col my-2 text-sm capitalize">
          <span className="capitalize">{desc1}</span>
          <i className="capitalize text-cyan-400">{desc2}</i>
        </p>

        {formtype === "signup" ? (
          <Signup setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}

      </div>

      <div className="relative">
        <img src={img} alt="simg" width={448} height={400} loading="lazy" className="absolute aspect-auto" />
        <img src={FrameImg} alt="fimg" width={458} loading="lazy" className="mx-1 my-1" />
      </div>
    </div>
  );
}

export default Template;
