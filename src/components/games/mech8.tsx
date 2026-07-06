import React, { useState } from 'react';
import { Zap, Rocket, Trophy, Lightbulb, Target, CheckCircle, ArrowRight } from 'lucide-react';

const MechanicsTreasureHunt = () => {
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
      clue: "I'm what makes things move or stay still, push or pull - that's my thrill. What am I?",
      answer: "force",
      hint: "Newton's first law is all about me!",
      treasure: "Force Field Generator",
      funFact: "Force is measured in Newtons (N), named after Sir Isaac Newton who discovered the laws of motion!",
      icon: "⚡"
    },
    {
      id: 2,
      clue: "The faster you go, the more of me you have. I'm mass times velocity - do the math! What am I?",
      answer: "momentum",
      hint: "Think about why it's hard to stop a heavy truck moving fast",
      treasure: "Momentum Multiplier",
      funFact: "A bullet has less momentum than a slowly walking elephant because momentum = mass × velocity!",
      icon: "🚀"
    },
    {
      id: 3,
      clue: "I oppose motion, making things slow. Without me, everything would go and go! What am I?",
      answer: "friction",
      hint: "Think about why you need to keep pedaling a bike to maintain speed",
      treasure: "Friction Controller",
      funFact: "Without friction, you couldn't walk, drive, or even hold things - everything would be slippery!",
      icon: "🛑"
    },
    {
      id: 4,
      clue: "I pull everything down to the ground, keeping your feet safe and sound. What am I?",
      answer: "gravity",
      hint: "What goes up must come down!",
      treasure: "Gravity Manipulator",
      funFact: "Gravity on the Moon is about 1/6th of Earth's gravity - that's why astronauts can jump so high!",
      icon: "🌍"
    },
    {
      id: 5,
      clue: "I'm force times distance, work I define. When you lift or push, I help things shine. What am I?",
      answer: "work",
      hint: "In physics, I'm not what you do at your job!",
      treasure: "Work-Energy Converter",
      funFact: "Work in physics is measured in Joules - lifting an apple 1 meter requires about 1 Joule of work!",
      icon: "💪"
    },
    {
      id: 6,
      clue: "Simple machines are my friends, helping forces bend. Lever, pulley, wedge, and screw - I make work easier for you! What am I?",
      answer: "mechanical advantage",
      hint: "Think about how a bottle opener makes it easier to open bottles",
      treasure: "Advantage Amplifier",
      funFact: "A simple lever can multiply your force by 10 or more - that's why crowbars are so effective!",
      icon: "⚙️"
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
      setFeedback('🚀 Perfect! The force is strong with you!');
      setUserAnswer('');
    } else {
      setFeedback('⚡ Not quite! Every action has an equal and opposite reaction - try again!');
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
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-100 rounded-xl shadow-lg">
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-purple-800 mb-4">🎯 Motion Master! 🎯</h1>
          <p className="text-xl text-gray-700 mb-6">You've mastered the laws of physics!</p>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Your Physics Arsenal:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundTreasures.map((treasure) => (
                <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-purple-100 rounded-lg">
                  <span className="text-2xl mr-3">{treasure.icon}</span>
                  <div>
                    <p className="font-semibold text-purple-700">{treasure.treasure}</p>
                    <p className="text-sm text-gray-600">{treasure.funFact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-lg mb-6">Final Score: <span className="font-bold text-purple-600">{score} points</span></p>
          <button
            onClick={resetGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Launch Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-100 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">⚡ Mechanics: Forces & Motion Treasure Hunt</h1>
        <p className="text-lg text-gray-700">Discover the invisible forces that move our world!</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Target className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-semibold">Physics Quest {currentClue + 1} of {treasures.length}</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-semibold">{score} points</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <Rocket className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-bold text-purple-800">Physics Challenge:</h3>
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Launch!
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mb-4 ${feedback.includes('Perfect') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {feedback}
            {feedback.includes('Perfect') && (
              <div className="mt-2 p-3 bg-white rounded-lg">
                <p className="font-semibold text-purple-700">🎁 Acquired: {treasures[currentClue].treasure}</p>
                <p className="text-sm text-gray-600 mt-1">{treasures[currentClue].funFact}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHint ? 'Hide Physics Hint' : 'Show Physics Hint'}
          </button>
          <div className="text-sm text-gray-600">
            Forces discovered: {foundTreasures.length}/{treasures.length}
          </div>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">🔬 <strong>Physics Hint:</strong> {treasures[currentClue].hint}</p>
          </div>
        )}
      </div>

      {foundTreasures.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Your Force Collection:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {foundTreasures.map((treasure) => (
              <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-purple-700">{treasure.treasure}</p>
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

export default MechanicsTreasureHunt;