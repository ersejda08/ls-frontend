import React, { useState } from "react";
import { authAPI } from "../services/api";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

export default function Login({ onLoginSuccess, onRegisterClick, onBackToHome }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // Login via backend API
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      const { accessToken, user } = response.data;

      // Store token and user info
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }

      alert("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      let errorMessage = "Login failed. Please try again.";

      if (err.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response?.data?.message || "Invalid login data.";
      } else if (err.message === "Network Error") {
        errorMessage =
          "Cannot connect to the backend. Make sure the server is running.";
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-amber-100">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>

        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-orange-400" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Learn Smartly
        </h2>
        <p className="text-gray-600 mb-6 text-center">Login to your account</p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-orange-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 bg-orange-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-orange-300" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 bg-orange-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-300 to-rose-300 text-white py-2 rounded-lg hover:from-orange-400 hover:to-rose-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={onRegisterClick}
            className="text-orange-400 hover:text-orange-500 font-medium mt-2"
          >
            Register here
          </button>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900">
            <strong>Demo credentials:</strong>
            <br />
            Email: student@example.com
            <br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}
