import React, { useState } from 'react';
import { Hammer, Home, Trophy, Lightbulb, Zap, CheckCircle } from 'lucide-react';

const MaterialsStructuresTreasureHunt = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const treasures = [
    {
      id: 1,
      clue: "I'm strong when you pull me apart, but weak when you squeeze my heart. What property am I?",
      answer: "tension",
      hint: "Think about how a rope behaves when you pull on both ends",
      treasure: "Tensile Strength Crystal",
      funFact: "Steel cables can support tremendous weight in tension - that's how suspension bridges work!",
      icon: "⬌"
    },
    {
      id: 2,
      clue: "I'm light as a feather but strong as can be, honeycomb patterns are the key to me. What am I?",
      answer: "composite",
      hint: "These materials combine different substances to get the best of both worlds",
      treasure: "Composite Material Sample",
      funFact: "Carbon fiber composites are 5 times stronger than steel but much lighter!",
      icon: "🏗️"
    },
    {
      id: 3,
      clue: "Triangles are my favorite shape, they help structures never break. What am I?",
      answer: "truss",
      hint: "Look at bridges and towers - they often use triangular frameworks",
      treasure: "Triangle Power Token",
      funFact: "Triangles are the strongest shape because they distribute force evenly across all sides!",
      icon: "△"
    },
    {
      id: 4,
      clue: "I bend and flex but don't break, returning to shape for safety's sake. What property am I?",
      answer: "elasticity",
      hint: "Think of a rubber band or a spring",
      treasure: "Flexibility Medallion",
      funFact: "Rubber can stretch up to 8 times its original length and still bounce back!",
      icon: "🔄"
    },
    {
      id: 5,
      clue: "I'm found in your phone, your bike, and your car. Without me, technology wouldn't go far. What am I?",
      answer: "metal",
      hint: "This material conducts electricity and can be shaped when heated",
      treasure: "Conductor's Crown",
      funFact: "Aluminum is the most abundant metal in Earth's crust, making up about 8% of it!",
      icon: "⚡"
    },
    {
      id: 6,
      clue: "I come from trees but I'm processed with care, in buildings and furniture, you'll find me everywhere. What am I?",
      answer: "wood",
      hint: "This natural material has been used in construction for thousands of years",
      treasure: "Forest Guardian Badge",
      funFact: "Bamboo is technically a grass, but it's stronger than many types of steel!",
      icon: "🌲"
    }
  ];

  const checkAnswer = (answer) => {
    const userAnswer = answer.toLowerCase().trim();
    const correctAnswer = treasures[currentClue].answer.toLowerCase();
    
    if (userAnswer === correctAnswer || userAnswer.includes(correctAnswer)) {
      setFoundTreasures([...foundTreasures, treasures[currentClue]]);
      setScore(score + 100);
      
      if (currentClue < treasures.length - 1) {
        setTimeout(() => {
          setCurrentClue(currentClue + 1);
          setShowHint(false);
        }, 2000);
      } else {
        setGameComplete(true);
      }
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkAnswer(userAnswer)) {
      setFeedback('🎉 Excellent! You found the treasure!');
      setUserAnswer('');
    } else {
      setFeedback('🔨 Keep trying! Materials engineering takes practice!');
    }
  };

  const resetGame = () => {
    setCurrentClue(0);
    setFoundTreasures([]);
    setScore(0);
    setGameComplete(false);
    setShowHint(false);
    setUserAnswer('');
    setFeedback('');
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl shadow-lg">
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-red-800 mb-4">🏆 Master Builder! 🏆</h1>
          <p className="text-xl text-gray-700 mb-6">You've conquered Materials & Structures!</p>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Your Engineering Arsenal:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundTreasures.map((treasure) => (
                <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                  <span className="text-2xl mr-3">{treasure.icon}</span>
                  <div>
                    <p className="font-semibold text-red-700">{treasure.treasure}</p>
                    <p className="text-sm text-gray-600">{treasure.funFact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-lg mb-6">Final Score: <span className="font-bold text-red-600">{score} points</span></p>
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Build Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-800 mb-2">🏗️ Materials & Structures Treasure Hunt</h1>
        <p className="text-lg text-gray-700">Discover the building blocks of engineering!</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Home className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-semibold">Challenge {currentClue + 1} of {treasures.length}</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-semibold">{score} points</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <Hammer className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-xl font-bold text-red-800">Building Challenge:</h3>
          </div>
          <p className="text-lg text-gray-800 italic">{treasures[currentClue].clue}</p>
        </div>

        <div className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
            >
              <Hammer className="w-4 h-4 mr-2" />
              Build!
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mb-4 ${feedback.includes('Excellent') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {feedback}
            {feedback.includes('Excellent') && (
              <div className="mt-2 p-3 bg-white rounded-lg">
                <p className="font-semibold text-red-700">🎁 Discovered: {treasures[currentClue].treasure}</p>
                <p className="text-sm text-gray-600 mt-1">{treasures[currentClue].funFact}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHint ? 'Hide Blueprint' : 'Show Blueprint'}
          </button>
          <div className="text-sm text-gray-600">
            Materials found: {foundTreasures.length}/{treasures.length}
          </div>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">📐 <strong>Blueprint:</strong> {treasures[currentClue].hint}</p>
          </div>
        )}
      </div>

      {foundTreasures.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Your Material Collection:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {foundTreasures.map((treasure) => (
              <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-red-700">{treasure.treasure}</p>
                  <p className="text-xs text-gray-600">{treasure.icon}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsStructuresTreasureHunt;