# LearnSmartly - Frontend Project Guide

Welcome! This document explains what the LearnSmartly project is, how to set it up, how to run it, and how to test all the functionality.

## 📚 Project Overview

**LearnSmartly** is a web-based learning platform that connects students with private teachers. It allows:

- **Students** to:
  - Browse available courses
  - Enroll in courses
  - View their enrolled courses
  - View course details

- **Teachers** to:
  - Create new courses
  - Edit existing courses
  - Delete courses
  - View all their courses with enrollment statistics
  - See how many students are enrolled in each course

## 🏗️ Project Structure

```
ls-frontend/
├── src/
│   ├── components/
│   │   ├── App.jsx                 # Main routing component
│   │   ├── Homepage.jsx            # Landing page
│   │   ├── Login.jsx               # User login page
│   │   ├── Register.jsx            # User registration with role selection
│   │   ├── Dashboard.jsx           # Student dashboard (course list)
│   │   ├── TeacherDashboard.jsx    # Teacher dashboard (course management)
│   │   ├── CourseCard.jsx          # Course card component
│   │   ├── CourseDetail.jsx        # Detailed course view
│   │   ├── BrowseCourses.jsx       # Public course browsing page
│   │   ├── Navigation.jsx          # Top navigation bar
│   │   └── QuizSection.jsx         # Quiz component (future use)
│   ├── services/
│   │   └── api.js                  # API client and endpoints
│   ├── App.css                     # Global styles
│   ├── index.css                   # Tailwind CSS imports
│   └── main.jsx                    # React entry point
├── package.json                    # Project dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── index.html                      # HTML entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Backend API** running at `http://localhost:8081/api`

### Installation

1. **Clone the repository** :

   ```bash
   cd /Users/eda/Desktop/LS/ls-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - The app will typically run at `http://localhost:5174`
   - If port 5174 is busy, it will fallback to `http://localhost:5173`

## 🧪 Testing the Functionality

### Step 1: Create Test Accounts

#### Create a Student Account

1. Go to the **Homepage**
2. Click "Create a Course" button → This takes you to Register
3. Fill in the form:
   - **Full Name**: John Student
   - **Username**: john_student
   - **Email**: john@example.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **Phone** (optional): Leave empty
   - **Address** (optional): Leave empty
   - **Role**: Select **STUDENT**
4. Click "Register"
5. You'll see a success message

#### Create a Teacher Account

1. Go to the **Homepage**
2. Click "Create a Course" button → This takes you to Register
3. Fill in the form:
   - **Full Name**: Jane Teacher
   - **Username**: jane_teacher
   - **Email**: jane@example.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **Phone** (optional): Leave empty
   - **Address** (optional): Leave empty
   - **Role**: Select **TEACHER**
4. Click "Register"
5. You'll see a success message

---

### Step 2: Test Student Functionality

#### Login as Student

1. Click "Back to Homepage" on the Register page (or go to Homepage)
2. Click "Get Started" or any login option
3. Enter student credentials:
   - **Username/Email**: john_student or john@example.com
   - **Password**: password123
4. Click "Login"
5. You should see the **Student Dashboard** with available courses

#### Browse and Enroll in Courses

1. On the Student Dashboard, you'll see a list of courses
2. Each course card shows:
   - Course name
   - Description
   - Number of students enrolled / Capacity
3. Click **"Enroll"** to enroll in a course
4. You should see a success message

#### View Course Details

1. Click **"View Course"** on any course card
2. You'll see detailed course information:
   - Course name
   - Number of enrolled students
   - Course capacity
   - Course description
3. Click **"Back to Courses"** to return to the course list

#### Public Course Browsing (Without Login)

1. Go to Homepage
2. Click **"Browse Courses"** button
3. You'll see all available courses without logging in
4. Click **"View Details"** on any course → It will ask you to log in
5. Click **"Login to Enroll"** → It will redirect to login page

---

### Step 3: Test Teacher Functionality

#### Login as Teacher

1. Go to Homepage
2. Click **"Get Started"** (or any login option)
3. Enter teacher credentials:
   - **Username/Email**: jane_teacher or jane@example.com
   - **Password**: password123
4. Click "Login"
5. You should see the **Teacher Dashboard** (different from student dashboard)

#### Create a New Course

1. On Teacher Dashboard, click **"Create New Course"** button
2. Fill in the form:
   - **Course Name**: Mathematics 101
   - **Description**: Learn basic algebra and geometry
   - **Capacity**: 30
3. Click **"Create"**
4. You'll see a success message
5. The new course appears in your course list

