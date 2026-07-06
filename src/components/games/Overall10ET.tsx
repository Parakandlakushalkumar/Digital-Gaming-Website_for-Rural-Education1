import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Car, 
  Bot, 
  Lightbulb, 
  Wind, 
  Sun, 
  Droplets, 
  Factory, 
  Train, 
  Bus, 
  Bike, 
  Users,
  Target,
  Brain,
  Wrench,
  CheckCircle,
  Lock,
  Star
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  unlocked: boolean;
  type: 'robotics' | 'energy' | 'transport' | 'design';
}

interface RobotPart {
  id: string;
  name: string;
  icon: React.ReactNode;
  placed: boolean;
}

interface EnergyOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  renewable: boolean;
  selected: boolean;
}

interface TransportOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  efficiency: number;
  selected: boolean;
}

interface DesignStep {
  id: string;
  name: string;
  order: number;
  placed: boolean;
  correctOrder: number;
}

interface Overall10ETProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const SmartCityBuilder: React.FC<Overall10ETProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [cityLights, setCityLights] = useState(false);
  const [trafficFlow, setTrafficFlow] = useState(false);
  const [robotsActive, setRobotsActive] = useState(false);
  const [problemSolved, setProblemSolved] = useState(false);

  // Robotics Challenge State
  const [robotParts, setRobotParts] = useState<RobotPart[]>([
    { id: 'sensor', name: 'Sensor', icon: <Target className="w-6 h-6" />, placed: false },
    { id: 'wheels', name: 'Wheels', icon: <Bot className="w-6 h-6" />, placed: false },
    { id: 'controller', name: 'Controller', icon: <Brain className="w-6 h-6" />, placed: false },
  ]);

  // Energy Challenge State
  const [energyOptions, setEnergyOptions] = useState<EnergyOption[]>([
    { id: 'solar', name: 'Solar', icon: <Sun className="w-6 h-6" />, renewable: true, selected: false },
    { id: 'wind', name: 'Wind', icon: <Wind className="w-6 h-6" />, renewable: true, selected: false },
    { id: 'hydro', name: 'Hydro', icon: <Droplets className="w-6 h-6" />, renewable: true, selected: false },
    { id: 'coal', name: 'Coal', icon: <Factory className="w-6 h-6" />, renewable: false, selected: false },
  ]);

  // Transport Challenge State
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([
    { id: 'metro', name: 'Metro', icon: <Train className="w-6 h-6" />, efficiency: 9, selected: false },
    { id: 'bus', name: 'Bus', icon: <Bus className="w-6 h-6" />, efficiency: 7, selected: false },
    { id: 'ev', name: 'Electric Cars', icon: <Car className="w-6 h-6" />, efficiency: 6, selected: false },
    { id: 'bike', name: 'Bicycles', icon: <Bike className="w-6 h-6" />, efficiency: 10, selected: false },
  ]);

  // Design Thinking Challenge State
  const [designSteps, setDesignSteps] = useState<DesignStep[]>([
    { id: 'empathize', name: 'Empathize', order: 0, placed: false, correctOrder: 1 },
    { id: 'define', name: 'Define', order: 0, placed: false, correctOrder: 2 },
    { id: 'ideate', name: 'Ideate', order: 0, placed: false, correctOrder: 3 },
    { id: 'prototype', name: 'Prototype', order: 0, placed: false, correctOrder: 4 },
  ]);

  const challenges: Challenge[] = [
    {
      id: 'robotics',
      title: 'Build Service Robots',
      description: 'Assemble robots to help maintain the city',
      icon: <Bot className="w-8 h-8" />,
      completed: completedChallenges.has('robotics'),
      unlocked: true,
      type: 'robotics'
    },
    {
      id: 'energy',
      title: 'Power the City',
      description: 'Choose sustainable energy sources',
      icon: <Zap className="w-8 h-8" />,
      completed: completedChallenges.has('energy'),
      unlocked: completedChallenges.has('robotics'),
      type: 'energy'
    },
    {
      id: 'transport',
      title: 'Design Traffic System',
      description: 'Create efficient transportation',
      icon: <Car className="w-8 h-8" />,
      completed: completedChallenges.has('transport'),
      unlocked: completedChallenges.has('energy'),
      type: 'transport'
    },
    {
      id: 'design',
      title: 'Solve City Problems',
      description: 'Use design thinking methodology',
      icon: <Lightbulb className="w-8 h-8" />,
      completed: completedChallenges.has('design'),
      unlocked: completedChallenges.has('transport'),
      type: 'design'
    }
  ];

  const progress = (completedChallenges.size / challenges.length) * 100;

  const handleRobotPartDrop = (partId: string, dropZone: string) => {
    if (dropZone === 'robot-frame') {
      setRobotParts(prev => prev.map(part => 
        part.id === partId ? { ...part, placed: true } : part
      ));
    }
  };

  const checkRoboticsCompletion = () => {
    const allPlaced = robotParts.every(part => part.placed);
    if (allPlaced && !completedChallenges.has('robotics')) {
      setCompletedChallenges(prev => new Set([...prev, 'robotics']));
      setRobotsActive(true);
      setCurrentChallenge(null);
    }
  };

  const handleEnergySelection = (optionId: string) => {
    const option = energyOptions.find(opt => opt.id === optionId);
    if (option) {
      setEnergyOptions(prev => prev.map(opt => ({
        ...opt,
        selected: opt.id === optionId
      })));
      
      if (option.renewable) {
        setCityLights(true);
        setCompletedChallenges(prev => new Set([...prev, 'energy']));
        setCurrentChallenge(null);
      } else {
        setCityLights(false);
        // Show pollution effect
        setTimeout(() => {
          alert('⚠ Coal energy increases pollution! Try a renewable source.');
          setEnergyOptions(prev => prev.map(opt => ({ ...opt, selected: false })));
        }, 1000);
      }
    }
  };

  const handleTransportSelection = (optionId: string) => {
    const option = transportOptions.find(opt => opt.id === optionId);
    if (option) {
      setTransportOptions(prev => prev.map(opt => ({
        ...opt,
        selected: opt.id === optionId
      })));
      
      if (option.efficiency >= 8) {
        setTrafficFlow(true);
        setCompletedChallenges(prev => new Set([...prev, 'transport']));
        setCurrentChallenge(null);
      } else {
        setTrafficFlow(false);
        setTimeout(() => {
          alert('🚦 This transport option causes traffic jams! Try a more efficient option.');
          setTransportOptions(prev => prev.map(opt => ({ ...opt, selected: false })));
        }, 1000);
      }
    }
  };

  const handleDesignStepDrop = (stepId: string, position: number) => {
    setDesignSteps(prev => prev.map(step => ({
      ...step,
      placed: step.id === stepId ? true : step.placed,
      order: step.id === stepId ? position : step.order
    })));
  };

  const checkDesignCompletion = () => {
    const allPlaced = designSteps.every(step => step.placed);
    const correctOrder = designSteps.every(step => step.order === step.correctOrder);
    
    if (allPlaced && correctOrder && !completedChallenges.has('design')) {
      setProblemSolved(true);
      setCompletedChallenges(prev => new Set([...prev, 'design']));
      setCurrentChallenge(null);
    } else if (allPlaced && !correctOrder) {
      setTimeout(() => {
        alert('🤔 The design thinking steps are in the wrong order! Try again.');
        setDesignSteps(prev => prev.map(step => ({ ...step, placed: false, order: 0 })));
      }, 1000);
    }
  };

  useEffect(() => {
    checkRoboticsCompletion();
  }, [robotParts]);

  useEffect(() => {
    checkDesignCompletion();
  }, [designSteps]);

  const renderChallenge = () => {
    if (!currentChallenge) return null;

    switch (currentChallenge) {
      case 'robotics':
        return (
          <div className="challenge-content">
            <h3 className="text-2xl font-bold mb-4 text-center">Build Your Service Robot</h3>
            <div className="flex justify-between items-center">
              <div className="parts-inventory">
                <h4 className="text-lg font-semibold mb-3">Parts Inventory:</h4>
                <div className="space-y-2">
                  {robotParts.filter(part => !part.placed).map(part => (
                    <div
                      key={part.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', part.id)}
                      className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg cursor-move hover:bg-blue-200 transition-colors"
                    >
                      {part.icon}
                      <span>{part.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="robot-assembly">
                <h4 className="text-lg font-semibold mb-3">Robot Frame:</h4>
                <div
                  className="w-48 h-48 border-4 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-gray-50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const partId = e.dataTransfer.getData('text/plain');
                    handleRobotPartDrop(partId, 'robot-frame');
                  }}
                >
                  {robotParts.filter(part => part.placed).map(part => (
                    <div key={part.id} className="flex items-center gap-1 text-green-600">
                      {part.icon}
                      <span className="text-sm">{part.name}</span>
                    </div>
                  ))}
                  {robotParts.filter(part => part.placed).length === 0 && (
                    <p className="text-gray-500 text-center">Drag parts here</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'energy':
        return (
          <div className="challenge-content">
            <h3 className="text-2xl font-bold mb-4 text-center">Choose Your Energy Source</h3>
            <p className="text-center mb-6 text-gray-600">Select a sustainable energy source to power your city</p>
            <div className="grid grid-cols-2 gap-4">
              {energyOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleEnergySelection(option.id)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    option.selected 
                      ? option.renewable 
                        ? 'border-green-500 bg-green-100' 
                        : 'border-red-500 bg-red-100'
                      : 'border-gray-300 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {option.icon}
                    <span className="font-semibold">{option.name}</span>
                    <span className="text-sm text-gray-600">
                      {option.renewable ? '🌱 Renewable' : '☁ Polluting'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'transport':
        return (
          <div className="challenge-content">
            <h3 className="text-2xl font-bold mb-4 text-center">Design Transport System</h3>
            <p className="text-center mb-6 text-gray-600">Choose the most efficient transport method</p>
            <div className="grid grid-cols-2 gap-4">
              {transportOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleTransportSelection(option.id)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    option.selected 
                      ? option.efficiency >= 8
                        ? 'border-green-500 bg-green-100'
                        : 'border-red-500 bg-red-100'
                      : 'border-gray-300 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {option.icon}
                    <span className="font-semibold">{option.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{option.efficiency}/10</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="challenge-content">
            <h3 className="text-2xl font-bold mb-4 text-center">Solve: Water Shortage Problem</h3>
            <p className="text-center mb-6 text-gray-600">Arrange the design thinking steps in the correct order</p>
            
            <div className="flex justify-between">
              <div className="steps-inventory">
                <h4 className="text-lg font-semibold mb-3">Available Steps:</h4>
                <div className="space-y-2">
                  {designSteps.filter(step => !step.placed).map(step => (
                    <div
                      key={step.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', step.id)}
                      className="p-3 bg-purple-100 rounded-lg cursor-move hover:bg-purple-200 transition-colors"
                    >
                      {step.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="design-sequence">
                <h4 className="text-lg font-semibold mb-3">Design Process:</h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(position => (
                    <div
                      key={position}
                      className="w-40 h-12 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const stepId = e.dataTransfer.getData('text/plain');
                        handleDesignStepDrop(stepId, position);
                      }}
                    >
                      {designSteps.find(step => step.order === position)?.name || `Step ${position}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isGameComplete = completedChallenges.size === challenges.length;

  // Call onComplete when game is finished
  useEffect(() => {
    if (isGameComplete && onComplete) {
      onComplete(1000); // 1000 points for completing all 4 challenges
    }
  }, [isGameComplete, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🏙 Smart City Builder
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Build the future by solving STEM challenges!
          </p>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/90">Progress: {completedChallenges.size}/4 challenges completed</p>
        </div>

        {/* Challenge Modal */}
        {currentChallenge && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setCurrentChallenge(null)}
                className="float-right text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
              {renderChallenge()}
            </div>
          </div>
        )}

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {challenges.map(challenge => (
            <div
              key={challenge.id}
              className={`relative p-6 rounded-2xl border-4 transition-all duration-300 min-h-[200px] ${
                challenge.completed
                  ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-300 shadow-lg'
                  : challenge.unlocked
                  ? 'bg-white/90 border-blue-300 hover:border-blue-500 shadow-md cursor-pointer hover:scale-105'
                  : 'bg-gray-400/50 border-gray-500 opacity-60'
              }`}
              onClick={() => challenge.unlocked && !challenge.completed && setCurrentChallenge(challenge.id)}
            >
              {/* Lock Icon */}
              {!challenge.unlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
              )}
              
              {/* Completion Badge */}
              {challenge.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${challenge.completed ? 'bg-white/20' : 'bg-blue-100'}`}>
                  {challenge.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${challenge.completed ? 'text-white' : 'text-gray-800'}`}>
                    {challenge.title}
                  </h3>
                  <p className={`${challenge.completed ? 'text-white/90' : 'text-gray-600'}`}>
                    {challenge.description}
                  </p>
                </div>
              </div>
              
              {/* Visual Effects */}
              <div className="mt-4">
                {challenge.id === 'robotics' && robotsActive && (
                  <div className="flex gap-2">
                    <Bot className="w-6 h-6 text-white animate-bounce" />
                    <span className="text-white">Robots maintaining city!</span>
                  </div>
                )}
                
                {challenge.id === 'energy' && cityLights && (
                  <div className="flex gap-2">
                    <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <span className="text-white">City powered by clean energy!</span>
                  </div>
                )}
                
                {challenge.id === 'transport' && trafficFlow && (
                  <div className="flex gap-2">
                    <Car className="w-6 h-6 text-white animate-pulse" />
                    <span className="text-white">Traffic flowing smoothly!</span>
                  </div>
                )}
                
                {challenge.id === 'design' && problemSolved && (
                  <div className="flex gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <span className="text-white">Water shortage solved!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Game Complete */}
        {isGameComplete && (
          <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-xl text-white mb-4">
              You've successfully built your smart city!
            </p>
            <p className="text-white/90 mb-6">
              Your city now has working robots, clean energy, efficient transport, and solved urban challenges!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onExit ? onExit() : window.location.reload()}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
              >
                {onExit ? "🏠 Back to Dashboard" : "🔄 Play Again"}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition-colors"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartCityBuilder;