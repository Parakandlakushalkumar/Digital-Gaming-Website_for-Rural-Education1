e# MIGRATION PLAN: Supabase to MERN Stack

## PHASE 1: ANALYSIS COMPLETE

### Supabase Dependencies Identified

#### 1. Package Dependencies
- `@supabase/supabase-js: ^2.57.2` - TO BE REMOVED

#### 2. Files Using Supabase
- `src/integrations/supabase/client.ts` - Supabase client initialization
- `src/integrations/supabase/types.ts` - TypeScript types (empty)
- `src/components/Dashboard.tsx` - RPC calls, table operations
- `src/components/student/StudentLogin.tsx` - RPC calls (student_login, student_signup)
- `src/components/student/StudentAssignments.tsx` - RPC calls, storage operations
- `src/components/teacher/TeacherLogin.tsx` - RPC calls (teacher_login, get_teacher_students)
- `src/components/teacher/TeacherDashboard.tsx` - RPC calls (get_teacher_students)
- `src/components/teacher/AssignmentManager.tsx` - RPC calls, table operations

#### 3. RPC Functions to Migrate
| RPC Function | Purpose | Replacement |
|--------------|---------|-------------|
| `student_login` | Student authentication | POST /api/auth/student/login |
| `teacher_login` | Teacher authentication | POST /api/auth/teacher/login |
| `student_signup` | Student registration | POST /api/auth/student/signup |
| `get_teacher_students` | Get teacher's students | GET /api/teachers/:id/students |
| `update_daily_activity` | Update time tracking | PUT /api/students/:id/activity |
| `update_student_progress` | Update game progress | PUT /api/students/:id/progress |
| `create_assignment` | Create assignment for students | POST /api/assignments |
| `create_assignment_by_class` | Create assignment for class | POST /api/assignments/class |
| `get_student_assignments` | Get student's assignments | GET /api/students/:id/assignments |
| `get_teacher_submissions` | Get teacher's submissions | GET /api/teachers/:id/submissions |

#### 4. Direct Table Operations to Migrate
| Table | Operation | File | Replacement |
|-------|-----------|------|-------------|
| `students` | SELECT, UPDATE | Dashboard.tsx | GET/PUT /api/students/:id |
| `assignments` | SELECT, DELETE | AssignmentManager.tsx | GET/DELETE /api/assignments |
| `submissions` | INSERT, UPDATE | AssignmentManager.tsx, StudentAssignments.tsx | POST/PUT /api/submissions |

#### 5. Storage Operations to Migrate
| Operation | File | Replacement |
|----------|------|-------------|
| Upload file | StudentAssignments.tsx | POST /api/upload (Multer + Cloudinary) |
| Get public URL | StudentAssignments.tsx | Cloudinary URL returned from upload |

#### 6. Database Schema to Migrate

**PostgreSQL Tables → MongoDB Collections**

| PostgreSQL Table | MongoDB Collection | Key Fields |
|------------------|-------------------|------------|
| `teachers` | `teachers` | id, username, password, name, email, rural_area_id |
| `students` | `students` | id, username, password, email, grade, teacher_allocated, current_score, daily_streak, total_time_minutes |
| `teacher_classes` | `teacher_classes` | id, teacher_id, grade |
| `assignments` | `assignments` | id, title, description, subject, due_date, teacher_id, grade |
| `assignment_students` | `assignment_students` | id, assignment_id, student_id |
| `submissions` | `submissions` | id, assignment_id, student_id, file_name, file_url, file_size, status, grade, feedback |

