"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "./components/customButton"; // Importing the button
import Image from "next/image";
import { auth } from "./firebase/config"; // Adjust the import path for your Firebase config
import { onAuthStateChanged } from "firebase/auth";

const StartPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/mainImage.png"
          alt="Gaming Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-md">
          Welcome to My Web Page!
        </h1>
        <p className="text-xl mt-4 max-w-lg mx-auto drop-shadow-md">
          Discover an extensive list of the best free-to-play games!
        </p>

        {/* Conditional Button */}
        {isLoggedIn ? (
          <CustomButton text="Look for Games 🎮" href="/pages/data" />
        ) : (
          <CustomButton text="Explore Games 🎮" href="/pages/sign-up" />
        )}
      </div>
    </div>
  );
};

export default StartPage;
