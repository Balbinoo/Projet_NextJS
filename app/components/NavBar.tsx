"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer hover:opacity-80 transition-opacity">
            🎮 Game Explorer
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/pages/data" className="hover:underline">
            Games List
          </Link>
          <Link href="/pages/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}