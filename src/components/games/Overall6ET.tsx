import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Key, Clock, Lightbulb, Zap, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  type: 'riddle' | 'matching' | 'circuit' | 'case-study';
  solved: boolean;
  unlocked: boolean;
  code?: string;
}

interface Overall6ETProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const STEMEscapeRoom: React.FC<Overall6ETProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, title: 'Simple Machines Mystery', type: 'riddle', solved: false, unlocked: true },
    { id: 2, title: 'Energy Source Cipher', type: 'matching', solved: false, unlocked: false, code: '7539' },
    { id: 3, title: 'Circuit Repair Lab', type: 'circuit', solved: false, unlocked: false },
    { id: 4, title: 'Engineering Solutions', type: 'case-study', solved: false, unlocked: false }
  ]);

  const [currentChallenge, setCurrentChallenge] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [escaped, setEscaped] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [hint, setHint] = useState<string>('');

  // Challenge 1: Simple Machines Riddle
  const [riddleAnswer, setRiddleAnswer] = useState<string>('');
  const riddleAnswers = ['pulley', 'lever', 'simple machine'];

  // Challenge 2: Energy Sources Matching
  const [energyMatches, setEnergyMatches] = useState<{[key: string]: string}>({});
  const energySources = [
    { name: 'Solar Panel', icon: '☀️', code: '7' },
    { name: 'Wind Turbine', icon: '💨', code: '5' },
    { name: 'Hydroelectric', icon: '💧', code: '3' },
    { name: 'Nuclear', icon: '⚛️', code: '9' }
  ];

  // Challenge 3: Circuit Components
  const [circuitComponents, setCircuitComponents] = useState<{[key: string]: boolean}>({
    battery: false,
    switch: false,
    wire1: false,
    wire2: false,
    bulb: false
  });

  // Challenge 4: Traffic Engineering
  const [engineeringSolution, setEngineeringSolution] = useState<string>('');

  useEffect(() => {
    if (gameStarted && !escaped) {
      const timer = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, escaped, startTime]);

  useEffect(() => {
    // Check if all challenges are solved
    if (challenges.every(c => c.solved) && !escaped) {
      setEscaped(true);
      // Call onComplete with a score based on completion
      if (onComplete) {
        onComplete(100); // Perfect score for completing all challenges
      }
    }

    // Unlock next challenges as previous ones are solved
    setChallenges(prev => {
      const updated = [...prev];
      for (let i = 1; i < updated.length; i++) {
        if (updated[i - 1].solved && !updated[i].unlocked) {
          updated[i].unlocked = true;
        }
      }
      return updated;
    });
  }, [challenges, escaped]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
  };

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const solveChallenge = (challengeId: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId ? { ...c, solved: true } : c
      )
    );
    setCurrentChallenge(null);
    setHint('');
  };

  const showHint = (challengeId: number) => {
    const hints = {
      1: "Think about tools that help you lift heavy things or pry things open with less force...",
      2: "Match each energy source with its corresponding icon to reveal the 4-digit code!",
      3: "A complete circuit needs power, control, and something to light up - all connected!",
      4: "Consider solutions that manage traffic flow, timing, or provide alternative routes..."
    };
    setHint(hints[challengeId as keyof typeof hints] || '');
  };

  const renderChallenge1 = () => (
    <div className="space-y-6 bg-gradient-to-b from-purple-900 to-indigo-900 p-8 rounded-xl text-white">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 text-yellow-300">🔧 Simple Machines Mystery 🔧</h3>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-yellow-400">
          <p className="text-xl italic mb-2">"Listen well, young engineer..."</p>
          <p className="text-2xl font-semibold text-yellow-200">
            "I help you lift heavy loads with less effort.<br/>
            I can multiply your force or change its direction.<br/>
            Found in flagpoles, construction sites, and gyms.<br/>
            <span className="text-yellow-300">Who am I?"</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={riddleAnswer}
          onChange={(e) => setRiddleAnswer(e.target.value)}
          placeholder="Enter your answer..."
          className="w-full p-4 text-lg rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (riddleAnswers.some(answer => 
                riddleAnswer.toLowerCase().includes(answer.toLowerCase())
              )) {
                solveChallenge(1);
              } else {
                setHint("Not quite right... Think about simple machines that help with lifting!");
              }
            }}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Answer
          </button>
          
          <button
            onClick={() => showHint(1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Hint
          </button>
        </div>
      </div>

      {hint && (
        <div className="bg-blue-800 bg-opacity-60 p-4 rounded-lg border border-blue-400">
          <p className="text-blue-200"><strong>Hint:</strong> {hint}</p>
        </div>
      )}
    </div>
  );

  const renderChallenge2 = () => {
    const getCode = () => {
      return energySources
        .filter(source => energyMatches[source.name] === source.icon)
        .map(source => source.code)
        .join('');
    };

    return (
      <div className="space-y-6 bg-gradient-to-b from-green-900 to-teal-900 p-8 rounded-xl text-white">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-green-300">⚡ Energy Source Cipher ⚡</h3>
          <p className="text-xl">Match each energy source with its correct icon to reveal the secret code!</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-green-300">Energy Sources:</h4>
            {energySources.map(source => (
              <div key={source.name} className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="font-semibold text-lg mb-2">{source.name}</div>
                <select
                  value={energyMatches[source.name] || ''}
                  onChange={(e) => setEnergyMatches(prev => ({ ...prev, [source.name]: e.target.value }))}
                  className="w-full p-2 rounded bg-black bg-opacity-30 text-white border border-white border-opacity-30"
                >
                  <option value="">Select Icon...</option>
                  {energySources.map(s => (
                    <option key={s.icon} value={s.icon} className="bg-gray-800">
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-green-300">Code Display:</h4>
            <div className="bg-black p-6 rounded-lg border-2 border-green-400">
              <div className="text-center">
                <div className="text-4xl font-mono text-green-300 mb-2">
                  {getCode().padEnd(4, '_')}
                </div>
                <p className="text-sm text-gray-300">4-digit code</p>
              </div>
            </div>
            
            <div className="bg-green-800 bg-opacity-60 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Progress:</h5>
              <div className="space-y-1">
                {energySources.map(source => (
                  <div key={source.name} className="flex items-center justify-between">
                    <span className="text-sm">{source.name}</span>
                    {energyMatches[source.name] === source.icon ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {getCode() === '7539' ? (
            <button
              onClick={() => solveChallenge(2)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              ✅ Code Correct - Unlock Next Challenge!
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed"
            >
              Complete all matches to proceed...
            </button>
          )}
          
          <button
            onClick={() => showHint(2)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Hint
          </button>
        </div>

        {hint && (
          <div className="bg-blue-800 bg-opacity-60 p-4 rounded-lg border border-blue-400">
            <p className="text-blue-200"><strong>Hint:</strong> {hint}</p>
          </div>
        )}
      </div>
    );
  };

  const renderChallenge3 = () => {
    const allConnected = Object.values(circuitComponents).every(connected => connected);
    
    return (
      <div className="space-y-6 bg-gradient-to-b from-red-900 to-orange-900 p-8 rounded-xl text-white">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-orange-300">🔧 Circuit Repair Lab 🔧</h3>
          <p className="text-xl">The circuit is broken! Click each component to repair the connections.</p>
          <div className="mt-4 p-4 bg-red-800 bg-opacity-50 rounded-lg border border-red-400">
            <AlertTriangle className="w-6 h-6 text-yellow-400 inline mr-2" />
            <span className="text-yellow-200">Power is disconnected - Fix all connections to restore the light!</span>
          </div>
        </div>

        <div className="bg-black p-8 rounded-lg border-2 border-orange-400">
          <div className="relative">
            <svg viewBox="0 0 400 200" className="w-full h-48">
              <rect
                x="20" y="80" width="40" height="20"
                fill={circuitComponents.battery ? "#10b981" : "#ef4444"}
                className="cursor-pointer transition-colors"
                onClick={() => setCircuitComponents(prev => ({ ...prev, battery: !prev.battery }))}
              />
              <text x="40" y="95" textAnchor="middle" fill="white" fontSize="12">⚡</text>
              
              <rect
                x="120" y="75" width="30" height="30"
                fill={circuitComponents.switch ? "#10b981" : "#ef4444"}
                className="cursor-pointer transition-colors"
                onClick={() => setCircuitComponents(prev => ({ ...prev, switch: !prev.switch }))}
              />
              <text x="135" y="95" textAnchor="middle" fill="white" fontSize="12">⏻</text>
              
              <circle
                cx="300" cy="90" r="20"
                fill={allConnected ? "#fbbf24" : "#374151"}
                className="cursor-pointer transition-colors"
                onClick={() => setCircuitComponents(prev => ({ ...prev, bulb: !prev.bulb }))}
              />
              <text x="300" y="95" textAnchor="middle" fill="white" fontSize="12">💡</text>
              
              <line
                x1="60" y1="90" x2="120" y2="90"
                stroke={circuitComponents.wire1 ? "#10b981" : "#ef4444"}
                strokeWidth="4"
                className="cursor-pointer"
                onClick={() => setCircuitComponents(prev => ({ ...prev, wire1: !prev.wire1 }))}
              />
              <line
                x1="150" y1="90" x2="280" y2="90"
                stroke={circuitComponents.wire2 ? "#10b981" : "#ef4444"}
                strokeWidth="4"
                className="cursor-pointer"
                onClick={() => setCircuitComponents(prev => ({ ...prev, wire2: !prev.wire2 }))}
              />
              
              <path
                d="M 40 100 L 40 150 L 300 150 L 300 110"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
          
          <div className="mt-4 grid grid-cols-5 gap-2 text-center text-sm">
            {Object.entries(circuitComponents).map(([component, connected]) => (
              <div
                key={component}
                className={`p-2 rounded ${connected ? 'bg-green-600' : 'bg-red-600'} cursor-pointer transition-colors`}
                onClick={() => setCircuitComponents(prev => ({ ...prev, [component]: !prev[component] }))}
              >
                <div className="font-semibold capitalize">{component.replace(/\d+$/, '')}</div>
                <div className="text-xs">{connected ? '✅ Fixed' : '❌ Broken'}</div>
              </div>
            ))}
          </div>
        </div>

        {allConnected && (
          <div className="bg-yellow-500 p-4 rounded-lg text-center animate-pulse">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-900" />
            <p className="text-yellow-900 font-bold text-lg">💡 THE LIGHT IS ON! CIRCUIT REPAIRED! 💡</p>
          </div>
        )}

        <div className="flex gap-4">
          {allConnected ? (
            <button
              onClick={() => solveChallenge(3)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              ✅ Circuit Fixed - Continue to Next Challenge!
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed"
            >
              Repair all connections to proceed...
            </button>
          )}
          
          <button
            onClick={() => showHint(3)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Hint
          </button>
        </div>

        {hint && (
          <div className="bg-blue-800 bg-opacity-60 p-4 rounded-lg border border-blue-400">
            <p className="text-blue-200"><strong>Hint:</strong> {hint}</p>
          </div>
        )}
      </div>
    );
  };

  const renderChallenge4 = () => (
    <div className="space-y-6 bg-gradient-to-b from-blue-900 to-purple-900 p-8 rounded-xl text-white">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 text-blue-300">🏗️ Engineering Solutions 🏗️</h3>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-blue-400">
          <h4 className="text-xl font-semibold text-blue-200 mb-4">Case Study:</h4>
          <p className="text-lg mb-4">
            "The city of Tech Valley is experiencing severe traffic congestion during rush hours. 
            Citizens are spending 2+ hours daily in traffic, leading to increased pollution, 
            stress, and economic losses."
          </p>
          <p className="text-xl font-semibold text-yellow-300">
            How can engineers reduce traffic jams?
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-lg font-semibold text-blue-200">Choose the BEST engineering solution:</p>
        
        {[
          { id: 'signals', text: 'Smart Traffic Light Systems with AI optimization', correct: true },
          { id: 'roads', text: 'Build more roads and highways', correct: false },
          { id: 'nothing', text: 'Do nothing and let people adapt', correct: false },
          { id: 'ban', text: 'Ban all cars from the city', correct: false }
        ].map(option => (
          <label
            key={option.id}
            className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              engineeringSolution === option.id
                ? 'bg-blue-600 border-blue-400 text-white'
                : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-opacity-30'
            }`}
          >
            <input
              type="radio"
              name="solution"
              value={option.id}
              checked={engineeringSolution === option.id}
              onChange={(e) => setEngineeringSolution(e.target.value)}
              className="sr-only"
            />
            <span className="text-lg">{option.text}</span>
          </label>
        ))}
      </div>

      <div className="bg-blue-800 bg-opacity-60 p-4 rounded-lg">
        <h5 className="font-semibold text-blue-200 mb-2">💡 Think about:</h5>
        <ul className="text-sm text-blue-100 space-y-1">
          <li>• Which solution uses technology to optimize existing infrastructure?</li>
          <li>• Which approach is sustainable and cost-effective?</li>
          <li>• Which solution addresses the root cause rather than symptoms?</li>
        </ul>
      </div>

      <div className="flex gap-4">
        {engineeringSolution === 'signals' ? (
          <button
            onClick={() => solveChallenge(4)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ✅ Correct Solution - ESCAPE UNLOCKED!
          </button>
        ) : engineeringSolution ? (
          <button
            disabled
            className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-lg opacity-75"
          >
            ❌ Not the best solution - Try again!
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed"
          >
            Select a solution to proceed...
          </button>
        )}
        
        <button
          onClick={() => showHint(4)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <Eye className="w-5 h-5" />
          Hint
        </button>
      </div>

      {hint && (
        <div className="bg-blue-800 bg-opacity-60 p-4 rounded-lg border border-blue-400">
          <p className="text-blue-200"><strong>Hint:</strong> {hint}</p>
        </div>
      )}
    </div>
  );

  if (escaped) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen">
        <div className="text-center py-12">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CONGRATULATIONS!</h1>
          <h2 className="text-3xl font-bold text-green-600 mb-6">YOU ESCAPED THE STEM LAB!</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-semibold mb-4">🏆 Escape Stats:</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Time Taken:</span>
                <span className="font-bold text-blue-600">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex justify-between">
                <span>Challenges Solved:</span>
                <span className="font-bold text-green-600">4/4</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-bold text-yellow-600">100%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🧠 What You Learned:</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold">🔧 Simple Machines</h4>
                <p className="text-sm">Pulleys and levers help us work smarter, not harder!</p>
              </div>
              <div>
                <h4 className="font-semibold">⚡ Energy Sources</h4>
                <p className="text-sm">Renewable energy powers our sustainable future!</p>
              </div>
              <div>
                <h4 className="font-semibold">🔌 Electric Circuits</h4>
                <p className="text-sm">Complete circuits make electricity flow safely!</p>
              </div>
              <div>
                <h4 className="font-semibold">🏗️ Engineering</h4>
                <p className="text-sm">Smart solutions solve real-world problems!</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onExit ? onExit() : window.location.reload()}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            {onExit ? "🏠 Back to Dashboard" : "🔄 Try Another Escape Room"}
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-purple-900 min-h-screen text-white">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
            🔬 STEM ESCAPE ROOM 🔬
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            You're trapped in the STEM laboratory! Solve 4 challenges to escape before time runs out!
          </p>
          
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-red-500 mb-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              EMERGENCY PROTOCOL ACTIVATED
            </h2>
            <p className="text-lg text-red-200">
              The laboratory doors have sealed shut! You must prove your STEM knowledge to unlock the exit.
              Complete all 4 challenges in the correct sequence to escape!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {challenges.map((challenge, index) => (
              <div key={challenge.id} className="bg-white bg-opacity-10 p-6 rounded-lg border border-gray-600">
                <div className="flex items-center mb-3">
                  <Lock className="w-6 h-6 text-red-400 mr-2" />
                  <h3 className="text-lg font-semibold">Challenge {index + 1}</h3>
                </div>
                <h4 className="text-xl font-bold text-blue-300 mb-2">{challenge.title}</h4>
                <p className="text-gray-300 text-sm">
                  {challenge.type === 'riddle' && "Solve the mysterious riddle"}
                  {challenge.type === 'matching' && "Crack the energy source code"}
                  {challenge.type === 'circuit' && "Repair the broken circuit"}
                  {challenge.type === 'case-study' && "Choose the right engineering solution"}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-900 bg-opacity-50 p-6 rounded-lg border border-yellow-500 mb-8">
            <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Escape Instructions:
            </h3>
            <ul className="text-left text-yellow-100 space-y-2">
              <li>• Challenges must be completed in order</li>
              <li>• Each solved challenge unlocks the next</li>
              <li>• Use hints if you get stuck</li>
              <li>• All 4 challenges must be solved to escape</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:from-red-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🚨 BEGIN ESCAPE SEQUENCE 🚨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen text-white">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
            🔬 STEM ESCAPE ROOM
          </h1>
          <div className="flex items-center gap-4 text-lg">
            <Clock className="w-5 h-5" />
            <span>Time: {formatTime(timeElapsed)}</span>
          </div>
        </div>

        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Escape Progress:</span>
            <span className="text-sm">{challenges.filter(c => c.solved).length}/4 Challenges Complete</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`p-3 rounded text-center cursor-pointer transition-all ${
                  challenge.solved
                    ? 'bg-green-500 text-white'
                    : challenge.unlocked
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-600 text-gray-300'
                }`}
                onClick={() => challenge.unlocked && !challenge.solved && setCurrentChallenge(challenge.id)}
              >
                <div className="flex items-center justify-center mb-1">
                  {challenge.solved ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : challenge.unlocked ? (
                    <Unlock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
                <div className="text-xs font-semibold">Challenge {index + 1}</div>
                <div className="text-xs">{challenge.title.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!currentChallenge && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Select a Challenge to Begin:</h2>
          <div className="grid grid-cols-2 gap-4">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  challenge.solved
                    ? 'bg-green-900 bg-opacity-50 border-green-400 text-green-200'
                    : challenge.unlocked
                    ? 'bg-blue-900 bg-opacity-50 border-blue-400 hover:border-blue-300 text-white'
                    : 'bg-gray-900 bg-opacity-50 border-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => challenge.unlocked && !challenge.solved && setCurrentChallenge(challenge.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">Challenge {index + 1}</h3>
                  {challenge.solved ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : challenge.unlocked ? (
                    <Unlock className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <h4 className="text-lg font-semibold mb-2">{challenge.title}</h4>
                <p className="text-sm opacity-80">
                  {challenge.type === 'riddle' && "Solve the mysterious riddle about simple machines"}
                  {challenge.type === 'matching' && "Match energy sources to crack the cipher code"}
                  {challenge.type === 'circuit' && "Repair the broken electrical circuit"}
                  {challenge.type === 'case-study' && "Find the best engineering solution"}
                </p>
                {challenge.solved && (
                  <div className="mt-3 text-green-300 font-semibold text-sm">
                    ✅ COMPLETED
                  </div>
                )}
                {!challenge.unlocked && (
                  <div className="mt-3 text-gray-400 text-sm">
                    🔒 Complete previous challenges to unlock
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentChallenge && (
        <div className="mb-8">
          <div className="mb-4">
            <button
              onClick={() => setCurrentChallenge(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Challenge Selection
            </button>
          </div>

          {currentChallenge === 1 && renderChallenge1()}
          {currentChallenge === 2 && renderChallenge2()}
          {currentChallenge === 3 && renderChallenge3()}
          {currentChallenge === 4 && renderChallenge4()}
        </div>
      )}
    </div>
  );
};

export default STEMEscapeRoom;