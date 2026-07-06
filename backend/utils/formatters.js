export const formatStudent = (student) => ({
  id: student._id,
  username: student.username,
  email: student.email,
  name: student.name,
  grade: student.grade,
  teacherId: student.teacherId,
  ruralAreaId: student.ruralAreaId,
  currentScore: student.currentScore,
  gamesPlayed: student.gamesPlayed,
  dailyStreak: student.dailyStreak,
  lastPlayed: student.lastPlayed,
  totalTimeMinutes: student.totalTimeMinutes,
  createdAt: student.createdAt,
  updatedAt: student.updatedAt,
});

export const formatTeacher = (teacher) => ({
  id: teacher._id,
  username: teacher.username,
  email: teacher.email,
  name: teacher.name,
  ruralAreaId: teacher.ruralAreaId,
  createdAt: teacher.createdAt,
  updatedAt: teacher.updatedAt,
});