#### 7. Environment Variables to Replace
| Supabase Variable | MERN Variable |
|-------------------|---------------|
| `VITE_SUPABASE_URL` | `VITE_API_URL` (frontend) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | (Removed) |
| `VITE_SUPABASE_PROJECT_ID` | (Removed) |
| (New) | `PORT` (backend) |
| (New) | `MONGODB_URI` (backend) |
| (New) | `JWT_SECRET` (backend) |
| (New) | `GEMINI_API_KEY` (backend) |
| (New) | `CLOUDINARY_NAME` (backend) |
| (New) | `CLOUDINARY_API_KEY` (backend) |
| (New) | `CLOUDINARY_API_SECRET` (backend) |
| (New) | `CLIENT_URL` (backend) |

---

## PHASE 2: MERN ARCHITECTURE DESIGN

### Backend Structure
```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   ├── cloudinary.js      # Cloudinary config
│   └── jwt.js             # JWT configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── studentController.js
│   ├── teacherController.js
│   ├── assignmentController.js
│   ├── submissionController.js
│   └── uploadController.js
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── error.js           # Error handling
│   ├── validation.js      # Input validation
│   └── role.js            # Role-based access
├── models/
│   ├── User.js            # Base user model
│   ├── Student.js
│   ├── Teacher.js
│   ├── Assignment.js
│   ├── Submission.js
│   └── TeacherClass.js
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── students.js
│   ├── teachers.js
│   ├── assignments.js
│   ├── submissions.js
│   └── upload.js
├── services/
│   ├── geminiService.js   # Gemini API integration
│   └── emailService.js    # (Optional) Email notifications
├── utils/
│   ├── errorHandler.js
│   ├── asyncHandler.js
│   └── streakCalculator.js
├── uploads/               # Temporary upload folder
├── server.js              # Express server entry
├── .env                   # Backend environment variables
└── package.json           # Backend dependencies
```

### Frontend Structure Changes
```
src/
├── api/                   # NEW: API client layer
│   ├── axiosConfig.js     # Axios instance with interceptors
│   ├── authAPI.js         # Authentication API calls
│   ├── studentAPI.js      # Student API calls
│   ├── teacherAPI.js      # Teacher API calls
│   └── assignmentAPI.js   # Assignment API calls
├── services/              # MODIFIED
│   ├── geminiChatApi.ts   # Keep (move API key to backend)
│   └── aiService.ts       # Keep
├── integrations/          # DELETE: Supabase folder
├── components/            # MODIFIED: Replace supabase calls with API calls
└── .env                   # NEW: Frontend environment variables
```

---

## PHASE 3: DATABASE MIGRATION STRATEGY

### MongoDB Schema Design

#### 1. Student Model
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  password: String (hashed, required),
  email: String (unique, required),
  name: String (required),
  grade: Number (6-12, required),
  teacherId: ObjectId (ref: 'Teacher'),
  ruralAreaId: String (required),
  currentScore: Number (default: 0),
  gamesPlayed: Number (default: 0),
  dailyStreak: Number (default: 0),
  lastPlayed: Date,
  totalTimeMinutes: Number (default: 0),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 2. Teacher Model
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  password: String (hashed, required),
  email: String (unique, required),
  name: String (required),
  ruralAreaId: String (required),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 3. TeacherClass Model
```javascript
{
  _id: ObjectId,
  teacherId: ObjectId (ref: 'Teacher', required),
  grade: Number (1-12, required),
  createdAt: Date (default: Date.now)
}
```

