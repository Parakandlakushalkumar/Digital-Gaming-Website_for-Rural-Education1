import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Cog } from 'lucide-react';

const EngineeringDailyLifeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "Which engineering principle makes it easier to open a door by pushing near the handle rather than near the hinges?",
      options: ["Friction", "Leverage", "Momentum", "Pressure"],
      correct: 1,
      difficulty: "Medium",
      explanation: "The door acts as a lever with hinges as the fulcrum. Pushing farther from the fulcrum (at the handle) requires less force due to increased leverage."
    },
    {
      question: "What engineering concept explains why airplane wings generate lift?",
      options: ["Archimedes' principle", "Pascal's principle", "Bernoulli's principle", "Newton's third law"],
      correct: 2,
      difficulty: "Hard",
      explanation: "Bernoulli's principle states that faster-moving air has lower pressure. Air moves faster over the curved top of the wing, creating lower pressure above and generating lift."
    },
    {
      question: "Which structural design makes bridges stronger against compression forces?",
      options: ["Rectangular beams", "Triangular trusses", "Circular columns", "Flat surfaces"],
      correct: 1,
      difficulty: "Medium",
      explanation: "Triangular trusses distribute forces efficiently and are inherently stable, making them excellent for handling compression, tension, and preventing structural deformation."
    },
    {
      question: "What engineering principle is used in hydraulic car jacks?",
      options: ["Leverage", "Pascal's principle", "Electromagnetic induction", "Thermal expansion"],
      correct: 1,
      difficulty: "Hard",
      explanation: "Pascal's principle: pressure applied to a confined fluid is transmitted equally in all directions, allowing small force on small piston to create large force on large piston."
    },
    {
      question: "Why are manhole covers typically round instead of square?",
      options: ["Easier to manufacture", "Cannot fall through the hole", "More aesthetically pleasing", "Cheaper materials"],
      correct: 1,
      difficulty: "Medium",
      explanation: "A circle has the same width in all directions, so a round cover cannot fall through a round hole. Square covers could potentially fall diagonally through the opening."
    },
    {
      question: "What engineering concept explains why we use gears in bicycles?",
      options: ["Reduce friction", "Mechanical advantage", "Increase durability", "Improve balance"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Gears provide mechanical advantage by trading speed for force (or vice versa). Different gear ratios allow cyclists to pedal efficiently on hills or flat terrain."
    },
    {
      question: "Which engineering principle is primarily used in earthquake-resistant building design?",
      options: ["Rigidity", "Flexibility and damping", "Maximum height", "Heavy materials"],
      correct: 1,
      difficulty: "Hard",
      explanation: "Earthquake-resistant buildings use flexible materials and damping systems to absorb and dissipate seismic energy rather than rigidly resisting it."
    },
    {
      question: "What makes a smartphone screen responsive to touch?",
      options: ["Pressure sensors", "Heat detection", "Capacitive sensing", "Magnetic fields"],
      correct: 2,
      difficulty: "Medium",
      explanation: "Most touchscreens use capacitive sensing - they detect changes in electrical charge when a conductive object (like a finger) touches the screen."
    },
    {
      question: "Why do engineers design car bumpers to crumple in accidents?",
      options: ["Reduce repair costs", "Absorb impact energy", "Improve aerodynamics", "Save manufacturing time"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Crumple zones are designed to deform and absorb kinetic energy during collisions, reducing the force transmitted to passengers and improving safety."
    },
    {
      question: "What engineering principle allows GPS systems to determine your location?",
      options: ["Doppler effect", "Triangulation/Trilateration", "Electromagnetic induction", "Thermal imaging"],
      correct: 1,
      difficulty: "Hard",
      explanation: "GPS uses trilateration - measuring distances from multiple satellites with known positions to calculate the receiver's exact location through geometric principles."
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

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Engineering Expert Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Outstanding! You understand engineering in everyday life!" : 
             score >= 6 ? "Great! You see the engineering around us." :
             "Keep exploring - engineering is everywhere!"}
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
          <div className="flex items-center gap-2">
            <Cog className="w-6 h-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">Engineering in Daily Life Advanced Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
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
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Applied Engineering</span>
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
          <h3 className="font-semibold mb-2">Detailed Explanation:</h3>
          <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length} • {Math.round((score / Math.max(currentQuestion, 1)) * 100)}%
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EngineeringDailyLifeQuiz;