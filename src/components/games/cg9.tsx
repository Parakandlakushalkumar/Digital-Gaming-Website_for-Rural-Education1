import React, { useState, useEffect } from 'react';
import { MapPin, Award, RotateCcw, CheckCircle, XCircle, Target } from 'lucide-react';

const CoordinateGeometryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35);
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the distance between points A(3, 4) and B(6, 8)?",
      options: ["3", "4", "5", "7"],
      correct: 2,
      explanation: "Using distance formula: √[(6-3)² + (8-4)²] = √[9 + 16] = √25 = 5",
      topic: "Distance Formula"
    },
    {
      id: 2,
      question: "The midpoint of the line segment joining (2, 3) and (8, 7) is:",
      options: ["(5, 5)", "(4, 6)", "(6, 4)", "(10, 10)"],
      correct: 0,
      explanation: "Midpoint formula: ((2+8)/2, (3+7)/2) = (10/2, 10/2) = (5, 5)",
      topic: "Midpoint Formula"
    },
    {
      id: 3,
      question: "In which quadrant does the point (-3, 5) lie?",
      options: ["I", "II", "III", "IV"],
      correct: 1,
      explanation: "Point (-3, 5) has negative x-coordinate and positive y-coordinate, so it lies in Quadrant II.",
      topic: "Quadrants"
    },
    {
      id: 4,
      question: "What is the slope of the line passing through (1, 2) and (4, 8)?",
      options: ["1", "2", "3", "6"],
      correct: 1,
      explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (8 - 2)/(4 - 1) = 6/3 = 2",
      topic: "Slope"
    },
    {
      id: 5,
      question: "The area of triangle with vertices at (0, 0), (4, 0), and (0, 3) is:",
      options: ["6", "7", "12", "24"],
      correct: 0,
      explanation: "This is a right triangle with base = 4 and height = 3. Area = (1/2) × 4 × 3 = 6",
      topic: "Area of Triangle"
    },
    {
      id: 6,
      question: "The equation of line passing through (2, 3) and (4, 7) is:",
      options: ["y = 2x - 1", "y = 2x + 1", "y = x + 1", "y = 3x - 3"],
      correct: 0,
      explanation: "Slope = (7-3)/(4-2) = 2. Using point-slope: y - 3 = 2(x - 2), so y = 2x - 1",
      topic: "Equation of Line"
    },
    {
      id: 7,
      question: "The center of circle x² + y² - 4x + 6y - 3 = 0 is:",
      options: ["(2, -3)", "(-2, 3)", "(4, -6)", "(-4, 6)"],
      correct: 0,
      explanation: "Rewrite as (x-2)² + (y+3)² = 16. The center is (2, -3).",
      topic: "Circle Equation"
    },
    {
      id: 8,
      question: "What is the radius of circle (x-1)² + (y+2)² = 25?",
      options: ["5", "10", "25", "√25"],
      correct: 0,
      explanation: "In standard form (x-h)² + (y-k)² = r², we have r² = 25, so r = 5",
      topic: "Circle Properties"
    },
    {
      id: 9,
      question: "The point that divides the line segment joining (2, 3) and (8, 9) in ratio 1:2 is:",
      options: ["(4, 5)", "(5, 6)", "(6, 7)", "(3, 4)"],
      correct: 0,
      explanation: "Using section formula: ((1×8 + 2×2)/(1+2), (1×9 + 2×3)/(1+2)) = (12/3, 15/3) = (4, 5)",
      topic: "Section Formula"
    },
    {
      id: 10,
      question: "Three points A(1, 2), B(3, 6), and C(5, 10) are:",
      options: ["Collinear", "Form a right triangle", "Form an equilateral triangle", "None of these"],
      correct: 0,
      explanation: "Slope of AB = (6-2)/(3-1) = 2, Slope of BC = (10-6)/(5-3) = 2. Same slopes mean collinear.",
      topic: "Collinearity"
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
    setTimeLeft(35);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false);
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 4));
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
    setTimeLeft(35);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 18)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Coordinate Geometry Master!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-orange-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-red-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "🎯 Coordinate Expert!" : 
               percentage >= 70 ? "📍 Great Navigation!" :
               percentage >= 50 ? "🗺️ Good Direction!" : "🧭 Keep Exploring!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-8 h-8 text-orange-400" />
              Coordinate Geometry Quiz
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
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
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
              <div className="bg-gradient-to-r from-green-500/20 to-orange-500/20 rounded-xl p-3 mb-4 border border-green-400/30">
                <div className="text-sm text-green-300">
                  Points earned: {10 + Math.max(0, Math.floor(timeLeft / 4))} 
                  {timeLeft > 0 && ` (${Math.max(0, Math.floor(timeLeft / 4))} time bonus)`}
                </div>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinateGeometryQuiz;