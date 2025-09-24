import React, { useState, useEffect } from 'react';
import { Lightbulb, Trophy, MapPin, Users, Target, RotateCcw, Compass } from 'lucide-react';

const DesignThinkingHunt = () => {
  const [gameData] = useState({
    treasures: [
      { id: 1, name: 'User Understanding', clue: 'The first step where you learn about people\'s needs and problems', answer: 'EMPATHIZE', category: 'Process', points: 20, found: false, icon: '❤️', phase: 1 },
      { id: 2, name: 'Problem Definition', clue: 'Clearly stating the challenge you want to solve', answer: 'DEFINE', category: 'Process', points: 18, found: false, icon: '🎯', phase: 2 },
      { id: 3, name: 'Creative Solutions', clue: 'Brainstorming many possible ideas without judgment', answer: 'IDEATE', category: 'Process', points: 22, found: false, icon: '💡', phase: 3 },
      { id: 4, name: 'Build Models', clue: 'Creating simple versions to test your ideas quickly', answer: 'PROTOTYPE', category: 'Process', points: 24, found: false, icon: '🔧', phase: 4 },
      { id: 5, name: 'User Feedback', clue: 'Getting real people to try your solution and give opinions', answer: 'TEST', category: 'Process', points: 19, found: false, icon: '🧪', phase: 5 },
      { id: 6, name: 'Human Focus', clue: 'Design approach that puts people\'s needs at the center', answer: 'USER-CENTERED', category: 'Mindset', points: 25, found: false, icon: '👥', phase: 0 },
      { id: 7, name: 'Multiple Ideas', clue: 'Generating many different solutions before choosing one', answer: 'BRAINSTORM', category: 'Method', points: 15, found: false, icon: '🌪️', phase: 0 },
      { id: 8, name: 'Learn from Failure', clue: 'Using mistakes and setbacks as learning opportunities', answer: 'ITERATE', category: 'Mindset', points: 21, found: false, icon: '🔄', phase: 0 }
    ],
    designChallenges: [
      { name: 'Empathy Station', description: 'Understanding users through interviews and observation', tools: ['👂', '👁️', '📝'] },
      { name: 'Definition Workshop', description: 'Creating clear problem statements and user personas', tools: ['🎯', '👤', '📋'] },
      { name: 'Ideation Lab', description: 'Brainstorming creative solutions with diverse teams', tools: ['💡', '🌟', '🎨'] },
      { name: 'Prototype Studio', description: 'Building and crafting testable versions of ideas', tools: ['🔧', '📦', '✂️'] },
      { name: 'Testing Ground', description: 'Gathering user feedback and refining solutions', tools: ['🧪', '📊', '🔍'] },
      { name: 'Innovation Hub', description: 'Collaborative space for creative problem solving', tools: ['🚀', '🤝', '💻'] },
      { name: 'Design Studio', description: 'Creative workspace for visual thinking and sketching', tools: ['✏️', '📐', '🖼️'] },
      { name: 'Future Lab', description: 'Exploring emerging trends and technologies', tools: ['🔮', '⚡', '🌐'] }
    ],
    designPrinciples: [
      "Design thinking puts human needs first in every solution!",
      "The best ideas come from diverse teams working together.",
      "Failing fast and learning quickly leads to better solutions.",
      "Prototypes help you test ideas before investing too much.",
      "Empathy with users is the foundation of great design.",
      "Defining the right problem is more important than perfect solutions.",
      "Iteration and refinement make good ideas even better.",
      "Creative constraints often spark the most innovative solutions!"
    ]
  });

  const [treasures, setTreasures] = useState(gameData.treasures);
  const [currentClue, setCurrentClue] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [creativityPoints, setCreativityPoints] = useState(100);
  const [showDesignPrinciple, setShowDesignPrinciple] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameMessages, setGameMessages] = useState([]);
  const [designPhase, setDesignPhase] = useState(1);

  const initializeGame = () => {
    setTreasures(gameData.treasures.map(t => ({ ...t, found: false })));
    setCurrentClue(0);
    setPlayerAnswer('');
    setScore(0);
    setGameComplete(false);
    setFoundTreasures([]);
    setCurrentChallenge(0);
    setCreativityPoints(100);
    setShowDesignPrinciple(false);
    setWrongAttempts(0);
    setGameMessages([]);
    setDesignPhase(1);
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
    const userAnswer = playerAnswer.toUpperCase().replace(/\s+/g, '').replace(/-/g, '');
    const correctAnswer = currentTreasure.answer.toUpperCase().replace(/\s+/g, '').replace(/-/g, '');
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      const updatedTreasures = treasures.map(treasure =>
        treasure.id === currentTreasure.id
          ? { ...treasure, found: true }
          : treasure
      );
      
      setTreasures(updatedTreasures);
      setFoundTreasures(prev => [...prev, currentTreasure]);
      setScore(prev => prev + currentTreasure.points);
      setCreativityPoints(prev => Math.min(100, prev + 20));
      setPlayerAnswer('');
      setWrongAttempts(0);
      
      addMessage(`🎉 Found ${currentTreasure.name}! +${currentTreasure.points} points`, 'success');
      setShowDesignPrinciple(true);

      // Advance design phase if it's a process treasure
      if (currentTreasure.phase > 0 && currentTreasure.phase === designPhase) {
        setDesignPhase(prev => prev + 1);
        addMessage(`🚀 Advanced to Design Phase ${currentTreasure.phase + 1}!`, 'success');
      }

      // Check if game complete
      if (foundTreasures.length + 1 === treasures.length) {
        setGameComplete(true);
        addMessage('🏆 All design treasures found! You are a Design Thinking Master!', 'success');
      } else {
        // Move to next challenge and unfound treasure
        setCurrentChallenge(prev => (prev + 1) % gameData.designChallenges.length);
        setTimeout(() => {
          const nextClueIndex = treasures.findIndex((t, index) => 
            index > currentClue && !updatedTreasures[index].found
          );
          if (nextClueIndex !== -1) {
            setCurrentClue(nextClueIndex);
          } else {
            const firstUnfound = treasures.findIndex(t => !updatedTreasures[t.id - 1].found);
            setCurrentClue(firstUnfound);
          }
          setShowDesignPrinciple(false);
        }, 3000);
      }
    } else {
      setWrongAttempts(prev => prev + 1);
      setCreativityPoints(prev => Math.max(0, prev - 15));
      addMessage('❌ Not quite right! Keep thinking creatively...', 'error');
      
      if (wrongAttempts >= 2) {
        addMessage('💭 Think about the design process step or mindset!', 'info');
      }
    }
  };

  const useCreativityBoost = () => {
    if (creativityPoints >= 30) {
      setCreativityPoints(prev => prev - 30);
      const currentTreasure = treasures[currentClue];
      const hint = currentTreasure.answer.length > 4 ? 
        currentTreasure.answer.slice(0, 3) : 
        currentTreasure.answer.slice(0, 2);
      setPlayerAnswer(hint);
      addMessage(`✨ Creativity boost used! Hint: ${hint}`, 'info');
    }
  };

  const skipToPhase = (phase) => {
    const phaseUnfound = treasures.findIndex(t => t.phase === phase && !t.found);
    if (phaseUnfound !== -1 && creativityPoints >= 25) {
      setCurrentClue(phaseUnfound);
      setCreativityPoints(prev => prev - 25);
      addMessage(`🎯 Jumped to ${treasures[phaseUnfound].name}!`, 'info');
    }
  };

  const getCurrentTreasure = () => treasures[currentClue];
  const getCurrentChallenge = () => gameData.designChallenges[currentChallenge];

  const getCategoryColor = (category) => {
    const colors = {
      'Process': 'bg-blue-100 text-blue-800',
      'Mindset': 'bg-green-100 text-green-800',
      'Method': 'bg-purple-100 text-purple-800',
      'Tool': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getPhaseColor = (phase) => {
    const colors = ['bg-gray-100', 'bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100'];
    return colors[phase] || 'bg-gray-100';
  };

  const getCreativityColor = () => {
    if (creativityPoints > 60) return 'bg-green-500';
    if (creativityPoints > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPhaseNames = () => ['Setup', 'Empathize', 'Define', 'Ideate', 'Prototype', 'Test'];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Design Thinking Treasure Hunt</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-600">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-100 px-3 py-2 rounded-lg">
              <Users className="w-5 h-5 text-pink-600" />
              <span className="font-semibold text-pink-600">Phase: {getPhaseNames()[designPhase]}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Hunt
            </button>
          </div>
        </div>

        {/* Creativity Points */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Creativity Level</span>
            <span className="text-sm text-gray-600">{creativityPoints}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getCreativityColor()}`}
              style={{ width: `${creativityPoints}%` }}
            />
          </div>
        </div>

        {/* Design Process Tracker */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Design Process Journey</h3>
          <div className="flex gap-2 flex-wrap">
            {getPhaseNames().slice(1).map((phase, index) => {
              const phaseNumber = index + 1;
              const isActive = designPhase === phaseNumber;
              const isComplete = designPhase > phaseNumber;
              const phaseTreasure = treasures.find(t => t.phase === phaseNumber);
              
              return (
                <button
                  key={phaseNumber}
                  onClick={() => skipToPhase(phaseNumber)}
                  disabled={creativityPoints < 25}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isComplete ? 'bg-green-100 text-green-800' :
                    isActive ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  } ${creativityPoints >= 25 ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  {isComplete ? '✅' : isActive ? '🎯' : '⏳'} {phase}
                </button>
              );
            })}
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

        {/* Current Challenge */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5" />
              <span className="font-semibold">Current Challenge:</span>
            </div>
            <div className="flex gap-2">
              {getCurrentChallenge().tools.map((tool, idx) => (
                <span key={idx} className="text-xl">{tool}</span>
              ))}
            </div>
          </div>
          <h3 className="text-xl font-bold">{getCurrentChallenge().name}</h3>
          <p className="opacity-90">{getCurrentChallenge().description}</p>
        </div>
      </div>

      {!gameComplete ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Hunt Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {!showDesignPrinciple ? (
              <div className="text-center">
                <div className="text-6xl mb-4">{getCurrentTreasure().icon}</div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(getCurrentTreasure().category)}`}>
                    {getCurrentTreasure().category}
                  </span>
                  {getCurrentTreasure().phase > 0 && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPhaseColor(getCurrentTreasure().phase)} text-gray-800`}>
                      Phase {getCurrentTreasure().phase}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{getCurrentTreasure().name}</h2>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Design Challenge</span>
                  </div>
                  <p className="text-lg mb-3">{getCurrentTreasure().clue}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">Worth {getCurrentTreasure().points} points</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={playerAnswer}
                    onChange={(e) => setPlayerAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    placeholder="Enter your design thinking answer..."
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />

                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={handleSubmitAnswer}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Submit Answer
                    </button>
                    <button
                      onClick={useCreativityBoost}
                      disabled={creativityPoints < 30}
                      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:opacity-50"
                    >
                      Creativity Boost (30%)
                    </button>
                  </div>

                  {wrongAttempts >= 2 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-800">Design Hint</span>
                      </div>
                      <p className="text-purple-700">Think about the design thinking process or mindset described!</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Design Principle Unlocked!</h2>
                <div className="bg-purple-100 p-6 rounded-lg">
                  <p className="text-purple-800 text-lg">
                    {gameData.designPrinciples[foundTreasures.length - 1]}
                  </p>
                </div>
                <p className="text-gray-600 mt-4">Moving to next design challenge...</p>
              </div>
            )}
          </div>

          {/* Design Collection & Stats */}
          <div className="space-y-6">
            {/* Found Treasures */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Design Collection</h2>
              <div className="space-y-3">
                {treasures.map((treasure, index) => (
                  <div
                    key={treasure.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      treasure.found
                        ? 'border-green-400 bg-green-50'
                        : index === currentClue
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{treasure.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {treasure.found ? '✅' : index === currentClue ? '🎯' : '🔍'} {treasure.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {treasure.category} {treasure.phase > 0 && `• Phase ${treasure.phase}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600 text-sm">{treasure.points}pts</div>
                        {treasure.found && <div className="text-xs text-green-600">Found!</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Design Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Treasures Found:</span>
                  <span className="font-bold text-green-600">{foundTreasures.length}/{treasures.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Current Score:</span>
                  <span className="font-bold text-purple-600">{score} points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Design Phase:</span>
                  <span className="font-bold text-blue-600">{getPhaseNames()[designPhase]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Creativity:</span>
                  <span className={`font-bold ${creativityPoints > 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {creativityPoints}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <Trophy className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Design Hunt Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You've mastered design thinking and found all {treasures.length} design treasures!
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg mb-6">
            <div className="text-4xl font-bold mb-2">Final Score: {score}</div>
            <div className="text-lg opacity-90">Design Thinking Master!</div>
            <div className="text-sm mt-2">You can solve any problem with human-centered design! 💡</div>
          </div>
          <button
            onClick={initializeGame}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Start New Design Hunt
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignThinkingHunt;