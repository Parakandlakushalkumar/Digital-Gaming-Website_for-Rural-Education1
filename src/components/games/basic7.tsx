import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, CircuitBoard } from 'lucide-react';

const BasicCircuitsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "In a series circuit with three 4Ω resistors, what is the total resistance?",
      options: ["4Ω", "8Ω", "12Ω", "1.33Ω"],
      correct: 2,
      difficulty: "Medium",
      explanation: "In a series circuit, total resistance = R1 + R2 + R3 = 4Ω + 4Ω + 4Ω = 12Ω. Resistances add up directly in series."
    },
    {
      question: "What happens to current in a parallel circuit?",
      options: ["Same through all branches", "Divides among branches", "Increases in each branch", "Stops flowing"],
      correct: 1,
      difficulty: "Medium",
      explanation: "In parallel circuits, current divides among the different branches, with each branch carrying part of the total current based on its resistance."
    },
    {
      question: "If a 12V battery is connected to a 6Ω resistor, what current flows? (Using Ohm's Law: V=IR)",
      options: ["2A", "0.5A", "18A", "72A"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Using Ohm's Law: I = V/R = 12V ÷ 6Ω = 2A. Current equals voltage divided by resistance."
    },
    {
      question: "Which component stores electrical energy in a circuit?",
      options: ["Resistor", "Capacitor", "Inductor", "Diode"],
      correct: 1,
      difficulty: "Easy",
      explanation: "A capacitor stores electrical energy in an electric field between its plates and can release this energy back into the circuit."
    },
    {
      question: "What is the main advantage of a parallel circuit over a series circuit for household wiring?",
      options: ["Uses less power", "Components work independently", "Cheaper to install", "Creates more heat"],
      correct: 1,
      difficulty: "Medium",
      explanation: "In parallel circuits, if one component fails, others continue working. Each device gets full voltage and operates independently."
    },
    {
      question: "An LED (Light Emitting Diode) allows current to flow in:",
      options: ["Both directions equally", "One direction only", "No direction", "Alternating directions"],
      correct: 1,
      difficulty: "Easy",
      explanation: "LEDs are diodes that allow current to flow in only one direction (forward bias), blocking current in the reverse direction."
    },
    {
      question: "In a circuit with two 8Ω resistors in parallel, what is the equivalent resistance?",
      options: ["16Ω", "8Ω", "4Ω", "2Ω"],
      correct: 2,
      difficulty: "Hard",
      explanation: "For parallel resistors: 1/Rtotal = 1/R1 + 1/R2 = 1/8 + 1/8 = 2/8 = 1/4, so Rtotal = 4Ω. Parallel resistance is always less than the smallest individual resistance."
    },
    {
      question: "What does a multimeter NOT typically measure?",
      options: ["Voltage", "Current", "Resistance", "Frequency of light"],
      correct: 3,
      difficulty: "Medium",
      explanation: "Multimeters measure electrical quantities like voltage, current, and resistance, but not optical properties like light frequency."
    },
    {
      question: "Which safety rule is most important when working with circuits?",
      options: ["Work quickly", "Always disconnect power first", "Use wet hands", "Ignore insulation"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Safety first: always disconnect or turn off power before working on electrical circuits to prevent shock, burns, or electrocution."
    },
    {
      question: "In AC (Alternating Current), the current:",
      options: ["Flows in one direction", "Changes direction periodically", "Stops and starts randomly", "Only flows at night"],
      correct: 1,
      difficulty: "Hard",
      explanation: "AC current periodically reverses direction, typically 50-60 times per second (50-60 Hz), unlike DC which flows in one direction constantly."
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
          <h2 className="text-3xl font-bold mb-4">Circuit Master Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Excellent! You've mastered circuit concepts!" : 
             score >= 6 ? "Good work! Your circuit knowledge is solid." :
             "Keep practicing - circuits are the foundation of electronics!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            <CircuitBoard className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Basic Circuits Advanced Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Electronics & Ohm's Law</span>
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
                  : 'hover:bg-purple-50 border-gray-200 hover:border-purple-300'
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
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BasicCircuitsQuiz;