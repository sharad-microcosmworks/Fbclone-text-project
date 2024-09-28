import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import toast from 'react-hot-toast';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className='flex items-center justify-between p-4 text-white bg-richblack-900'>
      <nav className='flex items-center'>
        <Link to="/">
          <img src={logo} alt="Logo" width={100} height={100} className='my-1 mr-4' />
        </Link>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/' className='hover:text-blue-400'>Home</Link>
          </li>
        </ul>
      </nav>

      <div className='flex items-center space-x-4'>
        {!isLoggedIn ? (
          <>
            <Link to='/Login'>
              <button className='px-4 py-2 text-white bg-blue-600 rounded btn hover:bg-blue-700'>
                Login
              </button>
            </Link>
            <Link to='/Signup'>
              <button className='px-4 py-2 text-white bg-green-600 rounded btn hover:bg-green-700'>
                Signup
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to='/'>
              <button
                className='px-4 py-2 text-white bg-red-600 rounded btn hover:bg-red-700'
                onClick={() => {
                  setIsLoggedIn(false);
                  toast.success('Logged out');
                }}
              >
                Logout
              </button>
            </Link>

            <Link to='/Dashboard'>
              <button className='px-4 py-2 text-white bg-yellow-600 rounded btn hover:bg-yellow-700'>
                Dashboard
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
