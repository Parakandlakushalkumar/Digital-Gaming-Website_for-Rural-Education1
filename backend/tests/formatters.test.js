import test from 'node:test';
import assert from 'node:assert/strict';
import { formatStudent, formatTeacher } from '../utils/formatters.js';

test('formatStudent maps mongoose document to API shape', () => {
  const student = {
    _id: '507f1f77bcf86cd799439011',
    username: 'student6',
    email: 'student6@example.com',
    name: 'Arjun Kumar',
    grade: 6,
    teacherId: '507f1f77bcf86cd799439012',
    ruralAreaId: 'rural-school-01',
    currentScore: 45,
    gamesPlayed: 4,
    dailyStreak: 3,
    totalTimeMinutes: 90,
    password: 'hashed-password-should-not-leak',
  };

  const formatted = formatStudent(student);

  assert.equal(formatted.id, student._id);
  assert.equal(formatted.username, 'student6');
  assert.equal(formatted.gamesPlayed, 4);
  assert.equal(formatted.currentScore, 45);
  assert.equal('password' in formatted, false);
});

test('formatTeacher excludes password field', () => {
  const teacher = {
    _id: '507f1f77bcf86cd799439013',
    username: 'teacher_math',
    email: 'math.teacher@example.com',
    name: 'Anita Sharma',
    ruralAreaId: 'rural-school-01',
    password: 'hashed-password',
  };

  const formatted = formatTeacher(teacher);

  assert.equal(formatted.id, teacher._id);
  assert.equal(formatted.name, 'Anita Sharma');
  assert.equal('password' in formatted, false);
});
