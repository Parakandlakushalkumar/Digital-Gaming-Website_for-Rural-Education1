import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Target, Award } from 'lucide-react';

const SimpleEquationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "Solve for x: x + 5 = 12",
      options: ["x = 7", "x = 17", "x = 5", "x = 12"],
      correct: 0,
      explanation: "To solve x + 5 = 12, subtract 5 from both sides: x = 12 - 5 = 7"
    },
    {
      question: "Solve for y: 3y = 15",
      options: ["y = 12", "y = 5", "y = 18", "y = 3"],
      correct: 1,
      explanation: "To solve 3y = 15, divide both sides by 3: y = 15 ÷ 3 = 5"
    },
    {
      question: "Solve for a: a - 8 = 4",
      options: ["a = -4", "a = 12", "a = 4", "a = -12"],
      correct: 1,
      explanation: "To solve a - 8 = 4, add 8 to both sides: a = 4 + 8 = 12"
    },
    {
      question: "Solve for x: 2x + 3 = 11",
      options: ["x = 7", "x = 4", "x = 14", "x = 8"],
      correct: 1,
      explanation: "First subtract 3: 2x = 11 - 3 = 8. Then divide by 2: x = 8 ÷ 2 = 4"
    },
    {
      question: "Solve for m: m/4 = 6",
      options: ["m = 2", "m = 10", "m = 24", "m = 1.5"],
      correct: 2,
      explanation: "To solve m/4 = 6, multiply both sides by 4: m = 6 × 4 = 24"
    },
    {
      question: "Solve for p: 5p - 7 = 18",
      options: ["p = 5", "p = 3.6", "p = 25", "p = 11"],
      correct: 0,
      explanation: "First add 7: 5p = 18 + 7 = 25. Then divide by 5: p = 25 ÷ 5 = 5"
    },
    {
      question: "Solve for x: -2x = 10",
      options: ["x = 5", "x = -5", "x = 12", "x = -12"],
      correct: 1,
      explanation: "To solve -2x = 10, divide both sides by -2: x = 10 ÷ (-2) = -5"
    },
    {
      question: "Solve for n: 3n + 1 = 2n + 7",
      options: ["n = 6", "n = 8", "n = 4", "n = 2"],
      correct: 0,
      explanation: "Subtract 2n from both sides: 3n - 2n + 1 = 7, so n + 1 = 7. Then subtract 1: n = 6"
    },
    {
      question: "Solve for k: 4k - 5 = 3k + 2",
      options: ["k = 3", "k = 7", "k = -3", "k = -7"],
      correct: 1,
      explanation: "Subtract 3k: 4k - 3k - 5 = 2, so k - 5 = 2. Add 5: k = 7"
    },
    {
      question: "Solve for x: (x + 2)/3 = 4",
      options: ["x = 10", "x = 6", "x = 14", "x = 2"],
      correct: 0,
      explanation: "Multiply both sides by 3: x + 2 = 12. Then subtract 2: x = 10"
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-cyan-900 to-blue-900 p-4">
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
                <p className="text-green-600 font-medium">Perfect! You're an equation-solving champion! 🎯</p>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <p className="text-green-600 font-medium">Excellent! You have strong problem-solving skills! ⚡</p>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <p className="text-yellow-600 font-medium">Good work! Keep practicing equation solving techniques! 📝</p>
              )}
              {score < questions.length * 0.6 && (
                <p className="text-red-600 font-medium">Keep practicing! Focus on isolating variables step by step! 🔍</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-cyan-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Simple Equations</h1>
            <Target className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-cyan-100 mb-4">Solve equations and find the value of variables!</p>
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
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
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
                      : 'bg-cyan-100 border-cyan-500 text-cyan-800'
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
            <div className="mt-6 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
              <h3 className="font-semibold text-cyan-800 mb-2">Explanation:</h3>
              <p className="text-cyan-700">{questions[currentQuestion].explanation}</p>
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
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleEquationsQuiz;