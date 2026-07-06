import Student from '../models/Student.js';
import { formatStudent } from '../utils/formatters.js';

// Get Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: formatStudent(student)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Student Profile
export const updateStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ['name', 'email'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: formatStudent(student)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Daily Activity (Time Tracking & Streak)
export const updateDailyActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionMinutes, playedToday } = req.body;
    
    const student = await Student.findById(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Update total time
    student.totalTimeMinutes += sessionMinutes || 0;
    
    // Update streak if played today
    if (playedToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastPlayed = student.lastPlayed ? new Date(student.lastPlayed) : null;
      
      if (!lastPlayed) {
        student.dailyStreak = 1;
      } else {
        lastPlayed.setHours(0, 0, 0, 0);
        const diffTime = today - lastPlayed;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
          // Same day, no change
        } else if (diffDays === 1) {
          // Yesterday, increment streak
          student.dailyStreak += 1;
        } else {
          // More than 1 day, reset streak
          student.dailyStreak = 1;
        }
      }
      
      student.lastPlayed = new Date();
    }
    
    await student.save();
    
    res.json({
      success: true,
      data: {
        totalTimeMinutes: student.totalTimeMinutes,
        dailyStreak: student.dailyStreak,
        lastPlayed: student.lastPlayed
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Student Progress (Games & Score)
export const updateStudentProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { noOfGamesPlayed, currentScore } = req.body;
    
    const student = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          gamesPlayed: noOfGamesPlayed,
          currentScore: currentScore
        }
      },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        gamesPlayed: student.gamesPlayed,
        currentScore: student.currentScore
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Student Assignments
export const getStudentAssignments = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Assignment = (await import('../models/Assignment.js')).default;
    const Submission = (await import('../models/Submission.js')).default;
    const Teacher = (await import('../models/Teacher.js')).default;
    
    // Get assignments where student is in assignedStudents or grade matches
    const student = await Student.findById(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const assignments = await Assignment.find({
      $or: [
        { assignedStudents: id },
        { grade: student.grade }
      ]
    }).populate('teacherId', 'name');
    
    // Get submissions for this student
    const submissions = await Submission.find({ studentId: id });
    
    const assignmentsWithStatus = await Promise.all(
      assignments.map(async (assignment) => {
        const submission = submissions.find(
          s => s.assignmentId.toString() === assignment._id.toString()
        );
        
        return {
          assignment_id: assignment._id,
          title: assignment.title,
          description: assignment.description,
          subject: assignment.subject,
          due_date: assignment.dueDate,
          teacher_name: assignment.teacherId?.name || 'Unknown',
          assigned_at: assignment.createdAt,
          submission_id: submission?._id || null,
          submission_status: submission?.status || null,
          submission_grade: submission?.grade || null,
          submission_feedback: submission?.feedback || null
        };
      })
    );
    
    res.json({
      success: true,
      data: assignmentsWithStatus
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
