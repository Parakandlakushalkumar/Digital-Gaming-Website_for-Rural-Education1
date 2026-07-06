import express from 'express';
import {
  createSubmission,
  gradeSubmission,
  getSubmission
} from '../controllers/submissionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createSubmission);
router.put('/:id/grade', auth, gradeSubmission);
router.get('/:id', getSubmission);

export default router;
