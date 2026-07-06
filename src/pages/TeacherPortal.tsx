import { useState, useEffect } from "react";
import { TeacherLogin } from "@/components/teacher/TeacherLogin";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import BasicTranslate from "@/components/BasicTranslate";
import { useAuthSession } from "@/hooks/useAuthSession";

interface TeacherAuth {
  id: string;
  username: string;
  name: string;
  email?: string;
  students?: unknown[];
  subjects?: string[];
  school?: string;
}

export const TeacherPortal = () => {
  const [teacher, setTeacher] = useState<TeacherAuth | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { validateSession, logout } = useAuthSession("teacher");

  useEffect(() => {
    const restoreSession = async () => {
      const savedAuth = localStorage.getItem("teacherAuth");
      if (savedAuth) {
        const isValid = await validateSession();
        if (isValid) {
          setTeacher(JSON.parse(savedAuth));
        } else {
          setTeacher(null);
        }
      }

      const savedLanguage = localStorage.getItem("teacherLanguage");
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
      setIsCheckingSession(false);
    };

    restoreSession();
  }, [validateSession]);

  const handleLogin = (teacherData: TeacherAuth) => {
    setTeacher(teacherData);
  };

  const handleLogout = () => {
    logout(() => setTeacher(null));
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("teacherLanguage", lang);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-background relative">
        <TeacherLogin 
          onLogin={handleLogin}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BasicTranslate />
      <TeacherDashboard 
        teacherData={teacher}
        onLogout={handleLogout}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};