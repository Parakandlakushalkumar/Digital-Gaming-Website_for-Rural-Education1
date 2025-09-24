import React, { useState, useEffect } from 'react';
import { Shield, RotateCcw, Trophy, Leaf, Heart, AlertTriangle } from 'lucide-react';

interface ConservationItem {
  id: string;
  name: string;
  category: 'endangered' | 'extinct' | 'conservation-method' | 'threat';
  description: string;
  emoji: string;
  details: string[];
}

const conservationData: ConservationItem[] = [
  // Endangered species
  {
    id: 'tiger',
    name: 'Tiger',
    category: 'endangered',
    description: 'Less than 4000 left in wild',
    emoji: '🐅',
    details: ['Habitat loss', 'Poaching for body parts', 'Human-wildlife conflict']
  },
  {
    id: 'panda',
    name: 'Giant Panda',
    category: 'endangered',
    description: 'Around 1800 left in wild',
    emoji: '🐼',
    details: ['Bamboo forest destruction', 'Low reproduction rate', 'Climate change']
  },
  {
    id: 'rhinoceros',
    name: 'Rhinoceros',
    category: 'endangered',
    description: 'Critically endangered',
    emoji: '🦏',
    details: ['Horn poaching', 'Habitat destruction', 'Political instability']
  },
  {
    id: 'snow-leopard',
    name: 'Snow Leopard',
    category: 'endangered',
    description: 'Mountain predator at risk',
    emoji: '🐆',
    details: ['Climate change', 'Prey depletion', 'Retaliatory killing']
  },

  // Extinct species
  {
    id: 'dodo',
    name: 'Dodo Bird',
    category: 'extinct',
    description: 'Extinct since 1662',
    emoji: '🦤',
    details: ['Overhunting', 'Habitat destruction', 'Introduced species']
  },
  {
    id: 'mammoth',
    name: 'Woolly Mammoth',
    category: 'extinct',
    description: 'Extinct 4000 years ago',
    emoji: '🦣',
    details: ['Climate change', 'Human hunting', 'Habitat loss']
  },
  {
    id: 'tasmanian-tiger',
    name: 'Tasmanian Tiger',
    category: 'extinct',
    description: 'Last died in 1936',
    emoji: '🐺',
    details: ['Disease', 'Competition', 'Human persecution']
  },

  // Conservation methods
  {
    id: 'national-park',
    name: 'National Parks',
    category: 'conservation-method',
    description: 'Protected natural areas',
    emoji: '🏞️',
    details: ['Habitat protection', 'Wildlife monitoring', 'Research opportunities']
  },
  {
    id: 'breeding-program',
    name: 'Breeding Programs',
    category: 'conservation-method',
    description: 'Increase population artificially',
    emoji: '🥚',
    details: ['Genetic diversity', 'Population recovery', 'Reintroduction']
  },
  {
    id: 'wildlife-corridor',
    name: 'Wildlife Corridors',
    category: 'conservation-method',
    description: 'Connect fragmented habitats',
    emoji: '🌿',
    details: ['Animal movement', 'Gene flow', 'Habitat connectivity']
  },
  {
    id: 'awareness',
    name: 'Public Awareness',
    category: 'conservation-method',
    description: 'Educate people about conservation',
    emoji: '📢',
    details: ['Community involvement', 'Behavior change', 'Support for policies']
  },

  // Threats
  {
    id: 'deforestation',
    name: 'Deforestation',
    category: 'threat',
    description: 'Massive habitat destruction',
    emoji: '🪓',
    details: ['Agriculture expansion', 'Urban development', 'Logging']
  },
  {
    id: 'pollution',
    name: 'Pollution',
    category: 'threat',
    description: 'Contamination of environment',
    emoji: '🏭',
    details: ['Water pollution', 'Air pollution', 'Chemical contamination']
  },
  {
    id: 'climate-change',
    name: 'Climate Change',
    category: 'threat',
    description: 'Global warming effects',
    emoji: '🌡️',
    details: ['Temperature rise', 'Sea level rise', 'Weather pattern changes']
  },
  {
    id: 'poaching',
    name: 'Poaching',
    category: 'threat',
    description: 'Illegal hunting and trade',
    emoji: '🎯',
    details: ['Body parts trade', 'Trophy hunting', 'Traditional medicine']
  }
];

