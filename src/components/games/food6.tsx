import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';

const FoodSourceDetective = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState('');

  const foodItems = [
    { id: 1, name: 'Apple', emoji: '🍎', source: 'plant', matched: false },
    { id: 2, name: 'Milk', emoji: '🥛', source: 'animal', matched: false },
    { id: 3, name: 'Carrot', emoji: '🥕', source: 'plant', matched: false },
    { id: 4, name: 'Egg', emoji: '🥚', source: 'animal', matched: false },
    { id: 5, name: 'Bread', emoji: '🍞', source: 'plant', matched: false },
    { id: 6, name: 'Cheese', emoji: '🧀', source: 'animal', matched: false },
    { id: 7, name: 'Banana', emoji: '🍌', source: 'plant', matched: false },
    { id: 8, name: 'Fish', emoji: '🐟', source: 'animal', matched: false }
  ];

  const [foods, setFoods] = useState(foodItems);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, food) => {
    setDraggedItem(food);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, source) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.matched) return;

    if (draggedItem.source === source) {
      // Correct match
      setFoods(foods.map(food => 
        food.id === draggedItem.id ? { ...food, matched: true } : food
      ));
      setMatches({ ...matches, [draggedItem.id]: source });
      setScore(score + 10);
      setFeedback(`✅ Correct! ${draggedItem.name} comes from a ${source}!`);
      
      // Check if game complete
      const newFoods = foods.map(food => 
        food.id === draggedItem.id ? { ...food, matched: true } : food
      );
      if (newFoods.every(food => food.matched)) {
        setGameComplete(true);
        setFeedback('🎉 Congratulations! You\'ve matched all foods correctly!');
      }
    } else {
      // Wrong match
      setLives(lives - 1);
      setFeedback(`❌ Try again! ${draggedItem.name} doesn't come from a ${source}.`);
      if (lives <= 1) {
        setFeedback('💔 Game Over! Click restart to try again.');
      }
    }
    
    setDraggedItem(null);
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const resetGame = () => {
    setFoods(foodItems);
    setScore(0);
    setLives(3);
    setGameComplete(false);
    setMatches({});
    setFeedback('');
    setDraggedItem(null);
  };

  const unmatched = foods.filter(food => !food.matched);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            🔍 Food Source Detective
          </h1>
          <p className="text-gray-600">Drag each food to its correct source!</p>
          
          {/* Score & Lives */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-1">
              <Trophy className="text-yellow-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Lives: </span>
              {[...Array(lives)].map((_, i) => (
                <span key={i} className="text-red-500">❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4 p-3 bg-white rounded-lg shadow">
            <p className="font-semibold text-lg">{feedback}</p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Unmatched Foods */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-center mb-4">🍽️ Foods</h3>
            <div className="space-y-2">
              {unmatched.map(food => (
                <div
                  key={food.id}
                  draggable={!gameComplete && lives > 0}
                  onDragStart={(e) => handleDragStart(e, food)}
                  className="bg-yellow-100 p-3 rounded-lg cursor-move hover:bg-yellow-200 transition-colors flex items-center gap-2"
                >
                  <span className="text-2xl">{food.emoji}</span>
                  <span className="font-semibold">{food.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Source */}
          <div 
            className="bg-green-200 p-4 rounded-xl shadow-lg border-2 border-dashed border-green-400"
            onDrop={(e) => handleDrop(e, 'plant')}
            onDragOver={handleDragOver}
          >
            <h3 className="text-xl font-bold text-center mb-4">🌱 Plant Source</h3>
            <div className="text-center text-6xl mb-4">🌽</div>
            <p className="text-center text-sm text-gray-600">Foods that grow from plants</p>
            
            {/* Matched Plant Foods */}
            <div className="mt-4 space-y-2">
              {foods.filter(food => food.matched && food.source === 'plant').map(food => (
                <div key={food.id} className="bg-green-300 p-2 rounded flex items-center gap-2">
                  <span>{food.emoji}</span>
                  <span className="text-sm font-semibold">{food.name}</span>
                  <Check className="text-green-700 ml-auto" size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Animal Source */}
          <div 
            className="bg-orange-200 p-4 rounded-xl shadow-lg border-2 border-dashed border-orange-400"
            onDrop={(e) => handleDrop(e, 'animal')}
            onDragOver={handleDragOver}
          >
            <h3 className="text-xl font-bold text-center mb-4">🐄 Animal Source</h3>
            <div className="text-center text-6xl mb-4">🐮</div>
            <p className="text-center text-sm text-gray-600">Foods that come from animals</p>
            
            {/* Matched Animal Foods */}
            <div className="mt-4 space-y-2">
              {foods.filter(food => food.matched && food.source === 'animal').map(food => (
                <div key={food.id} className="bg-orange-300 p-2 rounded flex items-center gap-2">
                  <span>{food.emoji}</span>
                  <span className="text-sm font-semibold">{food.name}</span>
                  <Check className="text-orange-700 ml-auto" size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Restart Game
          </button>
        </div>

        {/* Game Complete */}
        {gameComplete && (
          <div className="mt-6 bg-yellow-100 border-2 border-yellow-400 p-6 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">🏆 Excellent Work!</h2>
            <p className="text-yellow-700">
              You've successfully identified all food sources! Final Score: {score}
            </p>
          </div>
        )}

        {/* Learning Info */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">🧠 Did You Know?</h3>
          <p className="text-sm text-gray-600">
            Plants give us fruits, vegetables, grains, and nuts. Animals provide us with meat, dairy products, and eggs. 
            Understanding where our food comes from helps us make healthy choices and appreciate both plants and animals!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodSourceDetective;