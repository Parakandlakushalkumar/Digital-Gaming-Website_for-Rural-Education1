import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Grid3X3 } from 'lucide-react';

interface FactorsMultiplesQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const FactorsMultiplesQuiz = ({ onComplete }: FactorsMultiplesQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "What are the factors of 12?",
      options: ["1, 2, 3, 4, 6, 12", "1, 3, 4, 12", "2, 4, 6, 12", "1, 2, 6, 12"],
      correct: 0,
      explanation: "Factors of 12 are all numbers that divide 12 evenly: 1, 2, 3, 4, 6, 12"
    },
    {
      question: "What is the LCM (Least Common Multiple) of 4 and 6?",
      options: ["10", "12", "24", "2"],
      correct: 1,
      explanation: "Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... LCM = 12"
    },
    {
      question: "What is the GCD (Greatest Common Divisor) of 18 and 24?",
      options: ["2", "3", "6", "9"],
      correct: 2,
      explanation: "Factors of 18: 1,2,3,6,9,18. Factors of 24: 1,2,3,4,6,8,12,24. GCD = 6"
    },
    {
      question: "Which number is a multiple of 7?",
      options: ["15", "21", "18", "25"],
      correct: 1,
      explanation: "21 = 7 × 3, so 21 is a multiple of 7"
    },
    {
      question: "How many factors does 16 have?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      explanation: "Factors of 16 are: 1, 2, 4, 8, 16 (total: 5 factors)"
    },
    {
      question: "What is the HCF of 15 and 25?",
      options: ["3", "5", "10", "15"],
      correct: 1,
      explanation: "Factors of 15: 1,3,5,15. Factors of 25: 1,5,25. HCF = 5"
    },
    {
      question: "Which is a common multiple of 3 and 4?",
      options: ["6", "8", "12", "16"],
      correct: 2,
      explanation: "12 is divisible by both 3 (12÷3=4) and 4 (12÷4=3)"
    },
    {
      question: "What is the smallest prime factor of 30?",
      options: ["2", "3", "5", "6"],
      correct: 0,
      explanation: "30 = 2 × 3 × 5. The smallest prime factor is 2"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
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
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Grid3X3 className="text-green-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Factors & Multiples Quiz</h1>
              <p className="text-gray-600">LCM, GCD, Prime Factors</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-green-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
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
                    : 'bg-gray-50 border-gray-300 hover:bg-green-50 hover:border-green-300 cursor-pointer'
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
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">Explanation:</p>
              <p className="text-green-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactorsMultiplesQuiz;