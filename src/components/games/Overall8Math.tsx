import React, { useState } from 'react';
import { Play, Lock, CheckCircle, Trophy, Star, ArrowLeft, Calculator } from 'lucide-react';

// Data structure for lessons - easily replaceable with real content
interface MathsLesson {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// TODO: Replace this dummy data with actual Class 8 Maths questions
// Each lesson object contains:
// - id: lesson number (1-10)
// - title: the lesson name from NCERT curriculum
// - question: the main question/problem to solve
// - options: array of 4 multiple choice options
// - correctAnswer: index of correct option (0-3)
// - explanation: brief explanation of the correct answer
const mathsLessons: MathsLesson[] = [
  {
    id: 1,
    title: 'Rational Numbers',
    question: 'Which of the following is a rational number?',
    options: ['√2', 'π', '3/4', '√5'],
    correctAnswer: 2,
    explanation: '3/4 can be expressed as a ratio of two integers (3 and 4), making it a rational number.'
  },
  {
    id: 2,
    title: 'Linear Equations in One Variable',
    question: 'Solve for x: 2x + 5 = 13',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: '2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 4'
  },
  {
    id: 3,
    title: 'Understanding Quadrilaterals',
    question: 'What is the sum of interior angles of a quadrilateral?',
    options: ['180°', '270°', '360°', '450°'],
    correctAnswer: 2,
    explanation: 'The sum of interior angles of any quadrilateral is always 360°.'
  },
  {
    id: 4,
    title: 'Practical Geometry',
    question: 'Which tool is primarily used to construct perpendicular bisectors?',
    options: ['Ruler only', 'Protractor only', 'Compass and ruler', 'Set square only'],
    correctAnswer: 2,
    explanation: 'A compass and ruler together are used to construct perpendicular bisectors accurately.'
  },
  {
    id: 5,
    title: 'Data Handling',
    question: 'Find the mean of: 12, 15, 18, 21, 24',
    options: ['17', '18', '19', '20'],
    correctAnswer: 1,
    explanation: 'Mean = (12 + 15 + 18 + 21 + 24) ÷ 5 = 90 ÷ 5 = 18'
  },
  {
    id: 6,
    title: 'Squares and Square Roots',
    question: 'What is the value of √144?',
    options: ['11', '12', '13', '14'],
    correctAnswer: 1,
    explanation: '√144 = 12 because 12 × 12 = 144'
  },
  {
    id: 7,
    title: 'Cubes and Cube Roots',
    question: 'What is the cube of 5?',
    options: ['15', '25', '75', '125'],
    correctAnswer: 3,
    explanation: '5³ = 5 × 5 × 5 = 125'
  },
  {
    id: 8,
    title: 'Comparing Quantities',
    question: 'What is 20% of 250?',
    options: ['40', '50', '60', '70'],
    correctAnswer: 1,
    explanation: '20% of 250 = (20/100) × 250 = 0.2 × 250 = 50'
  },
  {
    id: 9,
    title: 'Algebraic Expressions & Identities',
    question: 'Expand: (x + 3)²',
    options: ['x² + 6x + 9', 'x² + 3x + 9', 'x² + 6x + 6', 'x² + 9'],
    correctAnswer: 0,
    explanation: '(x + 3)² = x² + 2(x)(3) + 3² = x² + 6x + 9'
  },
  {
    id: 10,
    title: 'Mensuration (Surface Area & Volume)',
    question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
    options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
    correctAnswer: 2,
    explanation: 'Area of rectangle = length × width = 8 × 5 = 40 cm²'
  }
];

const Class8MathsGame: React.FC = () => {
  // Game state management
  const [gameScreen, setGameScreen] = useState<'start' | 'levels' | 'lesson' | 'completed'>('start');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Progress tracking - array of booleans for each level completion
  const [completedLevels, setCompletedLevels] = useState<boolean[]>(Array(10).fill(false));

  // Calculate unlocked levels (completed levels + 1)
  const getUnlockedLevelCount = () => {
    const completedCount = completedLevels.filter(Boolean).length;
    return Math.min(completedCount + 1, 10);
  };

  // Start the game
  const startGame = () => {
    setGameScreen('levels');
  };

  // Start a specific level
  const startLevel = (levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameScreen('lesson');
  };

  // Submit answer for current level
  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentLesson = mathsLessons[currentLevelIndex];
    const correct = selectedAnswer === currentLesson.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Mark level as completed if answer is correct
    if (correct) {
      const newCompletedLevels = [...completedLevels];
      newCompletedLevels[currentLevelIndex] = true;
      setCompletedLevels(newCompletedLevels);
    }
  };

