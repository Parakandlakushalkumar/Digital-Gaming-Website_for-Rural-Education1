import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connectDB from '../config/db.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import TeacherClass from '../models/TeacherClass.js';
import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';

dotenv.config();

const teachers = [
  {
    username: 'teacher_math',
    password: 'Teacher@123',
    email: 'math.teacher@example.com',
    name: 'Anita Sharma',
    ruralAreaId: 'rural-school-01',
    grades: [6, 7, 8],
  },
  {
    username: 'teacher_science',
    password: 'Teacher@123',
    email: 'science.teacher@example.com',
    name: 'Ramesh Kumar',
    ruralAreaId: 'rural-school-01',
    grades: [9, 10, 11, 12],
  },
];

const students = [
  { username: 'student6', password: 'Student@123', email: 'student6@example.com', name: 'Arjun Kumar', grade: 6 },
  { username: 'student7', password: 'Student@123', email: 'student7@example.com', name: 'Priya Singh', grade: 7 },
  { username: 'student8', password: 'Student@123', email: 'student8@example.com', name: 'Kavya Patel', grade: 8 },
  { username: 'student9', password: 'Student@123', email: 'student9@example.com', name: 'Rahul Sharma', grade: 9 },
  { username: 'student10', password: 'Student@123', email: 'student10@example.com', name: 'Meera Yadav', grade: 10 },
];

const studentStats = [
  { currentScore: 45, gamesPlayed: 4, dailyStreak: 3, totalTimeMinutes: 90 },
  { currentScore: 30, gamesPlayed: 3, dailyStreak: 2, totalTimeMinutes: 60 },
  { currentScore: 55, gamesPlayed: 5, dailyStreak: 5, totalTimeMinutes: 120 },
  { currentScore: 25, gamesPlayed: 2, dailyStreak: 1, totalTimeMinutes: 45 },
  { currentScore: 40, gamesPlayed: 3, dailyStreak: 2, totalTimeMinutes: 75 },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Submission.deleteMany({}),
    Assignment.deleteMany({}),
    Student.deleteMany({}),
    TeacherClass.deleteMany({}),
    Teacher.deleteMany({}),
  ]);

  const teacherDocs = [];
  for (const teacher of teachers) {
    const password = await bcrypt.hash(teacher.password, 12);
    const doc = await Teacher.create({ ...teacher, password });
    teacherDocs.push({ ...teacher, doc });

    for (const grade of teacher.grades) {
      await TeacherClass.create({ teacherId: doc._id, grade });
    }
  }

  const studentDocs = [];
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i];
    const stats = studentStats[i];
    const assignedTeacher = teacherDocs.find((teacher) => teacher.grades.includes(student.grade)) || teacherDocs[0];
    const password = await bcrypt.hash(student.password, 12);
    const doc = await Student.create({
      ...student,
      password,
      teacherId: assignedTeacher.doc._id,
      ruralAreaId: assignedTeacher.doc.ruralAreaId,
      ...stats,
    });
    studentDocs.push(doc);
  }

  const mathTeacher = teacherDocs[0].doc;
  const scienceTeacher = teacherDocs[1].doc;
  const grade6Students = studentDocs.filter((student) => student.grade === 6);

  const assignments = await Assignment.insertMany([
    {
      title: 'Fractions Practice',
      description: 'Solve the worksheet and upload a photo or PDF of your answers.',
      subject: 'Math',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      teacherId: mathTeacher._id,
      grade: 6,
      assignedStudents: grade6Students.map((student) => student._id),
    },
    {
      title: 'Geometry Shapes Quiz',
      description: 'Complete the geometry worksheet on triangles and circles.',
      subject: 'Math',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      teacherId: mathTeacher._id,
      grade: 7,
    },
    {
      title: 'Plant Life Cycle Report',
      description: 'Write a short report on the plant life cycle with diagrams.',
      subject: 'Science',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      teacherId: scienceTeacher._id,
      grade: 9,
    },
  ]);

  const arjun = studentDocs.find((student) => student.username === 'student6');
  const rahul = studentDocs.find((student) => student.username === 'student9');

  await Submission.insertMany([
    {
      assignmentId: assignments[0]._id,
      studentId: arjun._id,
      fileName: 'fractions-answers.pdf',
      fileUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.pdf',
      fileSize: 245000,
      status: 'graded',
      grade: 88,
      feedback: 'Excellent work on equivalent fractions.',
    },
    {
      assignmentId: assignments[2]._id,
      studentId: rahul._id,
      fileName: 'plant-life-cycle.docx',
      fileUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.docx',
      fileSize: 128000,
      status: 'submitted',
    },
  ]);

  console.log('Database seeded successfully.');
  console.log('');
  console.log('Demo credentials:');
  console.log('  Teacher: teacher_math / Teacher@123');
  console.log('  Teacher: teacher_science / Teacher@123');
  console.log('  Student: student6 / Student@123');
  console.log('  Student: student7 / Student@123');
  console.log('');
  console.log(`Seeded ${teacherDocs.length} teachers, ${studentDocs.length} students, ${assignments.length} assignments, 2 submissions.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
