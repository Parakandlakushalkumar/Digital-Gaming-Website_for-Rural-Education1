import React, { useState, useEffect } from 'react';
import { Box, Award, RotateCcw, CheckCircle, XCircle, Shapes } from 'lucide-react';

const SurfaceAreasVolumesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35);
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "The surface area of a cube with side length 4 cm is:",
      options: ["64 cm²", "96 cm²", "48 cm²", "16 cm²"],
      correct: 1,
      explanation: "Surface area of cube = 6a² = 6 × 4² = 6 × 16 = 96 cm²",
      topic: "Cube"
    },
    {
      id: 2,
      question: "The volume of a cylinder with radius 3 cm and height 7 cm is:",
      options: ["42π cm³", "63π cm³", "21π cm³", "126π cm³"],
      correct: 1,
      explanation: "Volume of cylinder = πr²h = π × 3² × 7 = π × 9 × 7 = 63π cm³",
      topic: "Cylinder"
    },
    {
      id: 3,
      question: "A sphere has radius 6 cm. Its surface area is:",
      options: ["144π cm²", "288π cm²", "36π cm²", "72π cm²"],
      correct: 0,
      explanation: "Surface area of sphere = 4πr² = 4π × 6² = 4π × 36 = 144π cm²",
      topic: "Sphere"
    },
    {
      id: 4,
      question: "The volume of a cone with radius 4 cm and height 9 cm is:",
      options: ["48π cm³", "144π cm³", "36π cm³", "108π cm³"],
      correct: 0,
      explanation: "Volume of cone = (1/3)πr²h = (1/3)π × 4² × 9 = (1/3)π × 16 × 9 = 48π cm³",
      topic: "Cone"
    },
    {
      id: 5,
      question: "A cuboid has dimensions 6 cm × 4 cm × 3 cm. Its total surface area is:",
      options: ["108 cm²", "72 cm²", "36 cm²", "54 cm²"],
      correct: 0,
      explanation: "TSA of cuboid = 2(lb + bh + lh) = 2(6×4 + 4×3 + 6×3) = 2(24 + 12 + 18) = 2(54) = 108 cm²",
      topic: "Cuboid"
    },
    {
      id: 6,
      question: "The curved surface area of a cylinder with radius 5 cm and height 8 cm is:",
      options: ["80π cm²", "40π cm²", "200π cm²", "50π cm²"],
      correct: 0,
      explanation: "CSA of cylinder = 2πrh = 2π × 5 × 8 = 80π cm²",
      topic: "Cylinder CSA"
    },
    {
      id: 7,
      question: "If the volume of a sphere is (4/3)π × 27, what is its radius?",
      options: ["3", "9", "27", "6"],
      correct: 0,
      explanation: "Volume = (4/3)πr³ = (4/3)π × 27, so r³ = 27, therefore r = 3",
      topic: "Sphere Volume"
    },
    {
      id: 8,
      question: "The slant height of a cone with radius 6 cm and height 8 cm is:",
      options: ["10 cm", "14 cm", "12 cm", "16 cm"],
      correct: 0,
      explanation: "Slant height = √(r² + h²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm",
      topic: "Cone Slant Height"
    },
    {
      id: 9,
      question: "A hemisphere has radius 7 cm. Its total surface area is:",
      options: ["147π cm²", "196π cm²", "98π cm²", "294π cm²"],
      correct: 0,
      explanation: "TSA of hemisphere = 2πr² + πr² = 3πr² = 3π × 7² = 3π × 49 = 147π cm²",
      topic: "Hemisphere"
    },
    {
      id: 10,
      question: "The volume of a frustum of cone with radii 6 cm and 3 cm, and height 4 cm is:",
      options: ["84π cm³", "112π cm³", "168π cm³", "252π cm³"],
      correct: 0,
      explanation: "Volume of frustum = (1/3)πh(r₁² + r₂² + r₁r₂) = (1/3)π × 4 × (36 + 9 + 18) = (1/3)π × 4 × 63 = 84π cm³",
      topic: "Frustum"
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
    setTimeLeft(35);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false);
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 4));
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
    setTimeLeft(35);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 18)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              3D Geometry Master!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-cyan-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "🏆 3D Expert!" : 
               percentage >= 70 ? "📦 Shape Master!" :
               percentage >= 50 ? "🎲 Good Understanding!" : "🔷 Keep Learning!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Box className="w-8 h-8 text-cyan-400" />
              Surface Areas & Volumes
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
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30">
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
              <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl p-3 mb-4 border border-green-400/30">
                <div className="text-sm text-green-300">
                  Points earned: {10 + Math.max(0, Math.floor(timeLeft / 4))} 
                  {timeLeft > 0 && ` (${Math.max(0, Math.floor(timeLeft / 4))} time bonus)`}
                </div>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurfaceAreasVolumesQuiz;