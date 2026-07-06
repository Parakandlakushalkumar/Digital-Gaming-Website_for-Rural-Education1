import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import { formatStudent, formatTeacher } from '../utils/formatters.js';

// Get Teacher Profile
export const getTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
    
    res.json({
      success: true,
      data: formatTeacher(teacher)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Teacher's Students
export const getTeacherStudents = async (req, res) => {
  try {
    const { id } = req.params;
    
    const students = await Student.find({ teacherId: id });
    
    res.json({
      success: true,
      data: students.map(formatStudent)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Teacher's Submissions
export const getTeacherSubmissions = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Assignment = (await import('../models/Assignment.js')).default;
    const Submission = (await import('../models/Submission.js')).default;
    const Student = (await import('../models/Student.js')).default;
    
    // Get all assignments by this teacher
    const assignments = await Assignment.find({ teacherId: id });
    const assignmentIds = assignments.map(a => a._id);
    
    // Get all submissions for these assignments
    const submissions = await Submission.find({
      assignmentId: { $in: assignmentIds }
    }).populate('assignmentId').populate('studentId');
    
    const submissionsData = submissions.map(submission => ({
      submission_id: submission._id,
      assignment_title: submission.assignmentId?.title || 'Unknown',
      student_name: submission.studentId?.name || 'Unknown',
      student_username: submission.studentId?.username || 'Unknown',
      file_name: submission.fileName,
      file_url: submission.fileUrl,
      submitted_at: submission.submittedAt,
      status: submission.status,
      grade: submission.grade,
      feedback: submission.feedback
    }));
    
    res.json({
      success: true,
      data: submissionsData
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
