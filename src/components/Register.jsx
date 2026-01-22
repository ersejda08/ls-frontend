import React, { useState } from "react";
import { authAPI } from "../services/api";
import { Mail, Lock, User, Phone, MapPin, ArrowLeft } from "lucide-react";

export default function Register({ onSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "STUDENT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email and password are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Register via backend API
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: formData.role,
      });

      // Store token and user info
      const { accessToken, user } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess(true);
      alert("Registration successful! Please login with your credentials.");

      if (onSuccess) {
        onSuccess(user);
      }

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        role: "STUDENT",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        if (onBackToLogin) {
          onBackToLogin();
        }
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);

      // Provide more specific error messages
      let errorMessage = "Registration failed. Please try again.";

      if (err.response?.status === 400) {
        errorMessage =
          err.response?.data?.message ||
          "Invalid registration data. Please check your input.";
      } else if (err.response?.status === 409) {
        errorMessage = "Email already exists. Please use a different email.";
      } else if (err.response?.status === 403) {
        errorMessage =
          "Registration is not allowed. Backend access issue (CORS).";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message === "Network Error") {
        errorMessage =
          "Cannot connect to the backend. Make sure the server is running.";
      } else {
        errorMessage =
          err.response?.data?.message || err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-teal-100">
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Register</h2>
        <p className="text-gray-600 mb-6">Create your Learn Smartly account</p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-6">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="john_doe"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (Optional)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-teal-300" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State"
                className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 bg-teal-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-300 to-emerald-300 text-white py-2 rounded-lg hover:from-teal-400 hover:to-emerald-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
