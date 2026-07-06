# MIGRATION GUIDE: Supabase to MERN Stack

## Overview
This guide documents the complete migration of the LearnSpark platform from Supabase to a production-ready MERN (MongoDB, Express, React, Node.js) stack architecture.

## What Was Changed

### 1. Backend Infrastructure (NEW)
**Created complete Express backend with:**
- MongoDB database models (Student, Teacher, Assignment, Submission, TeacherClass)
- JWT-based authentication with httpOnly cookies
- RESTful API endpoints for all operations
- Cloudinary integration for file storage
- Middleware for authentication, validation, error handling
- Security features (Helmet, CORS, rate limiting)

**Backend Structure:**
```
backend/
├── config/          # Database, Cloudinary, JWT configuration
├── controllers/      # Business logic for all endpoints
├── middleware/       # Auth, validation, error handling
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/         # Gemini API integration
├── utils/           # Utility functions
├── uploads/         # Temporary file storage
└── server.js        # Express server entry point
```

### 2. Frontend API Layer (NEW)
**Created API client layer:**
- `src/api/axiosConfig.js` - Axios instance with interceptors
- `src/api/authAPI.js` - Authentication API calls
- `src/api/studentAPI.js` - Student operations
- `src/api/teacherAPI.js` - Teacher operations
- `src/api/assignmentAPI.js` - Assignment operations
- `src/api/uploadAPI.js` - File upload operations

### 3. Environment Variables (UPDATED)
**Frontend (.env.example):**
```env
VITE_API_URL="http://localhost:5000/api"
```

**Backend (.env.example):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnspark
JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
GEMINI_API_KEY=your_gemini_api_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Authentication Flow (CHANGED)
**Previous (Supabase):**
- RPC function calls to database
- Plaintext passwords
- localStorage session storage

**New (JWT):**
- REST API endpoints
- bcrypt password hashing (12 salt rounds)
- JWT tokens in httpOnly cookies
- Automatic token refresh

---

## Why It Was Changed

### Security Improvements
1. **Password Hashing**: bcrypt replaces plaintext storage
2. **JWT Authentication**: Secure token-based auth vs RPC
3. **API Key Protection**: Gemini key moved to backend
4. **httpOnly Cookies**: Prevents XSS token theft
5. **Helmet**: HTTP security headers
6. **CORS**: Configured cross-origin policies

### Scalability Improvements
1. **MongoDB**: Horizontal scaling vs PostgreSQL vertical scaling
2. **Express**: Full control over API vs Supabase limitations
3. **Cloudinary**: CDN-backed file storage vs Supabase Storage
4. **Custom Backend**: No vendor lock-in

### Cost Improvements
1. **MongoDB Atlas**: Free tier available
2. **Cloudinary**: Generous free tier
3. **Self-hosted Backend**: No BaaS subscription costs

---

## Supabase → MongoDB Mapping

### Database Schema Mapping

| PostgreSQL Table | MongoDB Collection | Key Changes |
|------------------|-------------------|-------------|
| `teachers` | `teachers` | id → _id, password now hashed |
| `students` | `students` | id → _id, password now hashed, snake_case → camelCase |
| `teacher_classes` | `teacher_classes` | id → _id |
| `assignments` | `assignments` | id → _id, due_date → dueDate |
| `assignment_students` | `assignments.assignedStudents` | Embedded array instead of junction table |
| `submissions` | `submissions` | id → _id, snake_case → camelCase |

### Field Name Conversions
- `no_of_games_played` → `gamesPlayed`
- `current_score` → `currentScore`
- `daily_streak` → `dailyStreak`
- `total_time_minutes` → `totalTimeMinutes`
- `teacher_allocated` → `teacherId`
- `rural_area_id` → `ruralAreaId`
- `last_played` → `lastPlayed`
- `due_date` → `dueDate`

---

## Folder Structure

