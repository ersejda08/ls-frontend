import React, { useState, useEffect } from "react";
import { courseAPI, enrollmentAPI } from "../services/api";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

      // Provide helpful error messages
      if (err.response?.status === 403) {
        setError(
          "Access Forbidden (403). Backend needs CORS configuration. See CORS_FIX.md for solution.",
        );
      } else if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to backend at http://localhost:8080. Make sure it's running.",
        );
      } else {
        setError(
          `Failed to load courses: ${err.response?.status || err.message}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleEnroll = async (course) => {
    try {
      await enrollmentAPI.enroll(course.id);
      alert(`Successfully enrolled in ${course.name}!`);
    } catch (err) {
      console.error("Error enrolling:", err);
      alert(`Failed to enroll: ${err.response?.data?.message || err.message}`);
    }
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <CourseDetail courseId={selectedCourse.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Learning Platform
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Explore and enroll in courses to expand your knowledge
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewCourse={handleViewCourse}
                  onEnroll={handleEnroll}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No courses available yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
