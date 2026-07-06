import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, Trophy, Lightbulb, Volume2, Target, Move } from 'lucide-react';

interface PhysicsItem {
  id: string;
  name: string;
  category: 'light' | 'sound' | 'force' | 'friction';
  description: string;
  emoji: string;
  examples: string[];
  matched: boolean;
}

const physicsData: PhysicsItem[] = [
  // Light
  {
    id: 'reflection',
    name: 'Reflection',
    category: 'light',
    description: 'Light bounces off surfaces',
    emoji: '🪞',
    examples: ['Mirrors', 'Water surface', 'Polished metals'],
    matched: false
  },
  {
    id: 'refraction',
    name: 'Refraction',
    category: 'light',
    description: 'Light bends when passing through media',
    emoji: '🌈',
    examples: ['Glass', 'Water', 'Prisms'],
    matched: false
  },
  {
    id: 'rainbow',
    name: 'Dispersion',
    category: 'light',
    description: 'White light splits into colors',
    emoji: '🌈',
    examples: ['Rainbows', 'Prisms', 'Water droplets'],
    matched: false
  },
  {
    id: 'shadow',
    name: 'Shadow Formation',
    category: 'light',
    description: 'Dark area behind opaque objects',
    emoji: '👤',
    examples: ['Tree shadows', 'Building shadows', 'Hand shadows'],
    matched: false
  },

  // Sound
  {
    id: 'vibration',
    name: 'Sound Vibrations',
    category: 'sound',
    description: 'Sound is produced by vibrations',
    emoji: '🔊',
    examples: ['Guitar strings', 'Vocal cords', 'Drum skins'],
    matched: false
  },
  {
    id: 'echo',
    name: 'Echo',
    category: 'sound',
    description: 'Reflected sound waves',
    emoji: '🗣️',
    examples: ['Mountains', 'Empty halls', 'Canyons'],
    matched: false
  },
  {
    id: 'pitch',
    name: 'Pitch',
    category: 'sound',
    description: 'Highness or lowness of sound',
    emoji: '🎵',
    examples: ['Bird chirps', 'Bass drums', 'Whistles'],
    matched: false
  },
  {
    id: 'loudness',
    name: 'Loudness',
    category: 'sound',
    description: 'Volume or intensity of sound',
    emoji: '📢',
    examples: ['Jet engines', 'Whispers', 'Thunder'],
    matched: false
  },

  // Force
  {
    id: 'gravity',
    name: 'Gravitational Force',
    category: 'force',
    description: 'Force that pulls objects down',
    emoji: '🍎',
    examples: ['Falling objects', 'Weight', 'Tides'],
    matched: false
  },
  {
    id: 'magnetic',
    name: 'Magnetic Force',
    category: 'force',
    description: 'Force between magnets',
    emoji: '🧲',
    examples: ['Compass needle', 'Fridge magnets', 'Motors'],
    matched: false
  },
  {
    id: 'push-pull',
    name: 'Push and Pull',
    category: 'force',
    description: 'Contact forces in opposite directions',
    emoji: '👐',
    examples: ['Opening doors', 'Cart pulling', 'Rope tug'],
    matched: false
  },
  {
    id: 'spring',
    name: 'Spring Force',
    category: 'force',
    description: 'Force that restores original shape',
    emoji: '🌸',
    examples: ['Rubber bands', 'Springs', 'Elastic materials'],
    matched: false
  },

  // Friction
  {
    id: 'sliding',
    name: 'Sliding Friction',
    category: 'friction',
    description: 'Opposition to sliding motion',
    emoji: '🛝',
    examples: ['Sliding down slide', 'Ice skating', 'Dragging objects'],
    matched: false
  },
  {
    id: 'rolling',
    name: 'Rolling Friction',
    category: 'friction',
    description: 'Opposition to rolling motion',
    emoji: '⚽',
    examples: ['Car wheels', 'Rolling balls', 'Bicycle tires'],
    matched: false
  },
  {
    id: 'air-resistance',
    name: 'Air Resistance',
    category: 'friction',
    description: 'Friction with air molecules',
    emoji: '🪂',
    examples: ['Parachutes', 'Falling leaves', 'Moving cars'],
    matched: false
  },
  {
    id: 'static',
    name: 'Static Friction',
    category: 'friction',
    description: 'Prevents objects from starting to move',
    emoji: '📚',
    examples: ['Books on table', 'Car on hill', 'Standing objects'],
    matched: false
  }
];

const categories = {
  light: { 
    name: 'Light', 
    color: 'bg-yellow-100 border-yellow-400', 
    icon: <Lightbulb className="w-6 h-6" />,
    bgColor: 'bg-yellow-50'
  },
  sound: { 
    name: 'Sound', 
    color: 'bg-purple-100 border-purple-400', 
    icon: <Volume2 className="w-6 h-6" />,
    bgColor: 'bg-purple-50'
  },
  force: { 
    name: 'Force', 
    color: 'bg-red-100 border-red-400', 
    icon: <Target className="w-6 h-6" />,
    bgColor: 'bg-red-50'
  },
  friction: { 
    name: 'Friction', 
    color: 'bg-blue-100 border-blue-400', 
    icon: <Move className="w-6 h-6" />,
    bgColor: 'bg-blue-50'
  }
};

