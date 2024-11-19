// src/App.js
import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Oval } from "react-loader-spinner"; // Importing the Oval spinner from react-loader-spinner

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate page load or refresh
  useEffect(() => {
    // Simulate a delay for loading content
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, set loading to false
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-100 via-red-200 to-yellow-100  min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          {/* React Loader Spinner */}
          <Oval
            height={30}
            width={40}
            color="#4fa94d"
            secondaryColor="#f3f3f3"
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
