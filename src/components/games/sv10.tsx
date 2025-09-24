import React, { useState } from 'react';
import { Box, Trophy, RotateCcw, Brain, CheckCircle, XCircle } from 'lucide-react';

const SurfaceAreasVolumesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "What is the surface area of a cube with side length 4 cm?",
      options: ["64 cm²", "96 cm²", "48 cm²", "16 cm²"],
      correct: "96 cm²",
      explanation: "Surface area of cube = 6a² = 6 × 4² = 6 × 16 = 96 cm²",
      difficulty: "Easy"
    },
    {
      question: "Find the volume of a cylinder with radius 3 cm and height 10 cm (use π = 3.14):",
      options: ["282.6 cm³", "94.2 cm³", "188.4 cm³", "376.8 cm³"],
      correct: "282.6 cm³",
      explanation: "Volume of cylinder = πr²h = 3.14 × 3² × 10 = 3.14 × 9 × 10 = 282.6 cm³",
      difficulty: "Medium"
    },
    {
      question: "What is the curved surface area of a cone with radius 5 cm and slant height 13 cm?",
      options: ["65π cm²", "25π cm²", "130π cm²", "169π cm²"],
      correct: "65π cm²",
      explanation: "Curved surface area of cone = πrl = π × 5 × 13 = 65π cm²",
      difficulty: "Medium"
    },
    {
      question: "A sphere has radius 6 cm. What is its volume?",
      options: ["288π cm³", "144π cm³", "216π cm³", "432π cm³"],
      correct: "288π cm³",
      explanation: "Volume of sphere = (4/3)πr³ = (4/3)π × 6³ = (4/3)π × 216 = 288π cm³",
      difficulty: "Hard"
    },
    {
      question: "Find the total surface area of a cuboid with dimensions 4 cm × 6 cm × 8 cm:",
      options: ["192 cm²", "208 cm²", "224 cm²", "176 cm²"],
      correct: "208 cm²",
      explanation: "TSA of cuboid = 2(lb + bh + hl) = 2(4×6 + 6×8 + 8×4) = 2(24 + 48 + 32) = 2(104) = 208 cm²",
      difficulty: "Medium"
    },
    {
      question: "What is the volume of a hemisphere with radius 9 cm?",
      options: ["243π cm³", "486π cm³", "729π cm³", "972π cm³"],
      correct: "486π cm³",
      explanation: "Volume of hemisphere = (2/3)πr³ = (2/3)π × 9³ = (2/3)π × 729 = 486π cm³",
      difficulty: "Hard"
    },
    {
      question: "A rectangular tank is 8m long, 6m wide, and 4m high. How much water can it hold?",
      options: ["192 liters", "192 m³", "48 m³", "96 m³"],
      correct: "192 m³",
      explanation: "Volume = length × width × height = 8 × 6 × 4 = 192 m³",
      difficulty: "Easy"
    },
    {
      question: "Find the slant height of a cone if radius = 8 cm and height = 15 cm:",
      options: ["17 cm", "23 cm", "12 cm", "19 cm"],
      correct: "17 cm",
      explanation: "Using Pythagoras theorem: l² = r² + h² = 8² + 15² = 64 + 225 = 289, so l = √289 = 17 cm",
      difficulty: "Medium"
    }
  ];

  const handleAnswerSelect = (answer) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !answerSubmitted) {
      setAnswerSubmitted(true);
      setShowExplanation(true);
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
      setAnswerSubmitted(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
    setSelectedAnswer('');
    setShowExplanation(false);
    setAnswerSubmitted(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete! 📦</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a 3D geometry master! 🎯
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Work!</strong> You understand surface areas and volumes well! 📊
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review the formulas for different shapes! 📝
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <Box className="w-8 h-8" />
          Surface Areas & Volumes Quiz
        </h1>
        <p className="text-gray-600">Master 3D geometry and spatial calculations!</p>
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Brain className="w-5 h-5 text-emerald-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-emerald-100 px-3 py-1 rounded">Score: {score}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {questions[currentQuestion].question}
        </h3>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass = "p-3 text-left rounded-lg border-2 transition-all font-mono text-sm ";
            
            if (answerSubmitted) {
              if (option === questions[currentQuestion].correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-700";
              } else if (option === selectedAnswer && option !== questions[currentQuestion].correct) {
                buttonClass += "border-red-500 bg-red-50 text-red-700";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (selectedAnswer === option) {
                buttonClass += "border-emerald-500 bg-emerald-50";
              } else {
                buttonClass += "border-gray-200 hover:border-emerald-300 hover:bg-emerald-25";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={buttonClass}
                disabled={answerSubmitted}
              >
                <div className="flex items-center gap-2">
                  {answerSubmitted && option === questions[currentQuestion].correct && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {answerSubmitted && option === selectedAnswer && option !== questions[currentQuestion].correct && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Solution:</h4>
            <p className="text-blue-700 text-sm font-mono leading-relaxed">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {!answerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedAnswer
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SurfaceAreasVolumesQuiz;