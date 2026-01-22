import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add JWT token to all requests
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    );
    return config;
  },
  (error) => {
    console.error("[API Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Success] ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`[API Error] Status: ${error.response?.status}`);
    console.error(`[API Error] URL: ${error.config?.url}`);
    console.error(`[API Error] Method: ${error.config?.method?.toUpperCase()}`);
    console.error(`[API Error] Response Data:`, error.response?.data);
    console.error(`[API Error] Full Error:`, error);

    if (error.response?.status === 403) {
      console.error(
        "[403 Forbidden] Backend rejected request. This is a CORS or authentication issue.",
        error.config,
      );
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  me: () => apiClient.get("/auth/me"),
};

// User API
export const userAPI = {
  getAll: () => apiClient.get("/users"),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (data) => apiClient.post("/users", data),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
};

// Course API
export const courseAPI = {
  getAll: () => apiClient.get("/courses"),
  getById: (id) => apiClient.get(`/courses/${id}`),
  create: (data) => apiClient.post("/courses", data),
  update: (id, data) => apiClient.put(`/courses/${id}`, data),
  delete: (id) => apiClient.delete(`/courses/${id}`),
  getByCourseId: (courseId) => apiClient.get(`/courses/${courseId}/lessons`),
};

// Lesson API
export const lessonAPI = {
  getAll: () => apiClient.get("/lessons"),
  getById: (id) => apiClient.get(`/lessons/${id}`),
  create: (data) => apiClient.post("/lessons", data),
  update: (id, data) => apiClient.put(`/lessons/${id}`, data),
  delete: (id) => apiClient.delete(`/lessons/${id}`),
  getByCourseId: (courseId) => apiClient.get(`/lessons/course/${courseId}`),
};

// Quiz API
export const quizAPI = {
  getAll: () => apiClient.get("/quizzes"),
  getById: (id) => apiClient.get(`/quizzes/${id}`),
  create: (data) => apiClient.post("/quizzes", data),
  update: (id, data) => apiClient.put(`/quizzes/${id}`, data),
  delete: (id) => apiClient.delete(`/quizzes/${id}`),
  getByLessonId: (lessonId) => apiClient.get(`/quizzes/lesson/${lessonId}`),
};

// Quiz Answer API
export const quizAnswerAPI = {
  getAll: () => apiClient.get("/quiz-answers"),
  getById: (id) => apiClient.get(`/quiz-answers/${id}`),
  create: (data) => apiClient.post("/quiz-answers", data),
  update: (id, data) => apiClient.put(`/quiz-answers/${id}`, data),
  delete: (id) => apiClient.delete(`/quiz-answers/${id}`),
};

// Enrollment API
export const enrollmentAPI = {
  getAll: () => apiClient.get("/enrollments"),
  getById: (id) => apiClient.get(`/enrollments/${id}`),
  create: (data) => apiClient.post("/enrollments", data),
  delete: (id) => apiClient.delete(`/enrollments/${id}`),
  getByUserId: (userId) => apiClient.get(`/enrollments/user/${userId}`),
  getByCourseId: (courseId) => apiClient.get(`/enrollments/course/${courseId}`),
  enroll: (courseId) => apiClient.post(`/courses/${courseId}/enroll`),
  unenroll: (courseId) => apiClient.delete(`/courses/${courseId}/unenroll`),
  myEnrollments: () => apiClient.get("/my/enrollments"),
};

export default apiClient;
