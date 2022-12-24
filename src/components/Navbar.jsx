import React from 'react';
import MkdSDK from '../utils/MkdSDK';


const Navbar = () => {
  const handleLogout = () => {
    // Clear the user's authentication credentials
    localStorage.clear();
    // Redirect the user to the login page
    window.location.replace('/');
  };

  return (
    <nav className="w-full h-16 flex items-center justify-between flex-wrap bg-transparent p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6 ml-24">
        <h1 className="font-extrabold text-4xl tracking-tight">APP</h1>
      </div>
      <div className="block">
        <button onClick={handleLogout} className="flex items-center px-3 py-2 bg-lime-400 border rounded-full text-black border-lime-400 hover:text-lime-400 hover:bg-black mr-24">
          <svg className="w-4 h-4 fill-outline text-white" viewBox="0 0 20 20">
            <path d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" />
          </svg>
          <span className=" ml-2 text-xs">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