  // Go to next level or completion screen
  const nextLevel = () => {
    if (currentLevelIndex < mathsLessons.length - 1) {
      startLevel(currentLevelIndex + 1);
    } else {
      // All levels completed
      setGameScreen('completed');
    }
  };

  // Retry current level
  const retryLevel = () => {
    setShowResult(false);
    setSelectedAnswer(null);
  };

  // Back to levels screen
  const backToLevels = () => {
    setGameScreen('levels');
  };

  // Reset game
  const resetGame = () => {
    setCompletedLevels(Array(10).fill(false));
    setCurrentLevelIndex(0);
    setGameScreen('start');
  };

  // Start Screen
  if (gameScreen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
            {/* Header */}
            <div className="mb-6">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Class 8 Mathematics
              </h1>
              <p className="text-gray-600">
                Master 10 essential math topics through interactive lessons!
              </p>
            </div>

            {/* Game Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">What you'll learn:</h3>
              <div className="text-sm text-blue-700 text-left space-y-1">
                <div>📊 Rational Numbers & Linear Equations</div>
                <div>📐 Geometry & Quadrilaterals</div>
                <div>📈 Data Handling & Statistics</div>
                <div>🔢 Squares, Cubes & Roots</div>
                <div>📏 Mensuration & More!</div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Start Maths Game
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Levels Selection Screen
  if (gameScreen === 'levels') {
    const unlockedCount = getUnlockedLevelCount();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Level</h1>
            <p className="text-gray-600">Complete levels in order to unlock the next one!</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">
                {completedLevels.filter(Boolean).length}/10 Completed
              </span>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mathsLessons.map((lesson, index) => {
              const isCompleted = completedLevels[index];
              const isUnlocked = index < unlockedCount;
              
              return (
                <div
                  key={lesson.id}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-50 border-green-200 shadow-md'
                      : isUnlocked
                      ? 'bg-white border-blue-200 hover:border-blue-400 cursor-pointer hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                  onClick={() => isUnlocked && startLevel(index)}
                >
                  {/* Level Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isUnlocked
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {lesson.id}
                  </div>

                  {/* Status Icons */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {!isUnlocked && <Lock className="w-5 h-5 text-gray-400" />}
                      {isUnlocked && !isCompleted && <Play className="w-5 h-5 text-blue-500" />}
                    </div>
                  </div>

                  {/* Lesson Title */}
                  <h3 className="font-bold text-gray-800 mb-2 leading-tight">
                    {lesson.title}
                  </h3>

                  {/* Status Text */}
                  <p className={`text-sm ${
                    isCompleted 
                      ? 'text-green-600 font-semibold' 
                      : isUnlocked
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}>
                    {isCompleted 
                      ? '✓ Completed!' 
                      : isUnlocked
                      ? 'Ready to start'
                      : 'Locked'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {completedLevels.filter(Boolean).length} of 10 levels
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedLevels.filter(Boolean).length / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lesson Screen
  if (gameScreen === 'lesson') {
    const currentLesson = mathsLessons[currentLevelIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={backToLevels}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full font-semibold">
                  Level {currentLesson.id}
                </span>
                <span className="text-sm text-gray-600">Class 8 Mathematics</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{currentLesson.title}</h2>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!showResult ? (
              <>
                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {currentLesson.question}
                  </h3>
                  
                  {/* Answer Options */}
                  <div className="space-y-3">
                    {currentLesson.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            selectedAnswer === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </>
            ) : (
              /* Result Display */
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  ) : (
                    <span className="text-3xl">❌</span>
                  )}
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? '🎉 Excellent!' : '😔 Not quite right'}
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 font-medium mb-2">Explanation:</p>
                  <p className="text-gray-600">{currentLesson.explanation}</p>
                </div>
                
                <div className="flex gap-3">
                  {isCorrect ? (
                    <button
                      onClick={nextLevel}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      {currentLevelIndex < mathsLessons.length - 1 ? '→ Next Level' : '🎯 Complete Game'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={retryLevel}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={backToLevels}
                        className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
                      >
                        Back to Levels
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (gameScreen === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg">
            {/* Trophy Animation */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
                <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                🎉 Congratulations! 🎉
              </h1>
              
              <h2 className="text-xl text-gray-700 mb-4">
                You completed Class 8 Maths!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Outstanding achievement! You've successfully mastered all 10 essential 
                mathematics topics for Class 8. Your dedication to learning is commendable!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-blue-800">Levels Completed</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-green-800">Course Progress</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">🏆</div>
                <div className="text-sm text-yellow-800">Achievement</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Play Again
              </button>
              <button
                onClick={backToLevels}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Review Levels
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Class8MathsGame;