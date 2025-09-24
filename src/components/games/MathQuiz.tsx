import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Star } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface MathQuizProps {
  onComplete: (score: number, totalQuestions: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

const generateQuestions = (): Question[] => [
  {
    id: 1,
    question: "What is 15 + 27?",
    options: ["42", "41", "43", "40"],
    correct: 0,
    explanation: "15 + 27 = 42"
  },
  {
    id: 2,
    question: "What is 8 × 9?",
    options: ["71", "72", "73", "74"],
    correct: 1,
    explanation: "8 × 9 = 72"
  },
  {
    id: 3,
    question: "What is 144 ÷ 12?",
    options: ["11", "12", "13", "14"],
    correct: 1,
    explanation: "144 ÷ 12 = 12"
  },
  {
    id: 4,
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correct: 1,
    explanation: "25% of 80 = (25/100) × 80 = 20"
  },
  {
    id: 5,
    question: "What is 2³ (2 to the power of 3)?",
    options: ["6", "8", "9", "12"],
    correct: 1,
    explanation: "2³ = 2 × 2 × 2 = 8"
  }
];

export const MathQuiz = ({ onComplete, onExit }: MathQuizProps) => {
  const [questions] = useState<Question[]>(generateQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1); // Auto-submit with wrong answer
    }
  }, [timeLeft, answered]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setAnswered(false);
      } else {
        onComplete(score + (answerIndex === questions[currentQuestion].correct ? 1 : 0), questions.length);
      }
    }, 2000);
  };

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-math-light to-background">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-math">Math Quiz Adventure</CardTitle>
            <Button variant="outline" size="sm" onClick={onExit}>
              Exit
            </Button>
          </div>
          <ProgressBar 
            current={currentQuestion + 1} 
            total={questions.length} 
            label="Question Progress"
            variant="math"
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="font-medium">Score: {score}/{questions.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-destructive" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <Card className="p-6 bg-background/50">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Question {currentQuestion + 1}: {current.question}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? index === current.correct
                        ? "success"
                        : selectedAnswer === index
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  size="lg"
                  className="p-4 text-left justify-start h-auto"
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  <div className="flex items-center gap-3">
                    {showResult && index === current.correct && (
                      <CheckCircle className="w-5 h-5 text-success-foreground" />
                    )}
                    {showResult && selectedAnswer === index && index !== current.correct && (
                      <XCircle className="w-5 h-5 text-destructive-foreground" />
                    )}
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {showResult && current.explanation && (
              <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Explanation:</strong> {current.explanation}
                </p>
              </div>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};