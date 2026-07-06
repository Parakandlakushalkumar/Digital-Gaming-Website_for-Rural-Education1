import mongoose from 'mongoose';

const teacherClassSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
}, {
  timestamps: true,
});

// Indexes
teacherClassSchema.index({ teacherId: 1, grade: 1 }, { unique: true });

const TeacherClass = mongoose.model('TeacherClass', teacherClassSchema);

export default TeacherClass;
