import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calculator, Trophy, Heart, Star, Target } from 'lucide-react';

interface Overall10MathProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

interface Question {
  text: string;
  answer: number;
  hint: string;
}

interface Level {
  name: string;
  theme: string;
  color: string;
  questions: Question[];
}

interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  health: number;
  questionIndex: number;
  currentQuestion: Question | null;
  completedLevels: boolean[];
}

const Overall10Math: React.FC<Overall10MathProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    lives: 3,
    health: 100,
    questionIndex: 0,
    currentQuestion: null,
    completedLevels: [false, false, false, false, false, false]
  });

  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const translations = {
    en: {
      title: "🎮 MathQuest: The Adventure of Numbers 🎮",
      subtitle: "Master Grade 10 Mathematics through exciting adventures!",
      score: "Score",
      lives: "Lives",
      back: "Back to Dashboard",
      selectLevel: "Select Level",
      level1: "🏰 Level 1: Number Dungeon",
      level2: "🌀 Level 2: Magic Portal", 
      level3: "💰 Level 3: Treasure Path",
      level4: "⛰ Level 4: Mountain Climb",
      level5: "🎲 Level 5: Dice Challenge",
      level6: "🏗 Level 6: Builder's Challenge",
      enterAnswer: "Enter your answer",
      submitAnswer: "Submit Answer",
      nextChallenge: "Next Challenge",
      correct: "✅ Correct! Well done!",
      incorrect: "❌ Incorrect",
      theAnswer: "The answer is",
      hint: "💡 Hint:",
      levelComplete: "🎉 Level Complete! Bonus: 500 points!",
      gameComplete: "🎉 Congratulations! You've mastered all levels!",
      finalScore: "Final Score",
      points: "points"
    },
    hi: {
      title: "🎮 मैथक्वेस्ट: संख्याओं का रोमांच 🎮",
      subtitle: "रोमांचक रोमांच के माध्यम से ग्रेड 10 गणित में महारत हासिल करें!",
      score: "स्कोर",
      lives: "जीवन",
      back: "डैशबोर्ड पर वापस जाएं",
      selectLevel: "स्तर चुनें",
      level1: "🏰 स्तर 1: संख्या डंजन",
      level2: "🌀 स्तर 2: जादुई पोर्टल",
      level3: "💰 स्तर 3: खजाना पथ",
      level4: "⛰ स्तर 4: पहाड़ चढ़ाई",
      level5: "🎲 स्तर 5: पासा चुनौती",
      level6: "🏗 स्तर 6: निर्माता चुनौती",
      enterAnswer: "अपना उत्तर दर्ज करें",
      submitAnswer: "उत्तर जमा करें",
      nextChallenge: "अगली चुनौती",
      correct: "✅ सही! बहुत बढ़िया!",
      incorrect: "❌ गलत",
      theAnswer: "उत्तर है",
      hint: "💡 संकेत:",
      levelComplete: "🎉 स्तर पूरा! बोनस: 500 अंक!",
      gameComplete: "🎉 बधाई हो! आपने सभी स्तरों में महारत हासिल कर ली!",
      finalScore: "अंतिम स्कोर",
      points: "अंक"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const levels: Level[] = [
    {
      name: "Number Dungeon",
      theme: "dungeon",
      color: "#4a4a4a",
      questions: [
        {
          text: "Find the LCM of 18 and 24 to unlock the gate!",
          answer: 72,
          hint: "LCM = (a × b) / GCD(a, b)"
        },
        {
          text: "What is the HCF of 48 and 18?",
          answer: 6,
          hint: "Find the highest common factor"
        },
        {
          text: "Find the prime factorization of 60 (sum of prime factors)",
          answer: 10,
          hint: "60 = 2² × 3 × 5, sum = 2+3+5 = 10"
        }
      ]
    },
    {
      name: "Magic Portal",
      theme: "portal",
      color: "#9c27b0",
      questions: [
        {
          text: "Solve: x² - 5x + 6 = 0 (sum of roots)",
          answer: 5,
          hint: "For ax² + bx + c = 0, sum of roots = -b/a"
        },
        {
          text: "Find the discriminant of 2x² - 4x + 2 = 0",
          answer: 0,
          hint: "Discriminant = b² - 4ac"
        },
        {
          text: "If x² - 7x + k = 0 has equal roots, find k",
          answer: 12.25,
          hint: "For equal roots, discriminant = 0"
        }
      ]
    },
    {
      name: "Treasure Path",
      theme: "treasure",
      color: "#ff9800",
      questions: [
        {
          text: "In AP: 2, 5, 8, 11, ... find the 10th term",
          answer: 29,
          hint: "nth term = a + (n-1)d"
        },
        {
          text: "Sum of first 15 terms of AP: 3, 7, 11, 15, ...",
          answer: 465,
          hint: "Sum = n/2[2a + (n-1)d]"
        },
        {
          text: "Find the common difference if a₁ = 7 and a₅ = 19",
          answer: 3,
          hint: "a₅ = a₁ + 4d"
        }
      ]
    },
    {
      name: "Mountain Climb",
      theme: "mountain",
      color: "#795548",
      questions: [
        {
          text: "From 30m away, angle of elevation to top is 45°. Find height.",
          answer: 30,
          hint: "tan(45°) = height/distance"
        },
        {
          text: "A 10m ladder makes 60° with ground. Find height reached.",
          answer: 8.66,
          hint: "sin(60°) = height/hypotenuse, sin(60°) ≈ 0.866"
        },
        {
          text: "cos(30°) × sin(60°) = ? (round to 2 decimal places)",
          answer: 0.75,
          hint: "cos(30°) = √3/2, sin(60°) = √3/2"
        }
      ]
    },
    {
      name: "Dice Challenge",
      theme: "casino",
      color: "#f44336",
      questions: [
        {
          text: "Probability of getting a sum of 7 with two dice? (as fraction: numerator only)",
          answer: 6,
          hint: "Count favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)"
        },
        {
          text: "From a deck of 52 cards, P(drawing a King) = ? (as percentage)",
          answer: 7.69,
          hint: "4 Kings out of 52 cards = 4/52 = 1/13 ≈ 7.69%"
        },
        {
          text: "Coin tossed 3 times. P(exactly 2 heads) = ? (as decimal)",
          answer: 0.375,
          hint: "3C2 × (1/2)² × (1/2)¹ = 3/8 = 0.375"
        }
      ]
    },
    {
      name: "Builder's Challenge",
      theme: "construction",
      color: "#607d8b",
      questions: [
        {
          text: "Volume of cylinder: radius 7cm, height 10cm (use π ≈ 3.14)",
          answer: 1538.6,
          hint: "V = πr²h"
        },
        {
          text: "Surface area of cube with side 8cm",
          answer: 384,
          hint: "SA = 6a²"
        },
        {
          text: "Volume of cone: radius 6cm, height 8cm (use π ≈ 3.14)",
          answer: 301.44,
          hint: "V = (1/3)πr²h"
        }
      ]
    }
  ];

  const startLevel = (levelNum: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: levelNum,
      questionIndex: 0,
      health: 100,
      currentQuestion: levels[levelNum - 1].questions[0]
    }));
    setShowQuestion(true);
    setUserAnswer('');
    setFeedback('');
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const userAnswerNum = parseFloat(userAnswer);
    const correctAnswer = gameState.currentQuestion?.answer || 0;
    const tolerance = 0.1;
    const correct = Math.abs(userAnswerNum - correctAnswer) <= tolerance;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setFeedback(t.correct);
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100
      }));
    } else {
      setFeedback(`${t.incorrect}. ${t.theAnswer} ${correctAnswer}. ${t.hint} ${gameState.currentQuestion?.hint}`);
      setGameState(prev => ({
        ...prev,
        health: Math.max(0, prev.health - 20),
        lives: prev.health <= 20 ? Math.max(0, prev.lives - 1) : prev.lives
      }));
    }
  };

  const nextQuestion = () => {
    const currentLevelData = levels[gameState.currentLevel - 1];
    const nextIndex = gameState.questionIndex + 1;

    if (nextIndex >= currentLevelData.questions.length) {
      // Level completed
      setGameState(prev => ({
        ...prev,
        score: prev.score + 500,
        completedLevels: prev.completedLevels.map((completed, index) => 
          index === prev.currentLevel - 1 ? true : completed
        ),
        currentLevel: 0,
        questionIndex: 0,
        currentQuestion: null
      }));
      setShowQuestion(false);
      setFeedback(t.levelComplete);
      setShowFeedback(true);
      
      // Check if all levels completed
      const allCompleted = gameState.completedLevels.every((completed, index) => 
        index === gameState.currentLevel - 1 ? true : completed
      );
      
      if (allCompleted) {
        setTimeout(() => {
          const finalScore = Math.min(100, Math.floor(gameState.score / 50));
          onComplete(finalScore);
        }, 2000);
      }
    } else {
      // Next question
      setGameState(prev => ({
        ...prev,
        questionIndex: nextIndex,
        currentQuestion: currentLevelData.questions[nextIndex]
      }));
      setUserAnswer('');
      setFeedback('');
      setShowFeedback(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!showFeedback) {
        checkAnswer();
      } else {
        nextQuestion();
      }
    }
  };

  const renderLevelSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.selectLevel}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                gameState.completedLevels[index] 
                  ? 'bg-green-500/20 border-green-500' 
                  : index === 0 || gameState.completedLevels[index - 1]
                    ? 'hover:bg-blue-500/10'
                    : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => {
                if (index === 0 || gameState.completedLevels[index - 1]) {
                  startLevel(index + 1);
                }
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">
                  {index === 0 && '🏰'}
                  {index === 1 && '🌀'}
                  {index === 2 && '💰'}
                  {index === 3 && '⛰'}
                  {index === 4 && '🎲'}
                  {index === 5 && '🏗'}
                </div>
                <h3 className="font-semibold mb-2">{level.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {level.questions.length} challenges
                </p>
                {gameState.completedLevels[index] && (
                  <Badge variant="secondary" className="mt-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {levels[gameState.currentLevel - 1]?.name}
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="secondary">
            <Target className="w-3 h-3 mr-1" />
            Question {gameState.questionIndex + 1} of {levels[gameState.currentLevel - 1]?.questions.length}
          </Badge>
          <Badge variant="secondary">
            <Calculator className="w-3 h-3 mr-1" />
            {t.score}: {gameState.score}
          </Badge>
          <Badge variant="secondary">
            <Heart className="w-3 h-3 mr-1" />
            {t.lives}: {gameState.lives}
          </Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">
              {gameState.currentQuestion?.text}
            </h3>
            
            <div className="flex justify-center">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.enterAnswer}
                className="w-48 text-center"
                disabled={showFeedback}
              />
            </div>

            {!showFeedback ? (
              <Button onClick={checkAnswer} className="w-48">
                {t.submitAnswer}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {feedback}
                </div>
                <Button onClick={nextQuestion} className="w-48">
                  {t.nextChallenge}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
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

        {/* Game Stats */}
        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            {t.score}: {gameState.score} {t.points}
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            {t.lives}: {gameState.lives}
          </Badge>
        </div>

        {/* Main Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            {!showQuestion ? renderLevelSelection() : renderQuestion()}
          </CardContent>
        </Card>

        {/* Progress */}
        {gameState.completedLevels.some(completed => completed) && (
          <div className="text-center">
            <p className="text-muted-foreground">
              Completed Levels: {gameState.completedLevels.filter(Boolean).length} / {levels.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overall10Math;