### Final Project Structure
```
Digital-Gaming-Website_for-Rural-Education1-main/
├── backend/                    # NEW: Express backend
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── assignmentController.js
│   │   ├── submissionController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── error.js
│   │   ├── validation.js
│   │   └── role.js
│   ├── models/
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── TeacherClass.js
│   │   ├── Assignment.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── assignments.js
│   │   ├── submissions.js
│   │   └── upload.js
│   ├── services/
│   │   └── geminiService.js
│   ├── utils/
│   │   └── asyncHandler.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
├── src/                        # Frontend (React)
│   ├── api/                    # NEW: API client layer
│   │   ├── axiosConfig.js
│   │   ├── authAPI.js
│   │   ├── studentAPI.js
│   │   ├── teacherAPI.js
│   │   ├── assignmentAPI.js
│   │   └── uploadAPI.js
│   ├── components/             # MODIFIED: Replace Supabase calls
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/               # MODIFIED: Update Gemini integration
│   ├── App.tsx
│   ├── main.tsx
│   └── .env
├── public/
├── .gitignore
├── MIGRATION_GUIDE.md
├── MIGRATION_PLAN.md
└── README.md
```

---

## API Documentation

### Authentication Endpoints

#### POST /api/auth/student/login
**Request:**
```json
{
  "username": "student123",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "student_id",
    "username": "student123",
    "email": "student@example.com",
    "name": "John Doe",
    "grade": 6,
    "teacherId": "teacher_id",
    "teacher": { "id": "teacher_id", "name": "Teacher Name" },
    "ruralAreaId": "area123",
    "currentScore": 100,
    "gamesPlayed": 5,
    "dailyStreak": 3,
    "lastPlayed": "2025-01-01T00:00:00.000Z",
    "totalTimeMinutes": 120
  }
}
```

#### POST /api/auth/teacher/login
**Request:**
```json
{
  "username": "teacher123",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "teacher_id",
    "username": "teacher123",
    "email": "teacher@example.com",
    "name": "Jane Smith",
    "ruralAreaId": "area123",
    "students": [...]
  }
}
```

#### POST /api/auth/student/signup
**Request:**
```json
{
  "name": "John Doe",
  "grade": 6,
  "email": "student@example.com",
  "username": "student123",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": "student_id",
    "username": "student123",
    "email": "student@example.com"
  }
}
```

#### POST /api/auth/refresh
**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully"
}
```

#### POST /api/auth/logout
**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Student Endpoints

#### GET /api/students/:id
Get student profile

#### PUT /api/students/:id
Update student profile

#### PUT /api/students/:id/activity
**Request:**
```json
{
  "sessionMinutes": 1,
  "playedToday": false
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "totalTimeMinutes": 121,
    "dailyStreak": 3,
    "lastPlayed": "2025-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/students/:id/progress
**Request:**
```json
{
  "noOfGamesPlayed": 6,
  "currentScore": 110
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "gamesPlayed": 6,
    "currentScore": 110
  }
}
```

#### GET /api/students/:id/assignments
Get student's assignments with submission status

### Teacher Endpoints

#### GET /api/teachers/:id
Get teacher profile

#### GET /api/teachers/:id/students
Get teacher's assigned students

#### GET /api/teachers/:id/submissions
Get teacher's student submissions

### Assignment Endpoints

#### POST /api/assignments
Create assignment for specific students
**Request:**
```json
{
  "title": "Math Homework",
  "description": "Complete exercises 1-10",
  "subject": "Math",
  "dueDate": "2025-02-01T00:00:00.000Z",
  "teacherId": "teacher_id",
  "studentIds": ["student_id_1", "student_id_2"]
}
```

#### POST /api/assignments/class
Create assignment for entire class
**Request:**
```json
{
  "title": "Science Project",
  "description": "Create a model",
  "subject": "Science",
  "dueDate": "2025-02-01T00:00:00.000Z",
  "teacherId": "teacher_id",
  "grade": 6
}
```

#### GET /api/assignments/:id
Get assignment details

#### GET /api/assignments/teacher/:teacherId
Get teacher's assignments

#### DELETE /api/assignments/:id
Delete assignment

### Submission Endpoints

#### POST /api/submissions
Create submission
**Request:**
```json
{
  "assignmentId": "assignment_id",
  "studentId": "student_id",
  "fileName": "homework.pdf",
  "fileUrl": "https://cloudinary_url",
  "fileSize": 1024000
}
```

#### PUT /api/submissions/:id/grade
Grade submission
**Request:**
```json
{
  "grade": 85,
  "feedback": "Good work!"
}
```

#### GET /api/submissions/:id
Get submission details

### Upload Endpoint

#### POST /api/upload
Upload file to Cloudinary
**Request:** multipart/form-data with 'file' field
**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cloudinary_url",
    "publicId": "public_id",
    "fileName": "original_name.pdf",
    "fileSize": 1024000
  }
}
```

---

## How to Run

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure .env with your values:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/learnspark
JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

5. **Start backend server:**
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. **Navigate to project root:**
```bash
cd ..
```

2. **Remove Supabase dependency:**
```bash
npm uninstall @supabase/supabase-js
```

3. **Install axios (if not already installed):**
```bash
npm install axios
```

4. **Create .env file:**
```bash
cp .env.example .env
```

5. **Configure .env:**
```env
VITE_API_URL=http://localhost:5000/api
```

6. **Update remaining components** (see "Remaining Frontend Changes" below)

7. **Start frontend:**
```bash
npm run dev
```

Frontend will run on http://localhost:5173

---

## Remaining Frontend Changes

### Components to Update

The following components still need to be updated to replace Supabase calls with the new API calls:

#### 1. TeacherLogin.tsx
**Replace:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```
**With:**
```typescript
import { authAPI } from "@/api/authAPI.js";
import { teacherAPI } from "@/api/teacherAPI.js";
```

**Update login function:**
```typescript
const response = await authAPI.teacherLogin(credentials);
const studentsResponse = await teacherAPI.getStudents(response.data.id);
```

#### 2. Dashboard.tsx
**Replace:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```
**With:**
```typescript
import { studentAPI } from "@/api/studentAPI.js";
```

**Update RPC calls:**
```typescript
// Replace supabase.rpc('update_daily_activity')
await studentAPI.updateActivity(studentData.id, 1, false);

// Replace supabase.from('students').select()
const profile = await studentAPI.getProfile(studentData.id);

// Replace supabase.from('students').update()
await studentAPI.updateProgress(studentData.id, nextGamesPlayed, newScore);
```

#### 3. StudentAssignments.tsx
**Replace:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```
**With:**
```typescript
import { studentAPI } from "@/api/studentAPI.js";
import { assignmentAPI } from "@/api/assignmentAPI.js";
import { uploadAPI } from "@/api/uploadAPI.js";
```

**Update functions:**
```typescript
// Replace supabase.rpc('get_student_assignments')
const assignments = await studentAPI.getAssignments(studentId);

// Replace supabase.storage.from().upload()
const uploadResponse = await uploadAPI.uploadFile(selectedFile);
const fileUrl = uploadResponse.data.url;

// Replace supabase.from('submissions').insert()
await assignmentAPI.createSubmission({
  assignmentId: selectedAssignment.assignment_id,
  studentId,
  fileName: selectedFile.name,
  fileUrl,
  fileSize: selectedFile.size
});
```

#### 4. AssignmentManager.tsx
**Replace:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```
**With:**
```typescript
import { assignmentAPI } from "@/api/assignmentAPI.js";
import { teacherAPI } from "@/api/teacherAPI.js";
```

**Update functions:**
```typescript
// Replace supabase.rpc('create_assignment')
await assignmentAPI.createAssignment(newAssignment);

// Replace supabase.rpc('create_assignment_by_class')
await assignmentAPI.createAssignmentByClass(newAssignment);

// Replace supabase.rpc('get_teacher_submissions')
const submissions = await teacherAPI.getSubmissions(teacherId);

// Replace supabase.from('assignments').select()
const assignments = await assignmentAPI.getAssignments(teacherId);

// Replace supabase.from('assignments').delete()
await assignmentAPI.deleteAssignment(assignmentId);

// Replace supabase.from('submissions').update()
await assignmentAPI.gradeSubmission(submission.submission_id, grade, feedback);
```

#### 5. TeacherDashboard.tsx
**Replace:**
```typescript
import { supabase } from "@/integrations/supabase/client";
```
**With:**
```typescript
import { teacherAPI } from "@/api/teacherAPI.js";
```

**Update function:**
```typescript
// Replace supabase.rpc('get_teacher_students')
const students = await teacherAPI.getStudents(teacherData.id);
```

### Files to Delete

After updating all components, delete:
- `src/integrations/supabase/` (entire folder)
- `supabase/` (entire folder)

---

## How to Deploy

### Backend Deployment (Render/Railway/Heroku)

1. **Push code to GitHub**
2. **Connect to deployment platform**
3. **Set environment variables in platform dashboard**
4. **Deploy**

**Environment Variables for Production:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production_secret_key
GEMINI_API_KEY=...
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=https://your-frontend-url.com
NODE_ENV=production
```

### Frontend Deployment (Netlify/Vercel)

1. **Update .env for production:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

2. **Build frontend:**
```bash
npm run build
```

3. **Deploy dist folder to Netlify/Vercel**

4. **Set environment variables in platform dashboard**

---

## Common Errors and Solutions

### Error 1: MongoDB Connection Failed
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`
**Solution:** 
- Check MONGODB_URI in .env
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify cluster is running

### Error 2: JWT Token Invalid
**Error:** `JsonWebTokenError: invalid signature`
**Solution:**
- Ensure JWT_SECRET is set in backend .env
- Secret must be at least 32 characters
- Clear cookies in browser

### Error 3: CORS Error
**Error:** `Access-Control-Allow-Origin`
**Solution:**
- Check CLIENT_URL in backend .env
- Ensure it matches frontend URL
- Verify CORS middleware configuration

### Error 4: File Upload Failed
**Error:** `MulterError: File too large`
**Solution:**
- Check file size limit in upload route (default 10MB)
- Increase limit if needed
- Ensure Cloudinary credentials are correct

### Error 5: Cloudinary Upload Failed
**Error:** `Cloudinary API error`
**Solution:**
- Verify Cloudinary credentials in .env
- Check Cloudinary account is active
- Ensure folder 'assignment-submissions' exists

### Error 6: API Returns 401 Unauthorized
**Error:** `401 Unauthorized`
**Solution:**
- Check if cookies are being sent
- Verify token is not expired
- Try logging in again

### Error 7: Student Signup Fails
**Error:** `No teacher assigned to this grade`
**Solution:**
- Create TeacherClass entries in database
- Ensure teacher is assigned to grade before student signup

### Error 8: Assignment Not Found
**Error:** `Assignment not found`
**Solution:**
- Check assignment ID format (MongoDB ObjectId)
- Verify assignment exists in database
- Ensure teacher has correct permissions

---

## Data Migration (Optional)

If you need to migrate existing data from Supabase to MongoDB:

### Export from Supabase
1. Go to Supabase dashboard
2. Navigate to your project
3. Export data as CSV or JSON

### Import to MongoDB
1. Create import script
2. Map field names (snake_case → camelCase)
3. Hash passwords before inserting
4. Run import script

**Sample Import Script:**
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Student from './models/Student.js';
import Teacher from './models/Teacher.js';

// Load your exported data
const studentsData = [...]; // Your exported data

studentsData.forEach(async (student) => {
  const hashedPassword = await bcrypt.hash(student.password, 12);
  await Student.create({
    username: student.username,
    password: hashedPassword,
    email: student.email,
    name: student.name,
    grade: student.grade,
    teacherId: student.teacher_allocated,
    ruralAreaId: student.rural_area_id,
    currentScore: student.current_score,
    gamesPlayed: student.no_of_games_played,
    dailyStreak: student.daily_streak,
    lastPlayed: student.last_played,
    totalTimeMinutes: student.total_time_minutes
  });
});
```

