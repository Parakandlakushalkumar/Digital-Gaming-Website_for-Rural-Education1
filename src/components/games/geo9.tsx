import React, { useState, useEffect } from 'react';
import { Circle, Award, RotateCcw, CheckCircle, XCircle, Compass } from 'lucide-react';

const GeometryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "The radius of a circle is 7 cm. What is its circumference?",
      options: ["14π cm", "7π cm", "49π cm", "21π cm"],
      correct: 0,
      explanation: "Circumference = 2πr = 2π × 7 = 14π cm",
      topic: "Circle Properties"
    },
    {
      id: 2,
      question: "If the area of a circle is 36π square units, what is its radius?",
      options: ["6", "12", "18", "36"],
      correct: 0,
      explanation: "Area = πr² = 36π, so r² = 36, therefore r = 6 units",
      topic: "Circle Area"
    },
    {
      id: 3,
      question: "What is the angle subtended by a semicircle at any point on the circle?",
      options: ["45°", "60°", "90°", "180°"],
      correct: 2,
      explanation: "By Thales' theorem, any angle inscribed in a semicircle is a right angle (90°).",
      topic: "Circle Theorems"
    },
    {
      id: 4,
      question: "In a circle, if two chords are equal, then:",
      options: ["They are parallel", "They are perpendicular", "They are equidistant from center", "They intersect at center"],
      correct: 2,
      explanation: "Equal chords in a circle are always equidistant from the center.",
      topic: "Chord Properties"
    },
    {
      id: 5,
      question: "The length of an arc of a circle with radius 5 cm and central angle 72° is:",
      options: ["π cm", "2π cm", "5π cm", "10π cm"],
      correct: 1,
      explanation: "Arc length = (θ/360°) × 2πr = (72°/360°) × 2π × 5 = (1/5) × 10π = 2π cm",
      topic: "Arc Length"
    },
    {
      id: 6,
      question: "To construct a triangle given its three sides, we use:",
      options: ["SSS construction", "SAS construction", "ASA construction", "RHS construction"],
      correct: 0,
      explanation: "When three sides are given, we use SSS (Side-Side-Side) construction method.",
      topic: "Triangle Construction"
    },
    {
      id: 7,
      question: "The perpendicular bisector of a chord of a circle:",
      options: ["Passes through center", "Is parallel to diameter", "Bisects the arc", "Both A and C"],
      correct: 3,
      explanation: "The perpendicular bisector of any chord passes through the center and bisects the corresponding arc.",
      topic: "Chord Bisector"
    },
    {
      id: 8,
      question: "In circle construction, to divide a line segment in a given ratio, we use:",
      options: ["Parallel lines", "Perpendicular lines", "Concentric circles", "Angle bisectors"],
      correct: 0,
      explanation: "We use the basic proportionality theorem with parallel lines to divide a line segment in a given ratio.",
      topic: "Line Division"
    },
    {
      id: 9,
      question: "The tangent to a circle from an external point:",
      options: ["Forms 45° with radius", "Forms 60° with radius", "Forms 90° with radius", "Is parallel to radius"],
      correct: 2,
      explanation: "A tangent to a circle is always perpendicular (90°) to the radius at the point of tangency.",
      topic: "Tangent Properties"
    },
    {
      id: 10,
      question: "To construct an angle of 15°, we can:",
      options: ["Bisect 30°", "Trisect 45°", "Bisect 45° twice", "None of these"],
      correct: 0,
      explanation: "15° = 30°/2, so we construct 30° first and then bisect it to get 15°.",
      topic: "Angle Construction"
    }
  ];

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false);
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 3));
      setScore(score + 10 + timeBonus);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      startTimer();
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimerActive(false);
    setTimeLeft(30);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 13)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Geometry Expert!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-purple-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-pink-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "🏆 Construction Master!" : 
               percentage >= 70 ? "📐 Shape Expert!" :
               percentage >= 50 ? "⭕ Good Knowledge!" : "📏 Keep Building!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Circle className="w-8 h-8 text-purple-400" />
              Geometry Quiz
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="bg-black/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
              {currentQ.topic}
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-6 leading-relaxed">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] font-medium
                  ${showResult 
                    ? index === currentQ.correct
                      ? 'bg-green-500/30 border-2 border-green-400 text-green-100'
                      : selectedAnswer === index 
                        ? 'bg-red-500/30 border-2 border-red-400 text-red-100'
                        : 'bg-white/5 border border-white/20 text-white/70'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        {showResult && (
          <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl border-2 
            ${isCorrect ? 'border-green-400' : 'border-red-400'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              <h3 className="text-xl font-bold">
                {isCorrect ? 'Correct!' : selectedAnswer === -1 ? 'Time Up!' : 'Not Quite'}
              </h3>
            </div>
            
            <p className="text-white mb-4 leading-relaxed">{currentQ.explanation}</p>
            
            {isCorrect && (
              <div className="bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-xl p-3 mb-4 border border-green-400/30">
                <div className="text-sm text-green-300">
                  Points earned: {10 + Math.max(0, Math.floor(timeLeft / 3))} 
                  {timeLeft > 0 && ` (${Math.max(0, Math.floor(timeLeft / 3))} time bonus)`}
                </div>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometryQuiz;