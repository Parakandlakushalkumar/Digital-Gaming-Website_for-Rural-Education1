import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Variable } from 'lucide-react';

const AlgebraLinearEquationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "Solve for x: 2x + 5 = 13",
      options: ["x = 4", "x = 9", "x = 8", "x = 6"],
      correct: 0,
      difficulty: "Easy",
      explanation: "2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 8/2 → x = 4"
    },
    {
      question: "What is the coefficient of x in the equation 7x - 3 = 11?",
      options: ["3", "7", "11", "-3"],
      correct: 1,
      difficulty: "Easy",
      explanation: "The coefficient is the number multiplied by the variable. In 7x - 3 = 11, the coefficient of x is 7."
    },
    {
      question: "Solve: 3(x + 2) = 21",
      options: ["x = 5", "x = 7", "x = 3", "x = 9"],
      correct: 0,
      difficulty: "Medium",
      explanation: "3(x + 2) = 21 → 3x + 6 = 21 → 3x = 21 - 6 → 3x = 15 → x = 5"
    },
    {
      question: "If 5x - 7 = 2x + 8, find x:",
      options: ["x = 5", "x = 15", "x = 3", "x = 1"],
      correct: 0,
      difficulty: "Medium",
      explanation: "5x - 7 = 2x + 8 → 5x - 2x = 8 + 7 → 3x = 15 → x = 5"
    },
    {
      question: "Solve: (x + 3)/4 = 2",
      options: ["x = 5", "x = 8", "x = 11", "x = 2"],
      correct: 0,
      difficulty: "Medium",
      explanation: "(x + 3)/4 = 2 → x + 3 = 8 → x = 8 - 3 → x = 5"
    },
    {
      question: "What is the constant term in 4x + 9 = 0?",
      options: ["4", "x", "9", "0"],
      correct: 2,
      difficulty: "Easy",
      explanation: "The constant term is the number without a variable. In 4x + 9 = 0, the constant term is 9."
    },
    {
      question: "Solve: 2x + 3x - 4 = 16",
      options: ["x = 4", "x = 5", "x = 3", "x = 6"],
      correct: 0,
      difficulty: "Medium",
      explanation: "2x + 3x - 4 = 16 → 5x - 4 = 16 → 5x = 20 → x = 4"
    },
    {
      question: "If 3x + 12 = 0, what is x?",
      options: ["x = -4", "x = 4", "x = -12", "x = 12"],
      correct: 0,
      difficulty: "Medium",
      explanation: "3x + 12 = 0 → 3x = -12 → x = -12/3 → x = -4"
    },
    {
      question: "Solve: 6 - 2x = 14",
      options: ["x = -4", "x = 4", "x = -10", "x = 10"],
      correct: 0,
      difficulty: "Hard",
      explanation: "6 - 2x = 14 → -2x = 14 - 6 → -2x = 8 → x = 8/(-2) → x = -4"
    },
    {
      question: "Find x: 2(3x - 1) + 4 = 20",
      options: ["x = 3", "x = 4", "x = 2", "x = 5"],
      correct: 0,
      difficulty: "Hard",
      explanation: "2(3x - 1) + 4 = 20 → 6x - 2 + 4 = 20 → 6x + 2 = 20 → 6x = 18 → x = 3"
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
          <h2 className="text-3xl font-bold mb-4">Algebra Champion!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Excellent! You've conquered linear equations!" : 
             score >= 6 ? "Great work! You understand algebraic solving well." :
             "Keep practicing - algebra builds logical thinking!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            <Variable className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Algebra - Linear Equations Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Linear Equations in One Variable</span>
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
                  : 'hover:bg-purple-50 border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">{option}</span>
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
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold mb-2">Step-by-Step Solution:</h3>
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AlgebraLinearEquationsQuiz;