#### Edit a Course

1. On Teacher Dashboard, find a course and click **"Edit"** button
2. Modify the course details:
   - Change name, description, or capacity
3. Click **"Update"**
4. You'll see a success message
5. The course is updated in the list

#### Delete a Course

1. On Teacher Dashboard, find a course and click **"Delete"** button
2. Confirm the deletion when prompted
3. You'll see a success message
4. The course is removed from the list

#### View Enrollment Statistics

1. On Teacher Dashboard, each course card shows:
   - Course name
   - Description
   - **"X / Y enrolled"** (e.g., "2 / 30 enrolled")
   - Edit and Delete buttons

---

### Step 4: Test Authentication & Authorization

#### Verify Role-Based Routing

1. **Login as STUDENT** → You should see Student Dashboard (course list to enroll)
2. **Logout** and **Login as TEACHER** → You should see Teacher Dashboard (course management)
3. Each role has different features (students can't create courses, teachers can)

#### Verify JWT Token Storage

1. Open **Browser DevTools** (F12)
2. Go to **Application** → **Local Storage**
3. You should see a `token` key with a long JWT token string
4. This token is used for API authentication

#### Logout

1. Click **"Logout"** button in the top-right corner
2. You'll be redirected to the Homepage
3. The JWT token is removed from Local Storage

---

### Step 5: Test Navigation

- **Homepage**: Has "Browse Courses" and "Create a Course" CTAs
- **BrowseCourses Page**: Shows all courses with orange navbar (has Login/Register buttons)
- **Login/Register Pages**: Have back buttons to return to Homepage
- **Student Dashboard**: Shows courses to enroll in
- **Teacher Dashboard**: Shows courses to manage
- All pages have a consistent orange navigation bar

---

## 🎨 Design System

The app uses a **pastel color palette**:

- **Orange-400**: Main navigation bar
- **Lavender/Purple**: Student Dashboard background
- **Emerald/Teal**: Register form
- **Peach/Orange/Rose**: Login form
- **Purple/Pink**: Action buttons
- **Orange/Purple**: Course card headers

---

## 🔌 API Endpoints Being Used

The frontend communicates with the backend at `http://localhost:8081/api`:

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### Courses

- `GET /courses` - Get all courses
- `GET /courses/{id}` - Get specific course details
- `POST /courses` - Create new course (teacher only)
- `PUT /courses/{id}` - Update course (teacher only)
- `DELETE /courses/{id}` - Delete course (teacher only)

### Enrollments

- `POST /courses/{courseId}/enroll` - Enroll in a course
- `DELETE /courses/{courseId}/unenroll` - Unenroll from a course
- `GET /my/enrollments` - Get user's enrollments

---

## 🐛 Troubleshooting

### Port 5174 Not Available

- The app will automatically fallback to port 5173
- Check your browser console for the actual port

### Backend Connection Error

- Make sure the backend is running at `http://localhost:8081/api`
- Check that CORS is properly configured in the backend
- Look at browser console for detailed error messages

### Login Fails

- Verify the backend is running
- Check that username/email and password are correct
- Clear Local Storage and try again

### JWT Token Issues

- Check Local Storage in DevTools → Application tab
- If token is missing, try logging out and logging in again
- Clear browser cache if needed

### Course Operations Fail (for Teachers)

- Ensure you're logged in as a TEACHER role
- Verify the backend is running
- Check network tab in DevTools for API errors

---

## 📋 Quick Testing Checklist

- [ ] App starts without errors
- [ ] Homepage displays correctly
- [ ] Can register as Student
- [ ] Can register as Teacher
- [ ] Can login as Student
- [ ] Can login as Teacher
- [ ] Student sees courses and can enroll
- [ ] Teacher can create, edit, and delete courses
- [ ] Logout works and clears token
- [ ] Public course browsing works without login
- [ ] Course details display correctly
- [ ] Navigation bar is consistent across pages

---

## 📝 Notes

- **Single Teacher MVP**: Currently, the system supports one teacher for the MVP
- **Backend Implementation**: Some features (like viewing individual student names for enrollments) require backend endpoint implementation
- **Future Features**: Quiz functionality is scaffolded but not yet implemented
- **Responsive Design**: The app is mobile-friendly with Tailwind CSS

---

## 📞 Support

If you encounter any issues:

1. Check the browser console (F12) for error messages
2. Check the network tab to see API requests and responses
3. Verify the backend is running at `http://localhost:8081/api`
4. Check that all dependencies are installed with `npm install`

---

Happy Testing! 🎉
