import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

import authRoutes from '../routes/auth.js';
import studentRoutes from '../routes/students.js';
import teacherRoutes from '../routes/teachers.js';
import assignmentRoutes from '../routes/assignments.js';
import submissionRoutes from '../routes/submissions.js';
import uploadRoutes from '../routes/upload.js';
import chatRoutes from '../routes/chat.js';
import { printRegisteredRoutes } from '../utils/routeLogger.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(mongoSanitize());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
app.get('/api/health', (req, res) => res.json({ success: true }));

printRegisteredRoutes(app);
