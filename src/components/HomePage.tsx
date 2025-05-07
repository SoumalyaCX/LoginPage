import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

type HomePageProps = {
  email: string;
  onLogout: () => void;
};

const HomePage = ({ email, onLogout }: HomePageProps) => {
  const [showToast, setShowToast] = useState<boolean>(true);

  useEffect(() => {
    // Hide toast after 3 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative bg-[#041643] overflow-hidden">
      <img
        src={`${process.env.PUBLIC_URL}/bg-image.png`}
        alt="Background"
        className="absolute inset-0 h-full object-cover opacity-30"
      />

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 z-50">
          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
          <span>You are logged in successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white/20 backdrop-blur-lg rounded-lg border border-white/30 shadow-xl p-8 w-full max-w-md text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <img
              src={`${process.env.PUBLIC_URL}/Logo.png`}
              alt="Circles Logo"
              className="h-8 lg:h-10"
            />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-white">
            Welcome, {email}
          </h1>
          <p className="mb-8 text-white/90">You are successfully logged in.</p>
          <button
            onClick={onLogout}
            className="w-full bg-red-500/80 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center backdrop-blur-sm"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-blue-200 text-xs w-full">
        © 2023 Circle. All Rights Reserved.
      </div>
    </div>
  );
};

export default HomePage;
