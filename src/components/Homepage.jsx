import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Homepage({ onLoginClick, onRegisterClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-orange-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">LearnSmartly</h1>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={onLoginClick}
              className="border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-orange-400 transition"
            >
              Login
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-white text-orange-400 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Empowering Learning{" "}
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Beyond Classroom
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Connect students with experienced tutors. Learn new skills, prepare
          for exams, or master a subject—on your own schedule.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLoginClick}
            className="bg-gradient-to-r from-purple-300 to-pink-300 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition flex items-center justify-center gap-2"
          >
            Browse Courses <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onRegisterClick}
            className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition"
          >
            Create a Course
          </button>
        </div>
      </section>

      {/* Features for Different Roles */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="bg-white border border-purple-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              For Students
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold">✓</span>
                <span className="text-gray-700">Browse available courses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold">✓</span>
                <span className="text-gray-700">Register for courses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold">✓</span>
                <span className="text-gray-700">
                  Track your enrolled courses
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold">✓</span>
                <span className="text-gray-700">Learn at your own pace</span>
              </li>
            </ul>
          </div>

          {/* For Teachers */}
          <div className="bg-white border border-orange-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              For Teachers
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-gray-700">Create new courses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-gray-700">Update course details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-gray-700">Delete courses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">✓</span>
                <span className="text-gray-700">Manage your students</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-white">LearnSmartly</span>
          </div>
          <p className="text-sm">
            &copy; 2026 LearnSmartly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
