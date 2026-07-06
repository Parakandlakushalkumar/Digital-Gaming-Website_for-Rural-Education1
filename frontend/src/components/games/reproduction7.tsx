import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const ReproductionPlantsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is the male reproductive part of a flower?",
      options: ["Pistil", "Stamen", "Petal", "Sepal"],
      correct: 1,
      explanation: "The stamen consists of the anther and filament, and produces pollen (male gametes)."
    },
    {
      question: "What is the female reproductive part of a flower called?",
      options: ["Stamen", "Anther", "Pistil", "Filament"],
      correct: 2,
      explanation: "The pistil (carpel) consists of the stigma, style, and ovary, containing the female gametes."
    },
    {
      question: "What is pollination?",
      options: ["Growth of seeds", "Transfer of pollen to stigma", "Formation of fruits", "Opening of flowers"],
      correct: 1,
      explanation: "Pollination is the transfer of pollen from the anther to the stigma, enabling fertilization."
    },
    {
      question: "Which of these is NOT a method of seed dispersal?",
      options: ["Wind", "Water", "Animals", "Photosynthesis"],
      correct: 3,
      explanation: "Photosynthesis is how plants make food, not a method of seed dispersal. Seeds are dispersed by wind, water, and animals."
    },
    {
      question: "What attracts insects to flowers for pollination?",
      options: ["Bright colors and nectar", "Large leaves", "Strong stems", "Deep roots"],
      correct: 0,
      explanation: "Flowers use bright colors, sweet nectar, and pleasant scents to attract insects for pollination."
    },
    {
      question: "What happens after fertilization in plants?",
      options: ["Flower wilts", "Ovary develops into fruit", "Leaves fall", "Roots grow deeper"],
      correct: 1,
      explanation: "After fertilization, the ovary develops into a fruit containing seeds."
    },
    {
      question: "Which type of reproduction requires only one parent?",
      options: ["Sexual reproduction", "Asexual reproduction", "Cross-pollination", "Fertilization"],
      correct: 1,
      explanation: "Asexual reproduction requires only one parent and produces genetically identical offspring."
    },
    {
      question: "What is an example of asexual reproduction in plants?",
      options: ["Seed formation", "Budding in potato", "Flowering", "Pollination"],
      correct: 1,
      explanation: "Potato plants can reproduce asexually through budding from their tubers (eyes on potatoes)."
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-6">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Reproduction in Plants Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200'
                  : 'hover:bg-pink-50 border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === questions[currentQuestion].correct && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="font-semibold mb-2">Explanation:</h3>
          <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length}
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReproductionPlantsQuiz;