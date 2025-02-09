import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Contact Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-6">
            Have a question or feedback? Reach out to us, and we&apos;ll get back to you as soon as possible.
          </p>
          {/* Contact Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;