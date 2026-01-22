import React, { useState, useEffect, useCallback } from "react";
import { quizAPI, quizAnswerAPI } from "../services/api";
import { CheckCircle, XCircle } from "lucide-react";

export default function QuizSection({ lessonId }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getByLessonId(lessonId);
      setQuizzes(response.data);
    } catch (err) {
      console.error("Failed to load quizzes", err);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleAnswerSelect = (questionId, answer) => {
    if (!submitted) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    }
  };

  const handleSubmitQuiz = async () => {
    let correctCount = 0;
    selectedQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore =
      (correctCount / selectedQuiz.questions.length) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    // Save quiz answer
    try {
      await quizAnswerAPI.create({
        quizId: selectedQuiz.id,
        answer: JSON.stringify(answers),
        score: calculatedScore,
      });
    } catch (err) {
      console.error("Failed to save quiz answer", err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading quizzes...</div>;
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No quizzes available
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Available Quizzes
        </h3>
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => setSelectedQuiz(quiz)}
            className="w-full p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors text-left"
          >
            <h4 className="font-semibold text-indigo-900">{quiz.name}</h4>
            <p className="text-sm text-indigo-700 mt-1">
              {quiz.questions?.length || 0} questions
            </p>
          </button>
        ))}
      </div>
    );
  }

  const quiz = selectedQuiz;
  const questions = quiz.questions || [];
  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{quiz.name}</h3>
          <button
            onClick={() => {
              setSelectedQuiz(null);
              setCurrentQuestion(0);
              setAnswers({});
              setSubmitted(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {!submitted ? (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {question.questionText}
            </h4>
            <div className="space-y-3">
              {question.options?.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-2">Your Score</p>
            <p className="text-4xl font-bold text-indigo-600">
              {score.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {Math.round(score / (100 / questions.length))} out of{" "}
              {questions.length} correct
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  {answers[q.id] === q.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {q.questionText}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your answer:{" "}
                      <strong>{answers[q.id] || "Not answered"}</strong>
                    </p>
                    {answers[q.id] !== q.correctAnswer && (
                      <p className="text-sm text-green-600 mt-1">
                        Correct answer: <strong>{q.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedQuiz(null);
              setCurrentQuestion(0);
              setAnswers({});
              setSubmitted(false);
            }}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
}
