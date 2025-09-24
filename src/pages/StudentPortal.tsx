import { useState, useEffect } from "react";
import { StudentLogin } from "@/components/student/StudentLogin";
import { Dashboard } from "@/components/Dashboard";
import ImprovedTranslate from "@/components/ImprovedTranslate";

export const StudentPortal = () => {
  const [student, setStudent] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Check for saved student auth
    const savedAuth = localStorage.getItem("studentAuth");
    if (savedAuth) {
      setStudent(JSON.parse(savedAuth));
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem("studentLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLogin = (studentData: any) => {
    setStudent(studentData);
  };

  const handleLogout = () => {
    setStudent(null);
    localStorage.removeItem("studentAuth");
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("studentLanguage", lang);
  };

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