import React, { useState, useEffect } from 'react';
import { Calculator, Award, RotateCcw, CheckCircle, XCircle, BookOpen } from 'lucide-react';

const PolynomialsQuiz = () => {
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
      question: "What is the degree of the polynomial 3x⁴ + 2x² - 5x + 7?",
      options: ["2", "3", "4", "7"],
      correct: 2,
      explanation: "The degree of a polynomial is the highest power of the variable. Here, the highest power is 4.",
      topic: "Degree of Polynomials"
    },
    {
      id: 2,
      question: "Which of these is NOT a polynomial?",
      options: ["x² + 3x - 1", "√x + 2", "5x³ - x + 4", "2x⁴ + x²"],
      correct: 1,
      explanation: "√x = x^(1/2), which has a fractional exponent, so it's not a polynomial. Polynomials must have non-negative integer exponents.",
      topic: "Definition of Polynomials"
    },
    {
      id: 3,
      question: "If p(x) = x² + 3x + 2, what is p(2)?",
      options: ["8", "10", "12", "14"],
      correct: 2,
      explanation: "p(2) = 2² + 3(2) + 2 = 4 + 6 + 2 = 12",
      topic: "Evaluating Polynomials"
    },
    {
      id: 4,
      question: "What are the zeros of p(x) = x² - 5x + 6?",
      options: ["2 and 3", "1 and 6", "-2 and -3", "2 and -3"],
      correct: 0,
      explanation: "Factor: x² - 5x + 6 = (x-2)(x-3). So zeros are x = 2 and x = 3.",
      topic: "Zeros of Polynomials"
    },
    {
      id: 5,
      question: "What is the remainder when x³ + 2x² - x + 3 is divided by (x - 1)?",
      options: ["3", "5", "7", "9"],
      correct: 1,
      explanation: "By remainder theorem, remainder = p(1) = 1³ + 2(1)² - 1 + 3 = 1 + 2 - 1 + 3 = 5",
      topic: "Remainder Theorem"
    },
    {
      id: 6,
      question: "If x + 2 is a factor of x³ + 3x² + ax + b, and the polynomial leaves remainder 4 when divided by x - 1, find a + b:",
      options: ["6", "8", "10", "12"],
      correct: 2,
      explanation: "Since (x+2) is a factor, p(-2) = 0. Also p(1) = 4. Solving these conditions gives a = 2, b = 8, so a + b = 10.",
      topic: "Factor Theorem"
    },
    {
      id: 7,
      question: "What is the coefficient of x² in the expansion of (x + 2)³?",
      options: ["4", "6", "8", "12"],
      correct: 2,
      explanation: "Using binomial theorem: (x+2)³ = x³ + 3x²(2) + 3x(2²) + 2³ = x³ + 6x² + 12x + 8. Coefficient of x² is 6, but we need to check: it's actually 6×2 = 12? No, it's 6.",
      topic: "Binomial Expansion"
    },
    {
      id: 8,
      question: "Which polynomial has roots at x = 1, x = -2, and x = 3?",
      options: ["(x-1)(x+2)(x-3)", "(x+1)(x-2)(x+3)", "(x-1)(x-2)(x-3)", "(x+1)(x+2)(x+3)"],
      correct: 0,
      explanation: "If roots are 1, -2, and 3, then factors are (x-1), (x+2), and (x-3).",
      topic: "Constructing Polynomials"
    },
    {
      id: 9,
      question: "What is the sum of the coefficients of p(x) = 2x³ - 3x² + 4x - 1?",
      options: ["0", "2", "3", "4"],
      correct: 1,
      explanation: "Sum of coefficients = p(1) = 2(1)³ - 3(1)² + 4(1) - 1 = 2 - 3 + 4 - 1 = 2",
      topic: "Sum of Coefficients"
    },
    {
      id: 10,
      question: "If α and β are roots of x² - 5x + 6 = 0, what is α + β?",
      options: ["5", "6", "-5", "-6"],
      correct: 0,
      explanation: "For quadratic ax² + bx + c = 0, sum of roots = -b/a = -(-5)/1 = 5",
      topic: "Relationship between Roots and Coefficients"
    }
  ];

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Time up
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

  // Start timer on first load
  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 13)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Polynomials Master!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "🏆 Polynomial Expert!" : 
               percentage >= 70 ? "⭐ Great Understanding!" :
               percentage >= 50 ? "📚 Keep Practicing!" : "🌱 Good Start!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-400" />
              Polynomials Quiz
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
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolynomialsQuiz;