import React, { useState, useEffect } from 'react';
import { Trophy, MapPin, CheckCircle, Lock, Star } from 'lucide-react';

// Types
interface Building {
  id: string;
  name: string;
  topic: string;
  position: { x: number; y: number };
  color: string;
  emoji: string;
  completed: boolean;
  puzzle: Puzzle;
}

interface Puzzle {
  id: string;
  question: string;
  type: 'multiple-choice' | 'input' | 'matching';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

interface GameState {
  buildings: Building[];
  completedCount: number;
  showPuzzle: boolean;
  currentBuilding: Building | null;
  playerAnswer: string;
  showResult: boolean;
  resultCorrect: boolean;
  gameWon: boolean;
}

const MathCityGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    buildings: [
      {
        id: 'park',
        name: 'The Park',
        topic: 'Sets, Relations & Functions',
        position: { x: 15, y: 60 },
        color: 'bg-green-500',
        emoji: '🌳',
        completed: false,
        puzzle: {
          id: 'sets1',
          question: 'Match the set {A, B, C} with their hobbies. If A likes Cricket, B likes Chess, and C likes Music, what type of relation is this?',
          type: 'multiple-choice',
          options: ['One-to-One Function', 'Many-to-One Function', 'One-to-Many Relation', 'Many-to-Many Relation'],
          correctAnswer: 'One-to-One Function',
          explanation: 'Each person maps to exactly one hobby, making it a one-to-one function!'
        }
      },
      {
        id: 'powerplant',
        name: 'Power Plant',
        topic: 'Complex Numbers',
        position: { x: 70, y: 20 },
        color: 'bg-yellow-500',
        emoji: '⚡',
        completed: false,
        puzzle: {
          id: 'complex1',
          question: 'Simplify: (2 + 3i)(1 - i)',
          type: 'multiple-choice',
          options: ['5 + i', '5 - i', '2 - 3i', '-1 + i'],
          correctAnswer: '5 + i',
          explanation: '(2 + 3i)(1 - i) = 2(1) + 2(-i) + 3i(1) + 3i(-i) = 2 - 2i + 3i + 3 = 5 + i'
        }
      },
      {
        id: 'bridge',
        name: 'The Bridge',
        topic: 'Sequences & Series',
        position: { x: 50, y: 75 },
        color: 'bg-blue-500',
        emoji: '🌉',
        completed: false,
        puzzle: {
          id: 'sequence1',
          question: 'Find the next term in the geometric sequence: 2, 4, 8, 16, ?',
          type: 'input',
          correctAnswer: 32,
          explanation: 'This is a geometric sequence with ratio 2. Next term: 16 × 2 = 32'
        }
      },
      {
        id: 'library',
        name: 'The Library',
        topic: 'Binomial Theorem',
        position: { x: 25, y: 25 },
        color: 'bg-purple-500',
        emoji: '📚',
        completed: false,
        puzzle: {
          id: 'binomial1',
          question: 'Find the coefficient of x² in the expansion of (x + y)³',
          type: 'multiple-choice',
          options: ['1', '3', '6', '9'],
          correctAnswer: '3',
          explanation: 'Using binomial theorem: C(3,2) × x² × y¹ = 3x²y, so coefficient of x² is 3'
        }
      },
      {
        id: 'garden',
        name: 'The Garden',
        topic: 'Straight Lines & Conic Sections',
        position: { x: 75, y: 65 },
        color: 'bg-pink-500',
        emoji: '🌺',
        completed: false,
        puzzle: {
          id: 'conic1',
          question: 'What is the center of the circle x² + y² - 4x + 6y - 3 = 0?',
          type: 'multiple-choice',
          options: ['(2, -3)', '(-2, 3)', '(4, -6)', '(-4, 6)'],
          correctAnswer: '(2, -3)',
          explanation: 'Complete the square: (x-2)² + (y+3)² = 16, so center is (2, -3)'
        }
      },
      {
        id: 'carnival',
        name: 'The Carnival',
        topic: 'Probability & Statistics',
        position: { x: 85, y: 40 },
        color: 'bg-red-500',
        emoji: '🎡',
        completed: false,
        puzzle: {
          id: 'probability1',
          question: 'What is the probability of getting a sum of 7 when rolling two dice?',
          type: 'multiple-choice',
          options: ['1/6', '1/9', '1/12', '2/9'],
          correctAnswer: '1/6',
          explanation: 'Ways to get 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways out of 36 total = 1/6'
        }
      }
    ],
    completedCount: 0,
    showPuzzle: false,
    currentBuilding: null,
    playerAnswer: '',
    showResult: false,
    resultCorrect: false,
    gameWon: false
  });

  const handleBuildingClick = (building: Building) => {
    if (building.completed) return;
    
    setGameState(prev => ({
      ...prev,
      showPuzzle: true,
      currentBuilding: building,
      playerAnswer: '',
      showResult: false
    }));
  };

  const handleAnswerSubmit = () => {
    if (!gameState.currentBuilding || !gameState.playerAnswer.trim()) return;

    const isCorrect = gameState.playerAnswer.toLowerCase().trim() === 
                     gameState.currentBuilding.puzzle.correctAnswer.toString().toLowerCase().trim();

    setGameState(prev => ({
      ...prev,
      showResult: true,
      resultCorrect: isCorrect
    }));

    if (isCorrect) {
      setTimeout(() => {
        setGameState(prev => {
          const updatedBuildings = prev.buildings.map(b => 
            b.id === prev.currentBuilding!.id ? { ...b, completed: true } : b
          );
          const newCompletedCount = prev.completedCount + 1;
          
          return {
            ...prev,
            buildings: updatedBuildings,
            completedCount: newCompletedCount,
            showPuzzle: false,
            currentBuilding: null,
            gameWon: newCompletedCount === 6
          };
        });
      }, 2000);
    }
  };

  const handleClosePuzzle = () => {
    setGameState(prev => ({
      ...prev,
      showPuzzle: false,
      currentBuilding: null,
      playerAnswer: '',
      showResult: false
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      buildings: prev.buildings.map(b => ({ ...b, completed: false })),
      completedCount: 0,
      gameWon: false,
      showPuzzle: false,
      currentBuilding: null
    }));
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Math City Adventure</h1>
          <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-300 mr-1" />
            <span className="text-white font-semibold">{gameState.completedCount}/6</span>
          </div>
        </div>
        {gameState.gameWon && (
          <div className="flex items-center bg-yellow-500 px-4 py-2 rounded-full animate-bounce">
            <Trophy className="w-6 h-6 text-white mr-2" />
            <span className="text-white font-bold">Math Crown Unlocked!</span>
          </div>
        )}
      </div>

      {/* City Map */}
      <div className="w-full h-full relative">
        {/* Background elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-green-600/30"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-sky-300/30"></div>
        
        {/* Buildings */}
        {gameState.buildings.map((building) => (
          <div
            key={building.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${building.color} rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg flex flex-col items-center justify-center text-white border-2 border-white/30 ${
              building.completed ? 'shadow-lg shadow-yellow-400/50 border-yellow-400' : ''
            }`}
            style={{
              left: `${building.position.x}%`,
              top: `${building.position.y}%`
            }}
            onClick={() => handleBuildingClick(building)}
          >
            <div className="text-2xl mb-1">{building.emoji}</div>
            <div className="text-xs font-semibold text-center leading-tight">{building.name}</div>
            {building.completed && (
              <CheckCircle className="absolute -top-2 -right-2 w-6 h-6 text-green-400 bg-white rounded-full" />
            )}
          </div>
        ))}

        {/* Roads/Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <path d="M 15% 60% Q 50% 50% 85% 40%" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="8" fill="none" />
          <path d="M 25% 25% Q 40% 40% 50% 75%" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="8" fill="none" />
          <path d="M 70% 20% Q 75% 40% 75% 65%" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="8" fill="none" />
        </svg>
      </div>

      {/* Puzzle Modal */}
      {gameState.showPuzzle && gameState.currentBuilding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <span className="text-2xl mr-2">{gameState.currentBuilding.emoji}</span>
                {gameState.currentBuilding.name}
              </h2>
              <button
                onClick={handleClosePuzzle}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <p className="text-sm text-purple-600 mb-3 font-semibold">
              {gameState.currentBuilding.topic}
            </p>
            
            <p className="mb-4 text-gray-700">
              {gameState.currentBuilding.puzzle.question}
            </p>

            {gameState.currentBuilding.puzzle.type === 'multiple-choice' ? (
              <div className="space-y-2 mb-4">
                {gameState.currentBuilding.puzzle.options?.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={gameState.playerAnswer === option}
                      onChange={(e) => setGameState(prev => ({ ...prev, playerAnswer: e.target.value }))}
                      className="text-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={gameState.playerAnswer}
                onChange={(e) => setGameState(prev => ({ ...prev, playerAnswer: e.target.value }))}
                placeholder="Enter your answer..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:outline-none"
              />
            )}

            {gameState.showResult && (
              <div className={`mb-4 p-3 rounded-lg ${
                gameState.resultCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-semibold mb-2">
                  {gameState.resultCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-sm">{gameState.currentBuilding.puzzle.explanation}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={handleAnswerSubmit}
                disabled={!gameState.playerAnswer.trim() || gameState.showResult}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
              {gameState.showResult && !gameState.resultCorrect && (
                <button
                  onClick={() => setGameState(prev => ({ ...prev, showResult: false, playerAnswer: '' }))}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {gameState.gameWon && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-8 text-center max-w-md mx-4 text-white">
            <Trophy className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg mb-4">You've unlocked the Math Crown! 👑</p>
            <p className="mb-6 opacity-90">You've mastered all areas of Math City!</p>
            <button
              onClick={resetGame}
              className="bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white max-w-xs">
        <p className="text-sm">
          🎯 Click on buildings to solve math puzzles and light up the city! 
          Complete all 6 areas to unlock the Math Crown! 👑
        </p>
      </div>
    </div>
  );
};

export default MathCityGame;