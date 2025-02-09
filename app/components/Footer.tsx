import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-white">Free-To-Play Games 🎮</h2>
          <p className="text-sm mt-1">© 2025 All Rights Reserved.</p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/pages/about" className="hover:text-blue-400">About</Link>
          <Link href="/pages/contact" className="hover:text-blue-400">Contact</Link>
          <Link href="/pages/policy" className="hover:text-blue-400">Privacy Policy</Link>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/Balbinoo" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-xl hover:text-gray-400 transition" />
          </a>
          <a href="https://www.linkedin.com/in/rodrigo-balbino-" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl hover:text-blue-500 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
