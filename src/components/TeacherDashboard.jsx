import React, { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  BookOpen,
  Users,
} from "lucide-react";

export default function TeacherDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    capacity: 30,
  });

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
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.courseName || !formData.description) {
      setError("Course name and description are required");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        // Update course
        await courseAPI.updateCourse(editingId, formData);
        alert("Course updated successfully!");
      } else {
        // Create new course
        await courseAPI.createCourse(formData);
        alert("Course created successfully!");
      }

      setFormData({ courseName: "", description: "", capacity: 30 });
      setShowForm(false);
      setEditingId(null);
      await fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save course. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      description: course.description,
      capacity: course.capacity,
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setLoading(true);
        await courseAPI.deleteCourse(courseId);
        alert("Course deleted successfully!");
        await fetchCourses();
      } catch (err) {
        console.error("Error deleting course:", err);
        setError(
          err.response?.data?.message ||
            "Failed to delete course. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ courseName: "", description: "", capacity: 30 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-lilac-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <BookOpen className="w-10 h-10 text-purple-400" />
                Teacher Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, <span className="font-semibold">{user?.fullName || user?.username}</span>
              </p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-300 to-pink-300 text-white rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create New Course
          </button>
        </div>

        {/* Course Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? "Edit Course" : "Create New Course"}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleFormChange}
                    placeholder="e.g., Mathematics 101"
                    className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Course description..."
                    rows="4"
                    className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    min="1"
                    max="200"
                    className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-300 to-pink-300 text-white py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : editingId ? "Update Course" : "Create Course"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Courses List */}
        {loading && !showForm ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-purple-100">
            <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
            <p className="text-gray-600 text-lg">No courses yet. Create your first course!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-200 p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {course.courseName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {course.enrolledCount || 0} / {course.capacity} enrolled
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
