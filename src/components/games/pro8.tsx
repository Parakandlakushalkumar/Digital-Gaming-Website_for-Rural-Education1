import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the probability of flipping a fair coin and getting heads?",
    options: ["1/4", "1/3", "1/2", "2/3"],
    correctAnswer: 2,
    explanation: "A fair coin has two equally likely outcomes: heads or tails. So P(heads) = 1/2."
  },
  {
    id: 2,
    question: "If you roll a standard six-sided die, what's the probability of getting an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    correctAnswer: 2,
    explanation: "Even numbers on a die are 2, 4, and 6. That's 3 out of 6 outcomes, so P(even) = 3/6 = 1/2."
  },
  {
    id: 3,
    question: "What is the range of all possible probability values?",
    options: ["0 to 100", "-1 to 1", "0 to 1", "1 to ∞"],
    correctAnswer: 2,
    explanation: "Probability values always range from 0 (impossible event) to 1 (certain event)."
  },
  {
    id: 4,
    question: "If P(A) = 0.3, what is P(not A)?",
    options: ["0.3", "0.6", "0.7", "1.3"],
    correctAnswer: 2,
    explanation: "The probability of the complement is P(not A) = 1 - P(A) = 1 - 0.3 = 0.7."
  },
  {
    id: 5,
    question: "Two events are mutually exclusive. If P(A) = 0.4 and P(B) = 0.3, what is P(A or B)?",
    options: ["0.1", "0.12", "0.7", "1.0"],
    correctAnswer: 2,
    explanation: "For mutually exclusive events, P(A or B) = P(A) + P(B) = 0.4 + 0.3 = 0.7."
  },
  {
    id: 6,
    question: "What's the probability of drawing an ace from a standard 52-card deck?",
    options: ["1/13", "1/26", "4/52", "Both A and C"],
    correctAnswer: 3,
    explanation: "There are 4 aces in a 52-card deck, so P(ace) = 4/52 = 1/13. Both answers A and C are correct."
  },
  {
    id: 7,
    question: "If you flip three coins, what's the probability of getting exactly two heads?",
    options: ["1/8", "2/8", "3/8", "4/8"],
    correctAnswer: 2,
    explanation: "Possible outcomes with exactly 2 heads: HHT, HTH, THH. That's 3 out of 8 total outcomes = 3/8."
  },
  {
    id: 8,
    question: "What does it mean for two events to be independent?",
    options: [
      "They cannot happen at the same time",
      "The occurrence of one doesn't affect the other",
      "They have the same probability",
      "They always happen together"
    ],
    correctAnswer: 1,
    explanation: "Independent events means the occurrence of one event doesn't change the probability of the other event occurring."
  },
  {
    id: 9,
    question: "In a bag with 5 red balls and 3 blue balls, what's the probability of drawing a red ball?",
    options: ["3/8", "5/8", "3/5", "5/3"],
    correctAnswer: 1,
    explanation: "Total balls = 5 + 3 = 8. Red balls = 5. So P(red) = 5/8."
  },
  {
    id: 10,
    question: "What is the sum of all probabilities in a sample space?",
    options: ["0", "0.5", "1", "Depends on the number of outcomes"],
    correctAnswer: 2,
    explanation: "The sum of all probabilities in a sample space always equals 1, as one of the outcomes must occur."
  }
];

const ProbabilityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowResult(true);
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setQuizComplete(false);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🎉 Excellent! You\'re a probability master!';
    if (percentage >= 80) return '👏 Great job! You have a solid understanding of probability!';
    if (percentage >= 70) return '👍 Good work! Keep practicing to improve further!';
    if (percentage >= 60) return '📚 Not bad! Review the concepts and try again!';
    return '💪 Keep studying! Probability takes practice to master!';
  };

  if (quizComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {getScoreMessage()}
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Your accuracy: <span className={`font-bold ${getScoreColor()}`}>
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Probability Basics Quiz</h1>
            </div>
            <div className="text-right">
              <div className="text-blue-100">Score</div>
              <div className="text-2xl font-bold">{score}/{questions.length}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg font-medium transition-all duration-200 ";
              
              if (!answered) {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
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
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
              <p className="text-blue-700">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <div className="flex justify-end">
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
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

export default ProbabilityQuiz;