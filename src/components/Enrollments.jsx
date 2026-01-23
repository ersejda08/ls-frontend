import React, { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import { BookOpen, Users } from "lucide-react";

export default function Enrollments({ onBackToDashboard }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      
      // Build enrollments list from courses
      const enrollmentList = [];
      response.data.forEach((course) => {
        enrollmentList.push({
          id: course.id,
          courseName: course.courseName,
          capacity: course.capacity,
          enrolled: course.enrolledCount || 0,
        });
      });
      setEnrollments(enrollmentList);
      setError(null);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      setError("Failed to load enrollments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-lilac-50 to-purple-100">
      {/* Navigation Bar */}
      <nav className="bg-orange-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Learn Smartly</h1>
            </div>

            <button
              onClick={onBackToDashboard}
              className="text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Users className="w-10 h-10 text-purple-400" />
              Course Enrollments
            </h1>
            <p className="text-gray-600">
              View student enrollments for all your courses
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
          ) : enrollments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-purple-100">
              <Users className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 text-lg">No enrollments yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-orange-100 via-orange-200 to-purple-200 p-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {enrollment.courseName}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Total Capacity */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm font-medium text-blue-600 mb-1">
                          Total Capacity
                        </div>
                        <div className="text-3xl font-bold text-blue-900">
                          {enrollment.capacity}
                        </div>
                      </div>

                      {/* Enrolled Students */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                        <div className="text-sm font-medium text-purple-600 mb-1">
                          Enrolled Students
                        </div>
                        <div className="text-3xl font-bold text-purple-900">
                          {enrollment.enrolled}
                        </div>
                      </div>

                      {/* Available Spots */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-600 mb-1">
                          Available Spots
                        </div>
                        <div className="text-3xl font-bold text-green-900">
                          {enrollment.capacity - enrollment.enrolled}
                        </div>
                      </div>
                    </div>

                    {/* Enrollment Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Enrollment Progress</span>
                        <span>
                          {Math.round(
                            ((enrollment.enrolled / enrollment.capacity) * 100)
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all"
                          style={{
                            width: `${
                              (enrollment.enrolled / enrollment.capacity) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Note */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-blue-900 text-sm">
              <strong>Note:</strong> This view shows enrollment statistics for your courses.
              For detailed student information and unenrollment options, contact your
              administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
