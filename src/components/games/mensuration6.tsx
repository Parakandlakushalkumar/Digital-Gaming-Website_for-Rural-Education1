import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Square } from 'lucide-react';

interface MensurationQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const MensurationQuiz = ({ onComplete }: MensurationQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: ["13 cm²", "26 cm²", "40 cm²", "45 cm²"],
      correct: 2,
      explanation: "Area of rectangle = length × width = 8 × 5 = 40 cm²"
    },
    {
      question: "What is the perimeter of a square with side 7 cm?",
      options: ["14 cm", "21 cm", "28 cm", "49 cm"],
      correct: 2,
      explanation: "Perimeter of square = 4 × side = 4 × 7 = 28 cm"
    },
    {
      question: "What is the area of a circle with radius 3 cm? (use π = 3.14)",
      options: ["9.42 cm²", "18.84 cm²", "28.26 cm²", "37.68 cm²"],
      correct: 2,
      explanation: "Area of circle = πr² = 3.14 × 3² = 3.14 × 9 = 28.26 cm²"
    },
    {
      question: "What is the volume of a cube with side 4 cm?",
      options: ["16 cm³", "32 cm³", "48 cm³", "64 cm³"],
      correct: 3,
      explanation: "Volume of cube = side³ = 4³ = 4 × 4 × 4 = 64 cm³"
    },
    {
      question: "What is the circumference of a circle with radius 5 cm? (use π = 3.14)",
      options: ["15.7 cm", "31.4 cm", "78.5 cm", "25.12 cm"],
      correct: 1,
      explanation: "Circumference = 2πr = 2 × 3.14 × 5 = 31.4 cm"
    },
    {
      question: "What is the area of a triangle with base 6 cm and height 8 cm?",
      options: ["24 cm²", "48 cm²", "14 cm²", "28 cm²"],
      correct: 0,
      explanation: "Area of triangle = ½ × base × height = ½ × 6 × 8 = 24 cm²"
    },
    {
      question: "What is the volume of a cylinder with radius 3 cm and height 7 cm? (use π = 3.14)",
      options: ["63 cm³", "197.82 cm³", "65.94 cm³", "131.88 cm³"],
      correct: 1,
      explanation: "Volume of cylinder = πr²h = 3.14 × 3² × 7 = 3.14 × 9 × 7 = 197.82 cm³"
    },
    {
      question: "What is the surface area of a cube with side 5 cm?",
      options: ["100 cm²", "125 cm²", "150 cm²", "75 cm²"],
      correct: 2,
      explanation: "Surface area of cube = 6 × side² = 6 × 5² = 6 × 25 = 150 cm²"
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4 flex items-center justify-center">
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Square className="text-yellow-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mensuration Quiz</h1>
              <p className="text-gray-600">Area, Perimeter, Volume</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-yellow-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
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
                    : 'bg-gray-50 border-gray-300 hover:bg-yellow-50 hover:border-yellow-300 cursor-pointer'
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
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 font-medium">Explanation:</p>
              <p className="text-yellow-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MensurationQuiz;