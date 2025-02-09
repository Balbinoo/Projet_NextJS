"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "./../firebase/config"; 
import React from "react";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <div className="flex items-center space-x-6">
        <Link href="/pages/favorite" className="hover:underline">
            Favorites
          </Link>
          <Link href="/pages/data" className="hover:underline">
            Games List
          </Link>
          <Link href="/pages/about" className="hover:underline">
            About
          </Link>
          <Link href="/pages/contact" className="hover:underline">
            Contact
          </Link>
          
          {/* Sign Out Button */}
          <button onClick={handleSignOut} className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/sing_out_icon.png"
              alt="Sign Out"
              width={24}
              height={24}
              className="rounded-lg shadow-md"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
