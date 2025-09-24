import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Award, Users, Play, RotateCcw } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
  score: number;
}

interface Challenge {
  category: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  type: 'multiple-choice' | 'text' | 'measurement';
  icon: string;
}

interface BoardSquare {
  id: number;
  type: 'normal' | 'ladder' | 'snake' | 'special';
  challenge?: Challenge;
  ladderTo?: number;
  snakeeTo?: number;
  color: string;
}

interface ScienceQuestGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

const ScienceQuestGame: React.FC<ScienceQuestGameProps> = ({ onComplete, onExit, currentLanguage = 'en' }) => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'challenge' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', position: 0, color: 'bg-red-500', score: 0 },
    { id: 2, name: 'Player 2', position: 0, color: 'bg-blue-500', score: 0 }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState<string>('');
  const [showDiceResult, setShowDiceResult] = useState(false);

  // Science challenges for different categories
  const challenges: Challenge[] = [
    // Food Challenges
    {
      category: 'Food',
      question: 'Which foods help protect our body from getting sick?',
      options: ['Fruits and Vegetables', 'Candy and Soda', 'Ice Cream and Chips', 'Only Water'],
      correctAnswer: 'Fruits and Vegetables',
      type: 'multiple-choice',
      icon: '🍎'
    },
    {
      category: 'Food',
      question: 'Name 2 foods that give us energy for playing:',
      correctAnswer: ['rice', 'bread', 'banana', 'pasta', 'oats', 'potato'],
      type: 'text',
      icon: '🍌'
    },
    {
      category: 'Food',
      question: 'Which food group helps build strong muscles?',
      options: ['Fruits', 'Proteins (meat, eggs, beans)', 'Sweets', 'Water'],
      correctAnswer: 'Proteins (meat, eggs, beans)',
      type: 'multiple-choice',
      icon: '🥚'
    },

    // Materials Challenges
    {
      category: 'Materials',
      question: 'Which material is magnetic?',
      options: ['Plastic spoon', 'Iron nail', 'Wooden stick', 'Glass cup'],
      correctAnswer: 'Iron nail',
      type: 'multiple-choice',
      icon: '🧲'
    },
    {
      category: 'Materials',
      question: 'Name a material that does NOT conduct electricity:',
      options: ['Copper wire', 'Iron rod', 'Rubber glove', 'Silver spoon'],
      correctAnswer: 'Rubber glove',
      type: 'multiple-choice',
      icon: '🔌'
    },
    {
      category: 'Materials',
      question: 'Which material is best for making windows?',
      options: ['Wood', 'Glass', 'Metal', 'Cloth'],
      correctAnswer: 'Glass',
      type: 'multiple-choice',
      icon: '🪟'
    },

    // Living Things Challenges
    {
      category: 'Living Things',
      question: 'Name an animal that lives in the ocean:',
      correctAnswer: ['fish', 'whale', 'dolphin', 'shark', 'octopus', 'seahorse', 'crab', 'turtle'],
      type: 'text',
      icon: '🐠'
    },
    {
      category: 'Living Things',
      question: 'What do plants need to make their own food?',
      options: ['Only water', 'Sunlight, water, and air', 'Only soil', 'Only sunlight'],
      correctAnswer: 'Sunlight, water, and air',
      type: 'multiple-choice',
      icon: '🌱'
    },
    {
      category: 'Living Things',
      question: 'Which animal is a mammal?',
      options: ['Fish', 'Bird', 'Dog', 'Snake'],
      correctAnswer: 'Dog',
      type: 'multiple-choice',
      icon: '🐕'
    },

    // Motion Challenges
    {
      category: 'Motion',
      question: 'A pencil is about how long?',
      options: ['2 cm', '18 cm', '50 cm', '1 meter'],
      correctAnswer: '18 cm',
      type: 'multiple-choice',
      icon: '📏'
    },
    {
      category: 'Motion',
      question: 'What makes a ball move faster when you throw it?',
      options: ['Using less force', 'Using more force', 'The ball\'s color', 'The ball\'s weight only'],
      correctAnswer: 'Using more force',
      type: 'multiple-choice',
      icon: '⚽'
    },
    {
      category: 'Motion',
      question: 'Which moves fastest?',
      options: ['Walking', 'Running', 'Crawling', 'Hopping'],
      correctAnswer: 'Running',
      type: 'multiple-choice',
      icon: '🏃'
    },

    // Light Challenges
    {
      category: 'Light',
      question: 'What happens when light hits a mirror?',
      options: ['Light disappears', 'Light bounces back (reflects)', 'Light changes color', 'Light gets stuck'],
      correctAnswer: 'Light bounces back (reflects)',
      type: 'multiple-choice',
      icon: '🪞'
    },
    {
      category: 'Light',
      question: 'What do we need to see things?',
      options: ['Only our eyes', 'Light and our eyes', 'Only light', 'Only darkness'],
      correctAnswer: 'Light and our eyes',
      type: 'multiple-choice',
      icon: '💡'
    },
    {
      category: 'Light',
      question: 'Which object gives off its own light?',
      options: ['Moon', 'Sun', 'Book', 'Mirror'],
      correctAnswer: 'Sun',
      type: 'multiple-choice',
      icon: '☀️'
    },

    // Environment Challenges
    {
      category: 'Environment',
      question: 'Which bin should a plastic bottle go in?',
      options: ['Trash bin', 'Recycling bin', 'Food waste bin', 'Paper bin'],
      correctAnswer: 'Recycling bin',
      type: 'multiple-choice',
      icon: '♻️'
    },
    {
      category: 'Environment',
      question: 'What can we do to save water?',
      options: ['Leave taps running', 'Take shorter showers', 'Wash cars every day', 'Fill pools daily'],
      correctAnswer: 'Take shorter showers',
      type: 'multiple-choice',
      icon: '💧'
    },
    {
      category: 'Environment',
      question: 'Name something that can be recycled:',
      correctAnswer: ['paper', 'plastic', 'glass', 'metal', 'cardboard', 'bottle', 'can'],
      type: 'text',
      icon: '🗂️'
    }
  ];

  // Create board with special squares (ladders and snakes)
  const createBoard = (): BoardSquare[] => {
    const board: BoardSquare[] = [];
    const specialSquares = {
      7: { type: 'ladder' as const, ladderTo: 15 }, // Ladder
      12: { type: 'snake' as const, snakeeTo: 4 }, // Snake
      21: { type: 'ladder' as const, ladderTo: 28 }, // Ladder
      25: { type: 'snake' as const, snakeeTo: 9 }, // Snake
      32: { type: 'ladder' as const, ladderTo: 38 }, // Ladder
      36: { type: 'snake' as const, snakeeTo: 16 }, // Snake
      43: { type: 'ladder' as const, ladderTo: 49 }, // Ladder
      47: { type: 'snake' as const, snakeeTo: 23 }, // Snake
    };

    for (let i = 0; i < 50; i++) {
      const square: BoardSquare = {
        id: i,
        type: 'normal',
        color: i === 0 ? 'bg-green-200' : i === 49 ? 'bg-yellow-300' : 'bg-white'
      };

      // Add special squares
      if (specialSquares[i]) {
        square.type = specialSquares[i].type;
        if (specialSquares[i].ladderTo) {
          square.ladderTo = specialSquares[i].ladderTo;
          square.color = 'bg-green-100';
        }
        if (specialSquares[i].snakeeTo) {
          square.snakeeTo = specialSquares[i].snakeeTo;
          square.color = 'bg-red-100';
        }
      }

      // Add challenges to most squares (except start, finish, and some special squares)
      if (i > 0 && i < 49 && !specialSquares[i]) {
        square.challenge = challenges[Math.floor(Math.random() * challenges.length)];
      }

      board.push(square);
    }

    return board;
  };

  const [board] = useState<BoardSquare[]>(createBoard());

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const Icon = icons[value - 1];
    return <Icon className="w-8 h-8" />;
  };

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);
    setShowDiceResult(true);
    
    setTimeout(() => {
      movePlayer(newDiceValue);
      setShowDiceResult(false);
    }, 1500);
  };

  const movePlayer = (steps: number) => {
    const currentPlayer = players[currentPlayerIndex];
    let newPosition = Math.min(currentPlayer.position + steps, 49);
    
    setPlayers(players.map(p => 
      p.id === currentPlayer.id ? { ...p, position: newPosition } : p
    ));

    // Check for ladders, snakes, or challenges
    setTimeout(() => {
      handleSquareAction(newPosition);
    }, 500);
  };

  const handleSquareAction = (position: number) => {
    const square = board[position];
    
    if (square.ladderTo !== undefined) {
      // Ladder
      setTimeout(() => {
        setPlayers(players.map(p => 
          p.id === players[currentPlayerIndex].id ? { ...p, position: square.ladderTo! } : p
        ));
        nextTurn();
      }, 1000);
    } else if (square.snakeeTo !== undefined) {
      // Snake
      setTimeout(() => {
        setPlayers(players.map(p => 
          p.id === players[currentPlayerIndex].id ? { ...p, position: square.snakeeTo! } : p
        ));
        nextTurn();
      }, 1000);
    } else if (square.challenge) {
      // Challenge
      setCurrentChallenge(square.challenge);
      setGameState('challenge');
    } else {
      // Regular square or finish
      if (position === 49) {
        setGameState('finished');
      } else {
        nextTurn();
      }
    }
  };

  const submitAnswer = () => {
    if (!currentChallenge) return;

    const isCorrect = checkAnswer(playerAnswer, currentChallenge);
    
    if (isCorrect) {
      setPlayers(players.map(p => 
        p.id === players[currentPlayerIndex].id ? { ...p, score: p.score + 10 } : p
      ));
    }

    setPlayerAnswer('');
    setCurrentChallenge(null);
    setGameState('playing');
    
    // Check if player reached finish
    if (players[currentPlayerIndex].position === 49) {
      setGameState('finished');
    } else {
      nextTurn();
    }
  };

  const checkAnswer = (answer: string, challenge: Challenge): boolean => {
    if (challenge.type === 'multiple-choice') {
      return answer === challenge.correctAnswer;
    } else if (challenge.type === 'text') {
      const correctAnswers = Array.isArray(challenge.correctAnswer) 
        ? challenge.correctAnswer 
        : [challenge.correctAnswer];
      return correctAnswers.some(correct => 
        answer.toLowerCase().includes(correct.toLowerCase())
      );
    }
    return false;
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers(players.map(p => ({ ...p, position: 0, score: 0 })));
    setCurrentPlayerIndex(0);
    setCurrentChallenge(null);
    setPlayerAnswer('');
  };

  const updatePlayerName = (playerId: number, newName: string) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, name: newName } : p
    ));
  };

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">🧪 Science Quest Board Game 🎲</h1>
            <p className="text-lg text-blue-700">Learn science while climbing ladders and avoiding snakes!</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play:</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-600">🎯 Game Rules:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Roll dice to move around the board</li>
                  <li>• Answer science questions to continue</li>
                  <li>• Climb ladders 🪜 to move up faster</li>
                  <li>• Avoid snakes 🐍 that slide you down</li>
                  <li>• First to reach square 50 wins!</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-purple-600">📚 Science Topics:</h3>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div>🍎 Food & Nutrition</div>
                  <div>🧲 Materials</div>
                  <div>🐠 Living Things</div>
                  <div>📏 Motion & Measurement</div>
                  <div>💡 Light & Energy</div>
                  <div>♻️ Environment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Players:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {players.map(player => (
                <div key={player.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${player.color}`}></div>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="flex-1 text-lg font-semibold bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setGameState('playing')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg flex items-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                Start Science Adventure!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Challenge Screen
  if (gameState === 'challenge' && currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{currentChallenge.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800">{currentChallenge.category} Challenge</h2>
              <p className="text-lg text-gray-600 mt-2">{players[currentPlayerIndex].name}'s Turn</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{currentChallenge.question}</h3>
              
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options ? (
                <div className="space-y-3">
                  {currentChallenge.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPlayerAnswer(option)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        playerAnswer === option 
                          ? 'border-blue-500 bg-blue-100' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}. {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={playerAnswer}
                    onChange={(e) => setPlayerAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {currentChallenge.type === 'text' ? 'Type one word answers (like: fish, whale, etc.)' : ''}
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={submitAnswer}
                disabled={!playerAnswer}
                className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
                  playerAnswer 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (gameState === 'finished') {
    const winner = players.find(p => p.position === 49) || players.reduce((prev, current) => 
      prev.position > current.position ? prev : current
    );

    // Calculate total score based on winner's score
    const totalScore = Math.min(winner.score * 10, 100); // Cap at 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Award className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">🎉 Game Complete! 🎉</h1>
            
            <div className="mb-8">
              <div className={`inline-block w-16 h-16 rounded-full ${winner.color} mb-4`}></div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Winner: {winner.name}!</h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {players.map(player => (
                  <div key={player.id} className={`rounded-lg p-6 ${player.id === winner.id ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full ${player.color} mx-auto mb-2`}></div>
                    <h3 className="text-xl font-bold">{player.name}</h3>
                    <p className="text-lg">Position: {player.position + 1}/50</p>
                    <p className="text-lg font-semibold text-blue-600">{player.score} points</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-3">🧪 Science Topics Mastered:</h3>
              <div className="grid md:grid-cols-3 gap-2 text-sm">
                <div>🍎 Food & Nutrition</div>
                <div>🧲 Materials & Magnetism</div>
                <div>🐠 Living Things & Habitats</div>
                <div>📏 Motion & Measurement</div>
                <div>💡 Light & Reflection</div>
                <div>♻️ Environment & Recycling</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onComplete(totalScore)}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Complete Game
              </button>
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={onExit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Science Quest Board Game</h1>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Player</p>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${players[currentPlayerIndex].color}`}></div>
                  <span className="font-semibold">{players[currentPlayerIndex].name}</span>
                </div>
              </div>
              
              {!showDiceResult && (
                <button
                  onClick={rollDice}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  🎲 Roll Dice
                </button>
              )}
              
              {showDiceResult && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">You rolled:</p>
                  <div className="flex items-center justify-center text-blue-600">
                    {getDiceIcon(diceValue)}
                    <span className="text-2xl font-bold ml-2">{diceValue}</span>
                  </div>
                </div>
              )}

              <button
                onClick={onExit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>

        {/* Board */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-10 gap-1 max-w-4xl mx-auto">
            {board.map((square, index) => {
              const reverseIndex = Math.floor(index / 10) % 2 === 1 
                ? Math.floor(index / 10) * 10 + (9 - (index % 10))
                : index;
              const actualSquare = board[reverseIndex];
              
              return (
                <div
                  key={index}
                  className={`relative aspect-square border border-gray-300 ${actualSquare.color} flex items-center justify-center text-xs font-bold`}
                >
                  {/* Square number */}
                  <span className="absolute top-0 left-0 text-xs text-gray-600 p-1">
                    {reverseIndex}
                  </span>
                  
                  {/* Special indicators */}
                  {actualSquare.type === 'ladder' && <span className="text-lg">🪜</span>}
                  {actualSquare.type === 'snake' && <span className="text-lg">🐍</span>}
                  {actualSquare.challenge && <span className="text-lg">{actualSquare.challenge.icon}</span>}
                  
                  {/* Players */}
                  <div className="absolute bottom-0 right-0 flex">
                    {players.map(player => 
                      player.position === reverseIndex ? (
                        <div
                          key={player.id}
                          className={`w-3 h-3 rounded-full ${player.color} border border-white`}
                        />
                      ) : null
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Player Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          {players.map(player => (
            <div key={player.id} className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full ${player.color}`}></div>
                <div>
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  <p className="text-sm text-gray-600">Position: {player.position + 1}/50</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Science Points:</span>
                <span className="text-lg font-bold text-blue-600">{player.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceQuestGame;