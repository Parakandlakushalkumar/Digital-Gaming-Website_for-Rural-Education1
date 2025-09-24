import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Trophy, Sparkles, RotateCcw, CheckCircle, X } from 'lucide-react';

interface TopicLock {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  isUnlocked: boolean;
  color: string;
}

interface TreasureBoxGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

const TreasureBoxGame: React.FC<TreasureBoxGameProps> = ({ onComplete, onExit, currentLanguage = 'en' }) => {
  const [locks, setLocks] = useState<TopicLock[]>([
    {
      id: 1,
      topic: "Units & Measurement",
      question: "Convert 5 km to meters:",
      options: ["500 m", "5000 m", "50 m", "50000 m"],
      correctAnswer: "5000 m",
      explanation: "1 km = 1000 m, so 5 km = 5 × 1000 = 5000 m",
      isUnlocked: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      topic: "Motion",
      question: "If speed = 10 m/s and time = 5s, what is the distance?",
      options: ["50 m", "15 m", "2 m", "25 m"],
      correctAnswer: "50 m",
      explanation: "Distance = Speed × Time = 10 m/s × 5s = 50 m",
      isUnlocked: false,
      color: "from-green-400 to-green-600"
    },
    {
      id: 3,
      topic: "Laws of Motion",
      question: "'A body at rest remains at rest.' This is which Newton's law?",
      options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
      correctAnswer: "First Law",
      explanation: "Newton's First Law states that a body at rest stays at rest unless acted upon by an external force.",
      isUnlocked: false,
      color: "from-red-400 to-red-600"
    },
    {
      id: 4,
      topic: "Gravitation",
      question: "Which force keeps Earth revolving around the Sun?",
      options: ["Magnetic force", "Gravitational force", "Electric force", "Nuclear force"],
      correctAnswer: "Gravitational force",
      explanation: "The gravitational force between the Sun and Earth keeps Earth in its orbit.",
      isUnlocked: false,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 5,
      topic: "Oscillations & Waves",
      question: "A frequency of 2 Hz means how many oscillations per second?",
      options: ["1", "2", "4", "0.5"],
      correctAnswer: "2",
      explanation: "Frequency (Hz) represents the number of oscillations per second. 2 Hz = 2 oscillations per second.",
      isUnlocked: false,
      color: "from-cyan-400 to-cyan-600"
    },
    {
      id: 6,
      topic: "Thermodynamics",
      question: "Ice melting is which process?",
      options: ["Heat absorption", "Heat release", "No heat change", "Heat conversion"],
      correctAnswer: "Heat absorption",
      explanation: "When ice melts, it absorbs heat energy from the surroundings to change from solid to liquid state.",
      isUnlocked: false,
      color: "from-orange-400 to-orange-600"
    },
    {
      id: 7,
      topic: "Organic Chemistry Basics",
      question: "What is the formula of methane?",
      options: ["CH₂", "CH₃", "CH₄", "C₂H₆"],
      correctAnswer: "CH₄",
      explanation: "Methane consists of one carbon atom bonded to four hydrogen atoms: CH₄",
      isUnlocked: false,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: 8,
      topic: "Plant Physiology",
      question: "Which gas is released during photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correctAnswer: "Oxygen",
      explanation: "During photosynthesis, plants absorb CO₂ and release O₂ as a byproduct.",
      isUnlocked: false,
      color: "from-lime-400 to-lime-600"
    },
    {
      id: 9,
      topic: "Human Physiology",
      question: "Which organ pumps blood throughout the body?",
      options: ["Lungs", "Liver", "Heart", "Kidney"],
      correctAnswer: "Heart",
      explanation: "The heart is a muscular organ that pumps blood through the circulatory system.",
      isUnlocked: false,
      color: "from-pink-400 to-pink-600"
    }
  ]);

  const [currentLock, setCurrentLock] = useState<TopicLock | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [treasureUnlocked, setTreasureUnlocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const unlockedCount = locks.filter(lock => lock.isUnlocked).length;

  const handleLockClick = (lock: TopicLock) => {
    if (lock.isUnlocked) return;
    
    setCurrentLock(lock);
    setShowQuestion(true);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const handleAnswerSubmit = () => {
    if (!currentLock || !selectedAnswer) return;

    const correct = selectedAnswer === currentLock.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        setLocks(prevLocks => 
          prevLocks.map(lock => 
            lock.id === currentLock.id ? { ...lock, isUnlocked: true } : lock
          )
        );
        setShowQuestion(false);
        setCurrentLock(null);
      }, 2500);
    }
  };

  const handleCloseQuestion = () => {
    setShowQuestion(false);
    setCurrentLock(null);
    setShowResult(false);
    setSelectedAnswer('');
  };

  const handleRetry = () => {
    setShowResult(false);
    setSelectedAnswer('');
  };

  const resetGame = () => {
    setLocks(prevLocks => prevLocks.map(lock => ({ ...lock, isUnlocked: false })));
    setTreasureUnlocked(false);
    setShowCelebration(false);
  };

  // Check if treasure should be unlocked
  useEffect(() => {
    if (unlockedCount === 9 && !treasureUnlocked) {
      setTreasureUnlocked(true);
      setTimeout(() => setShowCelebration(true), 1000);
    }
  }, [unlockedCount, treasureUnlocked]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <Sparkles className="text-yellow-300 opacity-30" size={16 + Math.random() * 16} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2">
            🏛 Science Treasure Box 🏛
          </h1>
          <p className="text-xl text-amber-700 mb-4">
            Unlock all 9 locks to reveal the ancient treasure!
          </p>
          <div className="inline-flex items-center bg-amber-200 px-6 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-amber-600 mr-2" />
            <span className="font-bold text-amber-800">{unlockedCount}/9 Locks Opened</span>
          </div>
        </div>

        {/* Treasure Box */}
        <div className="relative mx-auto w-full max-w-2xl">
          {/* Main treasure chest */}
          <div className={`relative bg-gradient-to-br ${treasureUnlocked 
            ? 'from-yellow-300 via-yellow-400 to-yellow-500 shadow-2xl shadow-yellow-500/50' 
            : 'from-amber-600 via-amber-700 to-amber-800'
          } rounded-2xl p-8 border-4 ${treasureUnlocked ? 'border-yellow-200' : 'border-amber-900'} transition-all duration-1000`}>
            
            {/* Treasure box lid */}
            <div className={`absolute -top-6 left-4 right-4 h-12 bg-gradient-to-r ${treasureUnlocked 
              ? 'from-yellow-400 to-yellow-500' 
              : 'from-amber-700 to-amber-800'
            } rounded-t-2xl border-4 ${treasureUnlocked ? 'border-yellow-200' : 'border-amber-900'} transition-all duration-1000 ${treasureUnlocked ? 'animate-bounce' : ''}`}>
              {treasureUnlocked && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Sparkles className="text-yellow-200 animate-spin" size={24} />
                </div>
              )}
            </div>

            {/* Locks Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {locks.map((lock) => (
                <div key={lock.id} className="flex flex-col items-center">
                  {/* Lock */}
                  <div
                    onClick={() => handleLockClick(lock)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      lock.isUnlocked
                        ? `bg-gradient-to-br ${lock.color} shadow-lg`
                        : 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500 hover:scale-110'
                    } border-4 ${lock.isUnlocked ? 'border-white' : 'border-gray-300'}`}
                  >
                    {lock.isUnlocked ? (
                      <Unlock className="text-white" size={24} />
                    ) : (
                      <Lock className="text-white" size={24} />
                    )}
                  </div>
                  
                  {/* Lock number */}
                  <div className={`mt-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    lock.isUnlocked 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {lock.isUnlocked ? <CheckCircle size={16} /> : lock.id}
                  </div>
                  
                  {/* Topic name */}
                  <p className={`mt-1 text-xs text-center font-medium ${
                    treasureUnlocked ? 'text-amber-800' : 'text-amber-100'
                  }`}>
                    {lock.topic}
                  </p>
                </div>
              ))}
            </div>

            {/* Treasure content */}
            {treasureUnlocked && (
              <div className="mt-8 text-center animate-fadeIn">
                <div className="text-6xl mb-4">💎✨🏆✨💎</div>
                <h2 className="text-2xl font-bold text-amber-800 mb-2">
                  TREASURE UNLOCKED!
                </h2>
                <p className="text-amber-700">
                  You've mastered all 9 science topics! 🎓
                </p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-6 bg-amber-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
              style={{ width: `${(unlockedCount / 9) * 100}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        {treasureUnlocked && (
          <div className="text-center mt-8">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onComplete(Math.min(unlockedCount * 10, 100))}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <Trophy size={20} />
                <span>Complete Game</span>
              </button>
              <button
                onClick={resetGame}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>New Adventure</span>
              </button>
              <button
                onClick={onExit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Exit Game</span>
              </button>
            </div>
          </div>
        )}

        {/* Exit button for when treasure is not unlocked */}
        {!treasureUnlocked && (
          <div className="text-center mt-8">
            <button
              onClick={onExit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>Exit Game</span>
            </button>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {showQuestion && currentLock && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-4 border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gradient-to-br ${currentLock.color}`}>
                  <Lock className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Lock #{currentLock.id}</h3>
                  <p className="text-sm text-gray-600">{currentLock.topic}</p>
                </div>
              </div>
              <button
                onClick={handleCloseQuestion}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Question */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                {currentLock.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentLock.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="scale-125"
                    />
                    <span className="font-medium text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Result */}
            {showResult && (
              <div className={`mb-4 p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-green-100 border-2 border-green-400 text-green-800' 
                  : 'bg-red-100 border-2 border-red-400 text-red-800'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle size={20} />
                      <span className="font-bold">🎉 Lock Opened!</span>
                    </>
                  ) : (
                    <>
                      <X size={20} />
                      <span className="font-bold">❌ Try Again!</span>
                    </>
                  )}
                </div>
                <p className="text-sm">{currentLock.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer || showResult}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
              
              {showResult && !isCorrect && (
                <button
                  onClick={handleRetry}
                  className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl p-8 text-center max-w-lg mx-4 shadow-2xl border-4 border-yellow-200">
            <div className="animate-bounce mb-6">
              <Trophy className="w-20 h-20 mx-auto text-yellow-800 mb-4" />
              <div className="text-6xl">🎉🏆🎉</div>
            </div>
            <h2 className="text-3xl font-bold text-yellow-900 mb-4">
              CONGRATULATIONS!
            </h2>
            <p className="text-xl text-yellow-800 mb-2">
              You've unlocked the Science Treasure!
            </p>
            <p className="text-yellow-700 mb-6">
              Master of all 9 scientific domains! 🧬⚗🔬
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onComplete(100)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center space-x-2"
              >
                <Trophy size={20} />
                <span>Complete Game</span>
              </button>
              <button
                onClick={() => setShowCelebration(false)}
                className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Amazing! 🌟
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TreasureBoxGame;