import { useState, useEffect } from "react";
import { TeacherLogin } from "@/components/teacher/TeacherLogin";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import BasicTranslate from "@/components/BasicTranslate";

export const TeacherPortal = () => {
  const [teacher, setTeacher] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Check for saved teacher auth
    const savedAuth = localStorage.getItem("teacherAuth");
    if (savedAuth) {
      setTeacher(JSON.parse(savedAuth));
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem("teacherLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLogin = (teacherData: any) => {
    setTeacher(teacherData);
  };

  const handleLogout = () => {
    setTeacher(null);
    localStorage.removeItem("teacherAuth");
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("teacherLanguage", lang);
  };

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