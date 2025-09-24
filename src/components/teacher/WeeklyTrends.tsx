import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, TrendingUp, Users, Clock } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeeklyTrendsProps {
  students: any[];
  currentLanguage: string;
}

export const WeeklyTrends = ({ students, currentLanguage }: WeeklyTrendsProps) => {
  const translations = {
    en: {
      title: "Weekly Learning Trends",
      weeklyUsage: "Weekly Usage Patterns",
      learningOutcomes: "Learning Outcomes Trend",
      engagement: "Student Engagement",
      summary: "Monthly Summary",
      totalSessions: "Total Sessions",
      avgSessionTime: "Avg Session Time",
      completionRate: "Completion Rate",
      activeStudents: "Active Students",
      week: "Week",
      sessions: "Sessions",
      minutes: "Minutes",
      scores: "Avg Scores",
      mon: "Mon",
      tue: "Tue", 
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun"
    },
    hi: {
      title: "साप्ताहिक शिक्षण रुझान",
      weeklyUsage: "साप्ताहिक उपयोग पैटर्न",
      learningOutcomes: "शिक्षण परिणाम रुझान",
      engagement: "छात्र सहभागिता",
      summary: "मासिक सारांश",
      totalSessions: "कुल सत्र",
      avgSessionTime: "औसत सत्र समय",
      completionRate: "पूर्णता दर",
      activeStudents: "सक्रिय छात्र",
      week: "सप्ताह",
      sessions: "सत्र",
      minutes: "मिनट",
      scores: "औसत स्कोर",
      mon: "सोम",
      tue: "मंग",
      wed: "बुध",
      thu: "गुरु",
      fri: "शुक्र",
      sat: "शनि",
      sun: "रवि"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Generate mock weekly data
  const weekLabels = [
    `${t.week} 1`, `${t.week} 2`, `${t.week} 3`, `${t.week} 4`
  ];

  const weeklyUsageData = {
    labels: weekLabels,
    datasets: [
      {
        label: t.sessions,
        data: [24, 32, 28, 35],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: `${t.minutes}`,
        data: [180, 240, 210, 275],
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'hsl(var(--success) / 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };

  const learningOutcomesData = {
    labels: weekLabels,
    datasets: [
      {
        label: `${t.scores} (%)`,
        data: [72, 75, 78, 82],
        borderColor: 'hsl(var(--warning))',
        backgroundColor: 'hsl(var(--warning) / 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const dailyEngagementData = {
    labels: [t.mon, t.tue, t.wed, t.thu, t.fri, t.sat, t.sun],
    datasets: [
      {
        label: `${t.activeStudents}`,
        data: [4, 5, 4, 5, 3, 2, 1],
        backgroundColor: 'hsl(var(--accent) / 0.8)',
        borderColor: 'hsl(var(--accent))',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const singleAxisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Calculate summary statistics
  const totalSessions = 119;
  const avgSessionTime = 26; // minutes
  const completionRate = 78; // percentage
  const activeStudents = students.length;

  return (
    <div className="space-y-6">
      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalSessions}</p>
                <p className="text-2xl font-bold">{totalSessions}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.avgSessionTime}</p>
                <p className="text-2xl font-bold">{avgSessionTime}m</p>
              </div>
              <Clock className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.completionRate}</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.activeStudents}</p>
                <p className="text-2xl font-bold">{activeStudents}</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Usage Patterns */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>{t.weeklyUsage}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={weeklyUsageData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes Trend */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>{t.learningOutcomes}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={learningOutcomesData} options={singleAxisOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Engagement */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle>{t.engagement}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={dailyEngagementData} options={singleAxisOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};