const categories = {
  endangered: { 
    name: 'Endangered Species', 
    color: 'bg-red-100 border-red-400', 
    icon: '🚨',
    bgColor: 'bg-red-50'
  },
  extinct: { 
    name: 'Extinct Species', 
    color: 'bg-gray-100 border-gray-400', 
    icon: '💀',
    bgColor: 'bg-gray-50'
  },
  'conservation-method': { 
    name: 'Conservation Methods', 
    color: 'bg-green-100 border-green-400', 
    icon: '🛡️',
    bgColor: 'bg-green-50'
  },
  threat: { 
    name: 'Threats', 
    color: 'bg-orange-100 border-orange-400', 
    icon: '⚠️',
    bgColor: 'bg-orange-50'
  }
};

const ConservationPuzzle: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<{[key: string]: ConservationItem[]}>({
    endangered: [],
    extinct: [],
    'conservation-method': [],
    threat: []
  });
  const [availableItems, setAvailableItems] = useState<ConservationItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (availableItems.length === 0 && Object.values(droppedItems).some(arr => arr.length > 0)) {
      setGameComplete(true);
    }
  }, [availableItems]);

  const resetGame = () => {
    const shuffled = [...conservationData].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
    setDroppedItems({
      endangered: [],
      extinct: [],
      'conservation-method': [],
      threat: []
    });
    setScore(0);
    setGameComplete(false);
    setShowDetails(null);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCategory: keyof typeof categories) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const item = availableItems.find(item => item.id === draggedItem);
    if (!item) return;

    const isCorrect = item.category === targetCategory;
    
    if (isCorrect) {
      setScore(score + 20);
      setDroppedItems(prev => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], item]
      }));
      setAvailableItems(prev => prev.filter(i => i.id !== draggedItem));
    }
    
    setDraggedItem(null);
  };

  const handleItemClick = (itemId: string) => {
    setShowDetails(showDetails === itemId ? null : itemId);
  };

  if (gameComplete) {
    const maxScore = conservationData.length * 20;
    const percentage = (score / maxScore) * 100;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Conservation Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-green-600">
            {score}/{maxScore}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            🌍 You've helped organize conservation efforts!
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Accuracy: {percentage.toFixed(1)}%
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Conservation Sorting Challenge</h1>
            </div>
            <div className="text-right">
              <div className="text-green-100">Score</div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-green-50 border-b">
          <h3 className="font-semibold text-green-800 mb-2">How to Play:</h3>
          <p className="text-green-700">
            Drag and drop items into the correct conservation categories. Click items to learn more details!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Available Items */}
          <div className="lg:w-1/3 p-6 border-r">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Items to Sort ({availableItems.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableItems.map((item) => (
                <div key={item.id} className="relative">
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => handleItemClick(item.id)}
                    className="p-3 bg-white border-2 border-gray-300 rounded-lg cursor-move hover:border-blue-400 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details popup */}
                  {showDetails === item.id && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-blue-50 border-2 border-blue-300 rounded-lg shadow-lg z-10">
                      <div className="text-sm font-semibold text-blue-800 mb-2">Details:</div>
                      {item.details.map((detail, index) => (
                        <div key={index} className="text-xs text-blue-700 flex items-center gap-2">
                          <Heart className="w-3 h-3" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="lg:w-2/3 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Conservation Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, key as keyof typeof categories)}
                  className={`min-h-48 p-4 rounded-lg border-2 border-dashed transition-all duration-300 ${
                    category.color
                  } ${draggedItem ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                  <div className="text-center mb-4">
                    <span className="text-3xl">{category.icon}</span>
                    <h4 className="font-bold text-gray-800 mt-2">{category.name}</h4>
                    <div className="text-sm text-gray-600">
                      {droppedItems[key as keyof typeof droppedItems].length} items
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {droppedItems[key as keyof typeof droppedItems].map((item, index) => (
                      <div key={`${item.id}-${index}`} className="p-2 bg-white rounded border flex items-center gap-2">
                        <span>{item.emoji}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {droppedItems[key as keyof typeof droppedItems].length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Drop {category.name.toLowerCase()} here</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center">
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

export default ConservationPuzzle;