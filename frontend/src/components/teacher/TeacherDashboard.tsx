import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Award, 
  Download, 
  Plus,
  LogOut,
  Globe,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { StudentOverview } from "./StudentOverview";
import { ClassAnalytics } from "./ClassAnalytics";
import { IndividualReports } from "./IndividualReports";
import { WeeklyTrends } from "./WeeklyTrends";
import { AssignmentManager } from "./AssignmentManager";
import { teacherAPI } from "@/api/teacherAPI.js";
import {
  getCurrentScore,
  getGamesPlayed,
  getTotalTimeMinutes,
  getEstimatedBadges,
  getProgressPercentage,
  getSubjectScores,
  normalizeStudents,
  type StudentRecord,
} from "@/lib/studentStats";

interface TeacherDashboardProps {
  teacherData: any;
  onLogout: () => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const TeacherDashboard = ({ 
  teacherData: initialTeacherData, 
  onLogout, 
  currentLanguage, 
  onLanguageChange 
}: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [teacherData, setTeacherData] = useState(initialTeacherData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const translations = {
    en: {
      welcome: "Welcome back",
      students: "Students",
      avgProgress: "Avg Progress",
      totalTime: "Total Time",
      badgesEarned: "Badges Earned",
      overview: "Overview",
      analytics: "Analytics", 
      reports: "Reports",
      trends: "Trends",
      assignments: "Assignments",
      exportData: "Export Data",
      newAssignment: "New Assignment",
      logout: "Logout",
      hours: "hours",
      mins: "mins",
      refresh: "Refresh"
    },
    hi: {
      welcome: "वापस स्वागत है",
      students: "छात्र",
      avgProgress: "औसत प्रगति",
      totalTime: "कुल समय",
      badgesEarned: "अर्जित बैज",
      overview: "अवलोकन",
      analytics: "विश्लेषण",
      reports: "रिपोर्ट",
      trends: "रुझान",
      assignments: "असाइनमेंट",
      exportData: "डेटा निर्यात करें",
      newAssignment: "नया असाइनमेंट",
      logout: "लॉगआउट",
      hours: "घंटे",
      mins: "मिनट",
      refresh: "रीफ्रेश"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const calculateStats = () => {
    const students = teacherData.students || [];
    
    // Handle case where students array is empty
    if (students.length === 0) {
      return {
        avgProgress: 0,
        totalTime: 0,
        totalBadges: 0,
        studentCount: 0
      };
    }

    // Calculate stats based on database structure
    const totalGames = students.reduce(
      (sum: number, student: StudentRecord) => sum + getGamesPlayed(student),
      0
    );
    const totalScore = students.reduce(
      (sum: number, student: StudentRecord) => sum + getCurrentScore(student),
      0
    );
    
    // Estimate progress based on games played (assuming 5 total games available)
    const avgProgress = Math.round((totalGames / (students.length * 5)) * 100) || 0;
    
    // Estimate time spent (rough calculation: 15 minutes per game)
    const totalTime = totalGames * 15;
    
    // Estimate badges (one badge per 2 games completed)
    const totalBadges = Math.floor(totalGames / 2);

    return {
      avgProgress: Math.min(avgProgress, 100), // Cap at 100%
      totalTime,
      totalBadges,
      studentCount: students.length
    };
  };

  const refreshStudentData = async () => {
    setIsRefreshing(true);
    try {
      const response = await teacherAPI.getStudents(teacherData.id);

      if (response.success) {
        setTeacherData(prev => ({
          ...prev,
          students: normalizeStudents(response.data || [])
        }));
      }
    } catch (error) {
      console.error('Error refreshing student data:', error);
    }
    setIsRefreshing(false);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshStudentData, 30000);
    return () => clearInterval(interval);
  }, [teacherData.id]);

  const stats = calculateStats();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}${t.hours} ${mins}${t.mins}` : `${mins}${t.mins}`;
  };

  const handleExport = () => {
    const students = teacherData.students || [];
    if (students.length === 0) return;

    const csvData = students.map((student: StudentRecord) => {
      const scores = getSubjectScores(student);
      return {
        Name: student.name || student.username,
        Grade: student.grade,
        "Games Completed": `${getGamesPlayed(student)}/5`,
        "Time Spent": formatTime(getTotalTimeMinutes(student)),
        "Badges Earned": getEstimatedBadges(student),
        "Current Score": getCurrentScore(student),
        "Math Score": scores.math,
        "Science Score": scores.science,
        "Technology Score": scores.technology,
        "Engineering Score": scores.engineering,
        "Progress %": getProgressPercentage(student),
      };
    });

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-progress-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t.welcome}, {teacherData.name}</h1>
            <p className="text-muted-foreground">{teacherData.school}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(currentLanguage === "en" ? "hi" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {currentLanguage === "en" ? "हिंदी" : "English"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              {t.exportData}
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.students}</p>
                  <p className="text-2xl font-bold">{stats.studentCount}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.avgProgress}</p>
                  <p className="text-2xl font-bold">{stats.avgProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalTime}</p>
                  <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          {/* Badges Earned card removed as per request */}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
            <TabsTrigger value="trends">{t.trends}</TabsTrigger>
            <TabsTrigger value="assignments">{t.assignments}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <StudentOverview students={teacherData.students} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <ClassAnalytics students={teacherData.students} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <IndividualReports students={teacherData.students} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <WeeklyTrends students={teacherData.students} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <AssignmentManager 
              students={teacherData.students || []} 
              subjects={teacherData.subjects || ['Math', 'Science', 'Technology', 'Engineering']}
              currentLanguage={currentLanguage}
              teacherId={teacherData.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
