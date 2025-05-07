import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("userEmail");
    const storedLoginStatus = window.localStorage.getItem("userLoggedIn");

    if (storedEmail && storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    window.localStorage.setItem("userEmail", email);
    window.localStorage.setItem("userLoggedIn", "true");
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <HomePage email={userEmail} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
