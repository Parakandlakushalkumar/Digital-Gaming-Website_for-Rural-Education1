# Gamified Learning Platform for Rural Education

## Project Summary

LearnSpark is a gamified STEM learning platform for rural school students. It provides student login and signup, grade-wise learning, educational games, assignments, submissions, teacher dashboards, reports, analytics, progress tracking, and a Gemini-powered STEM chatbot.

The project was originally built as a React + TypeScript frontend with Supabase for database, authentication, storage, SQL functions, and policies. It has now been migrated toward a MERN stack architecture.

## Current Architecture

### Frontend

- React 18
- TypeScript
- Vite
- Axios
- React Router
- Tailwind CSS and shadcn/ui components
- Static curriculum/game content in `src/data` and `src/components/games`

### Backend

- Node.js
- Express.js
- MongoDB Atlas through Mongoose
- JWT authentication with HTTP-only cookies
- bcrypt password hashing
- Cloudinary file upload support
- Gemini API proxy route

### Deployment Targets

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- File storage: Cloudinary

## Migration Changes Completed

- Added Express backend under `backend/`.
- Added MongoDB models for students, teachers, teacher classes, assignments, and submissions.
- Added JWT login/signup/logout/refresh flow.
- Added student and teacher REST APIs.
- Added assignment and submission REST APIs.
- Added Cloudinary upload endpoint.
- Added Gemini chatbot backend proxy route so the API key is no longer exposed in frontend code.
- Replaced frontend Supabase usage in:
  - `src/components/Dashboard.tsx`
  - `src/components/student/StudentAssignments.tsx`
  - `src/components/teacher/TeacherLogin.tsx`
  - `src/components/teacher/TeacherDashboard.tsx`
  - `src/components/teacher/AssignmentManager.tsx`
- Removed the Supabase client and migration files from source.
- Removed `@supabase/supabase-js` from package metadata.
- Added `backend/scripts/seed.js`.
- Added `vercel.json` and `backend/render.yaml`.
- Updated `.env.example`, `backend/.env.example`, and `.gitignore`.

## Important Files Added or Updated

- `backend/server.js`: Express app entry point.
- `backend/config/db.js`: MongoDB connection.
- `backend/config/jwt.js`: JWT helpers.
- `backend/config/cloudinary.js`: Cloudinary config.
- `backend/controllers/*`: API controller logic.
- `backend/routes/*`: REST route declarations.
- `backend/models/*`: Mongoose schemas.
- `backend/services/geminiService.js`: Gemini API integration.
- `backend/scripts/seed.js`: MongoDB seed script.
- `src/api/*`: Axios API layer.
- `src/services/geminiChatApi.ts`: frontend chatbot client for backend API.
- `vercel.json`: frontend deployment config.
- `backend/render.yaml`: backend deployment blueprint.

## Environment Configuration

Create `backend/.env` locally:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=replace_with_random_secret_minimum_32_characters
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create or update frontend `.env` locally:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit real `.env` files.

## API Documentation

### Auth

- `POST /api/auth/student/login`
- `POST /api/auth/student/signup`
- `POST /api/auth/teacher/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Students

- `GET /api/students/:id`
- `PUT /api/students/:id`
- `PUT /api/students/:id/activity`
- `PUT /api/students/:id/progress`
- `GET /api/students/:id/assignments`

### Teachers

- `GET /api/teachers/:id`
- `GET /api/teachers/:id/students`
- `GET /api/teachers/:id/submissions`

### Assignments

- `POST /api/assignments`
- `POST /api/assignments/class`
- `GET /api/assignments/teacher/:teacherId`
- `GET /api/assignments/:id`
- `DELETE /api/assignments/:id`

### Submissions

- `POST /api/submissions`
- `PUT /api/submissions/:id/grade`
- `GET /api/submissions/:id`

### Uploads

- `POST /api/upload`

### Chatbot

- `POST /api/chat/ask`

## MongoDB Schema Summary

- `Teacher`: username, password, email, name, ruralAreaId.
- `Student`: username, password, email, name, grade, teacherId, ruralAreaId, currentScore, gamesPlayed, dailyStreak, lastPlayed, totalTimeMinutes.
- `TeacherClass`: teacherId and grade mapping.
- `Assignment`: title, description, subject, dueDate, teacherId, grade, assignedStudents.
- `Submission`: assignmentId, studentId, fileName, fileUrl, fileSize, submittedAt, status, grade, feedback.

## Authentication Flow

1. Student or teacher posts username/password to the backend.
2. Backend verifies password using bcrypt.
3. Backend creates access and refresh JWTs.
4. Tokens are stored in HTTP-only cookies.
5. Axios sends cookies with API requests using `withCredentials`.
6. Protected backend routes verify `accessToken`.

## Seed Script

Run from `backend/`:

```bash
npm run seed
```

The seed script clears existing teachers, students, teacher classes, assignments, and submissions, then creates sample records.

Sample logins:

- Teacher: `teacher_math` / `Teacher@123`
- Teacher: `teacher_science` / `Teacher@123`
- Student: `student6` / `Student@123`
- Student: `student7` through `student10` / `Student@123`

Seeded data includes 2 teachers, 5 students, 3 assignments, and 2 submissions with varied progress stats.

## Local Development

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
npm run dev
```

