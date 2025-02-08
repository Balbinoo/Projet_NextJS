import React from "react";
import CustomButton from "./components/customButton"; // Importing the button

const StartPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Hero Image */}
      <img
        src="https://github.com/user-attachments/assets/abea5f62-e97e-4bd8-9863-0e5db63d662b"
        alt="Gaming Banner"
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />

      {/* Title & Description */}
      <h1 className="text-4xl font-bold text-blue-500 mt-6">
        Welcome to My Web Page!
      </h1>
      <p className="text-lg mt-4 text-center">
        Here you are gonna find a list of many free-to-play games.
      </p>

      {/* Custom Button */}
      <CustomButton text="Explore Games 🎮" href="/pages/data" />
    </div>
  );
};

export default StartPage;
