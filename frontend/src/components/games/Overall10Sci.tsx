import React, { useState } from 'react';
import { Lock, Unlock, ArrowLeft, CheckCircle, XCircle, Zap, Leaf, Eye, Heart, Dna, Cpu, Atom, Droplets } from 'lucide-react';

interface Overall10SciProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const ScienceEscapeRoom: React.FC<Overall10SciProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [currentRoom, setCurrentRoom] = useState('main');
  const [unlockedRooms, setUnlockedRooms] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);

  const rooms = {
    main: {
      title: 'Science Laboratory - Main Room',
      description: 'Welcome to the Science Escape Room! Solve all 10 puzzles to escape the laboratory.',
      icon: Atom
    },
    room1: {
      title: 'Chemical Reactions Lab',
      description: 'Balance the chemical equation to unlock the door.',
      icon: Atom,
      puzzle: 'chemical'
    },
    room2: {
      title: 'Acids & Bases Cabinet',
      description: 'Choose the correct indicator color to open the cabinet.',
      icon: Droplets,
      puzzle: 'acids'
    },
    room3: {
      title: 'Metals & Non-Metals Scanner',
      description: 'Select materials that conduct electricity.',
      icon: Zap,
      puzzle: 'conductors'
    },
    room4: {
      title: 'Carbon Compounds Lab',
      description: 'Arrange atoms to form the correct molecular formula.',
      icon: Cpu,
      puzzle: 'molecules'
    },
    room5: {
      title: 'Life Processes Ward',
      description: 'Match organs with their biological processes.',
      icon: Heart,
      puzzle: 'organs'
    },
    room6: {
      title: 'Control & Coordination Center',
      description: 'Classify actions as reflex or hormone-based.',
      icon: Cpu,
      puzzle: 'responses'
    },
    room7: {
      title: 'Heredity & Evolution Lab',
      description: 'Complete the Punnett square to unlock.',
      icon: Dna,
      puzzle: 'genetics'
    },
    room8: {
      title: 'Optics Laboratory',
      description: 'Direct the laser to the target using mirrors.',
      icon: Eye,
      puzzle: 'optics'
    },
    room9: {
      title: 'Electricity & Magnetism Lab',
      description: 'Complete the circuit to light the bulb.',
      icon: Zap,
      puzzle: 'circuit'
    },
    room10: {
      title: 'Environmental Station',
      description: 'Sort items correctly to unlock the exit.',
      icon: Leaf,
      puzzle: 'environment'
    }
  };

  const ChemicalReactionPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [selected, setSelected] = useState('');
    const equation = "2H₂ + O₂ → ?";
    const options = ['H₂O', '2H₂O', 'H₂O₂', '2H₂O₂'];
    
    const handleSubmit = () => {
      if (selected === '2H₂O') {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Balance the Chemical Equation</h3>
        <div className="text-2xl mb-6 text-center font-mono">{equation}</div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {options.map((option) => (
            <button
              key={option}
              className={`p-3 rounded border-2 ${selected === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      </div>
    );
  };

  const AcidsBasesPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [selected, setSelected] = useState('');
    const question = "What color does phenolphthalein turn in a basic solution?";
    const options = ['Red', 'Pink', 'Blue', 'Green'];
    
    const handleSubmit = () => {
      if (selected === 'Pink') {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-purple-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Chemical Indicators</h3>
        <div className="mb-6">
          <p className="text-lg mb-4">{question}</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="p-2 bg-red-100 rounded">🧪 Vinegar (Acidic)</div>
            <div className="p-2 bg-blue-100 rounded">🧼 Soap (Basic)</div>
            <div className="p-2 bg-yellow-100 rounded">🥤 Baking Soda (Basic)</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {options.map((option) => (
            <button
              key={option}
              className={`p-3 rounded border-2 ${selected === option ? 'border-purple-500 bg-purple-100' : 'border-gray-300'}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full bg-purple-600 text-white p-3 rounded disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      </div>
    );
  };

  const ConductorsPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [selected, setSelected] = useState(new Set<string>());
    const materials = ['Copper wire', 'Rubber', 'Aluminum foil', 'Wood', 'Iron nail', 'Plastic'];
    const conductors = new Set(['Copper wire', 'Aluminum foil', 'Iron nail']);
    
    const toggleSelection = (material: string) => {
      const newSelected = new Set(selected);
      if (newSelected.has(material)) {
        newSelected.delete(material);
      } else {
        newSelected.add(material);
      }
      setSelected(newSelected);
    };

    const handleSubmit = () => {
      if (selected.size === conductors.size && 
          [...selected].every(item => conductors.has(item))) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Select All Electrical Conductors</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {materials.map((material) => (
            <button
              key={material}
              className={`p-3 rounded border-2 ${selected.has(material) ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300'}`}
              onClick={() => toggleSelection(material)}
            >
              {selected.has(material) ? <CheckCircle className="inline mr-2 w-4 h-4" /> : <XCircle className="inline mr-2 w-4 h-4" />}
              {material}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-600 text-white p-3 rounded"
        >
          Submit Selection
        </button>
      </div>
    );
  };

  const MoleculesPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [formula, setFormula] = useState('');
    const target = 'CH₄';
    const atoms = ['C', 'H', 'O', '₁', '₂', '₃', '₄', '₅', '₆'];
    
    const addAtom = (atom) => {
      setFormula(formula + atom);
    };

    const clearFormula = () => {
      setFormula('');
    };

    const handleSubmit = () => {
      if (formula === target) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Build Methane Molecule</h3>
        <div className="mb-4">
          <p className="mb-2">Create the molecular formula for methane (1 Carbon, 4 Hydrogen):</p>
          <div className="text-2xl font-mono p-3 bg-white border-2 rounded min-h-[50px]">
            {formula || 'Click atoms below...'}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {atoms.map((atom) => (
            <button
              key={atom}
              className="p-3 bg-white border-2 rounded hover:bg-green-100"
              onClick={() => addAtom(atom)}
            >
              {atom}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearFormula}
            className="flex-1 bg-gray-500 text-white p-3 rounded"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white p-3 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const OrgansPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [matches, setMatches] = useState({});
    const organs = ['Heart', 'Lungs', 'Stomach', 'Kidneys'];
    const processes = ['Circulation', 'Respiration', 'Digestion', 'Excretion'];
    const correctMatches = {
      'Heart': 'Circulation',
      'Lungs': 'Respiration',
      'Stomach': 'Digestion',
      'Kidneys': 'Excretion'
    };

    const handleMatch = (organ: string, process: string) => {
      setMatches({...matches, [organ]: process});
    };

    const handleSubmit = () => {
      const isCorrect = organs.every(organ => matches[organ] === correctMatches[organ]);
      if (isCorrect) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Match Organs to Life Processes</h3>
        <div className="space-y-3 mb-4">
          {organs.map((organ) => (
            <div key={organ} className="flex items-center gap-4">
              <div className="w-20 font-semibold">{organ}</div>
              <select
                value={matches[organ] || ''}
                onChange={(e) => handleMatch(organ, e.target.value)}
                className="flex-1 p-2 border rounded"
              >
                <option value="">Select process...</option>
                {processes.map(process => (
                  <option key={process} value={process}>{process}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={organs.some(organ => !matches[organ])}
          className="w-full bg-red-600 text-white p-3 rounded disabled:bg-gray-400"
        >
          Submit Matches
        </button>
      </div>
    );
  };

  const ResponsesPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [classifications, setClassifications] = useState({});
    const actions = [
      'Knee-jerk when hit',
      'Growth during puberty',
      'Pulling hand from hot stove',
      'Increased heart rate when scared'
    ];
    const correctAnswers = {
      'Knee-jerk when hit': 'Reflex',
      'Growth during puberty': 'Hormone',
      'Pulling hand from hot stove': 'Reflex',
      'Increased heart rate when scared': 'Hormone'
    };

    const classify = (action: string, type: string) => {
      setClassifications({...classifications, [action]: type});
    };

    const handleSubmit = () => {
      const isCorrect = actions.every(action => classifications[action] === correctAnswers[action]);
      if (isCorrect) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Classify Actions: Reflex vs Hormone</h3>
        <div className="space-y-3 mb-4">
          {actions.map((action) => (
            <div key={action} className="p-3 border rounded">
              <div className="mb-2 font-medium">{action}</div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded ${classifications[action] === 'Reflex' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => classify(action, 'Reflex')}
                >
                  Reflex
                </button>
                <button
                  className={`px-4 py-2 rounded ${classifications[action] === 'Hormone' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => classify(action, 'Hormone')}
                >
                  Hormone
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={actions.some(action => !classifications[action])}
          className="w-full bg-indigo-600 text-white p-3 rounded disabled:bg-gray-400"
        >
          Submit Classification
        </button>
      </div>
    );
  };

  const GeneticsPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [offspring, setOffspring] = useState(['', '', '', '']);
    const correct = ['Tt', 'Tt', 'tt', 'tt'];
    
    const updateOffspring = (index: number, value: string) => {
      const newOffspring = [...offspring];
      newOffspring[index] = value;
      setOffspring(newOffspring);
    };

    const handleSubmit = () => {
      const isCorrect = offspring.every((val, idx) => val === correct[idx]);
      if (isCorrect) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-pink-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Complete the Punnett Square</h3>
        <div className="mb-4">
          <p>Cross: Tt × tt (T = tall, t = short)</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4 max-w-xs mx-auto">
          <div></div>
          <div className="text-center font-bold">T</div>
          <div className="text-center font-bold">t</div>
          <div className="font-bold">t</div>
          <input
            className="p-2 border rounded text-center"
            value={offspring[0]}
            onChange={(e) => updateOffspring(0, e.target.value)}
            placeholder="?"
          />
          <input
            className="p-2 border rounded text-center"
            value={offspring[1]}
            onChange={(e) => updateOffspring(1, e.target.value)}
            placeholder="?"
          />
          <div className="font-bold">t</div>
          <input
            className="p-2 border rounded text-center"
            value={offspring[2]}
            onChange={(e) => updateOffspring(2, e.target.value)}
            placeholder="?"
          />
          <input
            className="p-2 border rounded text-center"
            value={offspring[3]}
            onChange={(e) => updateOffspring(3, e.target.value)}
            placeholder="?"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white p-3 rounded"
        >
          Submit Punnett Square
        </button>
      </div>
    );
  };

  const OpticsPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [selectedPath, setSelectedPath] = useState('wrong');
    
    const handleSubmit = () => {
      if (selectedPath === 'correct') {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Direct Laser to Target</h3>
        <div className="mb-4">
          <p>Click the correct mirror to direct the laser to the target:</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 h-48">
          <div className="bg-red-200 rounded flex items-center justify-center">🔴 Laser</div>
          <div className="bg-gray-200 rounded flex items-center justify-center cursor-pointer" 
               onClick={() => setSelectedPath('wrong')}>🪞 A</div>
          <div></div>
          <div className="bg-gray-200 rounded flex items-center justify-center cursor-pointer"
               onClick={() => setSelectedPath('correct')}>🪞 B</div>
          <div></div>
          <div className="bg-gray-200 rounded flex items-center justify-center cursor-pointer"
               onClick={() => setSelectedPath('wrong')}>🪞 C</div>
          <div></div>
          <div></div>
          <div className="bg-green-200 rounded flex items-center justify-center">🎯 Target</div>
        </div>
        <div className="text-sm mb-4">
          Selected path: {selectedPath === 'correct' ? 'Laser → Mirror B → Target ✓' : 'Click Mirror B for correct path!'}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Check Laser Path
        </button>
      </div>
    );
  };

  const CircuitPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [connections, setConnections] = useState({ battery: false, switch: false, wire: false });
    
    const toggleConnection = (component) => {
      setConnections({...connections, [component]: !connections[component]});
    };

    const handleSubmit = () => {
      if (connections.battery && connections.switch && connections.wire) {
        onSolve();
      }
    };

    return (
      <div className="p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Complete the Circuit</h3>
        <div className="mb-4">
          <p>Connect all components to light the bulb:</p>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-4">
            <span>🔋 Battery</span>
            <button
              className={`px-4 py-2 rounded ${connections.battery ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleConnection('battery')}
            >
              {connections.battery ? 'Connected' : 'Disconnected'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span>🔘 Switch</span>
            <button
              className={`px-4 py-2 rounded ${connections.switch ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleConnection('switch')}
            >
              {connections.switch ? 'Closed' : 'Open'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span>➖ Wire</span>
            <button
              className={`px-4 py-2 rounded ${connections.wire ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleConnection('wire')}
            >
              {connections.wire ? 'Connected' : 'Disconnected'}
            </button>
          </div>
        </div>
        <div className="text-center mb-4">
          <span className="text-4xl">
            {connections.battery && connections.switch && connections.wire ? '💡' : '⚫'}
          </span>
          <p className="text-sm">
            {connections.battery && connections.switch && connections.wire ? 'Bulb is lit!' : 'Bulb is off'}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-600 text-white p-3 rounded"
        >
          Check Circuit
        </button>
      </div>
    );
  };

  const EnvironmentPuzzle = ({ onSolve }: { onSolve: () => void }) => {
    const [sorted, setSorted] = useState({ eco: [], harmful: [] });
    const items = ['Solar panel', 'Plastic bottle', 'LED bulb', 'Coal', 'Bicycle', 'Pesticide', 'Wind turbine', 'Styrofoam'];
    const ecoFriendly = new Set(['Solar panel', 'LED bulb', 'Bicycle', 'Wind turbine']);
    
    const sortItem = (item: string, category: string) => {
      const newSorted = { ...sorted };
      newSorted.eco = newSorted.eco.filter(i => i !== item);
      newSorted.harmful = newSorted.harmful.filter(i => i !== item);
      newSorted[category].push(item);
      setSorted(newSorted);
    };

    const handleSubmit = () => {
      const ecoCorrect = sorted.eco.every(item => ecoFriendly.has(item)) && sorted.eco.length === 4;
      const harmfulCorrect = sorted.harmful.every(item => !ecoFriendly.has(item)) && sorted.harmful.length === 4;
      if (ecoCorrect && harmfulCorrect) {
        onSolve();
      }
    };

    const remainingItems = items.filter(item => !sorted.eco.includes(item) && !sorted.harmful.includes(item));

    return (
      <div className="p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Sort Environmental Impact</h3>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Items to sort:</h4>
          <div className="flex flex-wrap gap-2">
            {remainingItems.map(item => (
              <div key={item} className="p-2 bg-gray-100 rounded">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-green-100 rounded border-2 border-dashed">
            <h4 className="font-semibold text-green-700 mb-2">♻ Eco-Friendly</h4>
            <div className="space-y-1">
              {sorted.eco.map(item => (
                <div key={item} className="p-2 bg-green-200 rounded text-sm">{item}</div>
              ))}
            </div>
            <div className="mt-2 space-y-1">
              {remainingItems.map(item => (
                <button
                  key={item}
                  className="block w-full text-left p-1 text-xs hover:bg-green-50 rounded"
                  onClick={() => sortItem(item, 'eco')}
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-red-100 rounded border-2 border-dashed">
            <h4 className="font-semibold text-red-700 mb-2">⚠ Harmful</h4>
            <div className="space-y-1">
              {sorted.harmful.map(item => (
                <div key={item} className="p-2 bg-red-200 rounded text-sm">{item}</div>
              ))}
            </div>
            <div className="mt-2 space-y-1">
              {remainingItems.map(item => (
                <button
                  key={item}
                  className="block w-full text-left p-1 text-xs hover:bg-red-50 rounded"
                  onClick={() => sortItem(item, 'harmful')}
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={remainingItems.length > 0}
          className="w-full bg-green-600 text-white p-3 rounded disabled:bg-gray-400"
        >
          Submit Sorting
        </button>
      </div>
    );
  };

  const renderPuzzle = (puzzleType: string, onSolve: () => void) => {
    const puzzleComponents = {
      chemical: ChemicalReactionPuzzle,
      acids: AcidsBasesPuzzle,
      conductors: ConductorsPuzzle,
      molecules: MoleculesPuzzle,
      organs: OrgansPuzzle,
      responses: ResponsesPuzzle,
      genetics: GeneticsPuzzle,
      optics: OpticsPuzzle,
      circuit: CircuitPuzzle,
      environment: EnvironmentPuzzle
    };

    const PuzzleComponent = puzzleComponents[puzzleType];
    return PuzzleComponent ? <PuzzleComponent onSolve={onSolve} /> : null;
  };

  const solvePuzzle = (roomId: string) => {
    const newUnlocked = new Set(unlockedRooms);
    newUnlocked.add(roomId);
    setUnlockedRooms(newUnlocked);
    
    if (newUnlocked.size === 10) {
      setGameWon(true);
      if (onComplete) {
        onComplete(1000); // 1000 points for completing all 10 puzzles
      }
    } else {
      setCurrentRoom('main');
    }
  };

  const enterRoom = (roomId: string) => {
    setCurrentRoom(roomId);
  };

  const goToMain = () => {
    setCurrentRoom('main');
  };

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
            <p className="text-xl text-gray-700 mb-6">
              You have successfully solved all 10 science puzzles and escaped the laboratory!
            </p>
            <div className="text-lg text-gray-600">
              <p>🧪 Chemical Reactions mastered!</p>
              <p>🔬 All science concepts conquered!</p>
              <p>🏆 You are now a Science Escape Master!</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onExit ? onExit() : window.location.reload()}
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
              >
                {onExit ? "🏠 Back to Dashboard" : "🔄 Play Again"}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentRoom === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">🧪 Science Escape Room</h1>
            <p className="text-xl text-white/90">
              Solve all 10 science puzzles to escape the laboratory!
            </p>
            <div className="mt-4 text-white/80">
              Progress: {unlockedRooms.size}/10 rooms completed
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(rooms).slice(1).map(([roomId, room]) => {
              const isUnlocked = unlockedRooms.has(roomId);
              const IconComponent = room.icon;
              
              return (
                <div
                  key={roomId}
                  className={`relative p-6 rounded-xl shadow-lg transition-all cursor-pointer
                    ${isUnlocked 
                      ? 'bg-green-100 border-2 border-green-500 hover:bg-green-200' 
                      : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => enterRoom(roomId)}
                >
                  <div className="text-center">
                    <IconComponent className="mx-auto mb-3 w-8 h-8" />
                    <h3 className="font-bold text-sm mb-2">{room.title}</h3>
                    <p className="text-xs text-gray-600">{room.description}</p>
                    <div className="absolute top-2 right-2">
                      {isUnlocked ? <Unlock className="w-5 h-5 text-green-600" /> : <Lock className="w-5 h-5 text-red-600" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const room = rooms[currentRoom];
  if (room && room.puzzle) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={goToMain}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Main Lab
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-6">
              <room.icon className="mx-auto mb-4 w-16 h-16 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{room.title}</h1>
              <p className="text-lg text-gray-600">{room.description}</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              {renderPuzzle(room.puzzle, () => solvePuzzle(currentRoom))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ScienceEscapeRoom;