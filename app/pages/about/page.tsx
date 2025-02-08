import React from "react";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation Bar */}
      <NavBar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-8">
          About Us
        </h1>

        {/* Intro Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center mb-8">
          <p className="text-lg">
            Welcome to our platform! We are passionate about free-to-play games 
            and aim to provide an easy way to discover and explore new titles.
          </p>
        </div>

        {/* About Me - Creator */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center">
          {/* Rodrigo's Image - Now aligned to the left */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 mr-6">
            <Image
              src="/images/rodrigo.jpeg"
              alt="Rodrigo Balbino"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* About Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Creator</h2>
            <p className="text-lg text-gray-700">
              Hello, my name is Rodrigo Balbino, and I built this platform from the ground up.  
              I'm currently a Master's student at École des Mines de Saint-Étienne, France,  
              pursuing a double diploma in Microelectronics and Computer Science.
            </p>

            <p className="text-lg text-gray-700 mt-4">
              This webpage was created as a personal project to enhance my web development skills, 
              utilizing technologies like Next.js, TypeScript, Tailwind CSS, and MongoDB, 
              all widely used in professional environments.
            </p>
          </div>
        </div>

        {/* Team Image - Now spans full width */}
        <div className="relative w-full h-96 mt-8">
          <Image
            src="/images/plan_office.jpg"
            alt="Happy team collaboration"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Tech Stack</h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>
              <strong>Frontend:</strong> Built with <span className="text-blue-500 font-semibold">Next.js</span> & 
              <span className="text-blue-500 font-semibold"> TypeScript</span>, styled using 
              <span className="text-blue-500 font-semibold"> Tailwind CSS</span>.
            </li>
            <li>
              <strong>Routing:</strong> Powered by <span className="text-blue-500 font-semibold">Next.js API routes</span>.
            </li>
            <li>
              <strong>Backend:</strong> Developed using <span className="text-blue-500 font-semibold">Node.js</span> & 
              <span className="text-blue-500 font-semibold"> MongoDB</span>.
            </li>
            <li>
              <strong>Database:</strong> Hosted on <span className="text-blue-500 font-semibold">MongoDB Atlas</span>.
            </li>
            <li>
              <strong>Game Data Source:</strong> Using the 
              <a href="https://www.freetogame.com/api-doc" target="_blank" rel="noopener noreferrer"
                 className="text-blue-500 hover:underline"> Free-to-Play Games API</a>.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