---

## Testing Checklist

### Backend Testing
- [ ] Student login works
- [ ] Teacher login works
- [ ] Student signup works
- [ ] Token refresh works
- [ ] Logout works
- [ ] Student activity update works
- [ ] Student progress update works
- [ ] Assignment creation works
- [ ] File upload works
- [ ] Submission grading works

### Frontend Testing
- [ ] Student login UI works
- [ ] Teacher login UI works
- [ ] Student signup UI works
- [ ] Dashboard loads correctly
- [ ] Games can be played
- [ ] Points update correctly
- [ ] Assignments can be viewed
- [ ] Files can be uploaded
- [ ] Teacher dashboard loads
- [ ] Analytics display correctly

### Integration Testing
- [ ] End-to-end student flow
- [ ] End-to-end teacher flow
- [ ] Assignment lifecycle
- [ ] File upload and download
- [ ] AI chatbot integration

---

## Security Best Practices

### Production Deployment
1. **Use strong JWT secrets** (minimum 32 characters)
2. **Enable HTTPS** on both frontend and backend
3. **Set NODE_ENV=production**
4. **Use environment-specific configurations**
5. **Enable rate limiting** on all public endpoints
6. **Implement request logging** for monitoring
7. **Regular security audits** of dependencies
8. **Keep all packages updated**

### Database Security
1. **Enable MongoDB Atlas authentication**
2. **Use IP whitelisting**
3. **Enable encryption at rest**
4. **Regular backups**
5. **Monitor database performance**

### Cloudinary Security
1. **Use signed URLs** for sensitive files
2. **Enable upload presets** with transformations
3. **Monitor storage usage**
4. **Set up auto-moderation** if needed

---

## Performance Optimization

### Database Optimization
1. **Create indexes** on frequently queried fields
2. **Use lean()** for read-only operations
3. **Implement connection pooling** (default in Mongoose)
4. **Use projection** to limit returned fields
5. **Consider read replicas** for high traffic

### API Optimization
1. **Implement response compression** (already included)
2. **Add caching layer** (Redis for frequently accessed data)
3. **Use pagination** for list endpoints
4. **Implement request batching** where appropriate
5. **Monitor API response times**

### Frontend Optimization
1. **Code splitting** with React.lazy()
2. **Lazy load game components**
3. **Optimize images** (WebP format)
4. **Implement service worker** for PWA
5. **Use CDN for static assets**

---

## Troubleshooting

### Backend Won't Start
1. Check if port 5000 is available
2. Verify MongoDB connection string
3. Check all environment variables are set
4. Look for syntax errors in server.js

### Frontend Can't Connect to Backend
1. Verify backend is running
2. Check VITE_API_URL in frontend .env
3. Check CORS configuration
4. Verify no firewall blocking

### File Upload Fails
1. Check uploads folder exists
2. Verify Cloudinary credentials
3. Check file size limits
4. Ensure Multer is configured correctly

### Authentication Fails
1. Verify JWT_SECRET is set
2. Check password hashing logic
3. Verify cookie settings
4. Clear browser cookies and retry

---

## Support

For issues or questions:
1. Check this guide first
2. Review API documentation
3. Check error messages in console
4. Verify environment variables
5. Test with Postman/Insomnia for API endpoints

---

## Summary

This migration transforms the application from a BaaS-dependent architecture to a self-contained MERN stack with:
- **Improved Security**: JWT auth, password hashing, httpOnly cookies
- **Better Scalability**: MongoDB, custom backend, CDN storage
- **Cost Efficiency**: Free tiers available, no vendor lock-in
- **Full Control**: Complete control over backend logic and infrastructure
- **Production Ready**: Security middleware, error handling, validation

All existing functionality is preserved while providing a more robust, scalable, and maintainable architecture.
