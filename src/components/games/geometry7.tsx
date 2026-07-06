import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Triangle, Award } from 'lucide-react';

const GeometryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "What is the sum of all interior angles in any triangle?",
      options: ["90°", "180°", "360°", "270°"],
      correct: 1,
      explanation: "The sum of interior angles in any triangle is always 180°. This is a fundamental property of triangles."
    },
    {
      question: "In an equilateral triangle, each angle measures:",
      options: ["45°", "90°", "60°", "30°"],
      correct: 2,
      explanation: "In an equilateral triangle, all angles are equal. Since the sum is 180°, each angle is 180° ÷ 3 = 60°."
    },
    {
      question: "Which type of triangle has one angle measuring 90°?",
      options: ["Acute triangle", "Right triangle", "Obtuse triangle", "Equilateral triangle"],
      correct: 1,
      explanation: "A right triangle has exactly one angle measuring 90°. The other two angles are acute and sum to 90°."
    },
    {
      question: "What does SSS congruence criterion stand for?",
      options: ["Side-Side-Side", "Side-Side-Angle", "Side-Angle-Side", "Angle-Side-Angle"],
      correct: 0,
      explanation: "SSS stands for Side-Side-Side. If three sides of one triangle equal three sides of another triangle, the triangles are congruent."
    },
    {
      question: "In triangle ABC, if angle A = 50° and angle B = 70°, what is angle C?",
      options: ["60°", "80°", "50°", "120°"],
      correct: 0,
      explanation: "Since angles in a triangle sum to 180°: angle C = 180° - 50° - 70° = 60°."
    },
    {
      question: "Two triangles are congruent if they have:",
      options: ["Same perimeter only", "Same area only", "Same shape and size", "Same angles only"],
      correct: 2,
      explanation: "Congruent triangles have the same shape and size. All corresponding sides and angles are equal."
    },
    {
      question: "Which congruence criterion requires two sides and the included angle?",
      options: ["SSS", "SAS", "ASA", "AAS"],
      correct: 1,
      explanation: "SAS (Side-Angle-Side) requires two sides and the included angle between them to prove congruence."
    },
    {
      question: "An obtuse triangle has:",
      options: ["All angles less than 90°", "One angle greater than 90°", "All angles equal to 60°", "One angle equal to 90°"],
      correct: 1,
      explanation: "An obtuse triangle has exactly one angle greater than 90°. The other two angles are acute."
    },
    {
      question: "If two angles of one triangle equal two angles of another triangle, the triangles are:",
      options: ["Always congruent", "Similar but not necessarily congruent", "Never similar", "Always right triangles"],
      correct: 1,
      explanation: "If two angles are equal, the third angles are also equal (AA similarity). The triangles are similar but not necessarily congruent unless sides are also equal."
    },
    {
      question: "In an isosceles triangle, if the vertex angle is 40°, what are the base angles?",
      options: ["70° each", "40° each", "90° each", "80° each"],
      correct: 0,
      explanation: "In an isosceles triangle, base angles are equal. If vertex angle = 40°, then each base angle = (180° - 40°) ÷ 2 = 70°."
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
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 p-4">
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
                <p className="text-green-600 font-medium">Excellent! You've mastered triangles and congruence! 📐</p>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <p className="text-green-600 font-medium">Great work! Your geometry skills are strong! 🔺</p>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <p className="text-yellow-600 font-medium">Good progress! Keep studying triangle properties! 📊</p>
              )}
              {score < questions.length * 0.6 && (
                <p className="text-red-600 font-medium">Keep practicing! Review triangle types and congruence rules! 📚</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Triangle className="w-8 h-8 text-violet-400" />
            <h1 className="text-4xl font-bold text-white">Geometry: Triangles & Congruence</h1>
            <Triangle className="w-8 h-8 text-violet-400" />
          </div>
          <p className="text-violet-100 mb-4">Explore the fascinating world of triangles!</p>
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
              className="bg-gradient-to-r from-violet-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
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
                      : 'bg-violet-100 border-violet-500 text-violet-800'
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
            <div className="mt-6 p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
              <h3 className="font-semibold text-violet-800 mb-2">Explanation:</h3>
              <p className="text-violet-700">{questions[currentQuestion].explanation}</p>
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
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeometryQuiz;