import React, { useState, useEffect } from 'react';
import { 
  Home, Zap, Settings, Sun, Wind, Battery, Lightbulb, 
  Wrench, Droplets, Mountain, Trees, Users, Award,
  ArrowRight, CheckCircle, AlertCircle, Info
} from 'lucide-react';

interface Building {
  id: string;
  name: string;
  type: 'house' | 'well' | 'mill' | 'streetlight' | 'market' | 'school';
  x: number;
  y: number;
  powered: boolean;
  waterAccess: boolean;
  completed: boolean;
  requirements: string[];
  description: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  concept: string;
  building: string;
  tools: string[];
  steps: string[];
  reward: number;
  completed: boolean;
}

interface Tool {
  id: string;
  name: string;
  type: 'simple_machine' | 'energy_source' | 'circuit_component';
  description: string;
  unlocked: boolean;
  cost: number;
}

interface Overall7ETProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const VillageBuilderGame: React.FC<Overall7ETProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [villagePoints, setVillagePoints] = useState(100);
  const [population, setPopulation] = useState(5);
  const [gamePhase, setGamePhase] = useState<'intro' | 'building' | 'challenge' | 'completed'>('intro');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showConcept, setShowConcept] = useState(false);
  const [conceptInfo, setConceptInfo] = useState('');

  // Initialize game data
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Initialize tools
    const initialTools: Tool[] = [
      // Simple Machines
      { id: 'pulley', name: 'Pulley System', type: 'simple_machine', description: 'Helps lift heavy objects like water buckets', unlocked: true, cost: 20 },
      { id: 'lever', name: 'Lever', type: 'simple_machine', description: 'Makes moving heavy stones easier', unlocked: true, cost: 15 },
      { id: 'wheel', name: 'Wheel & Axle', type: 'simple_machine', description: 'For transportation and mills', unlocked: true, cost: 25 },
      { id: 'inclined_plane', name: 'Inclined Plane', type: 'simple_machine', description: 'Ramp to move materials uphill', unlocked: false, cost: 30 },
      
      // Energy Sources
      { id: 'solar_panel', name: 'Solar Panel', type: 'energy_source', description: 'Converts sunlight to electricity', unlocked: false, cost: 50 },
      { id: 'windmill', name: 'Windmill', type: 'energy_source', description: 'Uses wind power for electricity or grinding', unlocked: false, cost: 45 },
      { id: 'battery', name: 'Battery', type: 'energy_source', description: 'Stores electrical energy', unlocked: false, cost: 30 },
      { id: 'generator', name: 'Hand Generator', type: 'energy_source', description: 'Manual electricity generation', unlocked: true, cost: 35 },
      
      // Circuit Components
      { id: 'wire', name: 'Copper Wire', type: 'circuit_component', description: 'Conducts electricity', unlocked: true, cost: 10 },
      { id: 'switch', name: 'Switch', type: 'circuit_component', description: 'Controls electrical flow', unlocked: true, cost: 15 },
      { id: 'bulb', name: 'LED Bulb', type: 'circuit_component', description: 'Provides light', unlocked: true, cost: 20 },
      { id: 'resistor', name: 'Resistor', type: 'circuit_component', description: 'Controls electrical current', unlocked: false, cost: 12 }
    ];

    // Initialize challenges
    const initialChallenges: Challenge[] = [
      {
        id: 'well_water',
        title: 'Build a Village Well',
        description: 'The village needs clean water. Build a well using simple machines to make water collection easier.',
        concept: 'Simple Machines - Pulleys make lifting water buckets much easier by reducing the force needed.',
        building: 'well',
        tools: ['pulley', 'lever', 'wheel'],
        steps: [
          'Dig the well using levers to move rocks',
          'Install a pulley system over the well',
          'Add a wheel mechanism for easy rope handling',
          'Test the system by drawing water'
        ],
        reward: 50,
        completed: false
      },
      {
        id: 'street_lighting',
        title: 'Install Street Lights',
        description: 'Make the village safe at night by installing street lights using basic electrical circuits.',
        concept: 'Basic Circuits - A complete circuit needs a power source, conductor (wire), and load (bulb) with a switch for control.',
        building: 'streetlight',
        tools: ['battery', 'wire', 'switch', 'bulb'],
        steps: [
          'Connect battery to wire (power source)',
          'Add a switch to control the circuit',
          'Connect wire to LED bulb',
          'Test the complete circuit',
          'Install multiple lights around village'
        ],
        reward: 75,
        completed: false
      },
      {
        id: 'grain_mill',
        title: 'Build a Grain Mill',
        description: 'Help villagers process grain efficiently using wind or water power.',
        concept: 'Energy Sources - Wind and water provide renewable energy that can be converted to mechanical energy for grinding.',
        building: 'mill',
        tools: ['windmill', 'wheel', 'lever'],
        steps: [
          'Choose location with good wind flow',
          'Install windmill for power',
          'Connect wheel and axle system',
          'Add grinding mechanism with levers',
          'Test grain processing'
        ],
        reward: 80,
        completed: false
      },
      {
        id: 'solar_homes',
        title: 'Solar-Powered Homes',
        description: 'Upgrade village homes with solar power for sustainable electricity.',
        concept: 'Energy Conversion - Solar panels convert light energy into electrical energy using photovoltaic cells.',
        building: 'house',
        tools: ['solar_panel', 'battery', 'wire', 'switch'],
        steps: [
          'Install solar panels on rooftops',
          'Connect to battery storage system',
          'Wire the electrical system',
          'Add switches for different rooms',
          'Test all electrical appliances'
        ],
        reward: 100,
        completed: false
      },
      {
        id: 'village_market',
        title: 'Build Village Market',
        description: 'Create a marketplace with proper lighting and water access.',
        concept: 'Engineering Design - Combining multiple systems (lighting, water, structure) to solve complex problems.',
        building: 'market',
        tools: ['solar_panel', 'pulley', 'wire', 'bulb', 'switch'],
        steps: [
          'Design market layout',
          'Install solar power system',
          'Set up water access using pulleys',
          'Install lighting circuit',
          'Add safety switches'
        ],
        reward: 120,
        completed: false
      }
    ];

    setTools(initialTools);
    setChallenges(initialChallenges);
    setCurrentChallenge(initialChallenges[0]);
  };

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setGamePhase('challenge');
    setShowConcept(true);
    setConceptInfo(challenge.concept);
  };

  const completeStep = (stepIndex: number) => {
    if (!currentChallenge) return;

    // Simple completion logic - in a full game, this would involve more complex interactions
    const requiredTool = currentChallenge.tools[stepIndex];
    const tool = tools.find(t => t.id === requiredTool);
    
    if (!tool?.unlocked) {
      alert(`You need to unlock ${tool?.name} first!`);
      return;
    }

    if (villagePoints < 20) {
      alert('Not enough village points to complete this step!');
      return;
    }

    setVillagePoints(prev => prev - 20);
    
    // Check if challenge is completed
    if (stepIndex === currentChallenge.steps.length - 1) {
      completeChallenge();
    }
  };

  const completeChallenge = () => {
    if (!currentChallenge) return;

    // Update challenge as completed
    setChallenges(prev => prev.map(c => 
      c.id === currentChallenge.id ? { ...c, completed: true } : c
    ));

    // Add building to village
    const newBuilding: Building = {
      id: currentChallenge.building + '_' + Date.now(),
      name: currentChallenge.title,
      type: currentChallenge.building as any,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
      powered: currentChallenge.tools.some(t => ['solar_panel', 'windmill', 'battery'].includes(t)),
      waterAccess: currentChallenge.tools.includes('pulley'),
      completed: true,
      requirements: currentChallenge.tools,
      description: currentChallenge.description
    };

    setBuildings(prev => [...prev, newBuilding]);
    setVillagePoints(prev => prev + currentChallenge.reward);
    setPopulation(prev => prev + 2);

    // Unlock new tools based on progress
    unlockNewTools();

    // Check if all challenges are completed
    const allCompleted = challenges.every(c => c.id === currentChallenge.id ? true : c.completed);
    if (allCompleted) {
      setGamePhase('completed');
      if (onComplete) {
        onComplete(villagePoints + currentChallenge.reward);
      }
    }

    setGamePhase('building');
    setCurrentChallenge(null);
  };

  const unlockNewTools = () => {
    setTools(prev => prev.map(tool => {
      if (!tool.unlocked && villagePoints >= tool.cost * 2) {
        return { ...tool, unlocked: true };
      }
      return tool;
    }));
  };

  const buyTool = (tool: Tool) => {
    if (villagePoints >= tool.cost) {
      setVillagePoints(prev => prev - tool.cost);
      setTools(prev => prev.map(t => 
        t.id === tool.id ? { ...t, unlocked: true } : t
      ));
    }
  };

  const getBuildingIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-6 h-6" />;
      case 'well': return <Droplets className="w-6 h-6" />;
      case 'mill': return <Wind className="w-6 h-6" />;
      case 'streetlight': return <Lightbulb className="w-6 h-6" />;
      case 'market': return <Users className="w-6 h-6" />;
      case 'school': return <Award className="w-6 h-6" />;
      default: return <Settings className="w-6 h-6" />;
    }
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'simple_machine': return <Wrench className="w-5 h-5" />;
      case 'energy_source': return <Zap className="w-5 h-5" />;
      case 'circuit_component': return <Settings className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  if (gamePhase === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="text-center py-12">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CONGRATULATIONS!</h1>
          <h2 className="text-3xl font-bold text-green-600 mb-6">VILLAGE BUILDER MASTER!</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-semibold mb-4">🏆 Final Stats:</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Village Points:</span>
                <span className="font-bold text-green-600">{villagePoints}</span>
              </div>
              <div className="flex justify-between">
                <span>Population:</span>
                <span className="font-bold text-blue-600">{population} villagers</span>
              </div>
              <div className="flex justify-between">
                <span>Buildings:</span>
                <span className="font-bold text-purple-600">{buildings.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Challenges:</span>
                <span className="font-bold text-yellow-600">{challenges.filter(c => c.completed).length}/{challenges.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🧠 What You Learned:</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold">🔧 Simple Machines</h4>
                <p className="text-sm">Pulleys, levers, and wheels make work easier!</p>
              </div>
              <div>
                <h4 className="font-semibold">⚡ Energy Sources</h4>
                <p className="text-sm">Solar, wind, and battery power for sustainable energy!</p>
              </div>
              <div>
                <h4 className="font-semibold">🔌 Electric Circuits</h4>
                <p className="text-sm">Complete circuits with power, control, and loads!</p>
              </div>
              <div>
                <h4 className="font-semibold">🏗️ Engineering Design</h4>
                <p className="text-sm">Solving real problems with systematic approaches!</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onExit ? onExit() : window.location.reload()}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            {onExit ? "🏠 Back to Dashboard" : "🔄 Build Another Village"}
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'intro') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">🏘 Village Builder Challenge 🏘</h1>
          <p className="text-lg text-gray-600 mb-6">Build a thriving village using science and engineering!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome, Village Planner!</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>You are in charge of building a small village from scratch. Use your knowledge of science and engineering to solve real problems!</p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">What you'll learn:</h3>
              <ul className="space-y-1">
                <li>• <strong>Simple Machines:</strong> Pulleys, levers, and wheels</li>
                <li>• <strong>Energy Sources:</strong> Solar, wind, and battery power</li>
                <li>• <strong>Basic Circuits:</strong> Connecting batteries, switches, and bulbs</li>
                <li>• <strong>Engineering Design:</strong> Solving village problems step by step</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Your Starting Resources:</h3>
              <p>Village Points: <span className="font-bold text-green-600">100</span></p>
              <p>Population: <span className="font-bold text-blue-600">5 villagers</span></p>
            </div>
          </div>

          <button
            onClick={() => setGamePhase('building')}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            Start Building <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">🏘 Village Builder Challenge</h1>
        <div className="flex justify-center gap-6 text-sm">
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-bold text-green-600">{villagePoints}</span> Points
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <Users className="w-4 h-4 inline mr-1" />
            <span className="font-bold text-blue-600">{population}</span> Villagers
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <Award className="w-4 h-4 inline mr-1" />
            <span className="font-bold text-purple-600">{challenges.filter(c => c.completed).length}</span>/{challenges.length} Complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Village Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">Village Map</h3>
            <div 
              className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-lg"
              style={{ height: '400px' }}
            >
              {/* Background elements */}
              <div className="absolute top-4 left-4">
                <Trees className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute top-4 right-4">
                <Mountain className="w-8 h-8 text-gray-600" />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-2 bg-blue-400 rounded"></div>
                <div className="text-xs text-center text-blue-600">River</div>
              </div>

              {/* Buildings */}
              {buildings.map(building => (
                <div
                  key={building.id}
                  className="absolute bg-white border-2 border-gray-300 rounded-lg p-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  style={{ left: building.x, top: building.y }}
                  title={building.description}
                >
                  <div className="flex items-center gap-1">
                    {getBuildingIcon(building.type)}
                    {building.powered && <Zap className="w-3 h-3 text-yellow-500" />}
                    {building.waterAccess && <Droplets className="w-3 h-3 text-blue-500" />}
                  </div>
                  <div className="text-xs mt-1 max-w-16 truncate">{building.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">Available Challenges</h3>
            <div className="space-y-2">
              {challenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    challenge.completed 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => !challenge.completed && startChallenge(challenge)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{challenge.title}</h4>
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="text-xs bg-yellow-100 px-2 py-1 rounded">
                        +{challenge.reward} pts
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{challenge.description}</p>
                  <div className="flex gap-1 mt-2">
                    {challenge.tools.slice(0, 3).map(toolId => {
                      const tool = tools.find(t => t.id === toolId);
                      return (
                        <div key={toolId} className="flex items-center gap-1">
                          {getToolIcon(tool?.type || '')}
                        </div>
                      );
                    })}
                    {challenge.tools.length > 3 && <span className="text-xs">...</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-3">Available Tools</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {tools.map(tool => (
              <div
                key={tool.id}
                className={`p-2 rounded-lg border ${
                  tool.unlocked 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getToolIcon(tool.type)}
                    <span className="font-medium text-sm">{tool.name}</span>
                  </div>
                  {!tool.unlocked && (
                    <button
                      onClick={() => buyTool(tool)}
                      disabled={villagePoints < tool.cost}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xs px-2 py-1 rounded"
                    >
                      {tool.cost}pts
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      {gamePhase === 'challenge' && currentChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{currentChallenge.title}</h2>
                <button
                  onClick={() => setGamePhase('building')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {showConcept && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-800">Science Concept</h3>
                  </div>
                  <p className="text-blue-700 text-sm">{conceptInfo}</p>
                </div>
              )}

              <p className="text-gray-600 mb-4">{currentChallenge.description}</p>

              <div className="mb-4">
                <h3 className="font-bold mb-2">Required Tools:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentChallenge.tools.map(toolId => {
                    const tool = tools.find(t => t.id === toolId);
                    return (
                      <div
                        key={toolId}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          tool?.unlocked 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getToolIcon(tool?.type || '')}
                        {tool?.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Steps to Complete:</h3>
                <div className="space-y-2">
                  {currentChallenge.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <button
                        onClick={() => completeStep(index)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Step {index + 1}
                      </button>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Reward: +{currentChallenge.reward} Village Points
                </div>
                <button
                  onClick={completeChallenge}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Complete Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VillageBuilderGame;
