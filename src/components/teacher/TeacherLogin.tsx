import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Globe } from "lucide-react";
import { authAPI } from "@/api/authAPI.js";

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
      const response = await authAPI.teacherLogin(credentials);

      if (!response.success || !response.data) {
        setError(t.error);
        setLoading(false);
        return;
      }

      const teacher = response.data;

      const teacherData = {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        school: `Rural School - ${teacher.ruralAreaId}`,
        students: teacher.students || []
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
