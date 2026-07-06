import React, { useState, useEffect } from 'react';
import { Leaf, RotateCcw, Trophy, Recycle, Factory } from 'lucide-react';

const NaturalResourcesPuzzle = () => {
  const [gameData] = useState({
    resources: [
      { id: 1, name: 'Solar Energy', type: 'renewable', icon: '☀️', description: 'Energy from the sun' },
      { id: 2, name: 'Coal', type: 'non-renewable', icon: '⚫', description: 'Fossil fuel formed from ancient plants' },
      { id: 3, name: 'Wind Energy', type: 'renewable', icon: '💨', description: 'Energy from moving air' },
      { id: 4, name: 'Natural Gas', type: 'non-renewable', icon: '🔥', description: 'Fossil fuel gas' },
      { id: 5, name: 'Wood', type: 'renewable', icon: '🪵', description: 'Biomass from trees' },
      { id: 6, name: 'Petroleum', type: 'non-renewable', icon: '🛢️', description: 'Crude oil' },
      { id: 7, name: 'Water', type: 'renewable', icon: '💧', description: 'Hydroelectric power source' },
      { id: 8, name: 'Uranium', type: 'non-renewable', icon: '⚛️', description: 'Nuclear fuel' },
      { id: 9, name: 'Geothermal', type: 'renewable', icon: '🌋', description: 'Heat from Earth\'s core' },
      { id: 10, name: 'Iron Ore', type: 'non-renewable', icon: '⛏️', description: 'Metal ore from mining' },
      { id: 11, name: 'Biomass', type: 'renewable', icon: '🌾', description: 'Organic plant material' },
      { id: 12, name: 'Copper', type: 'non-renewable', icon: '🟤', description: 'Metal for electrical wiring' }
    ]
  });

  const [availableResources, setAvailableResources] = useState([]);
  const [renewableBox, setRenewableBox] = useState([]);
  const [nonRenewableBox, setNonRenewableBox] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    setAvailableResources(shuffleArray(gameData.resources));
    setRenewableBox([]);
    setNonRenewableBox([]);
    setScore(0);
    setGameComplete(false);
    setDraggedItem(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleDragStart = (e, resource) => {
    setDraggedItem(resource);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetType) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const isCorrect = draggedItem.type === targetType;
    
    // Remove from available resources
    setAvailableResources(prev => prev.filter(r => r.id !== draggedItem.id));
    
    // Add to appropriate box
    if (targetType === 'renewable') {
      setRenewableBox(prev => [...prev, { ...draggedItem, correct: isCorrect }]);
    } else {
      setNonRenewableBox(prev => [...prev, { ...draggedItem, correct: isCorrect }]);
    }

    // Update score
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    setDraggedItem(null);

    // Check if game is complete
    if (availableResources.length === 1) { // Will be 0 after this drop
      setGameComplete(true);
    }
  };

  const handleClick = (resource, targetType) => {
    const isCorrect = resource.type === targetType;
    
    // Remove from available resources
    setAvailableResources(prev => prev.filter(r => r.id !== resource.id));
    
    // Add to appropriate box
    if (targetType === 'renewable') {
      setRenewableBox(prev => [...prev, { ...resource, correct: isCorrect }]);
    } else {
      setNonRenewableBox(prev => [...prev, { ...resource, correct: isCorrect }]);
    }

    // Update score
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    // Check if game is complete
    if (availableResources.length === 1) { // Will be 0 after this action
      setGameComplete(true);
    }
  };

  const getBoxScore = (box) => {
    const correct = box.filter(item => item.correct).length;
    return `${correct}/${box.length}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Natural Resources Sorting Game</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-600">Score: {score}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
        </div>

        {gameComplete && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 text-center">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-green-800 mb-1">Game Complete! 🌍</h2>
            <p className="text-green-700">
              Final Score: {score} points | 
              Renewable: {getBoxScore(renewableBox)} | 
              Non-Renewable: {getBoxScore(nonRenewableBox)}
            </p>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Drag and drop resources into the correct categories</p>
          <p className="text-sm text-gray-500">Or click a resource, then click the category button</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Resources to Sort</h2>
          <div className="grid grid-cols-1 gap-3">
            {availableResources.map((resource) => (
              <div
                key={resource.id}
                draggable
                onDragStart={(e) => handleDragStart(e, resource)}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 cursor-move hover:border-blue-300 hover:shadow-md transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{resource.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleClick(resource, 'renewable')}
                    className="flex-1 bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                  >
                    Renewable
                  </button>
                  <button
                    onClick={() => handleClick(resource, 'non-renewable')}
                    className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                  >
                    Non-Renewable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewable Resources Box */}
        <div 
          className="bg-white rounded-xl shadow-lg p-6"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'renewable')}
        >
          <div className="flex items-center gap-3 mb-4">
            <Recycle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-green-800">Renewable Resources</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Resources that can be replenished naturally
          </p>
          <p className="text-sm font-semibold text-green-600 mb-4">
            Score: {getBoxScore(renewableBox)}
          </p>
          
          <div className="space-y-3 min-h-[200px] border-2 border-dashed border-green-300 rounded-lg p-4">
            {renewableBox.map((resource, index) => (
              <div
                key={`${resource.id}-${index}`}
                className={`p-3 rounded-lg border-2 ${
                  resource.correct
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{resource.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-xs text-gray-600">{resource.description}</p>
                  </div>
                  <span className="text-lg">
                    {resource.correct ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            ))}
            {renewableBox.length === 0 && (
              <p className="text-gray-400 text-center py-8">Drop renewable resources here</p>
            )}
          </div>
        </div>

        {/* Non-Renewable Resources Box */}
        <div 
          className="bg-white rounded-xl shadow-lg p-6"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'non-renewable')}
        >
          <div className="flex items-center gap-3 mb-4">
            <Factory className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-800">Non-Renewable Resources</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Resources that cannot be replenished quickly
          </p>
          <p className="text-sm font-semibold text-red-600 mb-4">
            Score: {getBoxScore(nonRenewableBox)}
          </p>
          
          <div className="space-y-3 min-h-[200px] border-2 border-dashed border-red-300 rounded-lg p-4">
            {nonRenewableBox.map((resource, index) => (
              <div
                key={`${resource.id}-${index}`}
                className={`p-3 rounded-lg border-2 ${
                  resource.correct
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{resource.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-xs text-gray-600">{resource.description}</p>
                  </div>
                  <span className="text-lg">
                    {resource.correct ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            ))}
            {nonRenewableBox.length === 0 && (
              <p className="text-gray-400 text-center py-8">Drop non-renewable resources here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalResourcesPuzzle;