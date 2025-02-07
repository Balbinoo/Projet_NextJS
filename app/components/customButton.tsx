import React from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
}

const CustomButton: React.FC<ButtonProps> = ({ text, href }) => {
  return (
    <Link href={href}>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
        {text}
      </button>
    </Link>
  );
};

export default CustomButton;
