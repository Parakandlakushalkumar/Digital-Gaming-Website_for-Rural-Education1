import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Trophy, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

interface Challenge {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
  score: number;
}

interface SpecialSquare {
  type: 'ladder' | 'snake';
  from: number;
  to: number;
}

interface Overall7MathProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const MathQuestGame: React.FC<Overall7MathProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', position: 0, color: 'bg-blue-500', score: 0 },
    { id: 2, name: 'Player 2', position: 0, color: 'bg-red-500', score: 0 }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gamePhase, setGamePhase] = useState<'roll' | 'challenge' | 'move' | 'gameover'>('roll');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameMessage, setGameMessage] = useState('');

  // Special squares (ladders and snakes)
  const specialSquares: SpecialSquare[] = [
    { type: 'ladder', from: 4, to: 14 },
    { type: 'ladder', from: 9, to: 21 },
    { type: 'ladder', from: 16, to: 26 },
    { type: 'ladder', from: 28, to: 84 },
    { type: 'snake', from: 32, to: 10 },
    { type: 'snake', from: 47, to: 26 },
    { type: 'snake', from: 49, to: 11 },
    { type: 'snake', from: 56, to: 53 },
    { type: 'snake', from: 62, to: 18 },
    { type: 'snake', from: 64, to: 60 },
    { type: 'snake', from: 87, to: 24 },
    { type: 'snake', from: 93, to: 73 },
    { type: 'snake', from: 95, to: 75 },
    { type: 'snake', from: 98, to: 78 }
  ];

  // Math challenges
  const challenges: Challenge[] = [
    // Integers
    {
      topic: 'Integers',
      question: 'On a number line, what is -3 + 7?',
      options: ['4', '10', '-10', '-4'],
      correctAnswer: 0,
      explanation: 'Starting at -3, move 7 positions to the right: -3 + 7 = 4'
    },
    {
      topic: 'Integers',
      question: 'Calculate: 5 - (-8)',
      options: ['13', '-3', '3', '-13'],
      correctAnswer: 0,
      explanation: 'Subtracting a negative is the same as adding: 5 - (-8) = 5 + 8 = 13'
    },
    // Algebra
    {
      topic: 'Algebra',
      question: 'Simplify: 3x + 2x - x',
      options: ['4x', '6x', '5x', '2x'],
      correctAnswer: 0,
      explanation: 'Combine like terms: 3x + 2x - x = (3 + 2 - 1)x = 4x'
    },
    {
      topic: 'Algebra',
      question: 'Simplify: 2(3x + 4)',
      options: ['6x + 8', '6x + 4', '5x + 8', '6x + 6'],
      correctAnswer: 0,
      explanation: 'Distribute: 2(3x + 4) = 2×3x + 2×4 = 6x + 8'
    },
    // Equations
    {
      topic: 'Equations',
      question: 'Solve for x: 2x + 5 = 13',
      options: ['x = 4', 'x = 9', 'x = 6', 'x = 8'],
      correctAnswer: 0,
      explanation: '2x + 5 = 13, subtract 5: 2x = 8, divide by 2: x = 4'
    },
    {
      topic: 'Equations',
      question: 'Solve for x: 3x - 7 = 14',
      options: ['x = 7', 'x = 5', 'x = 6', 'x = 8'],
      correctAnswer: 0,
      explanation: '3x - 7 = 14, add 7: 3x = 21, divide by 3: x = 7'
    },
    // Geometry
    {
      topic: 'Geometry',
      question: 'A triangle with all sides equal is called:',
      options: ['Equilateral', 'Isosceles', 'Scalene', 'Right'],
      correctAnswer: 0,
      explanation: 'An equilateral triangle has all three sides equal in length'
    },
    {
      topic: 'Geometry',
      question: 'The sum of angles in any triangle is:',
      options: ['180°', '360°', '90°', '270°'],
      correctAnswer: 0,
      explanation: 'The interior angles of any triangle always sum to 180 degrees'
    },
    // Perimeter/Area
    {
      topic: 'Perimeter/Area',
      question: 'Find the area of a rectangle: length = 6, width = 4',
      options: ['24', '20', '10', '14'],
      correctAnswer: 0,
      explanation: 'Area of rectangle = length × width = 6 × 4 = 24'
    },
    {
      topic: 'Perimeter/Area',
      question: 'Find the perimeter of a square with side = 5',
      options: ['20', '25', '15', '10'],
      correctAnswer: 0,
      explanation: 'Perimeter of square = 4 × side = 4 × 5 = 20'
    },
    // Statistics
    {
      topic: 'Statistics',
      question: 'Find the mean of: 2, 4, 6, 8, 10',
      options: ['6', '5', '7', '8'],
      correctAnswer: 0,
      explanation: 'Mean = (2 + 4 + 6 + 8 + 10) ÷ 5 = 30 ÷ 5 = 6'
    },
    {
      topic: 'Statistics',
      question: 'Find the median of: 3, 7, 5, 9, 1',
      options: ['5', '6', '7', '4'],
      correctAnswer: 0,
      explanation: 'First sort: 1, 3, 5, 7, 9. The middle value (median) is 5'
    }
  ];

  const rollDice = () => {
    if (gamePhase !== 'roll') return;
    
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
    setGamePhase('challenge');
    setGameMessage(`${players[currentPlayer].name} rolled a ${roll}! Answer the challenge to move.`);
    
    // Get random challenge
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(challenge);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const answerChallenge = (answerIndex: number) => {
    if (!currentChallenge || selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const isCorrect = answerIndex === currentChallenge.correctAnswer;
    
    if (isCorrect) {
      setGameMessage('Correct! You can move forward.');
      setPlayers(prev => prev.map(p => 
        p.id === players[currentPlayer].id 
          ? { ...p, score: p.score + 10 }
          : p
      ));
      setTimeout(() => movePlayer(diceValue), 1500);
    } else {
      setGameMessage('Incorrect! You stay in place.');
      setTimeout(() => {
        setGamePhase('roll');
        setCurrentPlayer((prev) => (prev + 1) % players.length);
        setCurrentChallenge(null);
        setGameMessage(`${players[(currentPlayer + 1) % players.length].name}'s turn!`);
      }, 2000);
    }
  };

  const movePlayer = (steps: number) => {
    let hasSpecial = false;
    
    setPlayers(prev => {
      const newPlayers = [...prev];
      const player = newPlayers[currentPlayer];
      let newPosition = Math.min(player.position + steps, 100);
      
      // Check for special squares
      const special = specialSquares.find(s => s.from === newPosition);
      if (special) {
        newPosition = special.to;
        hasSpecial = true;
        if (special.type === 'ladder') {
          setGameMessage(`Ladder! ${player.name} climbs from ${special.from} to ${special.to}!`);
        } else {
          setGameMessage(`Snake! ${player.name} slides from ${special.from} to ${special.to}!`);
        }
      }
      
      player.position = newPosition;
      
      if (newPosition >= 100) {
        setGamePhase('gameover');
        setGameMessage(`🎉 ${player.name} wins the Math Quest! 🎉`);
        // Call onComplete with a score based on performance
        if (onComplete) {
          onComplete(100); // Perfect score for winning the game
        }
        return newPlayers;
      }
      
      return newPlayers;
    });
    
    setGamePhase('roll');
    setTimeout(() => {
      setCurrentPlayer((prev) => (prev + 1) % players.length);
      setCurrentChallenge(null);
      if (gamePhase !== 'gameover') {
        setGameMessage(`${players[(currentPlayer + 1) % players.length].name}'s turn!`);
      }
    }, hasSpecial ? 2000 : 1000);
  };

  const resetGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, position: 0, score: 0 })));
    setCurrentPlayer(0);
    setGamePhase('roll');
    setCurrentChallenge(null);
    setGameMessage('Game reset! Player 1\'s turn!');
  };

  const renderDice = () => {
    const DiceComponents = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const DiceComponent = DiceComponents[diceValue - 1];
    return <DiceComponent className="w-8 h-8" />;
  };

  const getSquareContent = (num: number) => {
    const special = specialSquares.find(s => s.from === num);
    if (special) {
      return special.type === 'ladder' ? 
        <ArrowUp className="w-4 h-4 text-green-600" /> : 
        <ArrowDown className="w-4 h-4 text-red-600" />;
    }
    return num;
  };

  const getSquareColor = (num: number) => {
    const special = specialSquares.find(s => s.from === num);
    if (special) {
      return special.type === 'ladder' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300';
    }
    if (num === 100) return 'bg-yellow-100 border-yellow-300';
    return 'bg-white border-gray-300';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">🎲 Math Quest Board Game 🎲</h1>
        <p className="text-lg text-gray-600">Answer math challenges to advance on the board!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-10 gap-1">
              {Array.from({ length: 100 }, (_, i) => {
                const num = 100 - i;
                const row = Math.floor(i / 10);
                const col = i % 10;
                const actualCol = row % 2 === 0 ? col : 9 - col;
                const playersOnSquare = players.filter(p => p.position === num);
                
                return (
                  <div
                    key={num}
                    className={`
                      aspect-square border-2 rounded flex items-center justify-center text-xs font-bold relative
                      ${getSquareColor(num)}
                    `}
                  >
                    <span className="z-10">{getSquareContent(num)}</span>
                    {playersOnSquare.map((player, idx) => (
                      <div
                        key={player.id}
                        className={`absolute w-3 h-3 rounded-full ${player.color} border border-white`}
                        style={{
                          top: `${idx * 6 + 2}px`,
                          right: `${idx * 6 + 2}px`
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="space-y-4">
          {/* Player Status */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">Players</h3>
            {players.map((player, idx) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-2 rounded mb-2 ${
                  idx === currentPlayer ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${player.color} mr-2`} />
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="text-sm">
                  <div>Pos: {player.position}</div>
                  <div>Score: {player.score}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Game Controls */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Current Turn:</div>
              <div className="font-bold text-lg text-purple-800">
                {players[currentPlayer]?.name}
              </div>
            </div>

            {gamePhase === 'roll' && (
              <button
                onClick={rollDice}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                {renderDice()} Roll Dice
              </button>
            )}

            {gamePhase === 'gameover' && (
              <div className="text-center space-y-2">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <div className="flex gap-2">
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" /> New Game
                  </button>
                  {onExit && (
                    <button
                      onClick={onExit}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                      🏠 Back to Dashboard
                    </button>
                  )}
                </div>
              </div>
            )}

            {gameMessage && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-center">
                {gameMessage}
              </div>
            )}
          </div>

          {/* Challenge */}
          {currentChallenge && gamePhase === 'challenge' && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="text-center mb-3">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                  {currentChallenge.topic}
                </span>
              </div>
              
              <h3 className="font-bold mb-4 text-center">{currentChallenge.question}</h3>
              
              <div className="space-y-2">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => answerChallenge(idx)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                      selectedAnswer === null
                        ? 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        : selectedAnswer === idx
                        ? idx === currentChallenge.correctAnswer
                          ? 'border-green-500 bg-green-100'
                          : 'border-red-500 bg-red-100'
                        : idx === currentChallenge.correctAnswer && showAnswer
                        ? 'border-green-500 bg-green-100'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}) {option}
                  </button>
                ))}
              </div>

              {showAnswer && currentChallenge.explanation && (
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-800">Explanation:</div>
                  <div className="text-sm text-gray-600 mt-1">{currentChallenge.explanation}</div>
                </div>
              )}
            </div>
          )}

          {/* Game Rules */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold mb-2">How to Play</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Roll dice to move forward</li>
              <li>• Answer math challenge correctly to move</li>
              <li>• <span className="text-green-600">Ladders</span> help you climb up</li>
              <li>• <span className="text-red-600">Snakes</span> slide you down</li>
              <li>• First to reach 100 wins!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathQuestGame;