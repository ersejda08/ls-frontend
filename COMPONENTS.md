# Component Documentation

## Overview

This document provides detailed information about each component in the Learning Platform Frontend.

---

## 1. Navigation Component

**File**: `src/components/Navigation.jsx`

### Purpose

Main navigation bar displayed at the top of every page.

### Props

- `currentPage` (string) - Currently active page
- `setCurrentPage` (function) - Page change handler

### Features

- Logo and branding
- Navigation links (Courses, Users)
- Logout button
- Active page highlighting
- Responsive design

### Usage

```jsx
<Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
```

---

## 2. Dashboard Component

**File**: `src/components/Dashboard.jsx`

### Purpose

Home page displaying all available courses in a grid layout.

### State

- `courses` - Array of course objects
- `loading` - Loading indicator
- `error` - Error message

### Features

- Fetch all courses on mount
- Loading spinner
- Error handling
- Grid responsive layout (1-3 columns)
- Course cards with key information

### API Calls

- `GET /api/courses` - Fetch all courses

### Usage

```jsx
<Dashboard />
```

---

## 3. CourseCard Component

**File**: `src/components/CourseCard.jsx`

### Purpose

Reusable component displaying individual course information.

### Props

- `course` (object) - Course data object

### Course Object Structure

```javascript
{
  id: 1,
  name: "React Fundamentals",
  description: "Learn React basics",
  level: "Beginner",
  enrollments: [...]  // Array of enrollment objects
}
```

### Features

- Course title and description
- Course level display
- Enrollment count
- View Course button
- Enroll button
- Gradient header
- Hover effects

### Usage

```jsx
<CourseCard course={course} />
```

---

## 4. CourseDetail Component

**File**: `src/components/CourseDetail.jsx`

### Purpose

Display lessons for a specific course and allow lesson selection.

### Props

- `courseId` (number) - ID of the course

### State

- `lessons` - Array of lesson objects
- `loading` - Loading indicator
- `selectedLesson` - Currently selected lesson

### Features

- Fetch lessons by course ID
- Left sidebar with lesson list
- Right panel showing lesson content
- Lesson selection with highlighting
- Content display
- Complete lesson button
- Responsive grid layout

### API Calls

- `GET /api/lessons/course/:courseId` - Fetch course lessons

### Lesson Object Structure

```javascript
{
  id: 1,
  name: "Getting Started",
  description: "Introduction to the course",
  duration: "30 minutes",
  courseId: 1
}
```

### Usage

```jsx
<CourseDetail courseId={1} />
```

---

## 5. QuizSection Component

**File**: `src/components/QuizSection.jsx`

### Purpose

Complete quiz system with question display, answering, and scoring.

### Props

- `lessonId` (number) - ID of the lesson

### State

- `quizzes` - Array of quiz objects
- `selectedQuiz` - Currently taking quiz
- `currentQuestion` - Current question index
- `answers` - Object with user answers
- `submitted` - Quiz submission state
- `loading` - Loading indicator
- `score` - Quiz score

### Features

- List available quizzes per lesson
- Multi-question quiz interface
- Progress bar
- Question navigation (Previous/Next)
- Quiz submission
- Answer review with correctness
- Score calculation
- Correct answer display on review
- Back to quizzes button

### Quiz Object Structure

```javascript
{
  id: 1,
  name: "Module 1 Quiz",
  lessonId: 1,
  questions: [
    {
      id: 1,
      questionText: "What is React?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1"
    }
  ]
}
```

### Workflow

1. Select quiz from list
2. Answer questions one by one
3. Submit quiz
4. View score and review answers
5. Return to quiz list

### API Calls

- `GET /api/quizzes/lesson/:lessonId` - Fetch quizzes
- `POST /api/quiz-answers` - Submit quiz answer

### Usage

```jsx
<QuizSection lessonId={1} />
```

---

## 6. UserManagement Component

**File**: `src/components/UserManagement.jsx`

### Purpose

Admin panel for managing platform users (CRUD operations).

### State

- `users` - Array of user objects
- `loading` - Loading indicator
- `error` - Error message
- `showForm` - Form visibility toggle
- `formData` - Form input data
- `editingId` - Currently editing user ID

### Features

- Fetch all users on mount
- Add new user button
- User table display
- Edit user functionality
- Delete user with confirmation
- Role-based badges
- Form validation
- Auto-clear form after submission
- Responsive table layout

### User Object Structure

```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "student"  // or "instructor", "admin"
}
```

### API Calls

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Form Validation

- Name: Required
- Email: Required, valid email format
- Role: Select from dropdown

### Usage

```jsx
<UserManagement />
```

---

## API Service

**File**: `src/services/api.js`

### Purpose

Centralized Axios configuration and API endpoints.

### Configuration

```javascript
const API_BASE_URL = "http://localhost:8080/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
```

### Available API Objects

#### userAPI

```javascript
userAPI.getAll();
userAPI.getById(id);
userAPI.create(data);
userAPI.update(id, data);
userAPI.delete(id);
```

#### courseAPI

```javascript
courseAPI.getAll();
courseAPI.getById(id);
courseAPI.create(data);
courseAPI.update(id, data);
courseAPI.delete(id);
courseAPI.getByCourseId(courseId);
```

#### lessonAPI

```javascript
lessonAPI.getAll();
lessonAPI.getById(id);
lessonAPI.create(data);
lessonAPI.update(id, data);
lessonAPI.delete(id);
lessonAPI.getByCourseId(courseId);
```

#### quizAPI

```javascript
quizAPI.getAll();
quizAPI.getById(id);
quizAPI.create(data);
quizAPI.update(id, data);
quizAPI.delete(id);
quizAPI.getByLessonId(lessonId);
```

#### quizAnswerAPI

```javascript
quizAnswerAPI.getAll();
quizAnswerAPI.getById(id);
quizAnswerAPI.create(data);
quizAnswerAPI.update(id, data);
quizAnswerAPI.delete(id);
```

#### enrollmentAPI

```javascript
enrollmentAPI.getAll();
enrollmentAPI.getById(id);
enrollmentAPI.create(data);
enrollmentAPI.delete(id);
enrollmentAPI.getByUserId(userId);
enrollmentAPI.getByCourseId(courseId);
```

### Usage Example

```javascript
import { userAPI, courseAPI } from "../services/api";

// Get all users
const response = await userAPI.getAll();

// Create user
await userAPI.create({
  name: "Jane Doe",
  email: "jane@example.com",
  role: "instructor",
});
```

---

## Main App Component

**File**: `src/components/App.jsx`

### Purpose

Main application component managing page routing and state.

### State

- `currentPage` - Currently displayed page

### Pages

1. **Dashboard** - Course listing
2. **Users** - User management

### Structure

```jsx
<Navigation />  - Top nav bar
<main>
  {currentPage === 'dashboard' && <Dashboard />}
  {currentPage === 'users' && <UserManagement />}
</main>
```

### Usage

```jsx
import App from "./App";
```

---

## Styling

**Files**:

- `src/index.css` - Tailwind directives
- `src/App.css` - Global styles

### Tailwind Configuration

Located in `tailwind.config.js`

### Color Scheme

- Primary: Indigo (`#4f46e5`)
- Secondary: Purple
- Success: Green
- Error: Red
- Background: Gray shades

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Error Handling

All components implement error handling:

```javascript
try {
  const response = await apiClient.get(endpoint);
  // Handle success
} catch (err) {
  console.error("Error message:", err);
  setError("User-friendly error message");
}
```

---

## Loading States

Components show loading indicators:

```javascript
{loading ? (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
) : (
  // Content
)}
```

---

## Best Practices Implemented

✅ **Component Structure**: Functional components with hooks
✅ **State Management**: React hooks (useState, useEffect, useCallback)
✅ **API Integration**: Centralized Axios client
✅ **Error Handling**: Try-catch with user feedback
✅ **Loading States**: Spinners and skeleton loaders
✅ **Responsive Design**: Tailwind CSS utilities
✅ **Accessibility**: Semantic HTML, form labels
✅ **Code Organization**: Separation of concerns
✅ **Reusability**: Modular components
✅ **Performance**: Memoization and optimization

---

## Component Hierarchy

```
App
├── Navigation
├── Dashboard
│   ├── CourseCard (multiple)
│   └── CourseCard
└── UserManagement
    ├── User Form
    ├── User Table
    └── Edit Form (when editing)

CourseDetail
├── Lesson List
└── Lesson Content

QuizSection
├── Quiz List
├── Quiz Questions
└── Quiz Results
```

---

## Data Flow

### Course Viewing Flow

```
Dashboard
  ↓
courseAPI.getAll()
  ↓
Display CourseCards
  ↓
User clicks "View Course"
  ↓
CourseDetail
  ↓
lessonAPI.getByCourseId()
  ↓
Display Lessons
```

### Quiz Taking Flow

```
CourseDetail
  ↓
User clicks Quiz
  ↓
QuizSection
  ↓
quizAPI.getByLessonId()
  ↓
Display Quiz List
  ↓
User selects Quiz
  ↓
Display Questions
  ↓
User answers & submits
  ↓
quizAnswerAPI.create()
  ↓
Display Results
```

### User Management Flow

```
UserManagement
  ↓
userAPI.getAll()
  ↓
Display User Table
  ↓
User Action (Create/Edit/Delete)
  ↓
API Call (POST/PUT/DELETE)
  ↓
Refresh userAPI.getAll()
  ↓
Update Display
```

---

## Extending the Frontend

### Adding a New Component

1. Create file in `src/components/NewComponent.jsx`
2. Import API methods from `src/services/api.js`
3. Use useState and useEffect for state management
4. Add route in `App.jsx`
5. Add navigation link in `Navigation.jsx`

### Adding a New API Endpoint

1. Add method to `src/services/api.js`
2. Use the configured `apiClient`
3. Follow naming convention: `resourceAPI.action()`

### Styling New Components

1. Use Tailwind CSS utility classes
2. Add custom styles to `App.css` if needed
3. Follow existing color scheme

---

## Common Patterns

### Fetching Data

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.getAll();
      setData(response.data);
    } catch (err) {
      setError("Error message");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Handling Form Submission

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.create(formData);
    setFormData({
      /* reset */
    });
  } catch (err) {
    setError("Error message");
  }
};
```

### Conditional Rendering

```javascript
{
  loading && <LoadingSpinner />;
}
{
  error && <ErrorMessage error={error} />;
}
{
  !loading && !error && <Content />;
}
```

---

This documentation provides a complete overview of all components and how they work together to create the Learning Platform Frontend.
