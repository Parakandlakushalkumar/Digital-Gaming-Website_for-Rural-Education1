import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Calculator } from 'lucide-react';

const ExponentsPowersQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is 2⁴?",
      options: ["8", "16", "12", "24"],
      correct: 1,
      difficulty: "Easy",
      explanation: "2⁴ = 2 × 2 × 2 × 2 = 16. The exponent tells us how many times to multiply the base by itself."
    },
    {
      question: "Simplify: 3² × 3³",
      options: ["3⁵", "3⁶", "9⁵", "6⁵"],
      correct: 0,
      difficulty: "Medium",
      explanation: "When multiplying powers with the same base, add the exponents: 3² × 3³ = 3²⁺³ = 3⁵"
    },
    {
      question: "What is the value of any number raised to the power of 0?",
      options: ["0", "1", "The number itself", "Undefined"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Any non-zero number raised to the power of 0 equals 1. This is a fundamental rule: a⁰ = 1 (where a ≠ 0)."
    },
    {
      question: "Simplify: (2³)²",
      options: ["2⁵", "2⁶", "4⁵", "4⁶"],
      correct: 1,
      difficulty: "Medium",
      explanation: "When raising a power to another power, multiply the exponents: (2³)² = 2³ˣ² = 2⁶"
    },
    {
      question: "What is 5⁻²?",
      options: ["1/25", "1/10", "-25", "-10"],
      correct: 0,
      difficulty: "Hard",
      explanation: "A negative exponent means the reciprocal: 5⁻² = 1/5² = 1/25"
    },
    {
      question: "Simplify: 8³ ÷ 8¹",
      options: ["8²", "8⁴", "64", "8³"],
      correct: 0,
      difficulty: "Medium",
      explanation: "When dividing powers with the same base, subtract the exponents: 8³ ÷ 8¹ = 8³⁻¹ = 8²"
    },
    {
      question: "Express 0.001 as a power of 10:",
      options: ["10⁻³", "10⁻²", "10³", "10⁻¹"],
      correct: 0,
      difficulty: "Hard",
      explanation: "0.001 = 1/1000 = 1/10³ = 10⁻³. Each decimal place to the right represents a negative power of 10."
    },
    {
      question: "What is (3 × 4)²?",
      options: ["144", "49", "24", "36"],
      correct: 0,
      difficulty: "Medium",
      explanation: "(3 × 4)² = 12² = 144. First calculate inside parentheses, then apply the exponent."
    },
    {
      question: "Simplify: 2⁵ × 2⁻³",
      options: ["2²", "2⁸", "2⁻¹⁵", "2¹⁵"],
      correct: 0,
      difficulty: "Hard",
      explanation: "2⁵ × 2⁻³ = 2⁵⁺⁽⁻³⁾ = 2⁵⁻³ = 2². Add exponents when multiplying same bases."
    },
    {
      question: "What is the square root of 2⁸?",
      options: ["2⁴", "2²", "4", "16"],
      correct: 0,
      difficulty: "Hard",
      explanation: "√(2⁸) = (2⁸)^(1/2) = 2⁸ˣ¹/² = 2⁴. Square root is the same as raising to the power 1/2."
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
          <h2 className="text-3xl font-bold mb-4">Exponents Master!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Excellent! You've mastered exponents and powers!" : 
             score >= 6 ? "Good work! Your understanding is solid." :
             "Keep practicing - exponents are powerful tools!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            <Calculator className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Exponents & Powers Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Mathematics</span>
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
                  : 'hover:bg-blue-50 border-gray-200 hover:border-blue-300'
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
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold mb-2">Solution:</h3>
          <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length} • {Math.round((score / Math.max(currentQuestion, 1)) * 100)}%
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ExponentsPowersQuiz;