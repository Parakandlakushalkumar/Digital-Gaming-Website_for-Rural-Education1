import express from 'express';
import {
  createAssignment,
  createAssignmentByClass,
  getAssignment,
  getTeacherAssignments,
  deleteAssignment
} from '../controllers/assignmentController.js';
import { auth } from '../middleware/auth.js';
import { assignmentValidation } from '../middleware/validation.js';
import { requireTeacherOwnership } from '../middleware/ownership.js';

const router = express.Router();

router.get('/teacher/:teacherId', getTeacherAssignments);
router.post('/', auth, requireTeacherOwnership, assignmentValidation, createAssignment);
router.post('/class', auth, requireTeacherOwnership, assignmentValidation, createAssignmentByClass);
router.get('/:id', getAssignment);
router.delete('/:id', auth, deleteAssignment);

export default router;
