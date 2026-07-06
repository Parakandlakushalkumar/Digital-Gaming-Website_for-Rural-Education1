import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  grade: {
    type: Number,
    min: 1,
    max: 12,
  },
  assignedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, {
  timestamps: true,
});

// Indexes
assignmentSchema.index({ teacherId: 1 });
assignmentSchema.index({ grade: 1 });
assignmentSchema.index({ dueDate: 1 });

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
