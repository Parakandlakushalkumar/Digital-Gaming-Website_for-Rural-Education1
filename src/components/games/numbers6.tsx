import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Calculator } from 'lucide-react';

interface NumbersOperationsQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const NumbersOperationsQuiz = ({ onComplete }: NumbersOperationsQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What is 3/4 + 1/4?",
      options: ["1/2", "4/8", "1", "2/4"],
      correct: 2,
      explanation: "3/4 + 1/4 = (3+1)/4 = 4/4 = 1"
    },
    {
      question: "Convert 0.75 to a fraction:",
      options: ["3/4", "7/5", "75/100", "3/5"],
      correct: 0,
      explanation: "0.75 = 75/100 = 3/4 (simplified)"
    },
    {
      question: "What is -5 + 8?",
      options: ["-13", "3", "-3", "13"],
      correct: 1,
      explanation: "-5 + 8 = 8 - 5 = 3"
    },
    {
      question: "Which is equivalent to 2.5?",
      options: ["5/2", "25/10", "2½", "All of the above"],
      correct: 3,
      explanation: "2.5 = 5/2 = 25/10 = 2½, so all are equivalent"
    },
    {
      question: "What is 2/3 × 3/4?",
      options: ["6/12", "1/2", "5/7", "6/7"],
      correct: 1,
      explanation: "2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2"
    },
    {
      question: "What is 0.6 as a percentage?",
      options: ["6%", "60%", "0.6%", "600%"],
      correct: 1,
      explanation: "0.6 × 100% = 60%"
    },
    {
      question: "What is |-7|?",
      options: ["-7", "7", "0", "14"],
      correct: 1,
      explanation: "The absolute value of -7 is 7"
    },
    {
      question: "Simplify: 12/16",
      options: ["3/4", "6/8", "2/3", "4/5"],
      correct: 0,
      explanation: "12/16 = (12÷4)/(16÷4) = 3/4"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="text-blue-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Numbers & Operations Quiz</h1>
              <p className="text-gray-600">Fractions, Decimals, Integers</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                    : 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
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
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Explanation:</p>
              <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumbersOperationsQuiz;