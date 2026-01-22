# Learning Platform Frontend

A modern React + Vite + Tailwind CSS frontend for a comprehensive learning platform with course management, lesson tracking, and quiz functionality.

## Features

- 📚 **Course Management**: Browse and view available courses
- 👥 **User Management**: Create, edit, and manage users with different roles
- 📝 **Lesson Tracking**: View lessons organized by courses
- 🧪 **Quiz System**: Take quizzes and track performance
- 📊 **Progress Tracking**: Monitor learning progress
- 🎨 **Modern UI**: Clean and responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Top navigation bar
│   ├── Dashboard.jsx       # Main course listing
│   ├── CourseCard.jsx      # Individual course card
│   ├── CourseDetail.jsx    # Course lessons view
│   ├── QuizSection.jsx     # Quiz component
│   └── UserManagement.jsx  # User CRUD operations
├── services/
│   └── api.js              # API client and endpoints
├── App.jsx                 # Main app component
├── App.css                 # Global styles
├── index.css              # Tailwind directives
└── main.jsx               # Entry point
```

## API Integration

The frontend connects to the backend API with the following endpoints:

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Lessons

- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/course/:courseId` - Get lessons by course
- `POST /api/lessons` - Create lesson
- `PUT /api/lessons/:id` - Update lesson
- `DELETE /api/lessons/:id` - Delete lesson

### Quizzes

- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/lesson/:lessonId` - Get quizzes by lesson
- `POST /api/quizzes` - Create quiz
- `POST /api/quiz-answers` - Submit quiz answer

## Components

### Navigation

Main navigation bar with course and user management links.

### Dashboard

Displays all available courses in a grid layout with enrollment options.

### CourseCard

Individual course card showing course name, description, and action buttons.

### CourseDetail

Shows lessons for a selected course with content viewing capabilities.

### QuizSection

Interactive quiz interface with progress tracking and score calculation.

### UserManagement

Admin panel for managing users with CRUD operations.

## Usage

1. **Navigate Courses**: Click "Courses" in the navigation to view available courses
2. **Manage Users**: Click "Users" to access the user management panel
3. **Take Quizzes**: View lessons and take associated quizzes
4. **Track Progress**: Quiz scores are automatically saved

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
