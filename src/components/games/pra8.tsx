import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Compass } from 'lucide-react';

const PracticalGeometryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "Which instrument is used to draw circles and arcs?",
      options: ["Ruler", "Compass", "Protractor", "Set square"],
      correct: 1,
      difficulty: "Easy",
      explanation: "A compass is the geometric instrument specifically designed to draw circles and arcs of various radii."
    },
    {
      question: "What is the first step in constructing a triangle when three sides are given (SSS)?",
      options: ["Draw the longest side", "Draw any side", "Measure all angles", "Draw a circle"],
      correct: 1,
      difficulty: "Medium",
      explanation: "In SSS construction, start by drawing any one of the three given sides as the base, then use compass arcs to locate the third vertex."
    },
    {
      question: "Which tool is used to measure angles accurately?",
      options: ["Ruler", "Compass", "Protractor", "Divider"],
      correct: 2,
      difficulty: "Easy",
      explanation: "A protractor is specifically designed to measure and draw angles, typically graduated in degrees from 0° to 180°."
    },
    {
      question: "To construct a perpendicular bisector of a line segment, what do you need?",
      options: ["Only a ruler", "Only a compass", "Compass and ruler", "Protractor only"],
      correct: 2,
      difficulty: "Medium",
      explanation: "You need both compass (to draw arcs from endpoints) and ruler (to draw the straight line connecting the arc intersections)."
    },
    {
      question: "In constructing an angle bisector, the compass arcs should be drawn from:",
      options: ["The vertex only", "The endpoints of the sides", "Both vertex and endpoints", "Any convenient point"],
      correct: 0,
      difficulty: "Hard",
      explanation: "To bisect an angle, draw equal arcs from the vertex cutting both sides, then draw arcs from these intersection points to find the bisector."
    },
    {
      question: "What is the minimum information needed to construct a unique triangle?",
      options: ["One side", "Two sides", "Three measurements", "Two angles"],
      correct: 2,
      difficulty: "Medium",
      explanation: "You need three measurements: either SSS (three sides), SAS (two sides and included angle), or ASA/AAS (two angles and one side)."
    },
    {
      question: "When constructing a triangle with SAS (Side-Angle-Side), where do you place the given angle?",
      options: ["At any vertex", "Between the two given sides", "Opposite to the longest side", "At the right angle"],
      correct: 1,
      difficulty: "Hard",
      explanation: "In SAS construction, the given angle must be the included angle between the two given sides for a unique triangle."
    },
    {
      question: "To construct a 60° angle, you can:",
      options: ["Use protractor only", "Draw an equilateral triangle", "Bisect a 120° angle", "All of the above"],
      correct: 3,
      difficulty: "Hard",
      explanation: "All methods work: protractor directly measures 60°, equilateral triangles have 60° angles, and bisecting 120° gives 60°."
    },
    {
      question: "The perpendicular from a point to a line is the:",
      options: ["Longest distance", "Shortest distance", "Any distance", "Average distance"],
      correct: 1,
      difficulty: "Medium",
      explanation: "The perpendicular from a point to a line gives the shortest possible distance between the point and the line."
    },
    {
      question: "In practical geometry, what does 'construction' mean?",
      options: ["Building with tools", "Drawing with compass and ruler only", "Using any drawing tools", "Making 3D models"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Geometric construction refers to drawing figures using only a compass and unmarked ruler, following classical geometric principles."
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
          <h2 className="text-3xl font-bold mb-4">Construction Master!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Excellent! You've mastered geometric constructions!" : 
             score >= 6 ? "Good work! You understand construction techniques well." :
             "Keep practicing with compass and ruler!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
            <Compass className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Practical Geometry Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Constructions & Tools</span>
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
                  : 'hover:bg-indigo-50 border-gray-200 hover:border-indigo-300'
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
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
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
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticalGeometryQuiz;