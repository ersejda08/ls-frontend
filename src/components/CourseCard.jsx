import React from "react";
import { Users, Clock } from "lucide-react";

export default function CourseCard({ course, onViewCourse, onEnroll }) {
  const handleViewCourse = () => {
    if (onViewCourse) {
      onViewCourse(course);
    } else {
      alert(`Opening course: ${course.courseName}`);
    }
  };

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course);
    } else {
      alert(`Enrolled in: ${course.courseName}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-purple-100">
      <div className="bg-gradient-to-r from-orange-100 via-orange-200 to-purple-200 h-32"></div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {course.courseName}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledCount ?? 0} enrolled</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Capacity: {course.capacity}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleViewCourse}
            className="flex-1 bg-gradient-to-r from-purple-300 to-pink-300 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors font-medium cursor-pointer shadow-md"
          >
            View Course
          </button>
          <button
            onClick={handleEnroll}
            className="flex-1 border-2 border-purple-300 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium cursor-pointer"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
