import logo from '../../../public/logo.svg';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown element
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  console.log(username)

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle clicks outside of the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if click is outside
    }
  };

  // Check for the 'user-auth' cookie to determine if the user is logged in
  useEffect(() => {
    const cookie = Cookies.get('user-auth');
    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const firstName = Cookies.get('user-fName') || '';
    const lastName = Cookies.get('user-lName') || '';
    setUsername(`${firstName} ${lastName}`);
  }, []);

  // Function to log out the user
  const logout = async () => {
    try {
      // Make an API request to sign out the user
      await axios.post('http://localhost:5000/api/auth/signout');
  
      // Remove the cookie (if any additional client-side handling is needed)
      Cookies.remove('user-auth');
      Cookies.remove('user-fName')
      Cookies.remove('user-lName')
  
      // Update the login state
      setIsLogin(false);
      setUsername('')
  
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 dropdown z-50">
      <div className="navbar border-b-2 bg-white px-4 md:px-20 xl:px-40">
        {/* Mobile Navbar Toggle */}
        <div className="xl:hidden md:mr-5">
          <a href="/"><img src={logo} alt="logo" width={40} /></a>
        </div>

        <div ref={dropdownRef}>
          <div
            tabIndex={0}
            role="button"
            className="flex justify-center items-center md:btn w-14 max-sm:text-[3vw] md:bg-white max-md:text-[2vw] h-[10vw] md:w-16 max-w-16 max-h-12 font-medium btn-ghost xl:hidden"
            onClick={toggleDropdown}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content text-pethub-color1 bg-white z-10 mt-5 p-2 py-5 absolute shadow top-12 right-0 left-0 ${
              isDropdownOpen ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <li><a href="/pethub-website/home" className="block w-full text-center text-md">Home</a></li>
            <li><a href="/pethub-website/profile" className="block w-full text-center text-md">Profile</a></li>
            <li><a href="/pethub-website/about" className="block w-full text-center text-md">About</a></li>
            <li><a href="/pethub-website/contact" className="block w-full text-center text-md">Contact</a></li>
            <li><a href="/pethub-website/hostsignup" className="block w-full text-center text-md">สมัครเป็น partner</a></li>
          </ul>
        </div>

        {/* Desktop Navbar */}
        <div className="navbar-start text-pethub-color1">
          <ul className="gap-10 px-1 items-center hidden xl:flex">
            <li><a href="/pethub-website/home"><img src={logo} alt="logo" width={40} /></a></li>
            <li><a href="/pethub-website/home" className="text-pethub-color6">Home</a></li>
            <li><a href="/pethub-website/profile">Profile</a></li>
            <li><a href="/pethub-website/about">About</a></li>
            <li><a href="/pethub-website/contact">Contact</a></li>
          </ul>
        </div>

        {/* Sign In / Sign Out Logic */}
        <div className="navbar-end">
          {isLogin ? (
            <div>
              <ul className="flex gap-10 px-1 items-center">
                <div className="cursor-pointer flex items-center gap-4 max-md:hidden">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                  </div>
                  <div>{username}</div>
                </div>
                <div className="cursor-pointer flex" onClick={logout}>
                  <div className="md:text-sm">logout</div>
                </div>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="flex gap-10 px-1 items-center">
                <li><a href="/pethub-website/hostsignup" className="text-pethub-color6 hidden xl:block">มาเป็น partner กับเรา</a></li>
                <li><a href="/pethub-website/signin" className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white w-[20vw] max-sm:text-[3vw] max-md:text-[2vw] h-[10vw] md:w-28 max-w-28 max-h-12 font-medium">Sign in</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
