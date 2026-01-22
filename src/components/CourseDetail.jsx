import React, { useState, useEffect, useCallback } from "react";
import { lessonAPI } from "../services/api";
import { ChevronRight, BookMarked } from "lucide-react";

export default function CourseDetail({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await lessonAPI.getByCourseId(courseId);
      setLessons(response.data);
      if (response.data.length > 0) {
        setSelectedLesson(response.data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Lessons List */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-600" />
            Lessons
          </h3>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedLesson?.id === lesson.id
                      ? "bg-indigo-100 border-l-4 border-indigo-600 text-indigo-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{lesson.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lesson Content */}
        <div className="md:col-span-2">
          {selectedLesson ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedLesson.name}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedLesson.description}
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Duration:</strong>{" "}
                  {selectedLesson.duration || "Not specified"}
                </p>
              </div>

              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Complete Lesson
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Select a lesson to view content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
