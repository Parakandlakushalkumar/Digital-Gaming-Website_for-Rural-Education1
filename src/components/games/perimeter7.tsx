import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Ruler, Award } from 'lucide-react';

const MeasurementsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
      options: ["13 cm", "26 cm", "40 cm", "18 cm"],
      correct: 1,
      explanation: "Perimeter of rectangle = 2(length + width) = 2(8 + 5) = 2(13) = 26 cm"
    },
    {
      question: "What is the area of a square with side length 6 cm?",
      options: ["24 cm²", "36 cm²", "12 cm²", "18 cm²"],
      correct: 1,
      explanation: "Area of square = side × side = 6 × 6 = 36 cm²"
    },
    {
      question: "The area of a triangle with base 10 cm and height 8 cm is:",
      options: ["80 cm²", "40 cm²", "18 cm²", "20 cm²"],
      correct: 1,
      explanation: "Area of triangle = ½ × base × height = ½ × 10 × 8 = 40 cm²"
    },
    {
      question: "What is the volume of a cube with side length 4 cm?",
      options: ["16 cm³", "48 cm³", "64 cm³", "24 cm³"],
      correct: 2,
      explanation: "Volume of cube = side³ = 4³ = 4 × 4 × 4 = 64 cm³"
    },
    {
      question: "The circumference of a circle with radius 7 cm is: (use π = 22/7)",
      options: ["22 cm", "44 cm", "14 cm", "28 cm"],
      correct: 1,
      explanation: "Circumference = 2πr = 2 × (22/7) × 7 = 2 × 22 = 44 cm"
    },
    {
      question: "What is the area of a circle with radius 5 cm? (use π = 3.14)",
      options: ["31.4 cm²", "15.7 cm²", "78.5 cm²", "25 cm²"],
      correct: 2,
      explanation: "Area of circle = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²"
    },
    {
      question: "The volume of a rectangular box with length 6 cm, width 4 cm, and height 3 cm is:",
      options: ["72 cm³", "13 cm³", "26 cm³", "36 cm³"],
      correct: 0,
      explanation: "Volume of rectangular box = length × width × height = 6 × 4 × 3 = 72 cm³"
    },
    {
      question: "What is the surface area of a cube with side length 3 cm?",
      options: ["18 cm²", "27 cm²", "54 cm²", "36 cm²"],
      correct: 2,
      explanation: "Surface area of cube = 6 × side² = 6 × 3² = 6 × 9 = 54 cm²"
    },
    {
      question: "The perimeter of a regular hexagon with side length 4 cm is:",
      options: ["16 cm", "20 cm", "24 cm", "28 cm"],
      correct: 2,
      explanation: "Perimeter of regular hexagon = 6 × side length = 6 × 4 = 24 cm"
    },
    {
      question: "What is the area of a parallelogram with base 12 cm and height 5 cm?",
      options: ["17 cm²", "34 cm²", "60 cm²", "30 cm²"],
      correct: 2,
      explanation: "Area of parallelogram = base × height = 12 × 5 = 60 cm²"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswers([...userAnswers, {
      questionIndex: currentQuestion,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    }]);
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <p className="text-gray-600 mt-2">
                You scored {Math.round((score / questions.length) * 100)}%
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Performance Summary:</h3>
              {score === questions.length && (
                <p className="text-green-600 font-medium">Perfect! You're a measurement master! 📏</p>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <p className="text-green-600 font-medium">Excellent! Your measurement skills are impressive! 📐</p>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <p className="text-yellow-600 font-medium">Good work! Keep practicing area and volume formulas! 📊</p>
              )}
              {score < questions.length * 0.6 && (
                <p className="text-red-600 font-medium">Keep studying! Review perimeter, area, and volume formulas! 📚</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ruler className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-white">Measurements Quiz</h1>
            <Ruler className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-amber-100 mb-4">Master perimeter, area, surface area, and volume!</p>
          <div className="flex justify-center gap-4 text-white">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              Score: {score}/{questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-white bg-opacity-20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-amber-100 border-amber-500 text-amber-800'
                    : showResult && index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    <span className="ml-2">
                      {index === questions[currentQuestion].correct ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="w-6 h-6 text-red-600" />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-semibold text-amber-800 mb-2">Explanation:</h3>
              <p className="text-amber-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementsQuiz;