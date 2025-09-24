import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StudentLoginProps {
  onLogin: (studentData: any) => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const StudentLogin = ({ onLogin, currentLanguage, onLanguageChange }: StudentLoginProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signup, setSignup] = useState({
    name: "",
    grade: "",
    email: "",
    username: "",
    password: ""
  });

  const translations = {
    en: {
      title: "Student Login",
      subtitle: "Access your learning games and progress",
      username: "Username",
      password: "Password",
      login: "Login",
      language: "Language",
      loginError: "Invalid username or password",
      enterCredentials: "Enter your credentials to access learning games",
      orSignup: "Don't have an account? Sign up",
      signupTitle: "Student Sign Up",
      name: "Name",
      class: "Class",
      email: "Email",
      createAccount: "Create Account",
      signupSuccess: "Account created! You can now log in.",
      signupInfo: "Fill in your details. You'll be assigned to your class teacher."
    },
    hi: {
      title: "छात्र लॉगिन",
      subtitle: "अपने गेम्स और प्रगति तक पहुंचें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      login: "लॉगिन",
      language: "भाषा",
      loginError: "गलत उपयोगकर्ता नाम या पासवर्ड",
      enterCredentials: "गेम्स खेलने के लिए अपनी जानकारी दर्ज करें",
      orSignup: "खाता नहीं है? साइन अप करें",
      signupTitle: "छात्र साइन अप",
      name: "नाम",
      class: "कक्षा",
      email: "ईमेल",
      createAccount: "खाता बनाएं",
      signupSuccess: "खाता बन गया! अब आप लॉगिन कर सकते हैं।",
      signupInfo: "अपनी जानकारी भरें। आपको अपनी कक्षा के शिक्षक से जोड़ा जाएगा।"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Authenticate student using secure RPC
      const { data: students, error } = await supabase
        .rpc('student_login', {
          p_username: credentials.username,
          p_password: credentials.password
        });

      if (error || !students || students.length === 0) {
        setError(t.loginError);
        setIsLoading(false);
        return;
      }

      const student = students[0];
      const studentData = {
        id: student.id,
        username: student.username,
        email: student.email,
        grade: student.grade,
        gamesPlayed: student.no_of_games_played,
        currentScore: student.current_score,
        ruralAreaId: student.rural_area_id,
        daily_streak: student.daily_streak ?? 0,
        total_time_minutes: student.total_time_minutes ?? 0
      };

      localStorage.setItem("studentAuth", JSON.stringify(studentData));
      onLogin(studentData);
    } catch (error) {
      console.error('Student login error:', error);
      setError(t.loginError);
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError("");
    setSignupSuccess("");

    try {
      const gradeNum = parseInt(signup.grade, 10);
      if (!signup.name || !signup.username || !signup.password || !signup.email || !gradeNum) {
        setSignupError("Please fill all fields.");
        setSignupLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc('student_signup', {
        p_name: signup.name,
        p_grade: gradeNum,
        p_email: signup.email,
        p_username: signup.username,
        p_password: signup.password
      });

      if (error) {
        setSignupError(error.message || 'Signup failed');
        setSignupLoading(false);
        return;
      }

      setSignupSuccess(t.signupSuccess);
      // Prefill login with new credentials
      setCredentials({ username: signup.username, password: signup.password });
      setShowSignup(false);
    } catch (err:any) {
      setSignupError(err.message || 'Signup failed');
    }

    setSignupLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {!showSignup && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">{t.language}</Label>
              <Select value={currentLanguage} onValueChange={onLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="text-destructive text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.login}
            </Button>

            <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setShowSignup(true)}>
              {t.orSignup}
            </Button>
          </form>
          )}

          {showSignup && (
          <form onSubmit={handleSignup} className="space-y-4 mt-2">
            <div>
              <h3 className="text-lg font-semibold">{t.signupTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.signupInfo}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input id="name" type="text" value={signup.name} onChange={(e)=>setSignup({...signup, name: e.target.value})} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">{t.class}</Label>
              <div className="grid grid-cols-3 gap-2">
                {[6,7,8,9,10,11,12].map(g => (
                  <Button
                    key={g}
                    type="button"
                    variant={signup.grade === String(g) ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => setSignup({...signup, grade: String(g)})}
                  >
                    Grade {g}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" value={signup.email} onChange={(e)=>setSignup({...signup, email: e.target.value})} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="su-username">{t.username}</Label>
              <Input id="su-username" type="text" value={signup.username} onChange={(e)=>setSignup({...signup, username: e.target.value})} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="su-password">{t.password}</Label>
              <Input id="su-password" type="password" value={signup.password} onChange={(e)=>setSignup({...signup, password: e.target.value})} required />
            </div>

            {signupError && <div className="text-destructive text-sm">{signupError}</div>}
            {signupSuccess && <div className="text-green-600 text-sm">{signupSuccess}</div>}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={signupLoading}>
                {signupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.createAccount}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={()=> setShowSignup(false)}>Back to Login</Button>
            </div>
          </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            {t.enterCredentials}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};