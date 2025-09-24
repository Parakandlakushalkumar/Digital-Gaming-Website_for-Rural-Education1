import React, { useState, useEffect } from 'react';
import { Users, RotateCcw, Trophy, Heart, CheckCircle, X } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'match';
  options?: string[];
  pairs?: { left: string[]; right: string[] };
  correctAnswer: number | boolean | number[];
  explanation: string;
  category: 'reproduction' | 'adolescence' | 'health';
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the main function of reproduction?",
    type: 'multiple-choice',
    options: ["Growth of organism", "Continuation of species", "Energy production", "Waste removal"],
    correctAnswer: 1,
    explanation: "Reproduction ensures the continuation of species from one generation to the next.",
    category: 'reproduction'
  },
  {
    id: 2,
    question: "Adolescence typically begins around age 10-12 years.",
    type: 'true-false',
    correctAnswer: true,
    explanation: "Adolescence usually begins around 10-12 years of age, though it can vary among individuals.",
    category: 'adolescence'
  },
  {
    id: 3,
    question: "Which of these are physical changes during adolescence?",
    type: 'multiple-choice',
    options: ["Voice change", "Growth spurts", "Mood swings", "All of the above"],
    correctAnswer: 3,
    explanation: "All these are common changes during adolescence - voice change, growth spurts, and emotional changes like mood swings.",
    category: 'adolescence'
  },
  {
    id: 4,
    question: "Sexual reproduction requires only one parent.",
    type: 'true-false',
    correctAnswer: false,
    explanation: "Sexual reproduction requires two parents - male and female gametes combine to form offspring.",
    category: 'reproduction'
  },
  {
    id: 5,
    question: "What hormone is responsible for growth during adolescence?",
    type: 'multiple-choice',
    options: ["Insulin", "Growth hormone", "Adrenaline", "Thyroxine"],
    correctAnswer: 1,
    explanation: "Growth hormone is primarily responsible for the growth spurts experienced during adolescence.",
    category: 'adolescence'
  },
  {
    id: 6,
    question: "Asexual reproduction produces offspring identical to the parent.",
    type: 'true-false',
    correctAnswer: true,
    explanation: "In asexual reproduction, offspring are genetically identical to the parent as only one parent is involved.",
    category: 'reproduction'
  },
  {
    id: 7,
    question: "Which of these is important for adolescent health?",
    type: 'multiple-choice',
    options: ["Balanced diet", "Regular exercise", "Adequate sleep", "All of the above"],
    correctAnswer: 3,
    explanation: "All these factors - balanced diet, exercise, and adequate sleep - are crucial for healthy adolescent development.",
    category: 'health'
  },
  {
    id: 8,
    question: "Metamorphosis is a type of reproduction.",
    type: 'true-false',
    correctAnswer: false,
    explanation: "Metamorphosis is a developmental process, not reproduction. It's the transformation from larva to adult form.",
    category: 'reproduction'
  },
  {
    id: 9,
    question: "What is the average age range for adolescence?",
    type: 'multiple-choice',
    options: ["5-10 years", "10-19 years", "20-25 years", "15-20 years"],
    correctAnswer: 1,
    explanation: "Adolescence typically spans from 10-19 years of age, marking the transition from childhood to adulthood.",
    category: 'adolescence'
  },
  {
    id: 10,
    question: "Peer pressure only has negative effects on adolescents.",
    type: 'true-false',
    correctAnswer: false,
    explanation: "Peer pressure can be both positive and negative. Positive peer pressure can encourage good habits and achievements.",
    category: 'adolescence'
  },
  {
    id: 11,
    question: "Which reproductive method produces genetic variation?",
    type: 'multiple-choice',
    options: ["Budding", "Binary fission", "Sexual reproduction", "Vegetative propagation"],
    correctAnswer: 2,
    explanation: "Sexual reproduction produces genetic variation because offspring receive genes from both parents.",
    category: 'reproduction'
  },
  {
    id: 12,
    question: "Mental health is as important as physical health during adolescence.",
    type: 'true-false',
    correctAnswer: true,
    explanation: "Mental health is equally important as physical health, especially during adolescence when many psychological changes occur.",
    category: 'health'
  }
];

const categories = {
  reproduction: { name: 'Reproduction', color: 'bg-pink-100 border-pink-400', icon: '🌱' },
  adolescence: { name: 'Adolescence', color: 'bg-blue-100 border-blue-400', icon: '👦' },
  health: { name: 'Health', color: 'bg-green-100 border-green-400', icon: '💪' }
};

const ReproductionAdolescencePuzzle: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | boolean | null)[]>(new Array(questions.length).fill(null));

  const handleAnswerSelect = (answer: number | boolean) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    setShowResult(true);
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setGameComplete(false);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const getScoreColor = () => {
    const percentage = (score / (questions.length * 10)) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 10)) * 100;
    if (percentage >= 90) return '🎉 Outstanding! You understand reproduction and adolescence very well!';
    if (percentage >= 80) return '👏 Great job! You have good knowledge of these important topics!';
    if (percentage >= 70) return '👍 Good work! Keep learning about human development!';
    if (percentage >= 60) return '📚 Not bad! Review these topics to improve your understanding!';
    return '💪 Keep studying! These are important topics for your health and development!';
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length * 10}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {getScoreMessage()}
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Your accuracy: <span className={`font-bold ${getScoreColor()}`}>
              {Math.round((score / (questions.length * 10)) * 100)}%
            </span>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const categoryInfo = categories[question.category];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Reproduction & Adolescence Quiz</h1>
            </div>
            <div className="text-right">
              <div className="text-pink-100">Score</div>
              <div className="text-2xl font-bold">{score}/{questions.length * 10}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-pink-100 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-pink-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="p-4 border-b">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${categoryInfo.color}`}>
            <span className="text-xl">{categoryInfo.icon}</span>
            <span className="font-semibold text-gray-800">{categoryInfo.name}</span>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Options */}
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left border-2 rounded-lg font-medium transition-all duration-200 ";
                
                if (!answered) {
                  buttonClass += "border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-700";
                } else if (index === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-100 text-green-800";
                } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-100 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={answered}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {answered && index === question.correctAnswer && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {answered && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* True/False Questions */}
          {question.type === 'true-false' && (
            <div className="flex gap-4 mb-6">
              {[true, false].map((value) => {
                let buttonClass = "flex-1 p-6 text-center border-2 rounded-lg font-medium transition-all duration-200 ";
                
                if (!answered) {
                  buttonClass += "border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-700";
                } else if (value === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-100 text-green-800";
                } else if (value === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-100 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }

                return (
                  <button
                    key={value.toString()}
                    onClick={() => handleAnswerSelect(value)}
                    className={buttonClass}
                    disabled={answered}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">{value ? '✅' : '❌'}</span>
                      <span className="text-xl font-bold">{value ? 'True' : 'False'}</span>
                      {answered && value === question.correctAnswer && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {answered && value === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation */}
          {showResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Explanation:
              </h3>
              <p className="text-blue-700">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <div className="flex justify-end">
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReproductionAdolescencePuzzle;