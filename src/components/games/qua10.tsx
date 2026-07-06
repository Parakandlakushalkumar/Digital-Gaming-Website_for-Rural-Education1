import React, { useState } from 'react';
import { Zap, Trophy, RotateCcw, Brain, CheckCircle, XCircle } from 'lucide-react';

const QuadraticEquationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "What is the standard form of a quadratic equation?",
      options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + c = 0", "ax + by + c = 0"],
      correct: "ax² + bx + c = 0",
      explanation: "The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0. The highest power of x is 2.",
      difficulty: "Easy"
    },
    {
      question: "Find the roots of x² - 5x + 6 = 0:",
      options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 2, -3"],
      correct: "x = 2, 3",
      explanation: "Factoring: x² - 5x + 6 = (x-2)(x-3) = 0. So x = 2 or x = 3. Check: 2² - 5(2) + 6 = 0 ✓",
      difficulty: "Medium"
    },
    {
      question: "What is the discriminant of 2x² - 3x + 1 = 0?",
      options: ["1", "9", "17", "5"],
      correct: "1",
      explanation: "Discriminant = b² - 4ac. Here a=2, b=-3, c=1. So D = (-3)² - 4(2)(1) = 9 - 8 = 1",
      difficulty: "Medium"
    },
    {
      question: "If discriminant > 0, the quadratic has:",
      options: ["No real roots", "One real root", "Two equal roots", "Two distinct real roots"],
      correct: "Two distinct real roots",
      explanation: "When D > 0, the quadratic formula gives two different real values, so there are two distinct real roots.",
      difficulty: "Easy"
    },
    {
      question: "Find the vertex of y = x² - 4x + 3:",
      options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(4, 3)"],
      correct: "(2, -1)",
      explanation: "Vertex x-coordinate: x = -b/2a = -(-4)/2(1) = 2. y = 2² - 4(2) + 3 = 4 - 8 + 3 = -1. So vertex is (2, -1).",
      difficulty: "Hard"
    },
    {
      question: "Solve x² = 25 using square root method:",
      options: ["x = 5", "x = -5", "x = ±5", "x = 25"],
      correct: "x = ±5",
      explanation: "Taking square root of both sides: x = ±√25 = ±5. Both +5 and -5 are solutions since (±5)² = 25.",
      difficulty: "Easy"
    },
    {
      question: "Complete the square: x² + 6x + 5 = 0",
      options: ["(x + 3)² = 4", "(x + 3)² = -4", "(x + 6)² = 31", "(x + 3)² = 14"],
      correct: "(x + 3)² = 4",
      explanation: "x² + 6x + 5 = 0 → x² + 6x = -5 → x² + 6x + 9 = -5 + 9 → (x + 3)² = 4",
      difficulty: "Hard"
    }
  ];

  const handleAnswerSelect = (answer) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !answerSubmitted) {
      setAnswerSubmitted(true);
      setShowExplanation(true);
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
      setAnswerSubmitted(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
    setSelectedAnswer('');
    setShowExplanation(false);
    setAnswerSubmitted(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete! ⚡</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You've mastered quadratic equations! 🎯
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Work!</strong> You have a strong grasp of quadratics! 📊
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review factoring and the quadratic formula! 📝
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <Zap className="w-8 h-8" />
          Quadratic Equations Quiz
        </h1>
        <p className="text-gray-600">Master the power of quadratic equations!</p>
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Brain className="w-5 h-5 text-orange-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-orange-100 px-3 py-1 rounded">Score: {score}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {questions[currentQuestion].question}
        </h3>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass = "p-3 text-left rounded-lg border-2 transition-all font-mono text-sm ";
            
            if (answerSubmitted) {
              if (option === questions[currentQuestion].correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-700";
              } else if (option === selectedAnswer && option !== questions[currentQuestion].correct) {
                buttonClass += "border-red-500 bg-red-50 text-red-700";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (selectedAnswer === option) {
                buttonClass += "border-orange-500 bg-orange-50";
              } else {
                buttonClass += "border-gray-200 hover:border-orange-300 hover:bg-orange-25";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={buttonClass}
                disabled={answerSubmitted}
              >
                <div className="flex items-center gap-2">
                  {answerSubmitted && option === questions[currentQuestion].correct && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {answerSubmitted && option === selectedAnswer && option !== questions[currentQuestion].correct && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Solution:</h4>
            <p className="text-blue-700 text-sm font-mono leading-relaxed">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {!answerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedAnswer
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuadraticEquationsQuiz;