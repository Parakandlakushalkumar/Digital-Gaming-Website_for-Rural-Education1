import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, RotateCcw, CheckCircle, XCircle, Grid3X3 } from 'lucide-react';

const LinearEquationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which of the following is a linear equation in two variables?",
      options: ["x² + y = 5", "2x + 3y = 6", "xy + 2 = 0", "x + 1/y = 3"],
      correct: 1,
      explanation: "A linear equation in two variables has the form ax + by + c = 0, where the variables have degree 1. Only 2x + 3y = 6 fits this form.",
      topic: "Definition"
    },
    {
      id: 2,
      question: "What is the slope of the line 3x + 4y = 12?",
      options: ["3/4", "-3/4", "4/3", "-4/3"],
      correct: 1,
      explanation: "Rewrite as y = -3x/4 + 3. The slope is the coefficient of x, which is -3/4.",
      topic: "Slope"
    },
    {
      id: 3,
      question: "Find the x-intercept of 2x + 5y = 10:",
      options: ["(5, 0)", "(0, 2)", "(2, 0)", "(0, 5)"],
      correct: 0,
      explanation: "For x-intercept, set y = 0: 2x + 5(0) = 10, so 2x = 10, x = 5. Point is (5, 0).",
      topic: "Intercepts"
    },
    {
      id: 4,
      question: "The equation of line passing through (2, 3) with slope -2 is:",
      options: ["y = -2x + 7", "y = -2x - 7", "y = 2x - 1", "y = -2x + 1"],
      correct: 0,
      explanation: "Using point-slope form: y - 3 = -2(x - 2), which gives y - 3 = -2x + 4, so y = -2x + 7.",
      topic: "Point-Slope Form"
    },
    {
      id: 5,
      question: "Two lines are parallel if they have:",
      options: ["Same slope, same y-intercept", "Same slope, different y-intercepts", "Different slopes", "Opposite slopes"],
      correct: 1,
      explanation: "Parallel lines have the same slope but different y-intercepts. If they had the same y-intercept too, they would be the same line.",
      topic: "Parallel Lines"
    },
    {
      id: 6,
      question: "If two lines are perpendicular, their slopes are:",
      options: ["Equal", "Opposite", "Negative reciprocals", "Both positive"],
      correct: 2,
      explanation: "For perpendicular lines, if one slope is m, the other is -1/m (negative reciprocal).",
      topic: "Perpendicular Lines"
    },
    {
      id: 7,
      question: "The solution to the system: x + y = 5, x - y = 1 is:",
      options: ["(3, 2)", "(2, 3)", "(4, 1)", "(1, 4)"],
      correct: 0,
      explanation: "Add the equations: 2x = 6, so x = 3. Substitute back: 3 + y = 5, so y = 2.",
      topic: "System of Equations"
    },
    {
      id: 8,
      question: "How many solutions does the system x + 2y = 4, 2x + 4y = 8 have?",
      options: ["No solution", "One solution", "Two solutions", "Infinite solutions"],
      correct: 3,
      explanation: "The second equation is exactly 2 times the first equation, so they represent the same line. Hence, infinite solutions.",
      topic: "Types of Solutions"
    },
    {
      id: 9,
      question: "The distance from point (3, 4) to line 3x + 4y - 25 = 0 is:",
      options: ["0", "5", "3", "4"],
      correct: 0,
      explanation: "Using distance formula: |3(3) + 4(4) - 25|/√(3² + 4²) = |9 + 16 - 25|/5 = 0. The point lies on the line.",
      topic: "Distance Formula"
    },
    {
      id: 10,
      question: "Which method is best for solving: 3x + y = 7, x - 2y = 1?",
      options: ["Graphical method", "Substitution method", "Elimination method", "All are equally good"],
      correct: 1,
      explanation: "Substitution is efficient here since the second equation easily gives x = 1 + 2y, which can be substituted into the first.",
      topic: "Solution Methods"
    }
  ];

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false);
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 3));
      setScore(score + 10 + timeBonus);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      startTimer();
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimerActive(false);
    setTimeLeft(30);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 13)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Linear Equations Expert!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "🏆 Linear Master!" : 
               percentage >= 70 ? "⭐ Excellent Work!" :
               percentage >= 50 ? "📈 Good Progress!" : "📚 Keep Learning!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              Linear Equations Quiz
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="bg-black/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
              {currentQ.topic}
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-6 leading-relaxed">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] font-medium
                  ${showResult 
                    ? index === currentQ.correct
                      ? 'bg-green-500/30 border-2 border-green-400 text-green-100'
                      : selectedAnswer === index 
                        ? 'bg-red-500/30 border-2 border-red-400 text-red-100'
                        : 'bg-white/5 border border-white/20 text-white/70'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        {showResult && (
          <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl border-2 
            ${isCorrect ? 'border-green-400' : 'border-red-400'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              <h3 className="text-xl font-bold">
                {isCorrect ? 'Correct!' : selectedAnswer === -1 ? 'Time Up!' : 'Not Quite'}
              </h3>
            </div>
            
            <p className="text-white mb-4 leading-relaxed">{currentQ.explanation}</p>
            
            {isCorrect && (
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-3 mb-4 border border-green-400/30">
                <div className="text-sm text-green-300">
                  Points earned: {10 + Math.max(0, Math.floor(timeLeft / 3))} 
                  {timeLeft > 0 && ` (${Math.max(0, Math.floor(timeLeft / 3))} time bonus)`}
                </div>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinearEquationsQuiz;