import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['submitted', 'graded', 'returned'],
    default: 'submitted',
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
  feedback: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes
submissionSchema.index({ assignmentId: 1 });
submissionSchema.index({ studentId: 1 });
submissionSchema.index({ status: 1 });
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
