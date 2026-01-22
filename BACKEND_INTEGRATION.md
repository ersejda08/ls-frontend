# Backend Integration Summary

## Overview

Your frontend has been updated to work with your Spring Boot backend at `http://localhost:8080`.

## Key Changes Made

### 1. **API Configuration** (`src/services/api.js`)

- Added **JWT Token Support**: Automatically includes `Authorization: Bearer {token}` header with all requests
- Created new `authAPI` object with endpoints:
  - `register()` → `POST /api/auth/register`
  - `login()` → `POST /api/auth/login`
  - `me()` → `GET /api/auth/me`
- Updated `enrollmentAPI` with new endpoints:
  - `enroll(courseId)` → `POST /api/courses/{courseId}/enroll`
  - `unenroll(courseId)` → `DELETE /api/courses/{courseId}/unenroll`
  - `myEnrollments()` → `GET /api/my/enrollments`

### 2. **Register Component** (`src/components/Register.jsx`)

**Changed Fields:**

- ❌ Removed: `name` field
- ✅ Added: `username` field (required)
- ✅ Added: `phoneNumber` field (optional)
- ✅ Added: `address` field (optional)
- ✅ Changed: `role` from `"student"` to `"STUDENT"` (enum value)

**Validation:**

- Password must be **at least 8 characters** (backend requirement)
- Username is now required
- Phone and address are optional

**API Integration:**

- Uses `authAPI.register()` to send data to `/api/auth/register`
- Extracts `accessToken` and `user` from response
- Stores token in localStorage with key `"token"`

### 3. **Login Component** (`src/components/Login.jsx`)

**Changes:**

- Uses `authAPI.login()` instead of mock login
- Extracts `accessToken` and `user` from response
- Properly stores token in localStorage
- Better error messages for 401 (invalid credentials)

### 4. **Dashboard Component** (`src/components/Dashboard.jsx`)

**Changes:**

- Updated `handleEnroll()` to use `enrollmentAPI.enroll(courseId)`
- No longer sends `userId` (backend gets it from JWT token)

## Request/Response Formats

### Register

**Request:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "role": "STUDENT"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

### Login

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

### Enrollment

**Enroll - POST `/api/courses/{courseId}/enroll`**

- No request body needed
- Authorization header required
- Response: `EnrollmentResponseDTO`

**Unenroll - DELETE `/api/courses/{courseId}/unenroll`**

- No request body needed
- Authorization header required
- Response: 204 No Content

## Authentication

### How JWT Token is Used

1. User logs in or registers
2. Backend returns `accessToken` (JWT)
3. Frontend stores token in `localStorage` with key `"token"`
4. API interceptor automatically adds: `Authorization: Bearer {token}` to all requests
5. Backend validates token with `@PreAuthorize` annotations

### Protected Endpoints

These require valid JWT token:

- `POST /api/courses/{courseId}/enroll` - requires STUDENT role
- `DELETE /api/courses/{courseId}/unenroll` - requires STUDENT role
- `GET /api/my/enrollments` - requires STUDENT role
- `GET /api/auth/me` - requires authentication
- And other protected endpoints

## Testing the Integration

### Test Registration

1. Go to Register page
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123` (min 8 chars)
   - Phone: (optional)
   - Address: (optional)
3. Click Register
4. Should see success message and redirect to login

### Test Login

1. Use credentials from registration
2. Email: `test@example.com`
3. Password: `password123`
4. Should see success and redirect to dashboard

### Test Enrollment

1. After login, view a course
2. Click "Enroll" button
3. Should see success message
4. Token will automatically be sent in Authorization header

## Error Handling

The frontend now properly handles:

- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Invalid credentials or expired token
- **409 Conflict** - Email already exists (registration)
- **403 Forbidden** - Insufficient permissions
- **500 Server Error** - Backend error
- **Network Error** - Backend not running

## Backend URL Configuration

If you need to change the backend URL, edit `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

Change to your actual backend URL if different.

## Troubleshooting

### "Cannot connect to backend"

- Make sure backend is running on `http://localhost:8080`
- Check browser console for network errors
- Verify CORS is enabled on backend

### "Invalid token"

- Token may have expired
- Try logging in again
- Clear localStorage: `localStorage.clear()`

### Registration fails but no error shown

- Check browser console (F12)
- Look for detailed error messages
- Verify password is at least 8 characters

## Next Steps

1. Test registration and login flows
2. Verify enrollment works
3. Test other API endpoints as needed
4. Implement error recovery/token refresh if needed
5. Consider adding logout endpoint integration
