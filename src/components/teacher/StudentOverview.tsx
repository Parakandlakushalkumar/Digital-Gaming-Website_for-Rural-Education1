import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Award, TrendingUp } from "lucide-react";

interface StudentOverviewProps {
  students: any[];
  currentLanguage: string;
}

export const StudentOverview = ({ students, currentLanguage }: StudentOverviewProps) => {
  const translations = {
    en: {
      title: "Student Progress Overview",
      progress: "Progress",
      timeSpent: "Time Spent",
      badges: "Badges",
      grade: "Grade",
      avgScore: "Avg Score",
      hours: "h",
      mins: "m"
    },
    hi: {
      title: "छात्र प्रगति अवलोकन",
      progress: "प्रगति",
      timeSpent: "समय व्यतीत",
      badges: "बैज",
      grade: "कक्षा",
      avgScore: "औसत स्कोर",
      hours: "घं",
      mins: "मि"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}${t.hours} ${mins}${t.mins}` : `${mins}${t.mins}`;
  };

  const getAverageScore = (student: any) => {
    // For database students, use current_score as the average score
    return student.current_score || 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {students.map((student) => {
            // Calculate progress based on games played (assuming 5 total games)
            const progressPercentage = Math.min(Math.round((student.no_of_games_played || 0) / 5 * 100), 100);
            const avgScore = getAverageScore(student);
            // Estimate time spent (15 minutes per game)
            const estimatedTimeSpent = (student.no_of_games_played || 0) * 15;
            // Estimate badges (one badge per 2 games)
            const estimatedBadges = Math.floor((student.no_of_games_played || 0) / 2);

            return (
              <div key={student.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card/50">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {student.username ? student.username.substring(0, 2).toUpperCase() : 'ST'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="font-semibold">{student.username}</p>
                    <p className="text-sm text-muted-foreground">{t.grade} {student.grade}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{t.progress}</span>
                      <span className={`text-sm font-medium ${getProgressColor(progressPercentage)}`}>
                        {progressPercentage}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {formatTime(estimatedTimeSpent)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-warning" />
                    <span className="text-sm">{estimatedBadges} {t.badges}</span>
                  </div>

                  <div>
                    <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                      {t.avgScore}: {avgScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};