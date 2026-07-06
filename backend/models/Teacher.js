import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
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
  ruralAreaId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes
teacherSchema.index({ username: 1 });
teacherSchema.index({ email: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
