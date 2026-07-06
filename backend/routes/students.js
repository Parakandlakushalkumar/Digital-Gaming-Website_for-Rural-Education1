import express from 'express';
import {
  getStudentProfile,
  updateStudentProfile,
  updateDailyActivity,
  updateStudentProgress,
  getStudentAssignments
} from '../controllers/studentController.js';
import { auth } from '../middleware/auth.js';
import { requireSelf } from '../middleware/ownership.js';

const router = express.Router();

router.get('/:id', getStudentProfile);
router.put('/:id', auth, requireSelf, updateStudentProfile);
router.put('/:id/activity', auth, requireSelf, updateDailyActivity);
router.put('/:id/progress', auth, requireSelf, updateStudentProgress);
router.get('/:id/assignments', auth, requireSelf, getStudentAssignments);

export default router;
