import React, { useState, useEffect } from 'react';
import { User, MapPin, Trophy, Star, ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface MathAdventureGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

const MathAdventureGame: React.FC<MathAdventureGameProps> = ({ onComplete, onExit, currentLanguage = 'en' }) => {
  const [gameState, setGameState] = useState('start');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentWorld, setCurrentWorld] = useState(1);
  const [completedWorlds, setCompletedWorlds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const characters = [
    { id: 'student', name: 'Alex the Student', emoji: '👨‍🎓', description: 'Eager to learn math!' },
    { id: 'explorer', name: 'Maya the Explorer', emoji: '🧭', description: 'Ready for adventure!' },
    { id: 'robot', name: 'Robo Calculator', emoji: '🤖', description: 'Programmed for precision!' }
  ];

  const worlds = {
    1: {
      name: 'Relations & Functions',
      title: 'Function Matcher Forest',
      description: 'Help clear the fog by matching equations with their graphs!',
      emoji: '🌲',
      color: 'from-green-600 to-emerald-700',
      questions: [
        {
          question: "Which graph represents y = x²?",
          options: ["Parabola opening upward", "Straight line", "Circle", "Parabola opening downward"],
          correct: 0,
          explanation: "y = x² creates a U-shaped parabola opening upward"
        },
        {
          question: "What is the domain of f(x) = 1/x?",
          options: ["All real numbers", "x ≠ 0", "x > 0", "x < 0"],
          correct: 1,
          explanation: "Division by zero is undefined, so x cannot equal 0"
        },
        {
          question: "Which function represents a linear relationship?",
          options: ["f(x) = x²", "f(x) = 2x + 3", "f(x) = √x", "f(x) = 1/x"],
          correct: 1,
          explanation: "f(x) = 2x + 3 is in the form y = mx + b, which is linear"
        }
      ]
    },
    2: {
      name: 'Inverse Trigonometry',
      title: 'Unlock the Path',
      description: 'Solve inverse trig puzzles to open the locked gates!',
      emoji: '🔓',
      color: 'from-blue-600 to-cyan-700',
      questions: [
        {
          question: "What is arcsin(1/2)?",
          options: ["30°", "45°", "60°", "90°"],
          correct: 0,
          explanation: "arcsin(1/2) = 30° because sin(30°) = 1/2"
        },
        {
          question: "What is arccos(0)?",
          options: ["0°", "30°", "60°", "90°"],
          correct: 3,
          explanation: "arccos(0) = 90° because cos(90°) = 0"
        },
        {
          question: "What is arctan(1)?",
          options: ["30°", "45°", "60°", "90°"],
          correct: 1,
          explanation: "arctan(1) = 45° because tan(45°) = 1"
        }
      ]
    },
    3: {
      name: 'Calculus',
      title: 'Slope Racer Coaster',
      description: 'Calculate slopes and areas to keep your cart moving!',
      emoji: '🎢',
      color: 'from-purple-600 to-violet-700',
      questions: [
        {
          question: "What is the derivative of f(x) = x³?",
          options: ["x²", "3x²", "3x³", "x³/3"],
          correct: 1,
          explanation: "Using the power rule: d/dx(x³) = 3x²"
        },
        {
          question: "What is ∫2x dx?",
          options: ["2", "x²", "x² + C", "2x² + C"],
          correct: 2,
          explanation: "∫2x dx = x² + C (don't forget the constant!)"
        },
        {
          question: "What is the slope of y = 3x + 5?",
          options: ["3", "5", "8", "3x"],
          correct: 0,
          explanation: "In y = mx + b form, the slope is the coefficient of x, which is 3"
        }
      ]
    },
    4: {
      name: 'Vectors & 3D Geometry',
      title: 'Vector Quest Crystal Cave',
      description: 'Use vector directions to navigate the crystal maze!',
      emoji: '💎',
      color: 'from-amber-600 to-orange-700',
      questions: [
        {
          question: "What is the magnitude of vector (3, 4)?",
          options: ["5", "7", "12", "25"],
          correct: 0,
          explanation: "Magnitude = √(3² + 4²) = √(9 + 16) = √25 = 5"
        },
        {
          question: "What is (2, 3) + (1, 4)?",
          options: ["(3, 7)", "(2, 12)", "(1, 1)", "(3, 1)"],
          correct: 0,
          explanation: "Add corresponding components: (2+1, 3+4) = (3, 7)"
        },
        {
          question: "Which vectors are perpendicular?",
          options: ["(1, 2) and (2, 1)", "(1, 0) and (0, 1)", "(2, 3) and (3, 2)", "(1, 1) and (2, 2)"],
          correct: 1,
          explanation: "Perpendicular vectors have dot product = 0. (1,0)·(0,1) = 1×0 + 0×1 = 0"
        }
      ]
    },
    5: {
      name: 'Probability & Statistics',
      title: 'Chance Challenge Casino',
      description: 'Predict probabilities and beat the house!',
      emoji: '🎰',
      color: 'from-red-600 to-pink-700',
      questions: [
        {
          question: "What's the probability of rolling a 6 on a fair die?",
          options: ["1/2", "1/3", "1/6", "1/12"],
          correct: 2,
          explanation: "There's 1 favorable outcome out of 6 possible outcomes"
        },
        {
          question: "In 10 coin flips, what's the expected number of heads?",
          options: ["3", "4", "5", "7"],
          correct: 2,
          explanation: "Expected value = probability × trials = 0.5 × 10 = 5"
        },
        {
          question: "What's the probability of drawing a red card from a standard deck?",
          options: ["1/4", "1/3", "1/2", "2/3"],
          correct: 2,
          explanation: "26 red cards out of 52 total cards = 26/52 = 1/2"
        }
      ]
    }
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setGameState('worldMap');
  };

  const startWorld = (worldNum) => {
    if (worldNum === 1 || completedWorlds.includes(worldNum - 1)) {
      setCurrentWorld(worldNum);
      setCurrentQuestion(0);
      setGameState('playing');
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === worlds[currentWorld].questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < worlds[currentWorld].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        // World completed
        if (!completedWorlds.includes(currentWorld)) {
          setCompletedWorlds([...completedWorlds, currentWorld]);
        }
        setScore(score + 50); // Bonus for completing world
        setGameState('worldComplete');
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameState('start');
    setSelectedCharacter(null);
    setCurrentWorld(1);
    setCompletedWorlds([]);
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  // Start Screen
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center text-white">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Math Adventure
            </h1>
            <h2 className="text-2xl mb-2">The Knowledge Quest</h2>
            <p className="text-lg opacity-90">Journey through 5 magical worlds and become a Math Master!</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl mb-4">Choose Your Character:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {characters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => handleCharacterSelect(char)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-2">{char.emoji}</div>
                  <h4 className="font-bold text-lg mb-1">{char.name}</h4>
                  <p className="text-sm opacity-80">{char.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onExit}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
            >
              Exit Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // World Map
  if (gameState === 'worldMap') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{selectedCharacter.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
                <p className="opacity-80">Choose your next adventure!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-xl font-bold">{score}</span>
              </div>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={onExit}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Exit Game
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(worlds).map(([worldNum, world]) => {
              const isUnlocked = parseInt(worldNum) === 1 || completedWorlds.includes(parseInt(worldNum) - 1);
              const isCompleted = completedWorlds.includes(parseInt(worldNum));
              
              return (
                <div
                  key={worldNum}
                  className={`relative rounded-xl p-6 transition-all duration-300 ${
                    isUnlocked
                      ? `bg-gradient-to-br ${world.color} hover:scale-105 cursor-pointer`
                      : 'bg-gray-700/50 cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => isUnlocked && startWorld(parseInt(worldNum))}
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-3">
                      {world.emoji}
                      {isCompleted && <CheckCircle className="inline ml-2 text-green-400" size={24} />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">World {worldNum}</h3>
                    <h4 className="text-lg mb-2">{world.title}</h4>
                    <p className="text-sm opacity-90 mb-4">{world.description}</p>
                    
                    {isUnlocked && (
                      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                        Enter <ArrowRight size={16} />
                      </button>
                    )}
                    
                    {!isUnlocked && (
                      <div className="text-yellow-400 text-sm">
                        🔒 Complete World {parseInt(worldNum) - 1} first
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {completedWorlds.length === 5 && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-black">
                <Trophy size={48} className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">🏆 MATH MASTER! 🏆</h2>
                <p className="text-lg">Congratulations! You've conquered all 5 worlds!</p>
                <p className="text-xl font-bold mt-2">Final Score: {score}</p>
                <div className="flex gap-4 justify-center mt-6">
                  <button
                    onClick={() => onComplete(Math.min(score, 100))}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Trophy size={20} />
                    Complete Game
                  </button>
                  <button
                    onClick={resetGame}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Play Again
                  </button>
                  <button
                    onClick={onExit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  >
                    Exit Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playing Game
  if (gameState === 'playing') {
    const world = worlds[currentWorld];
    const question = world.questions[currentQuestion];
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${world.color} p-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{world.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold">{world.title}</h2>
                <p>Question {currentQuestion + 1} of {world.questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-xl font-bold">{score}</span>
              </div>
              <button
                onClick={() => setGameState('worldMap')}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                ← Back to Map
              </button>
              <button
                onClick={onExit}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Exit Game
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 text-white">
            <div className="mb-6">
              <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / world.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">{question.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 rounded-lg text-left transition-all duration-300 ${
                    showResult
                      ? index === question.correct
                        ? 'bg-green-500/50 border-green-400 border-2'
                        : selectedAnswer === index
                        ? 'bg-red-500/50 border-red-400 border-2'
                        : 'bg-white/10 border border-white/20'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {showResult && index === question.correct && <CheckCircle className="text-green-400" size={20} />}
                    {showResult && selectedAnswer === index && index !== question.correct && <XCircle className="text-red-400" size={20} />}
                    <span className="font-semibold">{String.fromCharCode(65 + index)})</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Explanation:</h4>
                <p>{question.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // World Complete
  if (gameState === 'worldComplete') {
    const world = worlds[currentWorld];
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${world.color} flex items-center justify-center p-4`}>
        <div className="max-w-2xl w-full text-center text-white">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8">
            <div className="text-6xl mb-4">{world.emoji}</div>
            <h2 className="text-3xl font-bold mb-4">World {currentWorld} Complete!</h2>
            <h3 className="text-xl mb-4">{world.title}</h3>
            <p className="text-lg mb-6 opacity-90">Great job conquering {world.name}!</p>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="text-yellow-400" size={24} />
              <span className="text-2xl font-bold">+50 Bonus Points!</span>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setGameState('worldMap')}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <MapPin size={20} />
                Back to Map
              </button>
              
              {currentWorld < 5 && completedWorlds.includes(currentWorld) && (
                <button
                  onClick={() => startWorld(currentWorld + 1)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-bold"
                >
                  Next World <ArrowRight size={20} />
                </button>
              )}

              <button
                onClick={onExit}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MathAdventureGame;