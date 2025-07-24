import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';

const Header = () => {
    return (
        <>
            <nav className="bg-[#014d4d] text-white">
                <div className="flex items-center justify-between h-16 px-10">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="p-1">
                            <img src="/Logo.png" alt="Logo" className="h-32" />
                        </Link>
                        <Link to="/dashbord" className="text-white text-lg font-medium hover:underline">Home</Link>
                        <Link to="/aboutus" className="text-white text-lg font-medium hover:underline">About</Link>
                    </div>
                    <div>
                        <Link to="/user" className="text-white hover:underline flex items-center">
                            <UserIcon className="h-7 w-8 mr-1" />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
