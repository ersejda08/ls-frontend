import React, { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import { BookOpen, Users } from "lucide-react";

export default function CourseDetail({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getById(courseId);
      setCourse(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : course ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-indigo-900">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-indigo-700">Enrolled</p>
                    <p className="text-2xl font-bold">{course.enrolledCount ?? 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-900">
                  <p className="text-sm text-purple-700">Capacity</p>
                  <p className="text-2xl font-bold">{course.capacity ?? "Unlimited"}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-900">
                  <p className="text-sm text-blue-700">Status</p>
                  <p className="text-2xl font-bold">Active</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this Course</h2>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Course materials and lessons are managed by your instructor.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No course data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
