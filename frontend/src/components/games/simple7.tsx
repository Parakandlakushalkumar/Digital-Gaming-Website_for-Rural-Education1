import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Wrench } from 'lucide-react';

const SimpleMachinesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "A lever that has the fulcrum between the effort and the load is called:",
      options: ["First-class lever", "Second-class lever", "Third-class lever", "Compound lever"],
      correct: 0,
      difficulty: "Medium",
      explanation: "In a first-class lever, the fulcrum is positioned between the effort (input force) and the load (output force). Examples include scissors, pliers, and seesaws."
    },
    {
      question: "What is the mechanical advantage of an inclined plane that is 10m long and 2m high?",
      options: ["5", "20", "8", "12"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Mechanical Advantage = Length ÷ Height = 10m ÷ 2m = 5. This means the inclined plane reduces the effort needed by a factor of 5."
    },
    {
      question: "Which simple machine is found in a doorknob?",
      options: ["Lever", "Pulley", "Wheel and axle", "Wedge"],
      correct: 2,
      difficulty: "Easy",
      explanation: "A doorknob is a wheel and axle system where the knob (wheel) rotates around a central shaft (axle) to operate the latch mechanism."
    },
    {
      question: "In a pulley system, what happens to the force needed as you add more pulleys?",
      options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
      correct: 1,
      difficulty: "Medium",
      explanation: "Adding more pulleys in a system decreases the force needed but increases the distance you must pull. This demonstrates the trade-off between force and distance."
    },
    {
      question: "A screw is essentially a combination of which two simple machines?",
      options: ["Lever and pulley", "Wedge and wheel", "Inclined plane and lever", "Inclined plane and cylinder"],
      correct: 3,
      difficulty: "Hard",
      explanation: "A screw is an inclined plane wrapped around a cylinder (cylindrical core). The threads form a continuous inclined plane that converts rotational motion to linear motion."
    },
    {
      question: "Which simple machine would be most effective for splitting wood?",
      options: ["Lever", "Pulley", "Wedge", "Screw"],
      correct: 2,
      difficulty: "Easy",
      explanation: "A wedge is designed to split or separate materials by converting a force applied to its blunt end into forces perpendicular to its inclined surfaces."
    },
    {
      question: "What is the ideal mechanical advantage of a lever with an effort arm of 60cm and a load arm of 20cm?",
      options: ["3", "40", "80", "0.33"],
      correct: 0,
      difficulty: "Hard",
      explanation: "IMA = Effort arm ÷ Load arm = 60cm ÷ 20cm = 3. This means the lever multiplies the input force by a factor of 3."
    },
    {
      question: "Which type of pulley changes the direction of force but doesn't provide mechanical advantage?",
      options: ["Fixed pulley", "Movable pulley", "Compound pulley", "Block and tackle"],
      correct: 0,
      difficulty: "Medium",
      explanation: "A fixed pulley only changes the direction of the applied force. It doesn't reduce the force needed, so its mechanical advantage is 1."
    },
    {
      question: "In a wheelbarrow, what class of lever is being used?",
      options: ["First-class", "Second-class", "Third-class", "Not a lever"],
      correct: 1,
      difficulty: "Medium",
      explanation: "A wheelbarrow is a second-class lever where the load is between the fulcrum (wheel) and the effort (handles). This provides a mechanical advantage greater than 1."
    },
    {
      question: "What principle explains why simple machines cannot create energy?",
      options: ["Newton's first law", "Conservation of energy", "Archimedes' principle", "Pascal's principle"],
      correct: 1,
      difficulty: "Hard",
      explanation: "The law of conservation of energy states that energy cannot be created or destroyed. Simple machines can only redirect or trade off force for distance, but the total work remains constant."
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

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Advanced Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Excellent! You've mastered simple machines!" : 
             score >= 6 ? "Good work! Keep practicing to improve." :
             "Keep studying - simple machines are fascinating!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Simple Machines Advanced Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Engineering & Technology</span>
        </div>
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
                  : 'hover:bg-blue-50 border-gray-200 hover:border-blue-300'
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
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold mb-2">Detailed Explanation:</h3>
          <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length} • {Math.round((score / Math.max(currentQuestion, 1)) * 100)}%
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleMachinesQuiz;