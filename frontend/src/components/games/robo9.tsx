import React, { useState, useEffect } from 'react';
import { Bot, Trophy, MapPin, Zap, Search, RotateCcw } from 'lucide-react';

const RoboticsTreasureHunt = () => {
  const [gameData] = useState({
    treasures: [
      { id: 1, name: 'CPU Brain', clue: 'The thinking center of every robot', answer: 'PROCESSOR', category: 'Hardware', points: 15, found: false },
      { id: 2, name: 'Motion Motors', clue: 'Components that make robots move and rotate', answer: 'SERVOS', category: 'Actuators', points: 12, found: false },
      { id: 3, name: 'Robot Eyes', clue: 'Devices that help robots see and detect objects', answer: 'SENSORS', category: 'Input', points: 18, found: false },
      { id: 4, name: 'Power Source', clue: 'What gives robots the energy to operate', answer: 'BATTERY', category: 'Power', points: 10, found: false },
      { id: 5, name: 'Code Commands', clue: 'Instructions that tell robots what to do', answer: 'PROGRAM', category: 'Software', points: 20, found: false },
      { id: 6, name: 'Robot Hands', clue: 'End effectors that can grab and manipulate objects', answer: 'GRIPPER', category: 'Tools', points: 14, found: false },
      { id: 7, name: 'AI Intelligence', clue: 'Technology that makes robots smart and learning', answer: 'ALGORITHM', category: 'Software', points: 25, found: false },
      { id: 8, name: 'Communication Link', clue: 'How robots connect and share data wirelessly', answer: 'BLUETOOTH', category: 'Connectivity', points: 16, found: false }
    ],
    hints: [
      "Look for components in the HARDWARE category first!",
      "SOFTWARE treasures are usually the most valuable!",
      "INPUT devices help robots understand their environment",
      "ACTUATORS are all about movement and action",
      "Don't forget about POWER - robots need energy!"
    ]
  });

  const [treasures, setTreasures] = useState(gameData.treasures);
  const [currentClue, setCurrentClue] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameMessages, setGameMessages] = useState([]);

  const initializeGame = () => {
    setTreasures(gameData.treasures.map(t => ({ ...t, found: false })));
    setCurrentClue(0);
    setPlayerAnswer('');
    setScore(0);
    setGameComplete(false);
    setFoundTreasures([]);
    setHintIndex(0);
    setShowHint(false);
    setWrongAttempts(0);
    setGameMessages([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const addMessage = (text, type = 'info') => {
    const message = { id: Date.now(), text, type };
    setGameMessages(prev => [message, ...prev.slice(0, 2)]);
    setTimeout(() => {
      setGameMessages(prev => prev.filter(m => m.id !== message.id));
    }, 3000);
  };

  const handleSubmitAnswer = () => {
    if (!playerAnswer.trim()) {
      addMessage('Please enter an answer!', 'warning');
      return;
    }

    const currentTreasure = treasures[currentClue];
    const isCorrect = playerAnswer.toUpperCase().trim() === currentTreasure.answer;

    if (isCorrect) {
      const updatedTreasures = treasures.map(treasure =>
        treasure.id === currentTreasure.id
          ? { ...treasure, found: true }
          : treasure
      );
      
      setTreasures(updatedTreasures);
      setFoundTreasures(prev => [...prev, currentTreasure]);
      setScore(prev => prev + currentTreasure.points);
      setPlayerAnswer('');
      setWrongAttempts(0);
      
      addMessage(`🎉 Found ${currentTreasure.name}! +${currentTreasure.points} points`, 'success');

      // Check if game complete
      if (foundTreasures.length + 1 === treasures.length) {
        setGameComplete(true);
        addMessage('🏆 All treasures found! You are a Robotics Master!', 'success');
      } else {
        // Move to next unfound treasure
        const nextClueIndex = treasures.findIndex((t, index) => 
          index > currentClue && !updatedTreasures[index].found
        );
        if (nextClueIndex !== -1) {
          setCurrentClue(nextClueIndex);
        } else {
          // Wrap around to find first unfound treasure
          const firstUnfound = treasures.findIndex(t => !updatedTreasures[t.id - 1].found);
          setCurrentClue(firstUnfound);
        }
      }
    } else {
      setWrongAttempts(prev => prev + 1);
      addMessage('❌ Incorrect answer. Try again!', 'error');
      
      if (wrongAttempts >= 2) {
        setShowHint(true);
        addMessage('💡 Hint revealed! Check below.', 'info');
      }
    }
  };

  const skipTreasure = () => {
    const nextUnfoundIndex = treasures.findIndex((t, index) => 
      index !== currentClue && !t.found
    );
    
    if (nextUnfoundIndex !== -1) {
      setCurrentClue(nextUnfoundIndex);
      setPlayerAnswer('');
      setWrongAttempts(0);
      setShowHint(false);
      addMessage('⏭️ Skipped to next treasure', 'info');
    }
  };

  const getCurrentTreasure = () => treasures[currentClue];

  const getCategoryColor = (category) => {
    const colors = {
      'Hardware': 'bg-blue-100 text-blue-800',
      'Software': 'bg-green-100 text-green-800',
      'Input': 'bg-purple-100 text-purple-800',
      'Actuators': 'bg-red-100 text-red-800',
      'Power': 'bg-yellow-100 text-yellow-800',
      'Tools': 'bg-indigo-100 text-indigo-800',
      'Connectivity': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCompletionPercentage = () => {
    return Math.round((foundTreasures.length / treasures.length) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Robotics Treasure Hunt</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Score: {score}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Hunt
            </button>
          </div>
        </div>

        {/* Game Messages */}
        {gameMessages.length > 0 && (
          <div className="mb-6 space-y-2">
            {gameMessages.map(message => (
              <div
                key={message.id}
                className={`p-3 rounded-lg animate-pulse ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' :
                  message.type === 'error' ? 'bg-red-100 text-red-800' :
                  message.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Hunt Progress</span>
            <span className="text-sm text-gray-600">{foundTreasures.length} / {treasures.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {!gameComplete ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Treasure Hunt */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-800">Current Quest</h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Search className="w-5 h-5" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white ${getCategoryColor(getCurrentTreasure().category).replace('bg-', 'text-').replace('text-', 'text-')}`}>
                    {getCurrentTreasure().category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{getCurrentTreasure().name}</h3>
                <p className="text-lg opacity-90 mb-3">{getCurrentTreasure().clue}</p>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Worth {getCurrentTreasure().points} points</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={playerAnswer}
                    onChange={(e) => setPlayerAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    placeholder="Enter your answer..."
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleSubmitAnswer}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Answer
                  </button>
                  <button
                    onClick={skipTreasure}
                    disabled={foundTreasures.length === treasures.length - 1}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                  >
                    Skip Treasure
                  </button>
                </div>

                {(showHint || wrongAttempts >= 2) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium text-yellow-800">Hint</span>
                    </div>
                    <p className="text-yellow-700">{gameData.hints[hintIndex % gameData.hints.length]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Treasure Collection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Treasure Collection</h2>
            <div className="space-y-3">
              {treasures.map((treasure, index) => (
                <div
                  key={treasure.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    treasure.found
                      ? 'border-green-400 bg-green-50'
                      : index === currentClue
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {treasure.found ? '✅' : index === currentClue ? '🎯' : '🔍'} {treasure.name}
                      </h3>
                      <p className="text-sm text-gray-600">{treasure.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">{treasure.points}pts</div>
                      {treasure.found && <div className="text-xs text-green-600">Found!</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Hunt Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You've mastered robotics basics and found all {treasures.length} treasures!
          </p>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg mb-6">
            <div className="text-4xl font-bold mb-2">Final Score: {score}</div>
            <div className="text-lg opacity-90">Robotics Treasure Hunter Expert!</div>
          </div>
          <button
            onClick={initializeGame}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Start New Hunt
          </button>
        </div>
      )}
    </div>
  );
};

export default RoboticsTreasureHunt;