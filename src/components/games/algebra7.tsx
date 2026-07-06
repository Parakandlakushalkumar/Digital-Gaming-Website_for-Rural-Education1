import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, Clock, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const AlgebraicExpressionsQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the coefficient of x² in the expression 3x² + 5x - 2?",
      options: ["2", "3", "5", "-2"],
      correctAnswer: 1,
      explanation: "The coefficient is the number multiplied by the variable. In 3x², the coefficient of x² is 3.",
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "Simplify: 2x + 3x - x",
      options: ["4x", "5x", "6x", "3x"],
      correctAnswer: 0,
      explanation: "Combine like terms: 2x + 3x - x = (2 + 3 - 1)x = 4x",
      difficulty: 'easy'
    },
    {
      id: 3,
      question: "What is the degree of the polynomial 4x³ + 2x² - 7x + 1?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      explanation: "The degree is the highest power of the variable. The highest power is x³, so the degree is 3.",
      difficulty: 'medium'
    },
    {
      id: 4,
      question: "Expand: (x + 3)(x - 2)",
      options: ["x² + x - 6", "x² - x - 6", "x² + 5x - 6", "x² - 5x + 6"],
      correctAnswer: 0,
      explanation: "Use FOIL: (x + 3)(x - 2) = x² - 2x + 3x - 6 = x² + x - 6",
      difficulty: 'medium'
    },
    {
      id: 5,
      question: "Factor: x² - 9",
      options: ["(x - 3)(x - 3)", "(x + 3)(x - 3)", "(x + 9)(x - 1)", "Cannot be factored"],
      correctAnswer: 1,
      explanation: "This is a difference of squares: x² - 9 = x² - 3² = (x + 3)(x - 3)",
      difficulty: 'medium'
    },
    {
      id: 6,
      question: "If 3x + 5 = 17, what is the value of x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "Solve: 3x + 5 = 17 → 3x = 12 → x = 4",
      difficulty: 'easy'
    },
    {
      id: 7,
      question: "Simplify: 2(3x + 4) - 3(x - 1)",
      options: ["3x + 11", "6x + 5", "3x + 5", "9x + 11"],
      correctAnswer: 0,
      explanation: "Distribute: 2(3x + 4) - 3(x - 1) = 6x + 8 - 3x + 3 = 3x + 11",
      difficulty: 'medium'
    },
    {
      id: 8,
      question: "What is the constant term in 2x³ - 5x² + 3x + 7?",
      options: ["2", "-5", "3", "7"],
      correctAnswer: 3,
      explanation: "The constant term is the term without any variable, which is 7.",
      difficulty: 'easy'
    },
    {
      id: 9,
      question: "Factor completely: 12x² - 18x",
      options: ["6x(2x - 3)", "3x(4x - 6)", "6(2x² - 3x)", "2x(6x - 9)"],
      correctAnswer: 0,
      explanation: "Factor out the GCD: 12x² - 18x = 6x(2x - 3)",
      difficulty: 'hard'
    },
    {
      id: 10,
      question: "Solve for x: (x + 2)² = 25",
      options: ["x = 3 or x = -7", "x = 5 or x = -5", "x = 3 or x = 7", "x = 23 or x = -27"],
      correctAnswer: 0,
      explanation: "Take square root: x + 2 = ±5, so x = 3 or x = -7",
      difficulty: 'hard'
    }
  ];

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive]);

  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers(new Array(questions.length).fill(null));
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setUserAnswers(prev => {
        const updated = [...prev];
        updated[currentQuestion] = null;
        return updated;
      });
    }
    setIsTimerActive(false);
    setShowResult(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);

    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestion] = selectedAnswer;
      return updated;
    });

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      setQuizCompleted(true);
      setIsTimerActive(false);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
    setIsTimerActive(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🎉 Excellent! You\'re an algebra master!';
    if (percentage >= 80) return '👏 Great job! You have a solid understanding!';
    if (percentage >= 70) return '👍 Good work! Keep practicing!';
    if (percentage >= 60) return '📚 Not bad! Review the concepts and try again!';
    return '💪 Keep studying! You\'ll get better with practice!';
  };

  if (!isTimerActive && currentQuestion === 0 && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <Brain className="w-20 h-20 mx-auto text-purple-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Algebraic Expressions</h1>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Quiz Challenge</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>30 seconds per question</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Star className="w-5 h-5" />
              <span>{questions.length} questions total</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Trophy className="w-5 h-5" />
              <span>Test your algebra skills!</span>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <p className="text-lg text-gray-600 mb-6">{getScoreMessage()}</p>
          </div>

          <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className="border rounded-xl p-4 bg-gray-50">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">{q.question}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Correct:</strong> {q.options[q.correctAnswer]}
                      </p>
                      {userAnswer !== null && userAnswer !== q.correctAnswer && (
                        <p className="text-sm text-red-600 mb-2">
                          <strong>Your answer:</strong> {q.options[userAnswer]}
                        </p>
                      )}
                      {userAnswer === null && (
                        <p className="text-sm text-gray-500 mb-2">
                          <strong>No answer selected</strong>
                        </p>
                      )}
                      <p className="text-sm text-blue-600">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-800">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentQ.difficulty.toUpperCase()}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 text-lg font-medium ${
                  showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : index === selectedAnswer && index !== currentQ.correctAnswer
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                    : selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 text-purple-700 transform scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 hover:scale-102'
                }`}
              >
                <span className="font-bold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Result and Explanation */}
        {showResult && (
          <div className="mb-6 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200">
            <div className="flex items-center mb-4">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500 mr-3" />
              )}
              <span className={`text-xl font-bold ${
                selectedAnswer === currentQ.correctAnswer ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : selectedAnswer === null ? 'Time\'s up!' : 'Incorrect!'}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {!showResult ? (
            <button 
              onClick={handleShowResult}
              disabled={selectedAnswer === null}
              className={`flex-1 py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-200 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {currentQuestion + 1 === questions.length ? 'View Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgebraicExpressionsQuiz;