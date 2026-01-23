import React, { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import { ArrowLeft, BookOpen, Users, Eye } from "lucide-react";

export default function BrowseCourses({
  onBackToHome,
  onViewDetails,
  onLoginClick,
  onRegisterClick,
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (course) => {
    // Show login prompt
    onLoginClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-lilac-50 to-purple-100">
      {/* Navigation Bar */}
      <nav className="bg-orange-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-white hover:text-orange-50 transition-colors"
            >
              <BookOpen className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Learn Smartly</h1>
            </button>

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
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl font-bold text-gray-800">
                Browse Courses
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Explore our available courses. Login to view details and enroll.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-purple-100">
              <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 text-lg">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Course Header with Gradient */}
                  <div className="bg-gradient-to-r from-orange-100 via-orange-200 to-purple-200 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="mb-4 pb-4 border-b border-purple-100">
                      <p className="text-gray-600 text-sm mb-3">
                        {course.description.length > 100
                          ? course.description
                          : course.description}
                      </p>
                    </div>

                    {/* Enrollment Stats */}
                    <div className="flex items-center gap-2 text-gray-700 mb-6">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">
                        {course.enrolledCount || 0} / {course.capacity} students
                        enrolled
                      </span>
                    </div>

                    {/* Capacity Bar */}
                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              ((course.enrolledCount || 0) / course.capacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(course)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-300 to-pink-300 text-white rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Login CTA */}
          {!loading && courses.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow-md border border-purple-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ready to start learning?
              </h2>
              <p className="text-gray-600 mb-6">
                Login or register to enroll in courses and track your progress.
              </p>
              <button
                onClick={onLoginClick}
                className="px-8 py-3 bg-gradient-to-r from-orange-300 to-orange-400 text-white rounded-lg hover:from-orange-400 hover:to-orange-500 transition-colors font-medium text-lg"
              >
                Login to Enroll
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
