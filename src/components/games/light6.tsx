import React, { useState, useEffect } from 'react';
import { Lightbulb, Zap, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const LightElectricityPuzzle = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [circuits, setCircuits] = useState([]);

  const puzzles = [
    {
      id: 1,
      title: "Simple Circuit",
      description: "Connect the battery to the bulb to make it light up!",
      components: [
        { id: 'battery', type: 'battery', x: 1, y: 2, connected: [], emoji: '🔋' },
        { id: 'bulb', type: 'bulb', x: 5, y: 2, connected: [], emoji: '💡' }
      ],
      goal: "Make the bulb light up",
      solution: [['battery', 'bulb']],
      difficulty: 1
    },
    {
      id: 2,
      title: "Circuit with Switch",
      description: "Add a switch to control the light!",
      components: [
        { id: 'battery', type: 'battery', x: 1, y: 2, connected: [], emoji: '🔋' },
        { id: 'switch', type: 'switch', x: 3, y: 2, connected: [], emoji: '🔘', state: 'off' },
        { id: 'bulb', type: 'bulb', x: 5, y: 2, connected: [], emoji: '💡' }
      ],
      goal: "Connect all components and turn on the switch",
      solution: [['battery', 'switch'], ['switch', 'bulb']],
      difficulty: 2
    },
    {
      id: 3,
      title: "Two Bulbs Circuit",
      description: "Light up both bulbs using one battery!",
      components: [
        { id: 'battery', type: 'battery', x: 1, y: 2, connected: [], emoji: '🔋' },
        { id: 'bulb1', type: 'bulb', x: 3, y: 1, connected: [], emoji: '💡' },
        { id: 'bulb2', type: 'bulb', x: 3, y: 3, connected: [], emoji: '💡' }
      ],
      goal: "Light up both bulbs",
      solution: [['battery', 'bulb1'], ['battery', 'bulb2']],
      difficulty: 3
    }
  ];

  const shadowPuzzles = [
    {
      question: "What happens to shadows when you move closer to a light source?",
      options: ["Shadow gets smaller", "Shadow gets bigger", "Shadow disappears"],
      correct: "Shadow gets bigger",
      image: "🔦"
    },
    {
      question: "Which creates the sharpest shadow?",
      options: ["Flashlight", "Candle", "Sun"],
      correct: "Sun",
      image: "☀️"
    },
    {
      question: "What do you need to make a shadow?",
      options: ["Light and object", "Object only", "Light only"],
      correct: "Light and object", 
      image: "🌙"
    }
  ];

  const [currentCircuit, setCurrentCircuit] = useState(puzzles[0]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [connections, setConnections] = useState([]);
  const [showShadowGame, setShowShadowGame] = useState(false);
  const [shadowQuestion, setShadowQuestion] = useState(0);
  const [shadowScore, setShadowScore] = useState(0);

  useEffect(() => {
    resetCircuit();
  }, [currentPuzzle]);

  const resetCircuit = () => {
    const puzzle = puzzles[currentPuzzle];
    setCurrentCircuit({
      ...puzzle,
      components: puzzle.components.map(comp => ({
        ...comp,
        connected: [],
        state: comp.type === 'switch' ? 'off' : comp.state
      }))
    });
    setConnections([]);
    setSelectedComponent(null);
    setFeedback('');
  };

  const handleComponentClick = (component) => {
    if (!selectedComponent) {
      setSelectedComponent(component);
    } else if (selectedComponent.id === component.id) {
      setSelectedComponent(null);
    } else {
      // Make connection
      const newConnection = [selectedComponent.id, component.id];
      setConnections([...connections, newConnection]);
      
      // Update components
      const updatedComponents = currentCircuit.components.map(comp => {
        if (comp.id === selectedComponent.id) {
          return { ...comp, connected: [...comp.connected, component.id] };
        }
        if (comp.id === component.id) {
          return { ...comp, connected: [...comp.connected, selectedComponent.id] };
        }
        return comp;
      });
      
      setCurrentCircuit({ ...currentCircuit, components: updatedComponents });
      setSelectedComponent(null);
    }
  };

  const handleSwitchToggle = (switchId) => {
    const updatedComponents = currentCircuit.components.map(comp => {
      if (comp.id === switchId && comp.type === 'switch') {
        return { ...comp, state: comp.state === 'on' ? 'off' : 'on' };
      }
      return comp;
    });
    setCurrentCircuit({ ...currentCircuit, components: updatedComponents });
  };

  const checkCircuit = () => {
    const puzzle = puzzles[currentPuzzle];
    let isCorrect = true;
    
    // Check if all required connections are made
    for (let solution of puzzle.solution) {
      const [from, to] = solution;
      const hasConnection = connections.some(conn => 
        (conn[0] === from && conn[1] === to) || (conn[0] === to && conn[1] === from)
      );
      if (!hasConnection) {
        isCorrect = false;
        break;
      }
    }
    
    // Check if switches are on (if any)
    const switches = currentCircuit.components.filter(comp => comp.type === 'switch');
    for (let switchComp of switches) {
      if (switchComp.state !== 'on') {
        isCorrect = false;
        break;
      }
    }
    
    if (isCorrect) {
      setScore(score + (puzzle.difficulty * 20));
      setFeedback(`🎉 Excellent! The circuit works perfectly! +${puzzle.difficulty * 20} points`);
      
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
        } else {
          setShowShadowGame(true);
        }
      }, 2000);
    } else {
      setFeedback('❌ Circuit not complete! Check your connections and switches.');
    }
  };

  const handleShadowAnswer = (answer) => {
    const question = shadowPuzzles[shadowQuestion];
    if (answer === question.correct) {
      setShadowScore(shadowScore + 10);
      setFeedback('✅ Correct! Great knowledge about light and shadows!');
    } else {
      setFeedback(`❌ Not quite! The correct answer is: ${question.correct}`);
    }
    
    setTimeout(() => {
      if (shadowQuestion < shadowPuzzles.length - 1) {
        setShadowQuestion(shadowQuestion + 1);
        setFeedback('');
      } else {
        setGameComplete(true);
        setFeedback('🏆 Congratulations! You\'ve mastered light and electricity!');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setScore(0);
    setShadowScore(0);
    setShadowQuestion(0);
    setGameComplete(false);
    setShowShadowGame(false);
    setFeedback('');
    resetCircuit();
  };

  const isComponentLit = (component) => {
    if (component.type !== 'bulb') return false;
    
    // Check if there's a complete circuit from battery through any switches to this bulb
    const battery = currentCircuit.components.find(comp => comp.type === 'battery');
    if (!battery) return false;
    
    // Simple path finding - check if connected to battery directly or through active switches
    const visited = new Set();
    const queue = [battery.id];
    
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (visited.has(currentId)) continue;
      visited.add(currentId);
      
      if (currentId === component.id) return true;
      
      const currentComp = currentCircuit.components.find(comp => comp.id === currentId);
      if (currentComp) {
        for (let connectedId of currentComp.connected) {
          const connectedComp = currentCircuit.components.find(comp => comp.id === connectedId);
          if (connectedComp && (connectedComp.type !== 'switch' || connectedComp.state === 'on')) {
            queue.push(connectedId);
          }
        }
      }
    }
    
    return false;
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              ⚡ Electricity Master! 
            </h1>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl mb-4">You've conquered circuits and shadows!</p>
            <p className="text-xl text-gray-600 mb-8">
              Circuit Score: {score} + Shadow Score: {shadowScore} = Total: {score + shadowScore}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6 rounded-lg">
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-bold text-lg">Circuits Completed</h3>
                <p className="text-2xl">{puzzles.length}</p>
              </div>
              <div className="bg-gradient-to-b from-blue-200 to-blue-300 p-6 rounded-lg">
                <div className="text-4xl mb-2">🌟</div>
                <h3 className="font-bold text-lg">Shadow Questions</h3>
                <p className="text-2xl">{shadowPuzzles.length}</p>
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showShadowGame) {
    const question = shadowPuzzles[shadowQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-800 mb-2">
              🌙 Shadow Science Quiz
            </h1>
            <p className="text-gray-600">Question {shadowQuestion + 1} of {shadowPuzzles.length}</p>
            <div className="mt-2">
              <span className="font-semibold">Shadow Score: {shadowScore}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{question.image}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleShadowAnswer(option)}
                    className="p-4 bg-indigo-100 hover:bg-indigo-200 rounded-xl text-lg font-semibold transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className="mt-4 bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-lg font-semibold">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            ⚡ Circuit Builder Challenge
          </h1>
          <p className="text-gray-600">{currentCircuit.description}</p>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-1">
              <Zap className="text-yellow-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                Puzzle {currentPuzzle + 1}/{puzzles.length}
              </span>
            </div>
          </div>
        </div>

        {/* Circuit Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">{currentCircuit.title}</h2>
          <p className="text-center text-gray-600 mb-6">Goal: {currentCircuit.goal}</p>
          
          <div className="grid grid-cols-6 gap-4 max-w-2xl mx-auto mb-6">
            {Array.from({ length: 24 }, (_, i) => {
              const x = (i % 6) + 1;
              const y = Math.floor(i / 6) + 1;
              const component = currentCircuit.components.find(comp => comp.x === x && comp.y === y);
              
              return (
                <div
                  key={i}
                  className={`aspect-square border-2 rounded-lg flex items-center justify-center text-3xl cursor-pointer transition-all ${
                    component 
                      ? `${selectedComponent?.id === component.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'} hover:bg-gray-100`
                      : 'border-gray-200'
                  }`}
                  onClick={() => component && handleComponentClick(component)}
                >
                  {component && (
                    <div className="text-center">
                      <div className={`${component.type === 'bulb' && isComponentLit(component) ? 'filter brightness-150' : ''}`}>
                        {component.emoji}
                      </div>
                      {component.type === 'switch' && (
                        <div className="text-xs mt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSwitchToggle(component.id);
                            }}
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              component.state === 'on' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                          >
                            {component.state === 'on' ? 'ON' : 'OFF'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connections Display */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Connections:</h3>
            <div className="flex flex-wrap gap-2">
              {connections.map((conn, idx) => (
                <div key={idx} className="bg-green-100 px-3 py-1 rounded-full text-sm">
                  {conn[0]} ↔ {conn[1]}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={checkCircuit}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Test Circuit
            </button>
            <button
              onClick={resetCircuit}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <XCircle size={20} />
              Reset
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="bg-white p-4 rounded-xl shadow-lg text-center mb-4">
            <p className="text-lg font-semibold">{feedback}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">🧠 How to Play</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Making Connections:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Click one component, then click another to connect</li>
                <li>• Green connections show successful links</li>
                <li>• Bulbs light up when circuit is complete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Components:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>🔋 Battery - provides power</li>
                <li>💡 Bulb - lights up when powered</li>
                <li>🔘 Switch - controls the flow (click to toggle)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightElectricityPuzzle;