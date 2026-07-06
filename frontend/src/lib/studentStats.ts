/** Normalize student fields from API (camelCase) or legacy localStorage (snake_case). */
export interface StudentRecord {
  id?: string;
  _id?: string;
  username?: string;
  name?: string;
  grade?: number;
  gamesPlayed?: number;
  no_of_games_played?: number;
  currentScore?: number;
  current_score?: number;
  totalTimeMinutes?: number;
  total_time_minutes?: number;
  dailyStreak?: number;
  daily_streak?: number;
}

export const getStudentId = (student: StudentRecord): string =>
  student.id || student._id?.toString() || '';

export const getGamesPlayed = (student: StudentRecord): number =>
  student.gamesPlayed ?? student.no_of_games_played ?? 0;

export const getCurrentScore = (student: StudentRecord): number =>
  student.currentScore ?? student.current_score ?? 0;

export const getTotalTimeMinutes = (student: StudentRecord): number => {
  const stored = student.totalTimeMinutes ?? student.total_time_minutes;
  if (stored != null && stored > 0) return stored;
  return getGamesPlayed(student) * 15;
};

export const getDailyStreak = (student: StudentRecord): number =>
  student.dailyStreak ?? student.daily_streak ?? 0;

export const getProgressPercentage = (student: StudentRecord, totalGames = 5): number =>
  Math.min(Math.round((getGamesPlayed(student) / totalGames) * 100), 100);

export const getEstimatedBadges = (student: StudentRecord): number =>
  Math.floor(getGamesPlayed(student) / 2);

export const getSubjectScores = (student: StudentRecord) => {
  const base = getCurrentScore(student);
  return {
    math: base,
    science: Math.max(0, base - 5),
    technology: Math.max(0, base + 3),
    engineering: Math.max(0, base - 2),
  };
};

export const normalizeStudent = (student: StudentRecord) => ({
  ...student,
  id: getStudentId(student),
  gamesPlayed: getGamesPlayed(student),
  currentScore: getCurrentScore(student),
  totalTimeMinutes: getTotalTimeMinutes(student),
  dailyStreak: getDailyStreak(student),
});

export const normalizeStudents = (students: StudentRecord[] = []) =>
  students.map(normalizeStudent);
