import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Triangle } from 'lucide-react';

interface GeometryBasicsQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const GeometryBasicsQuiz = ({ onComplete }: GeometryBasicsQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correct: 1,
      explanation: "The sum of all interior angles in any triangle is always 180°"
    },
    {
      question: "How many sides does a hexagon have?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      explanation: "A hexagon is a polygon with 6 sides and 6 angles"
    },
    {
      question: "What type of angle is 95°?",
      options: ["Acute", "Right", "Obtuse", "Straight"],
      correct: 2,
      explanation: "An obtuse angle measures between 90° and 180°. 95° falls in this range"
    },
    {
      question: "Which lines never meet?",
      options: ["Perpendicular", "Parallel", "Intersecting", "Diagonal"],
      correct: 1,
      explanation: "Parallel lines are always the same distance apart and never intersect"
    },
    {
      question: "How many vertices does a cube have?",
      options: ["6", "8", "10", "12"],
      correct: 1,
      explanation: "A cube has 8 vertices (corners), 12 edges, and 6 faces"
    },
    {
      question: "What is the sum of exterior angles of any polygon?",
      options: ["180°", "360°", "540°", "720°"],
      correct: 1,
      explanation: "The sum of exterior angles of any polygon is always 360°"
    },
    {
      question: "In a right triangle, what is the longest side called?",
      options: ["Adjacent", "Opposite", "Hypotenuse", "Base"],
      correct: 2,
      explanation: "The hypotenuse is the longest side of a right triangle, opposite to the right angle"
    },
    {
      question: "How many diagonals does a pentagon have?",
      options: ["3", "4", "5", "10"],
      correct: 2,
      explanation: "A pentagon has 5 diagonals. Formula: n(n-3)/2 = 5(5-3)/2 = 5"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Trophy className="mx-auto mb-4 text-yellow-500" size={64} />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-6 text-gray-600">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={resetQuiz}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Triangle className="text-red-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Geometry Basics Quiz</h1>
              <p className="text-gray-600">Lines, Angles, Shapes</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-red-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  answered
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : index === selectedAnswer
                      ? 'bg-red-50 border-red-500 text-red-800'
                      : 'bg-gray-50 border-gray-300 text-gray-600'
                    : 'bg-gray-50 border-gray-300 hover:bg-red-50 hover:border-red-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {answered && index === questions[currentQuestion].correct && (
                    <CheckCircle className="text-green-600" size={20} />
                  )}
                  {answered && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                    <XCircle className="text-red-600" size={20} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {answered && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 font-medium">Explanation:</p>
              <p className="text-red-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometryBasicsQuiz;