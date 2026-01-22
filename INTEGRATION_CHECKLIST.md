# Frontend Backend Integration - Quick Reference

## ✅ Changes Completed

### 1. API Service (`src/services/api.js`)

```
✓ Added authAPI object
  - register()
  - login()
  - me()

✓ JWT Token Support
  - Automatically adds Authorization header
  - Token stored in localStorage

✓ Updated Enrollment API
  - enroll(courseId)
  - unenroll(courseId)
  - myEnrollments()
```

### 2. Register Component (`src/components/Register.jsx`)

```
✓ New Fields:
  - username (required, was "name")
  - email (required)
  - password (min 8 chars, was 6)
  - phoneNumber (optional, new)
  - address (optional, new)

✓ Uses authAPI.register()
✓ Extracts accessToken and user
✓ Stores token in localStorage
```

### 3. Login Component (`src/components/Login.jsx`)

```
✓ Uses authAPI.login()
✓ Extracts accessToken and user
✓ Stores token in localStorage
✓ Better error handling
```

### 4. Dashboard Component (`src/components/Dashboard.jsx`)

```
✓ Uses enrollmentAPI.enroll()
✓ Removes userId (backend gets from JWT)
✓ Automatic token in headers
```

## 🚀 Testing Checklist

- [ ] Backend running on http://localhost:8080
- [ ] Try registering with new account
- [ ] Try logging in
- [ ] Try enrolling in a course
- [ ] Check browser console for no errors
- [ ] Verify token in localStorage: `localStorage.getItem('token')`

## 📝 Key Implementation Details

### Password Requirements

- **Registration**: Min 8 characters
- **Login**: Any password

### Request Fields

**Register:**

- username (string, required)
- email (string, required, valid email)
- password (string, required, min 8)
- phoneNumber (string, optional)
- address (string, optional)
- role (UserRole enum: STUDENT, TEACHER, ADMIN - optional, defaults to STUDENT)

**Login:**

- email (string, required, valid email)
- password (string, required)

### Response Format

Both register and login return:

```json
{
  "accessToken": "JWT_TOKEN_HERE",
  "user": {
    "id": number,
    "username": string,
    "email": string,
    "role": "STUDENT" | "TEACHER" | "ADMIN"
  }
}
```

## 🔐 Authentication Flow

```
User Registration/Login
        ↓
Backend validates & returns accessToken
        ↓
Frontend stores token in localStorage
        ↓
API interceptor adds: Authorization: Bearer {token}
        ↓
Each request includes token automatically
        ↓
Backend validates token with @PreAuthorize
```

## 📍 Endpoint Mapping

| Purpose        | Old Endpoint               | New Endpoint               | Method |
| -------------- | -------------------------- | -------------------------- | ------ |
| Register       | /api/users                 | /api/auth/register         | POST   |
| Login          | (mock)                     | /api/auth/login            | POST   |
| Get Me         | (none)                     | /api/auth/me               | GET    |
| Enroll         | /api/enrollments           | /api/courses/{id}/enroll   | POST   |
| Unenroll       | /api/enrollments/{id}      | /api/courses/{id}/unenroll | DELETE |
| My Enrollments | /api/enrollments/user/{id} | /api/my/enrollments        | GET    |

## 🐛 Debugging Tips

1. Open browser DevTools (F12)
2. Go to Console tab
3. Check logs for `[API Request]` and `[API Error]`
4. Look at Network tab to see actual requests/responses
5. Check localStorage: `console.log(localStorage.getItem('token'))`

## ⚠️ Common Issues & Solutions

| Issue                       | Solution                                             |
| --------------------------- | ---------------------------------------------------- |
| "Cannot connect to backend" | Check backend is running on port 8080                |
| Registration fails          | Password must be 8+ chars, check console for details |
| 401 Unauthorized            | Token invalid or expired, try logging in again       |
| CORS error                  | Check backend CORS configuration                     |
| "No static resource"        | Backend not serving API properly                     |
