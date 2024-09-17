import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#131324] text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start text-lg font-bold mb-4 md:mb-0">
          EventKick
        </div>
        <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/eventkick"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center md:justify-end text-sm text-gray-400">
          &copy; 2024 EventKick. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
