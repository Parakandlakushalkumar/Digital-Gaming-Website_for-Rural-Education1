import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Subject, Topic } from "@/data/syllabus";
import { getQuestions, Question as BankQuestion } from "@/data/questions";

interface Question {
  id: string;
  stem: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizEngineProps {
  subject: Subject;
  topic: Topic;
  grade: number;
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

// Pull topic questions from bank. If none exist, fall back to trivial generator.
const generateTopicQuestions = (subject: Subject, topic: Topic, grade: number): Question[] => {
  const fromBank: BankQuestion[] = getQuestions(grade, subject.id, topic.id);
  if (fromBank.length > 0) {
    return fromBank.map(q => ({
      id: q.id,
      stem: q.stem,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }));
  }
  // Fallback
  return [
    { id: 'fallback1', stem: `${topic.name}: Practice question 1?`, choices: ['A','B','C','D'], correctIndex: 0 },
    { id: 'fallback2', stem: `${topic.name}: Practice question 2?`, choices: ['A','B','C','D'], correctIndex: 1 },
    { id: 'fallback3', stem: `${topic.name}: Practice question 3?`, choices: ['A','B','C','D'], correctIndex: 2 },
    { id: 'fallback4', stem: `${topic.name}: Practice question 4?`, choices: ['A','B','C','D'], correctIndex: 3 },
    { id: 'fallback5', stem: `${topic.name}: Practice question 5?`, choices: ['A','B','C','D'], correctIndex: 0 },
  ];
};

export const QuizEngine = ({ subject, topic, grade, onComplete, onExit }: QuizEngineProps) => {
  const questions = useMemo(() => {
    const qs = generateTopicQuestions(subject, topic, grade);
    return Array.isArray(qs) ? qs.filter(Boolean) : [];
  }, [subject.id, topic.id, grade, topic.name]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = questions[currentIndex].correctIndex;
    if (idx === correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        const finalScore = score + (idx === correct ? 1 : 0);
        onComplete(finalScore, questions.length);
      }
    }, 1200);
  };

  const q = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  if (!q || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{subject.name} • {topic.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-4">No questions available for this topic right now.</div>
            <Button variant="outline" onClick={onExit}>Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{subject.name} • {topic.name} Quiz</CardTitle>
            <Button variant="outline" size="sm" onClick={onExit}>Exit</Button>
          </div>
          <ProgressBar current={currentIndex + 1} total={questions.length} label="Progress" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="font-medium">Score: {score}/{questions.length}</div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-destructive" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>{timeLeft}s</span>
            </div>
          </div>

          <Card className="p-6 bg-background/50">
            <h3 className="text-lg font-semibold mb-4 text-center">Question {currentIndex + 1}: {q.stem}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(q.choices || []).map((c, i) => (
                <Button
                  key={i}
                  variant={showResult ? (i === q.correctIndex ? 'success' : selected === i ? 'destructive' : 'outline') : 'outline'}
                  className="justify-start h-auto p-4 text-left"
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    {showResult && i === q.correctIndex && <CheckCircle className="w-5 h-5 text-success-foreground" />}
                    {showResult && selected === i && i !== q.correctIndex && <XCircle className="w-5 h-5 text-destructive-foreground" />}
                    <span>{c}</span>
                  </div>
                </Button>
              ))}
            </div>
            {showResult && q.explanation && (
              <div className="mt-3 p-3 bg-accent/50 rounded">
                <div className="text-sm text-muted-foreground"><strong>Explanation:</strong> {q.explanation}</div>
              </div>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};


