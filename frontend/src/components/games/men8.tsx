import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Box } from 'lucide-react';

const MensurationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: ["40 cm²", "26 cm²", "13 cm²", "20 cm²"],
      correct: 0,
      difficulty: "Easy",
      explanation: "Area of rectangle = length × width = 8 cm × 5 cm = 40 cm²"
    },
    {
      question: "The volume of a cube with side 4 cm is:",
      options: ["16 cm³", "48 cm³", "64 cm³", "24 cm³"],
      correct: 2,
      difficulty: "Easy",
      explanation: "Volume of cube = side³ = 4³ = 4 × 4 × 4 = 64 cm³"
    },
    {
      question: "What is the surface area of a cube with side 3 cm?",
      options: ["18 cm²", "27 cm²", "54 cm²", "36 cm²"],
      correct: 2,
      difficulty: "Medium",
      explanation: "Surface area of cube = 6 × side² = 6 × 3² = 6 × 9 = 54 cm²"
    },
    {
      question: "The area of a circle with radius 7 cm is: (use π = 22/7)",
      options: ["154 cm²", "44 cm²", "308 cm²", "22 cm²"],
      correct: 0,
      difficulty: "Medium",
      explanation: "Area of circle = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²"
    },
    {
      question: "Volume of a cylinder with radius 3 cm and height 7 cm is: (use π = 22/7)",
      options: ["198 cm³", "132 cm³", "66 cm³", "396 cm³"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Volume of cylinder = πr²h = (22/7) × 3² × 7 = (22/7) × 9 × 7 = 22 × 9 = 198 cm³"
    },
    {
      question: "The perimeter of a square with side 6 cm is:",
      options: ["12 cm", "18 cm", "24 cm", "36 cm"],
      correct: 2,
      difficulty: "Easy",
      explanation: "Perimeter of square = 4 × side = 4 × 6 = 24 cm"
    },
    {
      question: "Surface area of a cuboid with dimensions 4×3×2 cm is:",
      options: ["52 cm²", "26 cm²", "24 cm²", "48 cm²"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Surface area = 2(lb + bh + lh) = 2(4×3 + 3×2 + 4×2) = 2(12 + 6 + 8) = 2×26 = 52 cm²"
    },
    {
      question: "The circumference of a circle with diameter 14 cm is: (use π = 22/7)",
      options: ["22 cm", "44 cm", "88 cm", "28 cm"],
      correct: 1,
      difficulty: "Medium",
      explanation: "Circumference = πd = (22/7) × 14 = 22 × 2 = 44 cm"
    },
    {
      question: "Volume of a cuboid with dimensions 5×4×3 cm is:",
      options: ["60 cm³", "47 cm³", "12 cm³", "20 cm³"],
      correct: 0,
      difficulty: "Medium",
      explanation: "Volume of cuboid = length × breadth × height = 5 × 4 × 3 = 60 cm³"
    },
    {
      question: "The area of a triangle with base 8 cm and height 6 cm is:",
      options: ["48 cm²", "24 cm²", "14 cm²", "28 cm²"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Area of triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24 cm²"
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Mensuration Master!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Outstanding! You've mastered areas and volumes!" : 
             score >= 6 ? "Great! You understand mensuration well." :
             "Keep practicing with formulas and calculations!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">Mensuration - Surface Area & Volume Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Area & Volume Calculations</span>
        </div>
        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200'
                  : 'hover:bg-orange-50 border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono">{option}</span>
                {showResult && index === questions[currentQuestion].correct && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold mb-2">Solution:</h3>
          <p className="text-gray-700 font-mono text-sm">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length} • {Math.round((score / Math.max(currentQuestion, 1)) * 100)}%
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MensurationQuiz;