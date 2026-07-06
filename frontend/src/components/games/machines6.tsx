import React, { useState, useEffect } from 'react';
import { Search, MapPin, Trophy, Star, RotateCcw, Eye } from 'lucide-react';

const SimpleMachinesTreasureHunt = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const treasureClues = [
    {
      id: 1,
      machine: 'Lever',
      clue: '🔍 I help you lift heavy things with less effort. You can find me on a playground - children use me to go up and down!',
      riddle: 'What simple machine am I?',
      options: ['Pulley', 'Lever', 'Inclined Plane', 'Wedge'],
      correct: 'Lever',
      hint: 'Think about a seesaw! It has a fulcrum (pivot point) in the middle.',
      explanation: 'A lever uses a fulcrum to multiply force. Seesaws, crowbars, and scissors are all levers!',
      treasure: '⚖️',
      location: 'Playground',
      examples: ['Seesaw', 'Crowbar', 'Scissors', 'Bottle opener']
    },
    {
      id: 2,
      machine: 'Wheel and Axle',
      clue: '🔍 I roll around to make moving things easier. You see me on vehicles, helping them glide smoothly down the road!',
      riddle: 'What simple machine am I?',
      options: ['Screw', 'Wheel and Axle', 'Pulley', 'Lever'],
      correct: 'Wheel and Axle',
      hint: 'I am round and spin! Cars, bikes, and carts all need me to move.',
      explanation: 'Wheels and axles reduce friction and make it easier to move heavy loads!',
      treasure: '🎯',
      location: 'Road',
      examples: ['Car wheels', 'Bicycle', 'Shopping cart', 'Roller skates']
    },
    {
      id: 3,
      machine: 'Inclined Plane',
      clue: '🔍 I am like a gentle hill that makes it easier to move things up high. Ramps and slides are examples of me!',
      riddle: 'What simple machine am I?',
      options: ['Wedge', 'Inclined Plane', 'Screw', 'Pulley'],
      correct: 'Inclined Plane',
      hint: 'I am slanted and help you go up without lifting straight up!',
      explanation: 'Inclined planes spread the work over a longer distance, making it easier to lift things!',
      treasure: '🏔️',
      location: 'Ramp',
      examples: ['Wheelchair ramp', 'Slide', 'Road up a hill', 'Loading dock']
    },
    {
      id: 4,
      machine: 'Pulley',
      clue: '🔍 I have a rope or chain that goes around me. I help lift heavy things by changing the direction of force!',
      riddle: 'What simple machine am I?',
      options: ['Pulley', 'Lever', 'Wheel and Axle', 'Wedge'],
      correct: 'Pulley',
      hint: 'Flag poles use me to raise flags up high! I am round with a groove for rope.',
      explanation: 'Pulleys change the direction of force and can multiply force when used in systems!',
      treasure: '🎪',
      location: 'Flag pole',
      examples: ['Flag pole', 'Construction crane', 'Zip line', 'Window blinds']
    },
    {
      id: 5,
      machine: 'Wedge',
      clue: '🔍 I am triangle-shaped and very good at splitting things apart. I can cut, slice, and separate!',
      riddle: 'What simple machine am I?',
      options: ['Screw', 'Wedge', 'Lever', 'Inclined Plane'],
      correct: 'Wedge',
      hint: 'Knives, axes, and even your teeth use me to cut and bite!',
      explanation: 'Wedges concentrate force into a sharp edge to split or cut materials!',
      treasure: '🔺',
      location: 'Kitchen',
      examples: ['Knife', 'Axe', 'Scissors blade', 'Door stopper']
    },
    {
      id: 6,
      machine: 'Screw',
      clue: '🔍 I am like an inclined plane wrapped around a cylinder. I twist and turn to hold things together!',
      riddle: 'What simple machine am I?',
      options: ['Screw', 'Pulley', 'Wedge', 'Wheel and Axle'],
      correct: 'Screw',
      hint: 'I spiral around and around! You turn me with a screwdriver to fasten things.',
      explanation: 'Screws are inclined planes wrapped around a cylinder, creating strong holding power!',
      treasure: '🌀',
      location: 'Workshop',
      examples: ['Wood screw', 'Bolt', 'Jar lid', 'Drill bit']
    }
  ];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const currentTreasure = treasureClues[currentClue];
    
    if (answer === currentTreasure.correct) {
      const points = showHint ? 15 : 25; // Less points if hint was used
      setScore(score + points);
      setFoundTreasures([...foundTreasures, currentTreasure]);
      setFeedback(`🎉 Treasure found! ${currentTreasure.explanation} (+${points} points)`);
      
      setTimeout(() => {
        if (currentClue < treasureClues.length - 1) {
          setCurrentClue(currentClue + 1);
          setShowHint(false);
          setSelectedAnswer('');
          setFeedback('');
        } else {
          setGameComplete(true);
          setFeedback('🏆 Congratulations! You found all the simple machine treasures!');
        }
      }, 3000);
    } else {
      setFeedback(`❌ Not quite right! Try again. Remember: ${currentTreasure.hint}`);
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const resetGame = () => {
    setCurrentClue(0);
    setFoundTreasures([]);
    setScore(0);
    setGameComplete(false);
    setFeedback('');
    setShowHint(false);
    setSelectedAnswer('');
  };

  const currentTreasure = treasureClues[currentClue];

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              🏆 Treasure Hunt Complete!
            </h1>
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl mb-4">You discovered all 6 simple machines!</p>
            <p className="text-xl text-gray-600 mb-8">Final Score: {score} points</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {foundTreasures.map((treasure, idx) => (
                <div key={idx} className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-4 rounded-lg">
                  <div className="text-3xl mb-2">{treasure.treasure}</div>
                  <h3 className="font-bold text-lg">{treasure.machine}</h3>
                  <p className="text-sm text-gray-600 mb-2">Found at: {treasure.location}</p>
                  <div className="text-xs">
                    <strong>Examples:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {treasure.examples.map((example, i) => (
                        <span key={i} className="bg-orange-100 px-2 py-1 rounded text-xs">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={resetGame}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              New Treasure Hunt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🗺️ Simple Machines Treasure Hunt
          </h1>
          <p className="text-lg text-gray-600">Follow the clues to discover all 6 simple machines!</p>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-1">
              <Trophy className="text-yellow-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-red-500" size={20} />
              <span className="font-semibold">Clue {currentClue + 1}/{treasureClues.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="text-purple-500" size={20} />
              <span className="font-semibold">Found: {foundTreasures.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(foundTreasures.length / treasureClues.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Progress: {foundTreasures.length}/{treasureClues.length} treasures found
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Current Clue */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Search className="text-blue-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Treasure Clue #{currentClue + 1}
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <p className="text-lg text-gray-700 italic">{currentTreasure.clue}</p>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">{currentTreasure.riddle}</h3>
            </div>

            {/* Answer Options */}
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              {currentTreasure.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== ''}
                  className={`p-4 rounded-lg text-lg font-semibold transition-all ${
                    selectedAnswer === option
                      ? option === currentTreasure.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${selectedAnswer !== '' ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Hint Button */}
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <Eye size={16} />
                {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
            </div>

            {/* Hint */}
            {showHint && (
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-purple-800 mb-2">💡 Hint:</h4>
                <p className="text-purple-700">{currentTreasure.hint}</p>
                <p className="text-xs text-purple-600 mt-2">
                  (Using hints gives fewer points!)
                </p>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-lg font-semibold text-blue-800">{feedback}</p>
              </div>
            )}
          </div>

          {/* Treasure Map & Found Items */}
          <div className="space-y-6">
            
            {/* Treasure Map */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-center mb-4">🗺️ Treasure Map</h3>
              <div className="grid grid-cols-2 gap-2">
                {treasureClues.map((treasure, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center transition-all ${
                      foundTreasures.some(found => found.id === treasure.id)
                        ? 'bg-green-100 text-green-800'
                        : idx === currentClue
                          ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300'
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {foundTreasures.some(found => found.id === treasure.id) ? treasure.treasure : '❓'}
                    </div>
                    <div className="text-xs font-semibold">{treasure.machine}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Found Treasures */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-center mb-4">
                🏴‍☠️ Found Treasures ({foundTreasures.length})
              </h3>
              <div className="space-y-3">
                {foundTreasures.map((treasure, idx) => (
                  <div key={idx} className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{treasure.treasure}</span>
                      <div>
                        <div className="font-bold text-sm">{treasure.machine}</div>
                        <div className="text-xs text-gray-600">{treasure.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {foundTreasures.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <p className="text-sm">No treasures found yet!</p>
                    <p className="text-xs">Solve clues to collect them! 🏴‍☠️</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Section */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-center">🧠 Simple Machines Facts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What are Simple Machines? ⚙️</h4>
              <p className="text-gray-600 mb-3">
                Simple machines are basic tools that make work easier by changing the direction or amount of force needed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Why are they important? 🤔</h4>
              <p className="text-gray-600">
                All complex machines are made up of combinations of these 6 simple machines. They help us lift, move, and cut things with less effort!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMachinesTreasureHunt;