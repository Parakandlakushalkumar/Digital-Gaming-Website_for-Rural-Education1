import Assignment from '../models/Assignment.js';
import Student from '../models/Student.js';

// Create Assignment (for specific students)
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, teacherId, studentIds } = req.body;
    
    const assignment = await Assignment.create({
      title,
      description,
      subject,
      dueDate: new Date(dueDate),
      teacherId,
      assignedStudents: studentIds
    });
    
    res.status(201).json({
      success: true,
      data: {
        id: assignment._id,
        ...assignment.toObject()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create Assignment by Class (for entire grade)
export const createAssignmentByClass = async (req, res) => {
  try {
    const { title, description, subject, dueDate, teacherId, grade } = req.body;
    
    // Find all students of this grade under this teacher
    const students = await Student.find({ teacherId, grade });
    const studentIds = students.map(s => s._id);
    
    const assignment = await Assignment.create({
      title,
      description,
      subject,
      dueDate: new Date(dueDate),
      teacherId,
      grade,
      assignedStudents: studentIds
    });
    
    res.status(201).json({
      success: true,
      data: {
        id: assignment._id,
        ...assignment.toObject()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Assignment
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    res.json({
      success: true,
      data: assignment
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Teacher's Assignments
export const getTeacherAssignments = async (req, res) => {
  try {
    const { teacherId } = req.params;
    
    const assignments = await Assignment.find({ teacherId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: assignments.map((assignment) => ({
        id: assignment._id,
        title: assignment.title,
        subject: assignment.subject,
        description: assignment.description,
        due_date: assignment.dueDate,
        teacher_id: assignment.teacherId,
        grade: assignment.grade,
        assigned_students: assignment.assignedStudents,
        created_at: assignment.createdAt,
        updated_at: assignment.updatedAt,
      }))
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    // Delete associated submissions
    const Submission = (await import('../models/Submission.js')).default;
    await Submission.deleteMany({ assignmentId: req.params.id });
    
    res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
