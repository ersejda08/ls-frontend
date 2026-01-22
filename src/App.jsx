import { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login"); // "login" or "register"

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setCurrentPage("dashboard");
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage("home");
    setAuthPage("login");
  };

  // Show homepage with login/register buttons if not authenticated
  if (!isAuthenticated) {
    if (currentPage === "home") {
      return (
        <div>
          <Homepage 
            onLoginClick={() => setCurrentPage("login")}
            onRegisterClick={() => setCurrentPage("register")}
          />
        </div>
      );
    } else if (currentPage === "login") {
      return (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={() => setCurrentPage("register")}
        />
      );
    } else {
      return (
        <Register
          onSuccess={handleLoginSuccess}
          onBackToLogin={() => setCurrentPage("login")}
        />
      );
    }
  }

  // After authentication, show dashboard or management based on role
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {currentPage === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
