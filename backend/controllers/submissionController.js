import Submission from '../models/Submission.js';
import Student from '../models/Student.js';

// Create Submission
export const createSubmission = async (req, res) => {
  try {
    const { assignmentId, studentId, fileName, fileUrl, fileSize } = req.body;
    
    const submission = await Submission.create({
      assignmentId,
      studentId,
      fileName,
      fileUrl,
      fileSize,
      status: 'submitted'
    });
    
    res.status(201).json({
      success: true,
      data: submission
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Grade Submission
export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, feedback } = req.body;
    
    const submission = await Submission.findByIdAndUpdate(
      id,
      {
        grade,
        feedback,
        status: 'graded'
      },
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    // Award points to student based on grade
    const student = await Student.findById(submission.studentId);
    if (student) {
      student.currentScore += grade;
      await student.save();
    }
    
    res.json({
      success: true,
      data: submission
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Submission
export const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('assignmentId')
      .populate('studentId');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.json({
      success: true,
      data: submission
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
