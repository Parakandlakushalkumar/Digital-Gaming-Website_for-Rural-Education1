import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Calculator, Award } from 'lucide-react';

const IntegersRationalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "Which of the following is NOT an integer?",
      options: ["-5", "0", "2.5", "10"],
      correct: 2,
      explanation: "Integers are whole numbers including negative numbers, zero, and positive numbers. 2.5 is a decimal, not an integer."
    },
    {
      question: "What is (-8) + 12?",
      options: ["4", "-4", "20", "-20"],
      correct: 0,
      explanation: "(-8) + 12 = 12 - 8 = 4. When adding integers with different signs, subtract and take the sign of the larger absolute value."
    },
    {
      question: "Which statement about rational numbers is TRUE?",
      options: ["All integers are rational numbers", "π is a rational number", "√2 is a rational number", "Rational numbers cannot be negative"],
      correct: 0,
      explanation: "All integers are rational numbers because any integer n can be written as n/1. π and √2 are irrational, and rational numbers can be negative."
    },
    {
      question: "What is (-6) × (-4)?",
      options: ["24", "-24", "10", "-10"],
      correct: 0,
      explanation: "(-6) × (-4) = 24. When multiplying two negative integers, the result is positive."
    },
    {
      question: "Express 0.75 as a fraction in lowest terms:",
      options: ["75/100", "3/4", "7/5", "15/20"],
      correct: 1,
      explanation: "0.75 = 75/100 = 3/4 when reduced to lowest terms by dividing both numerator and denominator by 25."
    },
    {
      question: "What is 18 ÷ (-3)?",
      options: ["6", "-6", "15", "-15"],
      correct: 1,
      explanation: "18 ÷ (-3) = -6. When dividing a positive integer by a negative integer, the result is negative."
    },
    {
      question: "Which number is between -2 and -1?",
      options: ["-3", "-0.5", "-1.5", "0"],
      correct: 2,
      explanation: "-1.5 is between -2 and -1. On the number line: -2 < -1.5 < -1."
    },
    {
      question: "What is the absolute value of -15?",
      options: ["15", "-15", "0", "30"],
      correct: 0,
      explanation: "The absolute value of -15 is 15. Absolute value is always non-negative and represents distance from zero."
    },
    {
      question: "Which fraction is equivalent to 2/3?",
      options: ["4/6", "3/2", "6/4", "5/8"],
      correct: 0,
      explanation: "2/3 = 4/6 because when you multiply both numerator and denominator by 2, you get equivalent fractions."
    },
    {
      question: "What is (-20) ÷ 4?",
      options: ["5", "-5", "16", "-16"],
      correct: 1,
      explanation: "(-20) ÷ 4 = -5. When dividing a negative integer by a positive integer, the result is negative."
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
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
                <p className="text-green-600 font-medium">Perfect! You've mastered integers and rational numbers! 🎯</p>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <p className="text-green-600 font-medium">Excellent work! You have a strong grasp of number concepts! 📊</p>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <p className="text-yellow-600 font-medium">Good job! Keep practicing integer operations and fractions! 📚</p>
              )}
              {score < questions.length * 0.6 && (
                <p className="text-red-600 font-medium">Keep studying! Focus on integer rules and rational number concepts! 💪</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-pink-400" />
            <h1 className="text-4xl font-bold text-white">Integers & Rational Numbers</h1>
            <Calculator className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-pink-100 mb-4">Test your knowledge of integers and rational numbers!</p>
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
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-500"
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
                      : 'bg-purple-100 border-purple-500 text-purple-800'
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
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-800 mb-2">Explanation:</h3>
              <p className="text-purple-700">{questions[currentQuestion].explanation}</p>
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
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegersRationalQuiz;