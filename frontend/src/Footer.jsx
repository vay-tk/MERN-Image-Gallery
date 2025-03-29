import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-4">
          © {new Date().getFullYear()} Image Gallery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
