# Quick Start Guide - Learning Platform Frontend

## ✅ Project Setup Complete!

Your React + Vite + Tailwind CSS frontend for the Learning Platform has been successfully created!

## 📁 What Was Created

### Components

- **Navigation.jsx** - Top navigation bar with course and user management links
- **Dashboard.jsx** - Main course listing page with grid layout
- **CourseCard.jsx** - Individual course card component
- **CourseDetail.jsx** - Course content with lessons list
- **QuizSection.jsx** - Interactive quiz system with scoring
- **UserManagement.jsx** - Admin panel for user CRUD operations

### Services

- **api.js** - Axios configuration with all API endpoints

### Styling

- **Tailwind CSS** - Configured for responsive design
- **PostCSS** - Auto-prefixer for cross-browser compatibility
- Modern gradient and animation utilities

### Configuration Files

- `package.json` - Project dependencies and scripts
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML entry point

## 🚀 Getting Started

### 1. Install Dependencies (Already Done!)

```bash
npm install
```

### 2. Configure Backend URL

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### 4. Build for Production

```bash
npm run build
```

## 📊 Frontend Features

### 1. Dashboard

- View all available courses
- Search and filter courses
- Enroll in courses
- Responsive grid layout

### 2. User Management

- Create new users
- Edit existing users
- Delete users
- Manage user roles (Student, Instructor, Admin)

### 3. Course Navigation

- Browse lessons by course
- Track lesson progress
- View lesson content and descriptions

### 4. Quiz System

- Take quizzes by lesson
- Multiple choice questions
- Instant score calculation
- Review answers after submission
- Quiz history tracking

## 🎯 API Endpoints Used

The frontend communicates with the backend using these endpoints:

```
/api/users                    # User management
/api/courses                  # Course listing
/api/lessons                  # Lesson content
/api/quizzes                  # Quiz data
/api/quiz-answers             # Quiz submissions
/api/enrollments              # Course enrollment
```

## 🛠 Tech Stack

| Tool         | Version | Purpose      |
| ------------ | ------- | ------------ |
| React        | 19.2.0  | UI Framework |
| Vite         | 7.2.4   | Build Tool   |
| Tailwind CSS | 3.3.6   | Styling      |
| Axios        | 1.6.0   | HTTP Client  |
| Lucide React | 0.376.0 | Icon Library |

## 📱 Responsive Design

All components are fully responsive:

- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🔧 Key Features

✅ **Modern UI** - Clean and intuitive interface with Tailwind CSS
✅ **API Integration** - Fully configured Axios client
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Spinners and skeleton loaders
✅ **Responsive** - Works on all device sizes
✅ **Component-Based** - Reusable and maintainable components
✅ **State Management** - React Hooks for state handling

## 🚨 Common Issues

### API Connection Failed

- Ensure backend is running on `http://localhost:8080`
- Check API_BASE_URL in `src/services/api.js`
- Check browser console for CORS errors

### Tailwind Classes Not Working

- Run `npm install` to ensure Tailwind is installed
- Verify `tailwind.config.js` includes correct paths
- Restart development server

### Port Already in Use

```bash
npm run dev -- --port 3000
```

## 📚 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navigation.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CourseCard.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── QuizSection.jsx
│   │   └── UserManagement.jsx
│   ├── services/        # API client
│   │   └── api.js
│   ├── App.jsx          # Main component
│   ├── App.css          # Global styles
│   ├── index.css        # Tailwind directives
│   └── main.jsx         # Entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── README.md            # Documentation

```

## 💡 Next Steps

1. **Start the Backend** - Ensure your Spring Boot API is running
2. **Run the Frontend** - `npm run dev`
3. **Test the Features** - Navigate through courses, users, and quizzes
4. **Customize** - Modify colors and styles in `tailwind.config.js`
5. **Deploy** - Build and deploy to your hosting service

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Add New Routes

Modify `App.jsx` to add more pages and navigation

### Extend API

Add more methods to `src/services/api.js`

## 📞 Support

For issues or questions, refer to the README.md file or check the browser console for errors.

Happy Learning! 🎓
