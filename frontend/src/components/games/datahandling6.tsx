import React, { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

interface DataHandlingQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const DataHandlingQuiz = ({ onComplete }: DataHandlingQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "In a bar graph, what does the height of each bar represent?",
      options: ["Category names", "Frequency or value", "Time period", "Color coding"],
      correct: 1,
      explanation: "The height (or length) of each bar represents the frequency or value of that category"
    },
    {
      question: "What is the median of the data set: 3, 7, 9, 12, 15?",
      options: ["7", "9", "10", "12"],
      correct: 1,
      explanation: "The median is the middle value when data is arranged in order. Here, 9 is the middle value"
    },
    {
      question: "What is the mode of: 2, 3, 3, 5, 7, 3, 9?",
      options: ["2", "3", "5", "7"],
      correct: 1,
      explanation: "Mode is the most frequently occurring value. 3 appears three times, more than any other number"
    },
    {
      question: "What is the mean of: 10, 20, 30, 40?",
      options: ["20", "25", "30", "35"],
      correct: 1,
      explanation: "Mean = (10+20+30+40)/4 = 100/4 = 25"
    },
    {
      question: "In a pie chart, what does each sector represent?",
      options: ["Time intervals", "Different categories", "Mathematical operations", "Color preferences"],
      correct: 1,
      explanation: "Each sector (slice) of a pie chart represents a different category of the whole data"
    },
    {
      question: "What is the range of the data: 5, 12, 8, 20, 3?",
      options: ["15", "17", "20", "25"],
      correct: 1,
      explanation: "Range = Highest value - Lowest value = 20 - 3 = 17"
    },
    {
      question: "Which graph is best for showing changes over time?",
      options: ["Bar chart", "Pie chart", "Line graph", "Pictograph"],
      correct: 2,
      explanation: "Line graphs are best for showing trends and changes over time periods"
    },
    {
      question: "If the total angle in a pie chart is 360°, what angle represents 25% of the data?",
      options: ["45°", "60°", "90°", "120°"],
      correct: 2,
      explanation: "25% of 360° = 25/100 × 360° = 90°"
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 flex items-center justify-center">
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
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-indigo-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Data Handling Quiz</h1>
              <p className="text-gray-600">Charts, Graphs, Statistics</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-indigo-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
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
                    : 'bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer'
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
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-indigo-800 font-medium">Explanation:</p>
              <p className="text-indigo-700">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataHandlingQuiz;