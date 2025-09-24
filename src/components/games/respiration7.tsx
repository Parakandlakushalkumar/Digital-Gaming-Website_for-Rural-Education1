import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const RespirationTransportationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What gas do we breathe in during respiration?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correct: 1,
      explanation: "During respiration, we breathe in oxygen which is used by our cells to produce energy."
    },
    {
      question: "Which organ is primarily responsible for pumping blood?",
      options: ["Lungs", "Heart", "Kidneys", "Liver"],
      correct: 1,
      explanation: "The heart is a muscular organ that pumps blood throughout the body, delivering oxygen and nutrients."
    },
    {
      question: "What do plants release during photosynthesis?",
      options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Water vapor"],
      correct: 2,
      explanation: "Plants release oxygen as a byproduct of photosynthesis, which is essential for animal respiration."
    },
    {
      question: "Which blood vessels carry blood away from the heart?",
      options: ["Veins", "Arteries", "Capillaries", "Lymph vessels"],
      correct: 1,
      explanation: "Arteries carry oxygenated blood away from the heart to various parts of the body."
    },
    {
      question: "What is the main function of red blood cells?",
      options: ["Fight infections", "Carry oxygen", "Clot blood", "Produce hormones"],
      correct: 1,
      explanation: "Red blood cells contain hemoglobin, which binds to oxygen and transports it throughout the body."
    },
    {
      question: "How do fish breathe?",
      options: ["Through lungs", "Through gills", "Through skin", "Through mouth"],
      correct: 1,
      explanation: "Fish extract oxygen from water using their gills, which have a rich supply of blood vessels."
    },
    {
      question: "Which part of the plant is responsible for transportation of water?",
      options: ["Leaves", "Roots", "Stem (xylem)", "Flowers"],
      correct: 2,
      explanation: "Xylem tissue in the stem transports water and minerals from roots to leaves."
    },
    {
      question: "What happens to carbon dioxide in our body?",
      options: ["It is stored", "It is breathed out", "It is converted to oxygen", "It is absorbed"],
      correct: 1,
      explanation: "Carbon dioxide is a waste product of cellular respiration and is expelled from the body through exhalation."
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
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
          <h1 className="text-2xl font-bold text-gray-800">Respiration & Transportation Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
                  : 'hover:bg-green-50 border-gray-200 hover:border-green-300'
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
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
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
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RespirationTransportationQuiz;