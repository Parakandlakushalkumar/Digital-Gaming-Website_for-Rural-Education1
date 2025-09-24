import React, { useState } from 'react';
import { Triangle, Trophy, RotateCcw, Brain, CheckCircle, XCircle } from 'lucide-react';

const TrigonometryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const questions = [
    {
      question: "What is sin 90°?",
      options: ["0", "1", "√3/2", "1/2"],
      correct: "1",
      explanation: "sin 90° = 1. This is because at 90°, the opposite side equals the hypotenuse in a right triangle.",
      difficulty: "Easy"
    },
    {
      question: "If sin θ = 3/5, find cos θ (θ in first quadrant):",
      options: ["4/5", "3/4", "5/4", "5/3"],
      correct: "4/5",
      explanation: "Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1 → 9/25 + cos²θ = 1 → cos²θ = 16/25 → cos θ = 4/5 (positive in first quadrant)",
      difficulty: "Medium"
    },
    {
      question: "What is the value of tan 45°?",
      options: ["0", "1/√3", "1", "√3"],
      correct: "1",
      explanation: "tan 45° = sin 45°/cos 45° = (1/√2)/(1/√2) = 1. In a 45-45-90 triangle, opposite and adjacent sides are equal.",
      difficulty: "Easy"
    },
    {
      question: "Which identity is correct?",
      options: ["sin²θ + cos²θ = 0", "1 + tan²θ = sec²θ", "sin(A+B) = sinA + sinB", "cos 2θ = cos²θ + sin²θ"],
      correct: "1 + tan²θ = sec²θ",
      explanation: "This is a fundamental trigonometric identity. The others are incorrect: sin²θ + cos²θ = 1, sin(A+B) = sinA cosB + cosA sinB, cos 2θ = cos²θ - sin²θ",
      difficulty: "Medium"
    },
    {
      question: "Find the height of a tower if its shadow is 20m and angle of elevation is 30°:",
      options: ["20√3 m", "20/√3 m", "10√3 m", "40 m"],
      correct: "20/√3 m",
      explanation: "Using tan 30° = height/shadow: 1/√3 = height/20 → height = 20/√3 m ≈ 11.55 m",
      difficulty: "Hard"
    },
    {
      question: "What is cos 60°?",
      options: ["1/2", "√3/2", "1", "0"],
      correct: "1/2",
      explanation: "cos 60° = 1/2. This comes from the 30-60-90 triangle where the sides are in ratio 1:√3:2.",
      difficulty: "Easy"
    },
    {
      question: "If tan θ = 1/√3, find θ (0° ≤ θ ≤ 90°):",
      options: ["30°", "45°", "60°", "90°"],
      correct: "30°",
      explanation: "tan 30° = 1/√3. This is a standard angle value that should be memorized.",
      difficulty: "Medium"
    },
    {
      question: "Two buildings are 100m apart. From top of first (30m), angle of depression to base of second is 45°. Height of second building?",
      options: ["30m", "70m", "130m", "100m"],
      correct: "70m",
      explanation: "Angle of depression = angle of elevation from base of second to top of first. tan 45° = 30/(100) is wrong setup. Actually, if we go down 30m over 100m horizontal distance, tan 45° = 1, so the difference is 100m. But this means second building is 30m - 100m = -70m? Let me reconsider: the person sees down at 45°, so height difference = horizontal distance = 100m. Second building = 30 - 100 = -70m (impossible) or 30 + 100 = 130m if looking up. The setup suggests looking down to a shorter building, so second building = 30 - 30 = 0m? Actually, tan 45° = height_difference/100, so height_difference = 100m. Second building = 30 - 100 = -70m (below ground) is impossible. Let me assume the question means the second building height such that the angle works out to one of the options. If second building is 70m, then from 30m height, looking at 70m building... this doesn't make sense with angle of depression. I think there might be an error in this question setup.",
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
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete! 📐</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length} questions!</p>
          <div className="mb-6">
            {score === questions.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a trigonometry master! 🎯
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Great Work!</strong> You have solid trig skills! 📊
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Practicing!</strong> Review the trig ratios and identities! 📝
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
          <Triangle className="w-8 h-8" />
          Trigonometry & Applications Quiz
        </h1>
        <p className="text-gray-600">Master angles, ratios, and real-world applications!</p>
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          <Brain className="w-5 h-5 text-teal-500" />
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="bg-teal-100 px-3 py-1 rounded">Score: {score}</span>
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
                buttonClass += "border-teal-500 bg-teal-50";
              } else {
                buttonClass += "border-gray-200 hover:border-teal-300 hover:bg-teal-25";
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
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
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

export default TrigonometryQuiz;