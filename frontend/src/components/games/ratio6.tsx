import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, Scale } from 'lucide-react';

interface RatioProportionQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const RatioProportionQuiz = ({ onComplete }: RatioProportionQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "If the ratio of boys to girls is 3:2 and there are 15 boys, how many girls are there?",
      options: ["10", "12", "8", "9"],
      correct: 0,
      explanation: "3:2 means for every 3 boys, there are 2 girls. 15÷3 = 5, so 2×5 = 10 girls"
    },
    {
      question: "Simplify the ratio 12:18:",
      options: ["2:3", "3:2", "4:6", "6:9"],
      correct: 0,
      explanation: "Divide both numbers by their GCD (6): 12÷6 = 2, 18÷6 = 3, so 2:3"
    },
    {
      question: "If 5 apples cost ₹25, how much do 8 apples cost?",
      options: ["₹30", "₹35", "₹40", "₹45"],
      correct: 2,
      explanation: "5 apples = ₹25, so 1 apple = ₹5. Therefore, 8 apples = 8 × ₹5 = ₹40"
    },
    {
      question: "What is 25% as a ratio?",
      options: ["1:4", "1:3", "25:100", "Both A and C"],
      correct: 3,
      explanation: "25% = 25/100 = 1/4 = 1:4. Also 25% = 25:100, so both are correct"
    },
    {
      question: "If x:y = 2:3 and y = 12, what is x?",
      options: ["6", "8", "9", "18"],
      correct: 1,
      explanation: "If x:y = 2:3 and y = 12, then x/y = 2/3. So x = (2/3) × 12 = 8"
    },
    {
      question: "A recipe needs flour and sugar in the ratio 4:1. If you use 20g flour, how much sugar?",
      options: ["4g", "5g", "10g", "16g"],
      correct: 1,
      explanation: "4:1 ratio means 4 parts flour to 1 part sugar. 20g÷4 = 5g per part, so sugar = 5g"
    },
    {
      question: "In a class of 35 students, the ratio of girls to boys is 3:4. How many girls are there?",
      options: ["15", "20", "12", "18"],
      correct: 0,
      explanation: "3:4 means 3+4=7 parts total. Girls = (3/7) × 35 = 15"
    },
    {
      question: "If 6 pens cost ₹48, what is the cost of 9 pens?",
      options: ["₹60", "₹72", "₹54", "₹66"],
      correct: 1,
      explanation: "6 pens = ₹48, so 1 pen = ₹8. Therefore, 9 pens = 9 × ₹8 = ₹72"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4 flex items-center justify-center">
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
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-purple-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Ratio & Proportion Quiz</h1>
              <p className="text-gray-600">Ratios, Proportions, Applications</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
                    : 'bg-gray-50 border-gray-300 hover:bg-purple-50 hover:border-purple-300 cursor-pointer'
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
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-800 font-medium">Explanation:</p>
              <p className="text-purple-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatioProportionQuiz;