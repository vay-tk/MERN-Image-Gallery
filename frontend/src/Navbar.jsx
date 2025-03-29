import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {

  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="p-2 flex items-center justify-center">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold !no-underline flex items-center">
          <img src="./logo.png" className="w-[32px] h-[32px] inline mx-2" alt="logo" />
            Image Gallery
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
