import express from 'express';
import {
  getTeacherProfile,
  getTeacherStudents,
  getTeacherSubmissions
} from '../controllers/teacherController.js';
import { auth } from '../middleware/auth.js';
import { requireTeacherSelf } from '../middleware/ownership.js';

const router = express.Router();

router.get('/:id', getTeacherProfile);
router.get('/:id/students', auth, requireTeacherSelf, getTeacherStudents);
router.get('/:id/submissions', auth, requireTeacherSelf, getTeacherSubmissions);

export default router;
