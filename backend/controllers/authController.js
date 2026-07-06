import bcrypt from 'bcrypt';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import TeacherClass from '../models/TeacherClass.js';
import { formatStudent } from '../utils/formatters.js';
import { generateToken, generateRefreshToken, verifyToken } from '../config/jwt.js';

// Student Login
export const studentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find student
    const student = await Student.findOne({ username }).select('+password');
    
    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Get teacher info
    let teacherInfo = null;
    if (student.teacherId) {
      const teacher = await Teacher.findById(student.teacherId);
      teacherInfo = teacher ? { id: teacher._id, name: teacher.name } : null;
    }
    
    // Generate tokens
    const accessToken = generateToken({
      userId: student._id,
      role: 'student',
      username: student.username
    });
    
    const refreshToken = generateRefreshToken({
      userId: student._id,
      role: 'student',
      username: student.username
    });
    
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({
      success: true,
      data: {
        id: student._id,
        username: student.username,
        email: student.email,
        name: student.name,
        grade: student.grade,
        teacherId: student.teacherId,
        teacher: teacherInfo,
        ruralAreaId: student.ruralAreaId,
        currentScore: student.currentScore,
        gamesPlayed: student.gamesPlayed,
        dailyStreak: student.dailyStreak,
        lastPlayed: student.lastPlayed,
        totalTimeMinutes: student.totalTimeMinutes
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Teacher Login
export const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find teacher
    const teacher = await Teacher.findOne({ username }).select('+password');
    
    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, teacher.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Get assigned students
    const students = await Student.find({ teacherId: teacher._id });
    
    // Generate tokens
    const accessToken = generateToken({
      userId: teacher._id,
      role: 'teacher',
      username: teacher.username
    });
    
    const refreshToken = generateRefreshToken({
      userId: teacher._id,
      role: 'teacher',
      username: teacher.username
    });
    
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.json({
      success: true,
      data: {
        id: teacher._id,
        username: teacher.username,
        email: teacher.email,
        name: teacher.name,
        ruralAreaId: teacher.ruralAreaId,
        students: students.map(formatStudent)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Student Signup
export const studentSignup = async (req, res) => {
  try {
    const { name, grade, email, username, password } = req.body;
    
    // Check if username or email already exists
    const existingStudent = await Student.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    // Find teacher assigned to this grade
    const teacherClass = await TeacherClass.findOne({ grade });
    
    if (!teacherClass) {
      return res.status(400).json({
        success: false,
        message: 'No teacher assigned to this grade'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create student
    const student = await Student.create({
      name,
      grade,
      email,
      username,
      password: hashedPassword,
      teacherId: teacherClass.teacherId,
      ruralAreaId: 'default' // Can be customized
    });
    
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        id: student._id,
        username: student.username,
        email: student.email
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided'
      });
    }
    
    const decoded = verifyToken(refreshToken);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
    
    // Generate new access token
    const newAccessToken = generateToken({
      userId: decoded.userId,
      role: decoded.role,
      username: decoded.username
    });
    
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    
    res.json({
      success: true,
      message: 'Token refreshed successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