#### 4. Assignment Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  subject: String (required),
  dueDate: Date (required),
  teacherId: ObjectId (ref: 'Teacher', required),
  grade: Number (optional, for class assignments),
  assignedStudents: [ObjectId] (ref: 'Student'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

#### 5. Submission Model
```javascript
{
  _id: ObjectId,
  assignmentId: ObjectId (ref: 'Assignment', required),
  studentId: ObjectId (ref: 'Student', required),
  fileName: String (required),
  fileUrl: String (required),
  fileSize: Number,
  submittedAt: Date (default: Date.now),
  status: String (enum: ['submitted', 'graded', 'returned'], default: 'submitted'),
  grade: Number (min: 0, max: 100),
  feedback: String,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### Indexes to Create
- Students: username (unique), email (unique), teacherId
- Teachers: username (unique), email (unique)
- Assignments: teacherId, grade
- Submissions: assignmentId, studentId, status
- TeacherClasses: teacherId, grade (unique composite)

---

## PHASE 4: AUTHENTICATION MIGRATION

### Current Supabase Auth → JWT Auth

**Current Flow:**
1. User enters credentials
2. Call RPC function (student_login/teacher_login)
3. Validate against database
4. Return user data
5. Store in localStorage

**New Flow:**
1. User enters credentials
2. POST to /api/auth/student/login or /api/auth/teacher/login
3. Validate credentials
4. Generate JWT access token + refresh token
5. Return tokens + user data
6. Store access token in httpOnly cookie
7. Store refresh token in httpOnly cookie
8. Store user data in localStorage (for UI)

### JWT Implementation
- Access token expiry: 15 minutes
- Refresh token expiry: 7 days
- Token payload: { userId, role, username }
- Secret stored in backend .env

### Password Hashing
- Use bcrypt with salt rounds: 12
- Hash passwords before storing in database
- Compare hashes during login

---

## PHASE 5: FILE STORAGE MIGRATION

### Current Supabase Storage → Cloudinary

**Current Flow:**
1. User selects file
2. Upload to Supabase Storage bucket
3. Get public URL
4. Store URL in database

**New Flow:**
1. User selects file
2. POST to /api/upload with file
3. Multer handles multipart form data
4. Upload to Cloudinary
5. Return Cloudinary URL
6. Store URL in database

### Cloudinary Configuration
- Folder: assignment-submissions
- Allowed formats: pdf, doc, docx, txt, jpg, jpeg, png
- Max file size: 10MB
- Transformation: Auto-optimization

---

## PHASE 6: API ENDPOINTS DESIGN

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/student/login | Student login |
| POST | /api/auth/teacher/login | Teacher login |
| POST | /api/auth/student/signup | Student registration |
| POST | /api/auth/refresh | Refresh access token |
| POST | /api/auth/logout | Logout (clear cookies) |

### Student Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students/:id | Get student profile |
| PUT | /api/students/:id | Update student profile |
| PUT | /api/students/:id/activity | Update daily activity |
| PUT | /api/students/:id/progress | Update game progress |
| GET | /api/students/:id/assignments | Get student's assignments |

### Teacher Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/teachers/:id | Get teacher profile |
| GET | /api/teachers/:id/students | Get teacher's students |
| GET | /api/teachers/:id/submissions | Get teacher's submissions |

### Assignment Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignments | Create assignment (specific students) |
| POST | /api/assignments/class | Create assignment (entire class) |
| GET | /api/assignments/:id | Get assignment details |
| DELETE | /api/assignments/:id | Delete assignment |
| GET | /api/assignments/teacher/:teacherId | Get teacher's assignments |

### Submission Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/submissions | Create submission |
| PUT | /api/submissions/:id/grade | Grade submission |
| GET | /api/submissions/:id | Get submission details |

### Upload Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/upload | Upload file to Cloudinary |

---

## PHASE 7: GEMINI API MIGRATION

### Current Implementation
- API key hardcoded in `src/services/geminiChatApi.ts`
- Called directly from frontend

### New Implementation
- Move API key to backend .env
- Create proxy endpoint: POST /api/gemini/chat
- Frontend calls backend endpoint
- Backend calls Gemini API
- Returns response to frontend

**Benefits:**
- API key not exposed in client code
- Rate limiting can be implemented
- Request logging
- Cost control

---

## PHASE 8: FRONTEND MIGRATION

### Files to Modify

1. **Remove Supabase imports**
   - Remove `import { supabase } from "@/integrations/supabase/client"` from all files

2. **Create API client layer**
   - `src/api/axiosConfig.js` - Axios instance with base URL, interceptors
   - `src/api/authAPI.js` - Auth API calls
   - `src/api/studentAPI.js` - Student API calls
   - `src/api/teacherAPI.js` - Teacher API calls
   - `src/api/assignmentAPI.js` - Assignment API calls

3. **Replace Supabase calls with API calls**

**StudentLogin.tsx:**
- Replace `supabase.rpc('student_login')` with `authAPI.studentLogin()`
- Replace `supabase.rpc('student_signup')` with `authAPI.studentSignup()`

**TeacherLogin.tsx:**
- Replace `supabase.rpc('teacher_login')` with `authAPI.teacherLogin()`
- Replace `supabase.rpc('get_teacher_students')` with `teacherAPI.getStudents()`

**Dashboard.tsx:**
- Replace `supabase.rpc('update_daily_activity')` with `studentAPI.updateActivity()`
- Replace `supabase.from('students').select()` with `studentAPI.getProfile()`
- Replace `supabase.from('students').update()` with `studentAPI.updateProgress()`

**StudentAssignments.tsx:**
- Replace `supabase.rpc('get_student_assignments')` with `studentAPI.getAssignments()`
- Replace `supabase.storage.from().upload()` with `uploadAPI.uploadFile()`
- Replace `supabase.storage.from().getPublicUrl()` with URL from upload response
- Replace `supabase.from('submissions').insert()` with `assignmentAPI.createSubmission()`

**AssignmentManager.tsx:**
- Replace `supabase.rpc('create_assignment')` with `assignmentAPI.createAssignment()`
- Replace `supabase.rpc('create_assignment_by_class')` with `assignmentAPI.createAssignmentByClass()`
- Replace `supabase.rpc('get_teacher_submissions')` with `teacherAPI.getSubmissions()`
- Replace `supabase.from('assignments').select()` with `assignmentAPI.getAssignments()`
- Replace `supabase.from('assignments').delete()` with `assignmentAPI.deleteAssignment()`
- Replace `supabase.from('submissions').update()` with `assignmentAPI.gradeSubmission()`

**TeacherDashboard.tsx:**
- Replace `supabase.rpc('get_teacher_students')` with `teacherAPI.getStudents()`

4. **Update authentication flow**
- Store JWT tokens in httpOnly cookies
- Add token to axios headers
- Handle 401 responses (refresh token or logout)

---

## PHASE 9: ENVIRONMENT VARIABLES

### Backend .env.example
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnspark
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
GEMINI_API_KEY=your_gemini_api_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend .env.example
```env
VITE_API_URL=http://localhost:5000/api
```

---

## PHASE 10: FILE CLEANUP

### Files to Delete
- `src/integrations/supabase/` (entire folder)
- `supabase/` (entire folder)
- Any other Supabase-related files

### Packages to Remove
- `@supabase/supabase-js`

### Packages to Add (Backend)
- `express`
- `mongoose`
- `dotenv`
- `cors`
- `bcrypt`
- `jsonwebtoken`
- `multer`
- `cloudinary`
- `multer-storage-cloudinary`
- `cookie-parser`
- `express-validator`
- `morgan`
- `helmet`
- `compression`

### Packages to Add (Frontend)
- `axios` (already installed, will use)

---

## PHASE 11: INSTALLATION COMMANDS

### Backend Installation
```bash
cd backend
npm init -y
npm install express mongoose dotenv cors bcrypt jsonwebtoken multer cloudinary multer-storage-cloudinary cookie-parser express-validator morgan helmet compression
npm install --save-dev nodemon
```

### Frontend Installation
```bash
npm uninstall @supabase/supabase-js
npm install axios
```

---

## PHASE 12: PROJECT STRUCTURE

### Final Structure
```
Digital-Gaming-Website_for-Rural-Education1-main/
├── backend/                    # NEW: Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
├── client/                     # RENAMED FROM src
│   ├── api/                    # NEW: API client layer
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── .env
│   └── package.json
├── public/                     # Unchanged
├── .gitignore                  # Updated
├── MIGRATION_GUIDE.md          # NEW
└── README.md                   # Updated
```

---

## PHASE 13: SECURITY IMPLEMENTATION

### Security Measures
1. **Helmet** - HTTP security headers
2. **CORS** - Cross-origin resource sharing configuration
3. **Rate Limiting** - Express-rate-limit for API endpoints
4. **Input Validation** - express-validator for all inputs
5. **Password Hashing** - bcrypt with salt rounds: 12
6. **JWT** - Secure token-based authentication
7. **Environment Variables** - All secrets in .env files
8. **Input Sanitization** - Sanitize user inputs
9. **SQL Injection Prevention** - MongoDB parameterized queries
10. **XSS Prevention** - Sanitize HTML inputs

---

## PHASE 14: PERFORMANCE OPTIMIZATION

### Database Optimization
1. **Indexes** - Create indexes on frequently queried fields
2. **Query Optimization** - Use lean() for read operations
3. **Connection Pooling** - Mongoose connection pool
4. **Caching** - Implement Redis caching for frequently accessed data

### API Optimization
1. **Response Compression** - compression middleware
2. **Lazy Loading** - Implement for large datasets
3. **Pagination** - Add pagination to list endpoints
4. **Response Time Optimization** - Optimize database queries

### Frontend Optimization
1. **Code Splitting** - React.lazy() for routes
2. **Lazy Loading** - Lazy load game components
3. **Bundle Optimization** - Vite build optimization
4. **Image Optimization** - Use WebP format

---

## PHASE 15: DOCUMENTATION

### MIGRATION_GUIDE.md Sections
1. Overview of migration
2. What was changed
3. Why it was changed
4. Supabase → MongoDB mapping
5. Folder structure
6. API documentation
7. How to run (backend + frontend)
8. How to deploy
9. Common errors and solutions
10. Troubleshooting guide

---

## PHASE 16: VERIFICATION CHECKLIST

### Pre-Migration
- [ ] Backup current code
- [ ] Document current functionality
- [ ] Test all current features
- [ ] Export database data (if needed)

### Post-Migration
- [ ] No Supabase imports remain
- [ ] No broken pages
- [ ] No broken authentication
- [ ] No broken routing
- [ ] No broken database operations
- [ ] All API endpoints working
- [ ] File uploads working
- [ ] AI chatbot working
- [ ] Teacher dashboard working
- [ ] Student dashboard working
- [ ] Assignment system working
- [ ] Analytics working
- [ ] Application compiles successfully
- [ ] Environment variables configured
- [ ] MongoDB connected
- [ ] Cloudinary configured

---

## EXECUTION ORDER

1. Create backend structure
2. Create MongoDB models
3. Create Express server
4. Implement authentication (JWT)
5. Create API endpoints
6. Implement file upload (Cloudinary)
7. Create API client layer in frontend
8. Replace Supabase calls in frontend
9. Update environment variables
10. Remove Supabase files and dependencies
11. Test all functionality
12. Create documentation
13. Deploy and verify

---

## RISK MITIGATION

### Potential Issues
1. **Data Loss** - Export data before migration
2. **Breaking Changes** - Test thoroughly before deploying
3. **API Compatibility** - Ensure all endpoints match expected responses
4. **Authentication Issues** - Test login/logout flows thoroughly
5. **File Upload Issues** - Test file upload with various file types
6. **Performance Issues** - Monitor database query performance

### Rollback Plan
1. Keep Git branch with original code
2. Document rollback steps
3. Test rollback procedure
4. Have backup of database

---

## SUCCESS CRITERIA

- All existing functionality preserved
- No data loss
- Improved security (password hashing, JWT)
- Scalable architecture (MongoDB)
- Production-ready code
- Comprehensive documentation
- All tests passing
- Application deployed successfully
