import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: Number,
    required: true,
    min: 6,
    max: 12,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  ruralAreaId: {
    type: String,
    required: true,
  },
  currentScore: {
    type: Number,
    default: 0,
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  dailyStreak: {
    type: Number,
    default: 0,
  },
  lastPlayed: {
    type: Date,
  },
  totalTimeMinutes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
studentSchema.index({ username: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ teacherId: 1 });
studentSchema.index({ grade: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student;
