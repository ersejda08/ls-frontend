import React from "react";
import { BookOpen, Users, LogOut } from "lucide-react";

export default function Navigation({ currentPage, setCurrentPage, user, onLogout }) {
  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Learn Smartly</h1>
          </div>

          <div className="flex gap-6 items-center">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                currentPage === "dashboard"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-500"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setCurrentPage("users")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                currentPage === "users"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-500"
              }`}
            >
              <Users className="w-4 h-4" />
              Users
            </button>
            {user && (
              <div className="flex items-center gap-4 border-l border-indigo-500 pl-6">
                <span className="text-indigo-100 text-sm">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-100 hover:bg-red-600 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
