import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Leaf, Clock, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const NutritionQuizGame: React.FC = () => {
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
      question: "What is the process by which green plants make their own food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
      correctAnswer: 1,
      explanation: "Photosynthesis is the process where green plants use sunlight, carbon dioxide, and water to make glucose and oxygen.",
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: 1,
      explanation: "Plants absorb carbon dioxide from the atmosphere during photosynthesis and release oxygen as a byproduct.",
      difficulty: 'easy'
    },
    {
      id: 3,
      question: "What are the main nutrients required by animals?",
      options: ["Carbohydrates only", "Proteins only", "Carbohydrates, proteins, fats, vitamins, minerals", "Water only"],
      correctAnswer: 2,
      explanation: "Animals need carbohydrates for energy, proteins for growth and repair, fats for energy storage, vitamins and minerals for proper body functions.",
      difficulty: 'medium'
    },
    {
      id: 4,
      question: "Which part of the plant is responsible for absorbing water and minerals?",
      options: ["Leaves", "Stem", "Roots", "Flowers"],
      correctAnswer: 2,
      explanation: "Roots absorb water and minerals from the soil and transport them to other parts of the plant.",
      difficulty: 'easy'
    },
    {
      id: 5,
      question: "What is the green pigment in plants called?",
      options: ["Hemoglobin", "Chlorophyll", "Melanin", "Carotene"],
      correctAnswer: 1,
      explanation: "Chlorophyll is the green pigment in plants that captures light energy for photosynthesis.",
      difficulty: 'easy'
    },
    {
      id: 6,
      question: "Which type of nutrition do fungi exhibit?",
      options: ["Autotrophic", "Heterotrophic", "Parasitic", "Saprophytic"],
      correctAnswer: 3,
      explanation: "Fungi are saprophytic, meaning they obtain nutrients by decomposing dead organic matter.",
      difficulty: 'medium'
    },
    {
      id: 7,
      question: "What happens during digestion in animals?",
      options: ["Food is stored", "Large food molecules are broken into smaller ones", "Food is eliminated", "Food is produced"],
      correctAnswer: 1,
      explanation: "Digestion breaks down large, complex food molecules into smaller, simpler molecules that can be absorbed by the body.",
      difficulty: 'medium'
    },
    {
      id: 8,
      question: "Which vitamin deficiency causes scurvy?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correctAnswer: 2,
      explanation: "Scurvy is caused by vitamin C deficiency, leading to bleeding gums, joint pain, and poor wound healing.",
      difficulty: 'medium'
    },
    {
      id: 9,
      question: "In which part of the digestive system does most absorption occur?",
      options: ["Stomach", "Large intestine", "Small intestine", "Mouth"],
      correctAnswer: 2,
      explanation: "The small intestine has a large surface area with villi that maximize nutrient absorption into the bloodstream.",
      difficulty: 'hard'
    },
    {
      id: 10,
      question: "What is symbiosis in nutrition?",
      options: ["Competition for food", "Mutual benefit between organisms", "Parasitic relationship", "Independent feeding"],
      correctAnswer: 1,
      explanation: "Symbiosis is a relationship where both organisms benefit, like lichens (fungi and algae) or nitrogen-fixing bacteria in plant roots.",
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
    if (percentage >= 90) return '🌟 Outstanding! You\'re a nutrition expert!';
    if (percentage >= 80) return '🌱 Excellent! Great understanding of nutrition!';
    if (percentage >= 70) return '🍃 Good job! Keep learning about nutrition!';
    if (percentage >= 60) return '📚 Not bad! Review the nutrition concepts!';
    return '💪 Keep studying! Nutrition is important to understand!';
  };

  if (!isTimerActive && currentQuestion === 0 && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <Leaf className="w-20 h-20 mx-auto text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Nutrition in Plants & Animals</h1>
            <h2 className="text-xl font-semibold text-green-600 mb-4">Quiz Challenge</h2>
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
              <span>Test your nutrition knowledge!</span>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-800 flex items-center justify-center p-4">
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
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
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
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-800 flex items-center justify-center p-4">
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
            className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all duration-300"
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
                    ? 'border-green-500 bg-green-50 text-green-700 transform scale-105'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 hover:scale-102'
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
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {currentQuestion + 1 === questions.length ? 'View Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionQuizGame;