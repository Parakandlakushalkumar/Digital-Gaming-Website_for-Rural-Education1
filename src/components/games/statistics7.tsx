import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, BarChart3, Award } from 'lucide-react';

const StatisticsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "What is the mean of the data set: 4, 6, 8, 10, 12?",
      options: ["8", "6", "10", "7"],
      correct: 0,
      explanation: "Mean = Sum of all values ÷ Number of values = (4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8"
    },
    {
      question: "Find the median of: 3, 7, 9, 12, 15",
      options: ["7", "9", "12", "8"],
      correct: 1,
      explanation: "To find median, arrange in order (already arranged) and find the middle value. The middle value is 9."
    },
    {
      question: "What is the mode of: 2, 3, 4, 3, 5, 3, 6?",
      options: ["3", "4", "5", "No mode"],
      correct: 0,
      explanation: "Mode is the value that appears most frequently. The number 3 appears three times, more than any other number."
    },
    {
      question: "Find the mean of: 10, 15, 20, 25, 30",
      options: ["15", "20", "25", "18"],
      correct: 1,
      explanation: "Mean = (10+15+20+25+30) ÷ 5 = 100 ÷ 5 = 20"
    },
    {
      question: "What is the median of: 1, 3, 5, 7, 9, 11?",
      options: ["5", "6", "7", "4"],
      correct: 1,
      explanation: "For even number of values, median = (middle two values) ÷ 2 = (5+7) ÷ 2 = 12 ÷ 2 = 6"
    },
    {
      question: "Find the mode of: 1, 2, 2, 3, 4, 4, 5",
      options: ["2", "4", "Both 2 and 4", "No mode"],
      correct: 2,
      explanation: "Both 2 and 4 appear twice, which is more than any other number. This data set is bimodal."
    },
    {
      question: "What is the mean of: 8, 12, 16, 4?",
      options: ["10", "8", "12", "16"],
      correct: 0,
      explanation: "Mean = (8+12+16+4) ÷ 4 = 40 ÷ 4 = 10"
    },
    {
      question: "Find the median of: 2, 8, 3, 9, 1, 7, 5",
      options: ["3", "5", "7", "8"],
      correct: 1,
      explanation: "First arrange in order: 1, 2, 3, 5, 7, 8, 9. The middle value (4th value) is 5."
    },
    {
      question: "What is the mode of: 10, 20, 30, 40, 50?",
      options: ["10", "30", "50", "No mode"],
      correct: 3,
      explanation: "No value appears more than once, so there is no mode in this data set."
    },
    {
      question: "If the mean of 5 numbers is 12, what is their sum?",
      options: ["60", "17", "7", "24"],
      correct: 0,
      explanation: "If mean = 12 and there are 5 numbers, then Sum = Mean × Number of values = 12 × 5 = 60"
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
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-green-900 to-emerald-900 p-4">
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
                <p className="text-green-600 font-medium">Fantastic! You're a statistics superstar! 📈</p>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <p className="text-green-600 font-medium">Excellent! You understand measures of central tendency well! 📊</p>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <p className="text-yellow-600 font-medium">Good work! Keep practicing mean, median, and mode! 📋</p>
              )}
              {score < questions.length * 0.6 && (
                <p className="text-red-600 font-medium">Keep studying! Review how to calculate mean, median, and mode! 📚</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-green-900 to-emerald-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-teal-400" />
            <h1 className="text-4xl font-bold text-white">Statistics Quiz</h1>
            <BarChart3 className="w-8 h-8 text-teal-400" />
          </div>
          <p className="text-teal-100 mb-4">Master mean, median, and mode calculations!</p>
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
              className="bg-gradient-to-r from-teal-400 to-green-500 h-3 rounded-full transition-all duration-500"
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
                      : 'bg-teal-100 border-teal-500 text-teal-800'
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
            <div className="mt-6 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-semibold text-teal-800 mb-2">Explanation:</h3>
              <p className="text-teal-700">{questions[currentQuestion].explanation}</p>
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
                  ? 'bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsQuiz;