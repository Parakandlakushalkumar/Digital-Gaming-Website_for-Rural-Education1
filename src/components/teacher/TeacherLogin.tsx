import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TeacherLoginProps {
  onLogin: (teacherData: any) => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const TeacherLogin = ({ onLogin, currentLanguage, onLanguageChange }: TeacherLoginProps) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Teacher Login",
      subtitle: "Access your student dashboard",
      username: "Username",
      password: "Password",
      login: "Login",
      language: "Language",
      error: "Invalid credentials. Please try again."
    },
    hi: {
      title: "शिक्षक लॉगिन",
      subtitle: "अपना छात्र डैशबोर्ड एक्सेस करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      login: "लॉगिन",
      language: "भाषा",
      error: "गलत क्रेडेंशियल। कृपया पुनः प्रयास करें।"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Authenticate teacher using secure RPC
      const { data: teachers, error } = await supabase
        .rpc('teacher_login', {
          p_username: credentials.username,
          p_password: credentials.password
        });

      if (error || !teachers || teachers.length === 0) {
        setError(t.error);
        setLoading(false);
        return;
      }

      const teacher = teachers[0];

      // Get students assigned to this teacher using secure RPC
      const { data: students, error: studentsError } = await supabase
        .rpc('get_teacher_students', {
          p_teacher_id: teacher.id
        });

      if (studentsError) {
        console.error('Error fetching students:', studentsError);
      }

      const teacherData = {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        school: `Rural School - ${teacher.rural_area_id}`,
        students: students || []
      };

      localStorage.setItem("teacherAuth", JSON.stringify(teacherData));
      onLogin(teacherData);
    } catch (error) {
      console.error('Login error:', error);
      setError(t.error);
    }
    
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
            <p className="text-muted-foreground mt-2">{t.subtitle}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-sm font-medium">{t.language}</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(currentLanguage === "en" ? "hi" : "en")}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {currentLanguage === "en" ? "हिंदी" : "English"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "..." : t.login}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

const generateMockStudents = () => {
  const names = ["Arjun Kumar", "Priya Singh", "Rahul Sharma", "Kavya Patel", "Vikram Yadav"];
  return names.map((name, index) => ({
    id: `student${index + 1}`,
    name,
    grade: Math.floor(Math.random() * 7) + 6,
    progress: {
      lessonsCompleted: Math.floor(Math.random() * 20) + 5,
      totalLessons: 25,
      timeSpent: Math.floor(Math.random() * 120) + 30,
      badgesEarned: Math.floor(Math.random() * 8) + 1,
      scores: {
        math: Math.floor(Math.random() * 40) + 60,
        science: Math.floor(Math.random() * 40) + 60,
        technology: Math.floor(Math.random() * 40) + 60,
        engineering: Math.floor(Math.random() * 40) + 60
      }
    }
  }));
};