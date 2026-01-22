import React from "react";
import { Users, Clock } from "lucide-react";

export default function CourseCard({ course, onViewCourse, onEnroll }) {
  const handleViewCourse = () => {
    if (onViewCourse) {
      onViewCourse(course);
    } else {
      alert(`Opening course: ${course.name}`);
    }
  };

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course);
    } else {
      alert(`Enrolled in: ${course.name}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.level || "Beginner"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrollments?.length || 0} students</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleViewCourse}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
          >
            View Course
          </button>
          <button
            onClick={handleEnroll}
            className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors font-medium cursor-pointer"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
