import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const PhysicalChemicalChangesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "Which of the following is a physical change?",
      options: ["Burning paper", "Melting ice", "Digesting food", "Rusting iron"],
      correct: 1,
      explanation: "Melting ice is a physical change because it only changes state from solid to liquid, but remains water (H₂O)."
    },
    {
      question: "What happens during a chemical change?",
      options: ["Only the shape changes", "New substances are formed", "Only the state changes", "Nothing permanent happens"],
      correct: 1,
      explanation: "In chemical changes, new substances with different properties are formed through breaking and forming of bonds."
    },
    {
      question: "Which is an example of a chemical change?",
      options: ["Cutting paper", "Boiling water", "Baking a cake", "Breaking glass"],
      correct: 2,
      explanation: "Baking a cake involves chemical reactions that create new substances with different properties from the original ingredients."
    },
    {
      question: "Physical changes are usually:",
      options: ["Irreversible", "Reversible", "Always permanent", "Always involve heat"],
      correct: 1,
      explanation: "Physical changes are usually reversible because no new substances are formed, just the arrangement or state changes."
    },
    {
      question: "Which observation suggests a chemical change has occurred?",
      options: ["Change in shape", "Change in size", "Production of gas bubbles", "Change in temperature only"],
      correct: 2,
      explanation: "Gas bubble formation often indicates a chemical reaction is taking place, producing new gaseous substances."
    },
    {
      question: "Dissolving sugar in water is:",
      options: ["A chemical change", "A physical change", "Both physical and chemical", "Neither"],
      correct: 1,
      explanation: "Dissolving sugar is a physical change because the sugar molecules remain unchanged, just dispersed in water."
    },
    {
      question: "Which of these is NOT a sign of a chemical change?",
      options: ["Change in color", "Release of energy", "Formation of precipitate", "Change in volume"],
      correct: 3,
      explanation: "Change in volume can occur in physical changes too (like thermal expansion), while the others are typically signs of chemical changes."
    },
    {
      question: "Burning wood is a:",
      options: ["Physical change", "Chemical change", "Both", "Neither"],
      correct: 1,
      explanation: "Burning wood is a chemical change because it forms new substances like carbon dioxide, water vapor, and ash."
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
          <h1 className="text-2xl font-bold text-gray-800">Physical & Chemical Changes Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PhysicalChemicalChangesQuiz;