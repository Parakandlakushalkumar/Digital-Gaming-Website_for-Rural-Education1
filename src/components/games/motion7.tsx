import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Zap, Move } from 'lucide-react';

const MotionTimeElectricCombinedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is motion?",
      options: ["Being at rest", "Change in position with time", "Staying in one place", "Being stationary"],
      correct: 1,
      topic: "Motion",
      icon: <Move className="w-4 h-4" />,
      explanation: "Motion is defined as the change in position of an object with respect to time and reference point."
    },
    {
      question: "What is the basic unit of time?",
      options: ["Hour", "Minute", "Second", "Day"],
      correct: 2,
      topic: "Time",
      icon: <Clock className="w-4 h-4" />,
      explanation: "The second is the basic (SI) unit of time, from which other time units are derived."
    },
    {
      question: "What is electric current?",
      options: ["Static electricity", "Flow of electric charge", "Stored energy", "Heat production"],
      correct: 1,
      topic: "Electric Current",
      icon: <Zap className="w-4 h-4" />,
      explanation: "Electric current is the flow of electric charge (usually electrons) through a conductor."
    },
    {
      question: "If a car travels 60 km in 1 hour, what is its speed?",
      options: ["60 km/h", "30 km/h", "120 km/h", "60 km"],
      correct: 0,
      topic: "Motion",
      icon: <Move className="w-4 h-4" />,
      explanation: "Speed = Distance ÷ Time = 60 km ÷ 1 hour = 60 km/h"
    },
    {
      question: "Which instrument measures time accurately?",
      options: ["Ruler", "Stopwatch", "Thermometer", "Scale"],
      correct: 1,
      topic: "Time",
      icon: <Clock className="w-4 h-4" />,
      explanation: "A stopwatch is specifically designed to measure time intervals accurately."
    },
    {
      question: "What is the unit of electric current?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correct: 1,
      topic: "Electric Current",
      icon: <Zap className="w-4 h-4" />,
      explanation: "The ampere (A) is the SI unit for measuring electric current."
    },
    {
      question: "Which is an example of periodic motion?",
      options: ["A car on highway", "A pendulum swinging", "A ball falling", "Walking straight"],
      correct: 1,
      topic: "Motion",
      icon: <Move className="w-4 h-4" />,
      explanation: "A pendulum shows periodic motion as it repeats the same movement at regular intervals."
    },
    {
      question: "How many seconds are in 1 minute?",
      options: ["30", "60", "100", "120"],
      correct: 1,
      topic: "Time",
      icon: <Clock className="w-4 h-4" />,
      explanation: "There are 60 seconds in 1 minute - this is a standard time conversion."
    },
    {
      question: "Which material is a good conductor of electricity?",
      options: ["Rubber", "Wood", "Copper", "Plastic"],
      correct: 2,
      topic: "Electric Current",
      icon: <Zap className="w-4 h-4" />,
      explanation: "Copper is an excellent conductor because it has free electrons that move easily."
    },
    {
      question: "What type of motion does Earth show around the Sun?",
      options: ["Linear motion", "Circular motion", "Random motion", "No motion"],
      correct: 1,
      topic: "Motion",
      icon: <Move className="w-4 h-4" />,
      explanation: "Earth moves in a circular (elliptical) orbit around the Sun, completing one revolution in a year."
    },
    {
      question: "What happens when you break an electric circuit?",
      options: ["Current increases", "Current stops", "Voltage increases", "Nothing changes"],
      correct: 1,
      topic: "Electric Current",
      icon: <Zap className="w-4 h-4" />,
      explanation: "Breaking a circuit creates a gap that stops the flow of electric current completely."
    },
    {
      question: "What does a speedometer in a car measure?",
      options: ["Distance", "Time", "Speed", "Direction"],
      correct: 2,
      topic: "Motion",
      icon: <Move className="w-4 h-4" />,
      explanation: "A speedometer measures the instantaneous speed of a vehicle in units like km/h."
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

  const getTopicColor = (topic) => {
    switch(topic) {
      case 'Motion': return 'bg-blue-100 text-blue-800';
      case 'Time': return 'bg-purple-100 text-purple-800';
      case 'Electric Current': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-yellow-700 transition-all"
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
          <h1 className="text-2xl font-bold text-gray-800">Motion, Time & Electric Current Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTopicColor(questions[currentQuestion].topic)}`}>
            {questions[currentQuestion].icon}
            {questions[currentQuestion].topic}
          </span>
        </div>
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
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-yellow-50 border-gray-200 hover:border-blue-300'
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
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-yellow-50 border border-blue-200 rounded-lg">
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
            className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-yellow-700 transition-all"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MotionTimeElectricCombinedQuiz;