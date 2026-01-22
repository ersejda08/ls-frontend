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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-300"></div>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : course ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {course.courseName}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-900">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-purple-700">Enrolled</p>
                    <p className="text-2xl font-bold">
                      {course.enrolledCount ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg">
                <div className="text-orange-900">
                  <p className="text-sm text-orange-700">Capacity</p>
                  <p className="text-2xl font-bold">
                    {course.capacity ?? "Unlimited"}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-lg">
                <div className="text-teal-900">
                  <p className="text-sm text-teal-700">Status</p>
                  <p className="text-2xl font-bold">Active</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                About this Course
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Course materials and lessons are managed
                by your instructor.
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
