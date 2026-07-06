import { useState, useEffect } from "react";
import { StudentLogin } from "@/components/student/StudentLogin";
import { Dashboard } from "@/components/Dashboard";
import { useAuthSession } from "@/hooks/useAuthSession";

interface StudentAuth {
  id: string;
  username: string;
  name: string;
  grade: number;
  email?: string;
  currentScore?: number;
  gamesPlayed?: number;
  dailyStreak?: number;
  totalTimeMinutes?: number;
}

export const StudentPortal = () => {
  const [student, setStudent] = useState<StudentAuth | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { validateSession, logout } = useAuthSession("student");

  useEffect(() => {
    const restoreSession = async () => {
      const savedAuth = localStorage.getItem("studentAuth");
      if (savedAuth) {
        const isValid = await validateSession();
        if (isValid) {
          setStudent(JSON.parse(savedAuth));
        } else {
          setStudent(null);
        }
      }

      const savedLanguage = localStorage.getItem("studentLanguage");
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
      setIsCheckingSession(false);
    };

    restoreSession();
  }, [validateSession]);

  const handleLogin = (studentData: StudentAuth) => {
    setStudent(studentData);
  };

  const handleLogout = () => {
    logout(() => setStudent(null));
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("studentLanguage", lang);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background relative">
        <StudentLogin 
          onLogin={handleLogin}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Dashboard 
        studentData={student}
        onLogout={handleLogout}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};