Frontend defaults to `http://localhost:5173`.
Backend defaults to `http://localhost:5000`.

## Deployment

### Vercel

Use `vercel.json`.

Set:

- `VITE_API_URL=https://your-render-backend.onrender.com/api`

### Render

Use `backend/render.yaml` or create a Web Service manually.

Set:

- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `CLOUDINARY_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`
- `CLIENT_URL=https://your-vercel-app.vercel.app`
- `NODE_ENV=production`

## Supabase Removal Summary

Removed:

- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/` directory (migrations and temp metadata)
- Supabase SQL migrations
- `@supabase/supabase-js` package metadata
- Legacy `VITE_SUPABASE_*` environment variables

Validation search found no remaining Supabase references in active source/package/env files.

## Validation Notes

### Stabilization Pass (Latest)

Completed:

- Frontend TypeScript validation: `npx tsc --noEmit` passes with zero errors.
- Frontend production build: `npm run build` succeeds.
- Backend unit tests: `npm test` passes (formatter/security response tests).
- Removed obsolete `supabase/` directory and legacy Supabase env vars from root `.env`.
- Fixed teacher dashboard analytics field mismatch (`gamesPlayed` / `currentScore` vs legacy snake_case).
- Fixed teacher CSV export crash (removed nonexistent nested `progress` object).
- Added `src/lib/studentStats.ts` for consistent student metric normalization.
- Added `src/hooks/useAuthSession.ts` for session refresh validation and server logout.
- Wired `authAPI.logout()` on student/teacher logout.
- Fixed 401 redirect to role-aware paths (`/teacher` vs `/student`).
- Added loading state while restoring sessions on portal mount.
- Backend: password fields use `select: false`; API responses use `formatStudent` / `formatTeacher`.
- Backend: ownership middleware on student, teacher, and assignment routes.
- Backend: rate limiting on auth and chat routes.
- Backend: MongoDB query sanitization via `express-mongo-sanitize`.
- Enhanced seed script with varied student stats, 3 assignments, and 2 sample submissions.
- Added `backend/scripts/smokeTest.js` for live API smoke checks.

Improved:

- `WeeklyTrends` now derives summary stats from real student roster data instead of hardcoded totals.
- `IndividualReports` shows empty state when no students exist.
- `ClassAnalytics` avoids division-by-zero on missed-topics bars.

Known limitations (by design):

- Games, stories, subjects, and topics remain frontend-static (React components + `src/data/`).
- Leaderboard, notifications, achievements, badges, and chat history have no dedicated MongoDB collections yet.
- Progress is tracked on the `Student` document (`gamesPlayed`, `currentScore`, `dailyStreak`, `totalTimeMinutes`).
- Weekly trend charts use roster-derived estimates, not historical time-series data.

### Local setup required before runtime verification

1. Create `backend/.env` from `backend/.env.example` with your MongoDB Atlas URI and secrets.
2. Run `cd backend && npm run seed`.
3. Run `cd backend && npm run dev` and `npm run dev` (frontend) in separate terminals.
4. Optional live check: `cd backend && npm run smoke` (requires seeded DB + running server).

Previous validation (superseded):

- Backend syntax checks passed for core backend files.
- Supabase references removed from active source and package metadata.
- Frontend Supabase calls replaced with Axios API calls.
