import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import fs from 'fs';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/error.js';
import { printRegisteredRoutes } from './utils/routeLogger.js';

// Routes
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import assignmentRoutes from './routes/assignments.js';
import submissionRoutes from './routes/submissions.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ----------------------------- DATABASE ----------------------------- */

connectDB();

/* --------------------------- CORS CONFIG ---------------------------- */

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:8080',
].filter(Boolean);

/* ---------------------------- MIDDLEWARE ---------------------------- */

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/mobile apps/no-origin requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(`❌ CORS blocked: ${origin}`);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(compression());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

app.use(mongoSanitize());

/* -------------------------- RATE LIMITERS --------------------------- */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication requests.',
  },
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many chat requests.',
  },
});

app.use('/api/auth', authLimiter);
app.use('/api/chat', chatLimiter);

/* -------------------------- STATIC FILES ---------------------------- */

if (fs.existsSync('uploads')) {
  app.use('/uploads', express.static('uploads'));
}

/* ---------------------------- ROOT ROUTES --------------------------- */

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    project: 'LearnSpark AI',
    message: '🚀 Backend is running successfully',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LearnSpark AI REST API',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/ready', (req, res) => {
  res.status(200).json({
    success: true,
    ready: true,
  });
});

/* ----------------------------- ROUTES ------------------------------- */

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

/* ------------------------- ERROR HANDLING --------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ---------------------------- START APP ----------------------------- */

const server = app.listen(PORT, () => {
  console.log('\n======================================');
  console.log('🚀 LearnSpark AI Backend Started');
  console.log('======================================');
  console.log(`Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`Port        : ${PORT}`);
  console.log(`Health URL  : http://localhost:${PORT}/api/health`);
  console.log(`API Root    : http://localhost:${PORT}/api`);
  console.log('======================================\n');

  console.log(`CORS Allowed Origins:\n${allowedOrigins.join('\n')}\n`);

  printRegisteredRoutes(app);
});

/* -------------------------- SERVER ERRORS --------------------------- */

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error('Close the existing backend or change the PORT.\n');
    process.exit(1);
  }

  console.error(err);
});

/* ---------------------- GRACEFUL SHUTDOWN --------------------------- */

const shutdown = () => {
  console.log('\n🛑 Shutting down LearnSpark AI Backend...');

  server.close(() => {
    console.log('✅ HTTP Server Closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);