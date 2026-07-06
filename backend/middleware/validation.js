import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  next();
};

export const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

export const studentSignupValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('grade')
    .isInt({ min: 6, max: 12 })
    .withMessage('Grade must be between 6 and 12'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validateRequest
];

export const assignmentValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('dueDate')
    .isISO8601()
    .withMessage('Valid due date is required'),
  validateRequest
];
