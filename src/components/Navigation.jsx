import React from "react";
import { BookOpen, LogOut } from "lucide-react";

export default function Navigation({
  currentPage,
  setCurrentPage,
  user,
  onLogout,
}) {
  return (
    <nav className="bg-orange-400 shadow-lg">
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
                  ? "bg-white text-orange-500"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
            >
              Courses
            </button>
            {user && (
              <div className="flex items-center gap-4 border-l border-white border-opacity-40 pl-6">
                <span className="text-white text-sm font-medium">
                  {user.email}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-orange-500 transition-colors font-medium"
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
