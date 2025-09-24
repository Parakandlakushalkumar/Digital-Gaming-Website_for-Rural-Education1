import React, { useState } from 'react';
import { Trophy, RotateCcw, Brain, CheckCircle, XCircle, Zap } from 'lucide-react';

const ChemicalReactionsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "What is a chemical reaction?",
      options: ["Physical change only", "Process where new substances are formed", "Change in state of matter", "Mixing of substances"],
      correct: "Process where new substances are formed",
      explanation: "A chemical reaction is a process where reactants are transformed into products with different chemical properties. New substances with new chemical bonds are formed.",
      difficulty: "Easy"
    },
    {
      question: "Balance the equation: H₂ + O₂ → H₂O",
      options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "2H₂ + 2O₂ → 2H₂O"],
      correct: "2H₂ + O₂ → 2H₂O",
      explanation: "To balance: 2 H₂ molecules + 1 O₂ molecule → 2 H₂O molecules. This gives 4 H atoms and 2 O atoms on both sides.",
      difficulty: "Medium"
    },
    {
      question: "Which type of reaction is: CaCO₃ → CaO + CO₂?",
      options: ["Combination", "Decomposition", "Displacement", "Double displacement"],
      correct: "Decomposition",
      explanation: "This is a decomposition reaction where one compound (CaCO₃) breaks down into two simpler compounds (CaO and CO₂) when heated.",
      difficulty: "Medium"
    },
    {
      question: "What happens during oxidation?",
      options: ["Gain of electrons", "Loss of electrons", "Gain of protons", "Loss of neutrons"],
      correct: "Loss of electrons",
      explanation: "Oxidation involves the loss of electrons. Remember: OIL RIG - Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).",
      difficulty: "Medium"
    },
    {
      question: "Which gas is produced when zinc reacts with hydrochloric acid?",
      options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"],
      correct: "Hydrogen",
      explanation: "Zn + 2HCl → ZnCl₂ + H₂. This is a displacement reaction where zinc displaces hydrogen from HCl, producing hydrogen gas.",
      difficulty: "Easy"
    },
    {
      question: "What is a precipitation reaction?",
      options: ["Formation of gas", "Formation of insoluble solid", "Formation of acid", "Formation of base"],
      correct: "Formation of insoluble solid",
      explanation: "A precipitation reaction occurs when two soluble salts react to form an insoluble solid (precipitate) that settles out of solution.",
      difficulty: "Medium"
    },
    {
      question: "In the reaction: 2Mg + O₂ → 2MgO, which element is oxidized?",
      options: ["Oxygen", "Magnesium", "Both", "Neither"],
      correct: "Magnesium",
      explanation: "Magnesium loses electrons (0 to +2 oxidation state) and is therefore oxidized. Oxygen gains electrons and is reduced.",
      difficulty: "Hard"
    },
    {
      question: "What type of reaction is: AgNO₃ + NaCl → AgCl + NaNO₃?",
      options: ["Combination", "Decomposition", "Single displacement", "Double displacement"],
      correct: "Double displacement",
      explanation: "This is a double displacement reaction where Ag⁺ and Na⁺ ions exchange places. AgCl precipitates as it's insoluble in water.",
      difficulty: "Hard"
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
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Chemistry Lab Complete! ⚗️</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a chemical reactions master! 🧪
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Work!</strong> You understand chemical reactions well! ⚡
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review reaction types and balancing! 📚
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">⚗️</div>
          Chemical Reactions Quiz
        </h1>
        <p className="text-gray-600">Explore the fascinating world of chemical changes!</p>
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Brain className="w-5 h-5 text-blue-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-blue-100 px-3 py-1 rounded">Score: {score}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-yellow-500" />
        </div>
        
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {questions[currentQuestion].question}
        </h3>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass = "p-3 text-left rounded-lg border-2 transition-all ";
            
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
                buttonClass += "border-blue-500 bg-blue-50";
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-25";
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
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700 text-sm">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {!answerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedAnswer
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
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
            {currentQuestion === questions.length - 1 ? 'Complete Lab' : 'Next Reaction'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChemicalReactionsQuiz;