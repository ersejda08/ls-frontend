import { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login"); // "login" or "register"

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
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
    setAuthPage("login");
  };

  // Show login/register pages if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        {authPage === "login" ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onRegisterClick={() => setAuthPage("register")}
          />
        ) : (
          <Register
            onSuccess={handleLoginSuccess}
            onBackToLogin={() => setAuthPage("login")}
          />
        )}
      </div>
    );
  }

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
        {currentPage === "users" && <UserManagement />}
      </main>
    </div>
  );
}

export default App;
