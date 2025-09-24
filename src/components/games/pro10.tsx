import React, { useState } from 'react';
import { Dice6, Trophy, RotateCcw, Brain, CheckCircle, XCircle } from 'lucide-react';

const ProbabilityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "What is the probability of getting heads when flipping a fair coin?",
      options: ["0", "1/4", "1/2", "1"],
      correct: "1/2",
      explanation: "A fair coin has 2 equally likely outcomes: heads or tails. P(heads) = 1/2 = 0.5",
      difficulty: "Easy"
    },
    {
      question: "A bag contains 3 red and 7 blue balls. What's the probability of drawing a red ball?",
      options: ["3/10", "3/7", "7/10", "1/3"],
      correct: "3/10",
      explanation: "Total balls = 3 + 7 = 10. P(red) = Number of red balls / Total balls = 3/10",
      difficulty: "Easy"
    },
    {
      question: "What is the probability of rolling a sum of 7 with two dice?",
      options: ["1/6", "1/12", "5/36", "1/36"],
      correct: "1/6",
      explanation: "Possible ways to get sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways. Total outcomes = 36. P = 6/36 = 1/6",
      difficulty: "Medium"
    },
    {
      question: "If P(A) = 0.6 and P(B) = 0.4, and A and B are mutually exclusive, find P(A ∪ B):",
      options: ["1.0", "0.24", "0.8", "0.2"],
      correct: "1.0",
      explanation: "For mutually exclusive events: P(A ∪ B) = P(A) + P(B) = 0.6 + 0.4 = 1.0",
      difficulty: "Medium"
    },
    {
      question: "A card is drawn from a standard deck. What's P(King or Heart)?",
      options: ["4/13", "17/52", "16/52", "1/4"],
      correct: "4/13",
      explanation: "P(King or Heart) = P(King) + P(Heart) - P(King of Hearts) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13",
      difficulty: "Hard"
    },
    {
      question: "What is the range of probability values?",
      options: ["0 to 100", "-1 to 1", "0 to 1", "1 to 10"],
      correct: "0 to 1",
      explanation: "Probability values always range from 0 (impossible event) to 1 (certain event). This is a fundamental property.",
      difficulty: "Easy"
    },
    {
      question: "If you draw 2 balls without replacement from 5 red and 3 blue balls, what's P(both red)?",
      options: ["25/64", "5/14", "10/28", "2/7"],
      correct: "5/14",
      explanation: "P(1st red) = 5/8, P(2nd red | 1st red) = 4/7. P(both red) = (5/8) × (4/7) = 20/56 = 5/14",
      difficulty: "Hard"
    },
    {
      question: "In 3 coin tosses, what's the probability of getting exactly 2 heads?",
      options: ["1/8", "3/8", "1/2", "2/3"],
      correct: "3/8",
      explanation: "Possible outcomes for exactly 2 heads: HHT, HTH, THH = 3 outcomes. Total outcomes = 2³ = 8. P = 3/8",
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
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete! 🎲</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a probability expert! 🎯
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Work!</strong> You understand probability well! 📊
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review probability rules and formulas! 📝
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <Dice6 className="w-8 h-8" />
          Probability Quiz
        </h1>
        <p className="text-gray-600">Test your understanding of chance and likelihood!</p>
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Brain className="w-5 h-5 text-pink-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-pink-100 px-3 py-1 rounded">Score: {score}</span>
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
                buttonClass += "border-pink-500 bg-pink-50";
              } else {
                buttonClass += "border-gray-200 hover:border-pink-300 hover:bg-pink-25";
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
            <p className="text-blue-700 text-sm">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {!answerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedAnswer
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
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

export default ProbabilityQuiz;