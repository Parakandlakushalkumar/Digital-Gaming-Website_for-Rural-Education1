import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const WeatherClimateSoilQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is the difference between weather and climate?",
      options: ["There is no difference", "Weather is short-term, climate is long-term", "Climate is short-term, weather is long-term", "Both are the same duration"],
      correct: 1,
      explanation: "Weather refers to daily atmospheric conditions, while climate is the average weather pattern over many years."
    },
    {
      question: "Which instrument is used to measure rainfall?",
      options: ["Thermometer", "Barometer", "Rain gauge", "Anemometer"],
      correct: 2,
      explanation: "A rain gauge is specifically designed to collect and measure the amount of precipitation."
    },
    {
      question: "What causes wind?",
      options: ["Earth's rotation only", "Uneven heating of air", "Ocean currents", "Mountains"],
      correct: 1,
      explanation: "Wind is caused by uneven heating of air masses, creating pressure differences that cause air movement."
    },
    {
      question: "Which type of soil is best for farming?",
      options: ["Sandy soil", "Clay soil", "Loamy soil", "Rocky soil"],
      correct: 2,
      explanation: "Loamy soil is ideal for farming as it has good drainage, holds nutrients, and allows root penetration."
    },
    {
      question: "What is humidity?",
      options: ["Temperature of air", "Pressure of air", "Amount of water vapor in air", "Speed of wind"],
      correct: 2,
      explanation: "Humidity measures the amount of water vapor present in the atmosphere."
    },
    {
      question: "Which layer of soil contains the most organic matter?",
      options: ["Bedrock", "Subsoil", "Topsoil", "Parent material"],
      correct: 2,
      explanation: "Topsoil is the uppermost layer rich in organic matter, nutrients, and microorganisms essential for plant growth."
    },
    {
      question: "What happens during the water cycle's evaporation process?",
      options: ["Water vapor condenses", "Water falls as rain", "Water changes to vapor", "Ice melts"],
      correct: 2,
      explanation: "During evaporation, liquid water changes into water vapor due to heat from the sun."
    },
    {
      question: "Which factor does NOT affect climate?",
      options: ["Latitude", "Altitude", "Daily weather changes", "Distance from sea"],
      correct: 2,
      explanation: "Daily weather changes are short-term variations, while climate is determined by long-term factors like latitude, altitude, and proximity to water bodies."
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
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
          <h1 className="text-2xl font-bold text-gray-800">Weather, Climate & Soil Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
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
                  : 'hover:bg-orange-50 border-gray-200 hover:border-orange-300'
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
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
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
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WeatherClimateSoilQuiz;