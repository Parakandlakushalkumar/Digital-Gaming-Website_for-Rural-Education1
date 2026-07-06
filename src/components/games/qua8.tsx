import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Square } from 'lucide-react';

const QuadrilateralsPolygonsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "How many sides does a quadrilateral have?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      difficulty: "Easy",
      explanation: "A quadrilateral is a polygon with exactly 4 sides and 4 vertices. The prefix 'quad' means four."
    },
    {
      question: "What is the sum of interior angles in any quadrilateral?",
      options: ["180°", "270°", "360°", "450°"],
      correct: 2,
      difficulty: "Medium",
      explanation: "The sum of interior angles in any quadrilateral is always 360°. This can be proven by dividing the quadrilateral into two triangles."
    },
    {
      question: "Which quadrilateral has all sides equal and all angles 90°?",
      options: ["Rectangle", "Rhombus", "Square", "Parallelogram"],
      correct: 2,
      difficulty: "Easy",
      explanation: "A square has all four sides equal in length and all four angles equal to 90°. It combines properties of both rectangle and rhombus."
    },
    {
      question: "In a parallelogram, opposite sides are:",
      options: ["Perpendicular", "Parallel and equal", "Only parallel", "Only equal"],
      correct: 1,
      difficulty: "Medium",
      explanation: "In a parallelogram, opposite sides are both parallel and equal in length. This is one of the defining properties of parallelograms."
    },
    {
      question: "How many sides does a pentagon have?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      difficulty: "Easy",
      explanation: "A pentagon is a polygon with 5 sides and 5 vertices. The prefix 'penta' means five."
    },
    {
      question: "What is the sum of interior angles of a hexagon?",
      options: ["720°", "900°", "1080°", "540°"],
      correct: 0,
      difficulty: "Hard",
      explanation: "For any n-sided polygon: Sum = (n-2) × 180°. For hexagon (n=6): (6-2) × 180° = 4 × 180° = 720°"
    },
    {
      question: "A rhombus has:",
      options: ["All angles equal", "All sides equal", "Only opposite sides parallel", "All angles 90°"],
      correct: 1,
      difficulty: "Medium",
      explanation: "A rhombus has all four sides equal in length, but angles are not necessarily 90°. It's also a parallelogram with equal sides."
    },
    {
      question: "Which quadrilateral has only one pair of parallel sides?",
      options: ["Rectangle", "Parallelogram", "Trapezium", "Rhombus"],
      correct: 2,
      difficulty: "Medium",
      explanation: "A trapezium (or trapezoid) is defined as a quadrilateral with exactly one pair of parallel sides called bases."
    },
    {
      question: "The diagonals of a rectangle are:",
      options: ["Perpendicular", "Equal in length", "Parallel", "Different lengths"],
      correct: 1,
      difficulty: "Hard",
      explanation: "In a rectangle, the diagonals are equal in length and bisect each other, but they are not necessarily perpendicular unless it's a square."
    },
    {
      question: "How many diagonals does a pentagon have?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      difficulty: "Hard",
      explanation: "A pentagon has 5 diagonals. Formula for diagonals in n-sided polygon: n(n-3)/2. For pentagon: 5(5-3)/2 = 5 × 2/2 = 5."
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
          <h2 className="text-3xl font-bold mb-4">Geometry Expert!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Outstanding! You know your shapes and angles!" : 
             score >= 6 ? "Great! Your geometry knowledge is solid." :
             "Keep exploring the world of shapes and polygons!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
            <Square className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Quadrilaterals & Polygons Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Geometry</span>
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
                  : 'hover:bg-green-50 border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
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
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold mb-2">Explanation:</h3>
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
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuadrilateralsPolygonsQuiz;