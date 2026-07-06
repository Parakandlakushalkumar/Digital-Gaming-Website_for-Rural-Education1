import React, { useState } from 'react';
import { Calculator, Trophy, RotateCcw, Brain, CheckCircle, XCircle } from 'lucide-react';

const RealNumbersQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "Which of these is an irrational number?",
      options: ["0.25", "√2", "3/4", "-5"],
      correct: "√2",
      explanation: "√2 is irrational because it cannot be expressed as a fraction of two integers. Its decimal representation is non-terminating and non-repeating.",
      difficulty: "Easy"
    },
    {
      question: "What is the HCF of 48 and 72?",
      options: ["8", "12", "24", "36"],
      correct: "24",
      explanation: "To find HCF, use prime factorization: 48 = 2⁴ × 3, 72 = 2³ × 3². HCF = 2³ × 3 = 24",
      difficulty: "Medium"
    },
    {
      question: "Express 0.363636... as a fraction:",
      options: ["36/99", "4/11", "36/100", "1/3"],
      correct: "4/11",
      explanation: "Let x = 0.363636... Then 100x = 36.363636... Subtracting: 99x = 36, so x = 36/99 = 4/11",
      difficulty: "Medium"
    },
    {
      question: "Which statement about real numbers is FALSE?",
      options: ["All integers are rational", "All rationals are real", "All irrationals are real", "All reals are rational"],
      correct: "All reals are rational",
      explanation: "This is false because irrational numbers (like π, √2) are real numbers but not rational numbers.",
      difficulty: "Easy"
    },
    {
      question: "What is the LCM of 15 and 25?",
      options: ["50", "75", "125", "375"],
      correct: "75",
      explanation: "Prime factorization: 15 = 3 × 5, 25 = 5². LCM = 3 × 5² = 75",
      difficulty: "Medium"
    },
    {
      question: "If p/q is in lowest terms, what must be true?",
      options: ["p > q", "q > 0", "HCF(p,q) = 1", "p and q are prime"],
      correct: "HCF(p,q) = 1",
      explanation: "A fraction is in lowest terms when the numerator and denominator have no common factors other than 1, i.e., HCF = 1",
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
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete! 🎓</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a Real Numbers master! 🌟
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Job!</strong> You have a solid understanding of real numbers! 📚
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review the concepts and try again! 💪
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8" />
          Real Numbers Quiz
        </h1>
        <p className="text-gray-600">Test your understanding of real numbers!</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-purple-100 px-3 py-1 rounded">Score: {score}</span>
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
                buttonClass += "border-purple-500 bg-purple-50";
              } else {
                buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-25";
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
                ? 'bg-purple-500 hover:bg-purple-600 text-white'
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

export default RealNumbersQuiz;