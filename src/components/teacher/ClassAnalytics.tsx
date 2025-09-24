import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Target } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ClassAnalyticsProps {
  students: any[];
  currentLanguage: string;
}

export const ClassAnalytics = ({ students, currentLanguage }: ClassAnalyticsProps) => {
  const translations = {
    en: {
      title: "Class Analytics",
      subjectPerformance: "Subject-wise Performance",
      progressDistribution: "Progress Distribution",
      missedQuestions: "Most Missed Topics",
      avgScore: "Average Score",
      completed: "Completed",
      inProgress: "In Progress", 
      notStarted: "Not Started",
      math: "Math",
      science: "Science",
      technology: "Technology",
      engineering: "Engineering"
    },
    hi: {
      title: "कक्षा विश्लेषण",
      subjectPerformance: "विषयवार प्रदर्शन",
      progressDistribution: "प्रगति वितरण",
      missedQuestions: "सबसे छूटे हुए विषय",
      avgScore: "औसत स्कोर",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      notStarted: "शुरू नहीं हुआ",
      math: "गणित",
      science: "विज्ञान",
      technology: "तकनीक",
      engineering: "इंजीनियरिंग"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Calculate subject-wise performance
  const calculateSubjectPerformance = () => {
    const subjects = ['math', 'science', 'technology', 'engineering'];
    
    // If no students, return default data
    if (students.length === 0) {
      return {
        labels: [t.math, t.science, t.technology, t.engineering],
        datasets: [{
          label: t.avgScore,
          data: [0, 0, 0, 0],
          backgroundColor: [
            'hsl(var(--primary) / 0.8)',
            'hsl(var(--success) / 0.8)',
            'hsl(var(--warning) / 0.8)',
            'hsl(var(--accent) / 0.8)'
          ],
          borderColor: [
            'hsl(var(--primary))',
            'hsl(var(--success))',
            'hsl(var(--warning))',
            'hsl(var(--accent))'
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      };
    }
    
    // For database students, simulate subject scores based on current_score
    const subjectData = subjects.map((subject, index) => {
      // Simulate some variation between subjects based on current_score
      const baseScore = students.reduce((sum, student) => sum + (student.current_score || 0), 0) / students.length;
      const variation = (index - 1.5) * 5; // Add some variation between subjects
      return Math.max(0, Math.min(100, Math.round(baseScore + variation)));
    });

    return {
      labels: [t.math, t.science, t.technology, t.engineering],
      datasets: [{
        label: t.avgScore,
        data: subjectData,
        backgroundColor: [
          'hsl(var(--primary) / 0.8)',
          'hsl(var(--success) / 0.8)',
          'hsl(var(--warning) / 0.8)',
          'hsl(var(--accent) / 0.8)'
        ],
        borderColor: [
          'hsl(var(--primary))',
          'hsl(var(--success))',
          'hsl(var(--warning))',
          'hsl(var(--accent))'
        ],
        borderWidth: 2,
        borderRadius: 8
      }]
    };
  };

  // Calculate progress distribution
  const calculateProgressDistribution = () => {
    if (students.length === 0) {
      return {
        labels: [t.completed, t.inProgress, t.notStarted],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: [
            'hsl(var(--success) / 0.8)',
            'hsl(var(--warning) / 0.8)',
            'hsl(var(--muted) / 0.8)'
          ],
          borderColor: [
            'hsl(var(--success))',
            'hsl(var(--warning))',
            'hsl(var(--muted))'
          ],
          borderWidth: 2
        }]
      };
    }

    // Calculate progress based on games played (assuming 5 total games)
    const completed = students.filter(student => 
      (student.no_of_games_played || 0) >= 4 // 80% of 5 games
    ).length;
    const inProgress = students.filter(student => {
      const gamesPlayed = student.no_of_games_played || 0;
      return gamesPlayed > 1 && gamesPlayed < 4; // Between 20% and 80%
    }).length;
    const notStarted = students.length - completed - inProgress;

    return {
      labels: [t.completed, t.inProgress, t.notStarted],
      datasets: [{
        data: [completed, inProgress, notStarted],
        backgroundColor: [
          'hsl(var(--success) / 0.8)',
          'hsl(var(--warning) / 0.8)',
          'hsl(var(--muted) / 0.8)'
        ],
        borderColor: [
          'hsl(var(--success))',
          'hsl(var(--warning))',
          'hsl(var(--muted))'
        ],
        borderWidth: 2
      }]
    };
  };

  const subjectPerformanceData = calculateSubjectPerformance();
  const progressDistributionData = calculateProgressDistribution();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'hsl(var(--border))'
        }
      },
      x: {
        grid: {
          color: 'hsl(var(--border))'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  // Most missed topics (mock data)
  const missedTopics = [
    { topic: "Fractions & Decimals", missed: 12 },
    { topic: "Physics - Motion", missed: 8 },
    { topic: "Programming Basics", missed: 6 },
    { topic: "Simple Machines", missed: 5 }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Chart */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              {t.subjectPerformance}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={subjectPerformanceData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Progress Distribution Chart */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              {t.progressDistribution}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={progressDistributionData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Missed Questions */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-destructive" />
            {t.missedQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missedTopics.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="font-medium">{item.topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {item.missed} students
                  </span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className="bg-destructive h-2 rounded-full"
                      style={{ width: `${(item.missed / students.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};