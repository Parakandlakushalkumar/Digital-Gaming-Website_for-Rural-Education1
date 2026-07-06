import express from 'express';
import {
  studentLogin,
  teacherLogin,
  studentSignup,
  refreshToken,
  logout
} from '../controllers/authController.js';
import { loginValidation, studentSignupValidation } from '../middleware/validation.js';

const router = express.Router();

// Student routes
router.post('/student/login', loginValidation, studentLogin);
router.post('/student/signup', studentSignupValidation, studentSignup);

// Teacher routes
router.post('/teacher/login', loginValidation, teacherLogin);

// Common routes
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
