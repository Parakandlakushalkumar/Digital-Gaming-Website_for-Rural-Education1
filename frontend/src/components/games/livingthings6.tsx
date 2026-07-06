import React, { useState, useEffect } from 'react';
import { Heart, Trophy, RotateCcw, Info } from 'lucide-react';

const HabitatHeroes = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [matches, setMatches] = useState([]);

  const animals = [
    { id: 1, name: 'Polar Bear', emoji: '🐻‍❄️', habitat: 'arctic', matched: false },
    { id: 2, name: 'Camel', emoji: '🐪', habitat: 'desert', matched: false },
    { id: 3, name: 'Frog', emoji: '🐸', habitat: 'pond', matched: false },
    { id: 4, name: 'Monkey', emoji: '🐵', habitat: 'forest', matched: false },
    { id: 5, name: 'Fish', emoji: '🐠', habitat: 'ocean', matched: false },
    { id: 6, name: 'Eagle', emoji: '🦅', habitat: 'mountain', matched: false },
    { id: 7, name: 'Penguin', emoji: '🐧', habitat: 'arctic', matched: false },
    { id: 8, name: 'Lion', emoji: '🦁', habitat: 'savanna', matched: false },
    { id: 9, name: 'Turtle', emoji: '🐢', habitat: 'pond', matched: false },
    { id: 10, name: 'Parrot', emoji: '🦜', habitat: 'forest', matched: false }
  ];

  const habitats = [
    { 
      id: 'arctic', 
      name: 'Arctic', 
      emoji: '🧊', 
      description: 'Very cold, icy environment',
      background: 'bg-blue-200',
      border: 'border-blue-400'
    },
    { 
      id: 'desert', 
      name: 'Desert', 
      emoji: '🏜️', 
      description: 'Hot, dry, sandy environment',
      background: 'bg-yellow-200',
      border: 'border-yellow-400'
    },
    { 
      id: 'pond', 
      name: 'Pond', 
      emoji: '💧', 
      description: 'Fresh water environment',
      background: 'bg-cyan-200',
      border: 'border-cyan-400'
    },
    { 
      id: 'forest', 
      name: 'Forest', 
      emoji: '🌲', 
      description: 'Trees and woodland environment',
      background: 'bg-green-200',
      border: 'border-green-400'
    },
    { 
      id: 'ocean', 
      name: 'Ocean', 
      emoji: '🌊', 
      description: 'Salt water environment',
      background: 'bg-blue-300',
      border: 'border-blue-500'
    },
    { 
      id: 'mountain', 
      name: 'Mountain', 
      emoji: '⛰️', 
      description: 'High altitude, rocky environment',
      background: 'bg-gray-200',
      border: 'border-gray-400'
    },
    { 
      id: 'savanna', 
      name: 'Savanna', 
      emoji: '🌾', 
      description: 'Grassland with scattered trees',
      background: 'bg-orange-200',
      border: 'border-orange-400'
    }
  ];

  const [gameAnimals, setGameAnimals] = useState(animals);
  const [draggedAnimal, setDraggedAnimal] = useState(null);

  const handleDragStart = (e, animal) => {
    if (animal.matched) return;
    setDraggedAnimal(animal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, habitatId) => {
    e.preventDefault();
    if (!draggedAnimal || draggedAnimal.matched) return;

    if (draggedAnimal.habitat === habitatId) {
      // Correct match
      setGameAnimals(gameAnimals.map(animal => 
        animal.id === draggedAnimal.id ? { ...animal, matched: true } : animal
      ));
      setMatches([...matches, { animal: draggedAnimal, habitat: habitatId }]);
      setScore(score + 15);
      setFeedback(`🎉 Great job! ${draggedAnimal.name} lives in the ${habitats.find(h => h.id === habitatId)?.name}!`);
      
      // Check if game complete
      const newAnimals = gameAnimals.map(animal => 
        animal.id === draggedAnimal.id ? { ...animal, matched: true } : animal
      );
      if (newAnimals.every(animal => animal.matched)) {
        setGameComplete(true);
        setFeedback('🏆 Amazing! You\'ve helped all animals find their homes!');
      }
    } else {
      // Wrong match
      setLives(lives - 1);
      const correctHabitat = habitats.find(h => h.id === draggedAnimal.habitat)?.name;
      setFeedback(`❌ Not quite! ${draggedAnimal.name} actually lives in the ${correctHabitat}.`);
      
      if (lives <= 1) {
        setFeedback('💔 No more lives! Click restart to try again.');
      }
    }
    
    setDraggedAnimal(null);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const resetGame = () => {
    setGameAnimals(animals);
    setScore(0);
    setLives(3);
    setGameComplete(false);
    setMatches([]);
    setFeedback('');
    setDraggedAnimal(null);
  };

  const unmatched = gameAnimals.filter(animal => !animal.matched);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            🦸‍♂️ Habitat Heroes
          </h1>
          <p className="text-gray-600 text-lg">Help animals find their perfect homes!</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-1">
              <Trophy className="text-yellow-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="text-red-500" size={20} />
              <span className="font-semibold">Lives: {lives}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Animals Saved: {matches.length}/{animals.length}</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4 p-4 bg-white rounded-lg shadow-lg">
            <p className="font-semibold text-lg">{feedback}</p>
          </div>
        )}

        {/* Info Button */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Info size={16} />
            {showInfo ? 'Hide' : 'Show'} Habitat Info
          </button>
        </div>

        {/* Habitat Info */}
        {showInfo && (
          <div className="mb-6 bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-3 text-center">🌍 Habitat Guide</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {habitats.map(habitat => (
                <div key={habitat.id} className={`${habitat.background} p-3 rounded-lg border ${habitat.border}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{habitat.emoji}</span>
                    <span className="font-semibold">{habitat.name}</span>
                  </div>
                  <p className="text-gray-600">{habitat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!gameComplete && lives > 0 ? (
          <div className="grid lg:grid-cols-4 gap-4">
            
            {/* Animals to Match */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">🐾 Animals</h3>
              <div className="space-y-2">
                {unmatched.map(animal => (
                  <div
                    key={animal.id}
                    draggable={!gameComplete && lives > 0}
                    onDragStart={(e) => handleDragStart(e, animal)}
                    className="bg-yellow-100 p-3 rounded-lg cursor-move hover:bg-yellow-200 transition-colors flex items-center gap-3 border-2 border-dashed border-yellow-300"
                  >
                    <span className="text-2xl">{animal.emoji}</span>
                    <span className="font-semibold text-sm">{animal.name}</span>
                  </div>
                ))}
                
                {unmatched.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>All animals are safe in their homes! 🏠</p>
                  </div>
                )}
              </div>
            </div>

            {/* Habitats */}
            <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habitats.map(habitat => (
                <div
                  key={habitat.id}
                  className={`${habitat.background} p-4 rounded-xl shadow-lg border-2 border-dashed ${habitat.border} min-h-[200px]`}
                  onDrop={(e) => handleDrop(e, habitat.id)}
                  onDragOver={handleDragOver}
                >
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{habitat.emoji}</div>
                    <h4 className="font-bold text-lg">{habitat.name}</h4>
                    <p className="text-xs text-gray-600">{habitat.description}</p>
                  </div>
                  
                  {/* Animals in this habitat */}
                  <div className="space-y-2">
                    {matches
                      .filter(match => match.habitat === habitat.id)
                      .map((match, idx) => (
                        <div key={idx} className="bg-white bg-opacity-80 p-2 rounded flex items-center gap-2">
                          <span className="text-lg">{match.animal.emoji}</span>
                          <span className="text-sm font-semibold">{match.animal.name}</span>
                          <span className="ml-auto text-green-600">✅</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : gameComplete ? (
          /* Game Complete */
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Mission Accomplished!</h2>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-xl mb-4">You've successfully helped all animals find their homes!</p>
            <p className="text-gray-600 mb-6">Final Score: {score} points</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {habitats.map(habitat => {
                const habitatAnimals = matches.filter(match => match.habitat === habitat.id);
                return (
                  <div key={habitat.id} className={`${habitat.background} p-4 rounded-lg`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{habitat.emoji}</span>
                      <span className="font-bold">{habitat.name}</span>
                    </div>
                    <div className="space-y-1">
                      {habitatAnimals.map((match, idx) => (
                        <div key={idx} className="text-sm flex items-center gap-1">
                          <span>{match.animal.emoji}</span>
                          <span>{match.animal.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Game Over */
          <div className="bg-red-100 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">💔 Game Over</h2>
            <p className="text-xl mb-4">Don't worry! Every habitat hero learns from mistakes.</p>
            <p className="text-gray-600 mb-6">You saved {matches.length} animals and scored {score} points!</p>
          </div>
        )}

        {/* Controls */}
        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto text-lg"
          >
            <RotateCcw size={20} />
            New Adventure
          </button>
        </div>

        {/* Learning Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-center">🧠 Learn About Habitats</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What is a Habitat? 🏠</h4>
              <p className="text-gray-600 mb-3">
                A habitat is where animals live and find everything they need to survive: food, water, shelter, and space to raise their young.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Why Animals Live in Specific Places? 🤔</h4>
              <p className="text-gray-600">
                Animals have special features (adaptations) that help them survive in their habitat. For example, polar bears have thick fur for cold Arctic weather!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitatHeroes;