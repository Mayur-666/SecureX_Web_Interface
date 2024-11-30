import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-10">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="space-y-6 lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Welcome to Police Incident Management System
            </h1>
            <p className="text-lg lg:text-xl text-gray-200">
              Monitor and manage crimes in real-time. Prioritize incidents based
              on severity and location for faster response.
            </p>
            <div className="space-x-4">
              <Link
                to="/auth"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded-lg font-semibold"
              >
                Dashboard
              </Link>
            </div>
          </div>
          {/* <div className="hidden lg:block lg:w-1/2">
            <img
              src="/vite.svg"
              alt="Dashboard Overview"
              className="rounded-lg shadow-lg"
            />
          </div> */}
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-500 mt-2">
                Monitor incidents and crimes as they happen, with real-time
                updates on the dashboard.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <FaMapMarkedAlt className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Location-Based Alerts
              </h3>
              <p className="text-gray-500 mt-2">
                Get crime alerts based on location and severity, ensuring timely
                responses.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Priority Incident Management
              </h3>
              <p className="text-gray-500 mt-2">
                Automatically prioritize crimes based on their type and urgency,
                ensuring that high-risk incidents are handled first.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="flex flex-col items-center">
              <FaLock className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Secure & Reliable
              </h3>
              <p className="text-gray-500 mt-2">
                Our platform is built with top-notch security features to keep
                your data safe and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Police HQ. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
