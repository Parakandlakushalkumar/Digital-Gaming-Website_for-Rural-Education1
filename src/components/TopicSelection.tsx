import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, BookOpen, Trophy, Download } from "lucide-react";
import { Subject, Topic, getTopicsForSubjectAndGrade } from "@/data/syllabus";

interface TopicSelectionProps {
  subject: Subject;
  studentGrade: number;
  onTopicSelect: (topic: Topic) => void;
  onStartQuiz?: (topic: Topic) => void;
  onOverallPerformance?: () => void;
  onDownloadTopic?: (topic: Topic) => void;
  onBack: () => void;
  currentLanguage: string;
}

export const TopicSelection = ({ 
  subject, 
  studentGrade, 
  onTopicSelect, 
  onOverallPerformance,
  onDownloadTopic,
  onBack, 
  currentLanguage 
}: TopicSelectionProps) => {
  const topics = getTopicsForSubjectAndGrade(subject.id, studentGrade);

  const isDirectPlay = (subjectId: string, grade: number) => {
    // Mirror dashboard routing where many grade/subject combos go straight to a specific game (no selection)
    if (subjectId === 'science' && [6,7,8,9,10,11,12].includes(grade)) return true;
    if (subjectId === 'engineering' && [6,7,8,9,10,11,12].includes(grade)) return true;
    if (subjectId === 'mathematics' && [6,7,8,9,10,11,12].includes(grade)) return true;
    return false;
  };

  const translations = {
    en: {
      title: `${subject.name} Topics`,
      subtitle: `Grade ${studentGrade} • ${topics.length} Topics`,
      back: "Back to Subjects",
      startLearning: "Start Learning",
      download: "Download",
      quiz: "Quiz",
      noTopics: "No topics available for this grade",
      overallPerformance: "Overall Game"
    },
    hi: {
      title: `${subject.name} के विषय`,
      subtitle: `कक्षा ${studentGrade} • ${topics.length} विषय`,
      back: "विषयों पर वापस जाएं",
      startLearning: "सीखना शुरू करें",
      download: "डाउनलोड",
      quiz: "क्विज़",
      noTopics: "इस कक्षा के लिए कोई विषय उपलब्ध नहीं है",
      overallPerformance: "समग्र खेल"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  if (topics.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          
          <Card className="text-center p-8">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">{t.noTopics}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {topics.map((topic, index) => (
            <Card 
              key={topic.id} 
              className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Topic {index + 1}
                      </Badge>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {topic.name}
                      </h3>
                    </div>
                    {topic.description && (
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4 items-center">
                    <Button 
                      size="sm" 
                      className="group-hover:scale-105 transition-transform"
                      onClick={() => onTopicSelect(topic)}
                      type="button"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.startLearning}
                    </Button>
                    {onDownloadTopic && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="group-hover:scale-105 transition-transform"
                        onClick={() => onDownloadTopic(topic)}
                        type="button"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t.download}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Performance Button for ALL subjects and grades */}
        {onOverallPerformance && (
          <Card className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-12 h-12 text-orange-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-orange-600">Overall Game Challenge</h3>
                    <p className="text-sm text-muted-foreground">
                      {(subject.id === 'engineering' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'mathematics' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'science' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12))
                        ? `Play a comprehensive game covering all ${subject.name} topics`
                        : "Overall game coming soon for this subject"
                      }
                    </p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className={`px-8 py-3 ${
                    (subject.id === 'engineering' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'mathematics' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'science' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12))
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      : "bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed"
                  }`}
                  onClick={onOverallPerformance}
                  disabled={!((subject.id === 'engineering' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'mathematics' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)) || (subject.id === 'science' && (studentGrade === 6 || studentGrade === 7 || studentGrade === 8 || studentGrade === 9 || studentGrade === 10 || studentGrade === 11 || studentGrade === 12)))}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {t.overallPerformance}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};