const PhysicsPuzzle: React.FC = () => {
  const [gameMode, setGameMode] = useState<'match' | 'learn'>('match');
  const [items, setItems] = useState<PhysicsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('light');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showExamples, setShowExamples] = useState<string | null>(null);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    const allMatched = items.every(item => item.matched);
    if (allMatched && items.length > 0) {
      setGameComplete(true);
    }
  }, [items]);

  const resetGame = () => {
    const shuffledItems = [...physicsData]
      .map(item => ({ ...item, matched: false }))
      .sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
    setScore(0);
    setGameComplete(false);
    setSelectedItems([]);
    setShowExamples(null);
  };

  const handleItemClick = (itemId: string) => {
    if (gameMode === 'learn') {
      setShowExamples(showExamples === itemId ? null : itemId);
      return;
    }

    const item = items.find(i => i.id === itemId);
    if (!item || item.matched) return;

    if (item.category === selectedCategory) {
      // Correct match
      setItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, matched: true } : i
      ));
      setScore(score + 25);
      setSelectedItems([]);
    } else {
      // Wrong selection - show feedback
      setSelectedItems([itemId]);
      setTimeout(() => setSelectedItems([]), 1000);
    }
  };

  if (gameComplete) {
    const maxScore = physicsData.length * 25;
    const percentage = (score / maxScore) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Physics Master!</h2>
          <div className="text-6xl font-bold mb-4 text-blue-600">
            {score}/{maxScore}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            ⚡ You've mastered the fundamentals of physics!
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Accuracy: {percentage.toFixed(1)}%
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-yellow-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const unmatched = items.filter(item => !item.matched);
  const categoryItems = unmatched.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Physics Concepts Explorer</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-yellow-100">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-yellow-100">Remaining</div>
                <div className="text-2xl font-bold">{unmatched.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Mode Toggle */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setGameMode('match')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                gameMode === 'match' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎯 Matching Game
            </button>
            <button
              onClick={() => setGameMode('learn')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                gameMode === 'learn' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📚 Learning Mode
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-blue-50 border-b">
          <h3 className="font-semibold text-blue-800 mb-2">
            {gameMode === 'match' ? 'Matching Mode:' : 'Learning Mode:'}
          </h3>
          <p className="text-blue-700">
            {gameMode === 'match' 
              ? 'Select a category below, then click on items that belong to that category!'
              : 'Click on any physics concept to learn more about it and see examples!'
            }
          </p>
        </div>

        {gameMode === 'match' && (
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-800 mb-4">Select Category to Find:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as keyof typeof categories)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedCategory === key 
                      ? `${category.color} border-blue-500 shadow-lg scale-105` 
                      : `${category.color} hover:scale-102`
                  }`}
                >
                  <div className="flex justify-center mb-2">{category.icon}</div>
                  <div className="font-bold text-gray-800">{category.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {categoryItems.length} remaining
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Target (Match Mode Only) */}
        {gameMode === 'match' && (
          <div className={`p-4 ${categories[selectedCategory].bgColor} border-b`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                🎯 Find all {categories[selectedCategory].name} concepts
                {categories[selectedCategory].icon}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {categoryItems.length} items remaining in this category
              </p>
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => {
              const isTarget = gameMode === 'match' && item.category === selectedCategory && !item.matched;
              const isWrongSelection = selectedItems.includes(item.id);
              const showingExamples = showExamples === item.id;
              
              let cardClass = "p-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-300 transform relative ";
              
              if (item.matched) {
                cardClass += `${categories[item.category].color} border-green-500 scale-95 opacity-50`;
              } else if (gameMode === 'match' && isTarget) {
                cardClass += "border-green-500 bg-green-100 hover:scale-105 shadow-lg animate-pulse";
              } else if (isWrongSelection) {
                cardClass += "border-red-500 bg-red-100 scale-105 shadow-lg";
              } else {
                cardClass += "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 hover:scale-102";
              }

              return (
                <div key={item.id} className="relative">
                  <div
                    onClick={() => handleItemClick(item.id)}
                    className={cardClass}
                  >
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <div className="font-medium text-gray-800 text-sm mb-2">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {item.description}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {item.category}
                    </div>
                    
                    {item.matched && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Examples popup */}
                  {showingExamples && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border-2 border-blue-300 rounded-lg shadow-lg z-10">
                      <div className="text-xs font-semibold text-blue-600 mb-2">Examples:</div>
                      {item.examples.map((example, index) => (
                        <div key={index} className="text-xs text-gray-700 flex items-center gap-2">
                          <span className="text-blue-500">•</span>
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Wrong selection feedback */}
                  {gameMode === 'match' && isWrongSelection && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-100 border border-red-300 rounded-lg shadow-lg z-10">
                      <div className="text-xs text-red-700 text-center">
                        This belongs to <strong>{item.category}</strong> category!
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Physics Facts */}
        <div className="p-6 border-t bg-gradient-to-r from-yellow-50 to-purple-50">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Physics Fun Facts:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white rounded border">
              💡 <strong>Light travels</strong> at 300,000 km per second!
            </div>
            <div className="p-3 bg-white rounded border">
              🔊 <strong>Sound travels</strong> much slower than light at 343 m/s in air.
            </div>
            <div className="p-3 bg-white rounded border">
              🍎 <strong>Gravity</strong> gives you weight, but your mass stays the same!
            </div>
            <div className="p-3 bg-white rounded border">
              🛝 <strong>Friction</strong> helps you walk - without it, you'd slip everywhere!
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicsPuzzle;