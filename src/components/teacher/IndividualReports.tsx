import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Bar } from "react-chartjs-2";

interface IndividualReportsProps {
  students: any[];
  currentLanguage: string;
}

export const IndividualReports = ({ students, currentLanguage }: IndividualReportsProps) => {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || "");

  const translations = {
    en: {
      title: "Individual Student Reports",
      selectStudent: "Select Student",
      overallProgress: "Overall Progress",
      subjectPerformance: "Subject Performance",
      comparedToClass: "Compared to Class Average",
      strengths: "Strengths",
      improvements: "Areas for Improvement",
      exportReport: "Export Report",
      timeSpent: "Time Spent",
      badgesEarned: "Badges Earned",
      lessonsCompleted: "Lessons Completed",
      above: "Above Average",
      below: "Below Average",
      average: "Average",
      hours: "hours",
      mins: "mins",
      math: "Math",
      science: "Science",
      technology: "Technology",
      engineering: "Engineering"
    },
    hi: {
      title: "व्यक्तिगत छात्र रिपोर्ट",
      selectStudent: "छात्र चुनें",
      overallProgress: "समग्र प्रगति",
      subjectPerformance: "विषयवार प्रदर्शन",
      comparedToClass: "कक्षा औसत की तुलना में",
      strengths: "मजबूती",
      improvements: "सुधार के क्षेत्र",
      exportReport: "रिपोर्ट निर्यात करें",
      timeSpent: "समय व्यतीत",
      badgesEarned: "अर्जित बैज",
      lessonsCompleted: "पूर्ण पाठ",
      above: "औसत से ऊपर",
      below: "औसत से नीचे",
      average: "औसत",
      hours: "घंटे",
      mins: "मिनट",
      math: "गणित",
      science: "विज्ञान",
      technology: "तकनीक",
      engineering: "इंजीनियरिंग"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const student = students.find(s => s.id === selectedStudent);
  if (!student) return null;

  // Calculate class averages based on current_score (simulate subject scores)
  const classAverages = {
    math: Math.round(students.reduce((sum, s) => sum + (s.current_score || 0), 0) / students.length),
    science: Math.round(students.reduce((sum, s) => sum + Math.max(0, (s.current_score || 0) - 5), 0) / students.length),
    technology: Math.round(students.reduce((sum, s) => sum + Math.max(0, (s.current_score || 0) + 3), 0) / students.length),
    engineering: Math.round(students.reduce((sum, s) => sum + Math.max(0, (s.current_score || 0) - 2), 0) / students.length)
  };

  // Calculate progress based on games played (assuming 5 total games)
  const progressPercentage = Math.min(Math.round((student.no_of_games_played || 0) / 5 * 100), 100);
  
  // Simulate student's subject scores based on current_score
  const studentScores = {
    math: student.current_score || 0,
    science: Math.max(0, (student.current_score || 0) - 5),
    technology: Math.max(0, (student.current_score || 0) + 3),
    engineering: Math.max(0, (student.current_score || 0) - 2)
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} ${t.hours} ${mins} ${t.mins}` : `${mins} ${t.mins}`;
  };

  const getComparisonIcon = (studentScore: number, classAverage: number) => {
    if (studentScore > classAverage + 5) return <TrendingUp className="w-4 h-4 text-success" />;
    if (studentScore < classAverage - 5) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getComparisonText = (studentScore: number, classAverage: number) => {
    if (studentScore > classAverage + 5) return t.above;
    if (studentScore < classAverage - 5) return t.below;
    return t.average;
  };

  const subjectChartData = {
    labels: [t.math, t.science, t.technology, t.engineering],
    datasets: [
      {
        label: student.username,
        data: Object.values(studentScores),
        backgroundColor: 'hsl(var(--primary) / 0.8)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        borderRadius: 8
      },
      {
        label: 'Class Average',
        data: Object.values(classAverages),
        backgroundColor: 'hsl(var(--muted) / 0.5)',
        borderColor: 'hsl(var(--muted))',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const exportIndividualReport = () => {
    const estimatedTimeSpent = (student.no_of_games_played || 0) * 15; // 15 min per game
    const estimatedBadges = Math.floor((student.no_of_games_played || 0) / 2); // 1 badge per 2 games
    
    const reportData = {
      Student: student.username,
      Grade: student.grade,
      "Overall Progress": `${progressPercentage}%`,
      "Games Played": student.no_of_games_played || 0,
      "Time Spent": formatTime(estimatedTimeSpent),
      "Badges Earned": estimatedBadges,
      "Math Score": studentScores.math,
      "Science Score": studentScores.science,
      "Technology Score": studentScores.technology,
      "Engineering Score": studentScores.engineering,
      "Math vs Class": `${studentScores.math} (${getComparisonText(studentScores.math, classAverages.math)})`,
      "Science vs Class": `${studentScores.science} (${getComparisonText(studentScores.science, classAverages.science)})`,
      "Technology vs Class": `${studentScores.technology} (${getComparisonText(studentScores.technology, classAverages.technology)})`,
      "Engineering vs Class": `${studentScores.engineering} (${getComparisonText(studentScores.engineering, classAverages.engineering)})`
    };

    const csvContent = Object.entries(reportData).map(([key, value]) => `${key},${value}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.username.replace(' ', '_')}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Student Selector */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t.selectStudent} />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.username} - Grade {student.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={exportIndividualReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t.exportReport}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Overview */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {student.username ? student.username.substring(0, 2).toUpperCase() : 'ST'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.username}</h2>
              <p className="text-muted-foreground">Grade {student.grade}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.overallProgress}</p>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <p className="text-lg font-semibold">{progressPercentage}%</p>
              <p className="text-sm text-muted-foreground">
                {student.no_of_games_played || 0}/5 Games Completed
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.timeSpent}</p>
              <p className="text-lg font-semibold">{formatTime((student.no_of_games_played || 0) * 15)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.badgesEarned}</p>
              <p className="text-lg font-semibold">{Math.floor((student.no_of_games_played || 0) / 2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Comparison */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle>{t.subjectPerformance}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-6">
            <Bar data={subjectChartData} options={chartOptions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(studentScores).map(([subject, score]) => {
              const subjectName = subject === 'math' ? t.math : 
                                subject === 'science' ? t.science :
                                subject === 'technology' ? t.technology : t.engineering;
              const classAvg = classAverages[subject as keyof typeof classAverages];
              
              return (
                <div key={subject} className="p-3 rounded-lg border bg-card/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subjectName}</span>
                    {getComparisonIcon(score as number, classAvg)}
                  </div>
                  <p className="text-2xl font-bold mb-1">{score as number}%</p>
                  <p className="text-sm text-muted-foreground">
                    {t.comparedToClass}: {getComparisonText(score as number, classAvg)}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};