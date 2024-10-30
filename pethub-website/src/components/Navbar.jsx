import logo from "../../public/logo.svg"

import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to track dropdown element

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false); // Close dropdown if click is outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
        <div className="fixed top-0 left-0 right-0 dropdown z-50">
            <div className="navbar border-b-2 bg-white px-4 md:px-20 xl:px-40">
                <div className="xl:hidden md:mr-5">
                    <a href="/"><img src={logo} alt="logo" width={40}/></a>
                </div>

                <div ref={dropdownRef}>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost xl:hidden"
                        onClick={toggleDropdown}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </div>
                    
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
                        <li><a href="/pethub-website/partner" className="block w-full text-center text-md">สมัครเป็น partner</a></li>
                    </ul>
                </div>

                <div className="navbar-start text-pethub-color1">
                    <ul className="gap-10 px-1 items-center hidden xl:flex">
                        <li><a href="/pethub-website/home"><img src={logo} alt="logo" width={40}/></a></li>
                        <li><a href="/pethub-website/home" className="text-pethub-color6">Home</a></li>
                        <li><a href="/pethub-website/profile">Profile</a></li>
                        <li><a href="/pethub-website/about">About</a></li>
                        <li><a href="/pethub-website/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <ul className="flex gap-10 px-1 items-center">
                        <li><a href="/pethub-website/partner" className="text-pethub-color6 hidden xl:block">มาเป็น partner กับเรา</a></li>
                        <li><a href="/pethub-website/signin" className="btn bg-pethub-color1 text-white font-normal text-xs">Sign in</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}

