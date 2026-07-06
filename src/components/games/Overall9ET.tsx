import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface Overall9ETProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

interface GameState {
  robot: {
    chassis: string | null;
    ai: string | null;
    power: string | null;
    efficiency: number;
  };
  energy: {
    solar: number;
    wind: number;
    hydro: number;
    geothermal: number;
    total: number;
  };
  transport: {
    bus: boolean;
    train: boolean;
    bike: boolean;
    powered: number;
  };
  puzzle: {
    solved: boolean;
    grid: Array<{
      pattern: string;
      correct: string;
      index: number;
    }>;
  };
  stats: {
    totalEnergy: number;
    transportsPowered: number;
    efficiency: number;
    ecoImpact: number;
  };
}

const robotComponents = {
  chassis: {
    wheeled: { name: "Wheeled Explorer", efficiency: 10, icon: "🤖" },
    tracked: { name: "All-Terrain Unit", efficiency: 15, icon: "🚗" },
    hovering: { name: "Sky Cleaner", efficiency: 20, icon: "🛸" }
  },
  ai: {
    basic: { name: "Smart Assistant", efficiency: 5, icon: "📱" },
    advanced: { name: "Learning AI", efficiency: 10, icon: "🖥" },
    quantum: { name: "Quantum Brain", efficiency: 15, icon: "⚛" }
  },
  power: {
    standard: { name: "Standard Core", efficiency: 5, icon: "🔋" },
    efficient: { name: "Efficient Core", efficiency: 10, icon: "⚡" },
    super: { name: "Super Core", efficiency: 15, icon: "💎" }
  }
};

const patterns = ['⚡', '🔄', '➡', '⬆', '⬇', '⬅', '🔋', '💚'];
const puzzleSolution = [
  '⚡', '➡', '🔄', '🔋',
  '⬆', '💚', '⬇', '➡',
  '🔄', '⬅', '⚡', '⬆',
  '💚', '🔋', '⬅', '🔄'
];

const Overall9ET: React.FC<Overall9ETProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [gameState, setGameState] = useState<GameState>({
    robot: {
      chassis: null,
      ai: null,
      power: null,
      efficiency: 0
    },
    energy: {
      solar: 0,
      wind: 0,
      hydro: 0,
      geothermal: 0,
      total: 0
    },
    transport: {
      bus: false,
      train: false,
      bike: false,
      powered: 0
    },
    puzzle: {
      solved: false,
      grid: []
    },
    stats: {
      totalEnergy: 0,
      transportsPowered: 0,
      efficiency: 0,
      ecoImpact: 0
    }
  });

  const translations = {
    en: {
      title: "🤖 Eco-Robo Challenge 🌱",
      subtitle: "Build a robot to help your city become eco-friendly!",
      stage1: "Stage 1: Design Your Robot",
      stage2: "Stage 2: Collect Renewable Energy",
      stage3: "Stage 3: Power City Transportation",
      stage4: "Stage 4: Optimize Your Robot",
      nextEnergy: "Next: Collect Energy 🌟",
      nextTransport: "Next: Power Transportation 🚌",
      nextPuzzle: "Next: Optimization Puzzle 🧩",
      finish: "Complete Mission! 🎉",
      checkSolution: "Check Solution",
      resetPuzzle: "Reset Puzzle",
      back: "Back to Dashboard"
    },
    hi: {
      title: "🤖 इको-रोबो चैलेंज 🌱",
      subtitle: "अपने शहर को पर्यावरण के अनुकूल बनाने के लिए एक रोबोट बनाएं!",
      stage1: "चरण 1: अपना रोबोट डिज़ाइन करें",
      stage2: "चरण 2: नवीकरणीय ऊर्जा एकत्र करें",
      stage3: "चरण 3: शहरी परिवहन को शक्ति दें",
      stage4: "चरण 4: अपने रोबोट को अनुकूलित करें",
      nextEnergy: "अगला: ऊर्जा एकत्र करें 🌟",
      nextTransport: "अगला: परिवहन को शक्ति दें 🚌",
      nextPuzzle: "अगला: अनुकूलन पहेली 🧩",
      finish: "मिशन पूरा करें! 🎉",
      checkSolution: "समाधान जांचें",
      resetPuzzle: "पहेली रीसेट करें",
      back: "डैशबोर्ड पर वापस जाएं"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const shuffled = [...puzzleSolution].sort(() => Math.random() - 0.5);
    const puzzleGrid = shuffled.map((pattern, index) => ({
      pattern,
      correct: puzzleSolution[index],
      index
    }));
    
    setGameState(prev => ({
      ...prev,
      puzzle: { ...prev.puzzle, grid: puzzleGrid }
    }));
  };

  const selectComponent = (component: string, value: string) => {
    setGameState(prev => ({
      ...prev,
      robot: { ...prev.robot, [component]: value }
    }));
    updateRobotEfficiency();
  };

  const updateRobotEfficiency = () => {
    setGameState(prev => {
      const { chassis, ai, power } = prev.robot;
      let efficiency = 0;

      if (chassis) efficiency += robotComponents.chassis[chassis as keyof typeof robotComponents.chassis].efficiency;
      if (ai) efficiency += robotComponents.ai[ai as keyof typeof robotComponents.ai].efficiency;
      if (power) efficiency += robotComponents.power[power as keyof typeof robotComponents.power].efficiency;

      return {
        ...prev,
        robot: { ...prev.robot, efficiency },
        stats: { ...prev.stats, efficiency }
      };
    });
  };

  const collectEnergy = (energyType: string) => {
    setGameState(prev => {
      const currentEnergy = prev.energy[energyType as keyof typeof prev.energy];
      const maxEnergy = 25;
      
      if (currentEnergy < maxEnergy) {
        const newEnergy = Math.min(currentEnergy + 5, maxEnergy);
        const newEnergyState = { ...prev.energy, [energyType]: newEnergy };
        const total = Object.values(newEnergyState).reduce((sum, energy) => {
          return typeof energy === 'number' ? sum + energy : sum;
        }, 0);
        
        return {
          ...prev,
          energy: { ...newEnergyState, total },
          stats: { ...prev.stats, totalEnergy: total }
        };
      }
      return prev;
    });
  };

  const powerTransport = (transportType: string, cost: number) => {
    setGameState(prev => {
      if (prev.energy.total >= cost && !prev.transport[transportType as keyof typeof prev.transport]) {
        return {
          ...prev,
          energy: { ...prev.energy, total: prev.energy.total - cost },
          transport: {
            ...prev.transport,
            [transportType]: true,
            powered: prev.transport.powered + 1
          },
          stats: {
            ...prev.stats,
            totalEnergy: prev.energy.total - cost,
            transportsPowered: prev.transport.powered + 1,
            ecoImpact: prev.stats.ecoImpact + cost * 2
          }
        };
      }
      return prev;
    });
  };

  const rotateTile = (index: number) => {
    setGameState(prev => {
      const newGrid = [...prev.puzzle.grid];
      const currentIndex = patterns.indexOf(newGrid[index].pattern);
      const nextIndex = (currentIndex + 1) % patterns.length;
      newGrid[index].pattern = patterns[nextIndex];
      
      return {
        ...prev,
        puzzle: { ...prev.puzzle, grid: newGrid }
      };
    });
  };

  const checkPuzzleSolution = () => {
    setGameState(prev => {
      const correct = prev.puzzle.grid.filter((tile, index) => 
        tile.pattern === tile.correct
      ).length;
      
      const isSolved = correct === prev.puzzle.grid.length;
      
      if (isSolved) {
        return {
          ...prev,
          puzzle: { ...prev.puzzle, solved: true },
          stats: {
            ...prev.stats,
            efficiency: prev.stats.efficiency + 25,
            ecoImpact: prev.stats.ecoImpact + 100
          }
        };
      }
      
      return prev;
    });
  };

  const finishGame = () => {
    const finalScore = Math.min(100, Math.floor(
      (gameState.stats.efficiency * 0.3) + 
      (gameState.stats.transportsPowered * 10) + 
      (gameState.stats.ecoImpact * 0.1)
    ));
    onComplete(finalScore);
  };

  const isStage1Complete = gameState.robot.chassis && gameState.robot.ai && gameState.robot.power;
  const isStage2Complete = gameState.energy.total >= 50;
  const isStage3Complete = gameState.transport.powered >= 2;
  const isStage4Complete = gameState.puzzle.solved;

  const renderStage1 = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t.stage1}</span>
          <Badge variant="secondary">Robotics Basics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 text-center">
            <div className="text-6xl mb-4 animate-bounce">
              {gameState.robot.chassis ? robotComponents.chassis[gameState.robot.chassis as keyof typeof robotComponents.chassis].icon : "🤖"}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {gameState.robot.chassis ? robotComponents.chassis[gameState.robot.chassis as keyof typeof robotComponents.chassis].name : "Basic Robot"}
            </h3>
            <p className="text-muted-foreground">
              {gameState.robot.chassis && gameState.robot.ai && gameState.robot.power
                ? `Equipped with ${robotComponents.ai[gameState.robot.ai as keyof typeof robotComponents.ai].name} and ${robotComponents.power[gameState.robot.power as keyof typeof robotComponents.power].name}`
                : "A simple robot ready for upgrades"
              }
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">🔧 Chassis Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(robotComponents.chassis).map(([key, component]) => (
                  <Button
                    key={key}
                    variant={gameState.robot.chassis === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectComponent('chassis', key)}
                    className="text-xs"
                  >
                    {component.icon} {component.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">🧠 AI Module</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(robotComponents.ai).map(([key, component]) => (
                  <Button
                    key={key}
                    variant={gameState.robot.ai === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectComponent('ai', key)}
                    className="text-xs"
                  >
                    {component.icon} {component.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">🔋 Power Core</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(robotComponents.power).map(([key, component]) => (
                  <Button
                    key={key}
                    variant={gameState.robot.power === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectComponent('power', key)}
                    className="text-xs"
                  >
                    {component.icon} {component.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => setCurrentStage(2)} 
          disabled={!isStage1Complete}
          className="w-full"
        >
          {t.nextEnergy}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStage2 = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t.stage2}</span>
          <Badge variant="secondary">Sustainable Energy</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">Click on renewable energy sources to power your robot!</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'solar', icon: '☀', name: 'Solar Power', desc: 'Clean & Abundant' },
            { type: 'wind', icon: '💨', name: 'Wind Power', desc: 'Always Available' },
            { type: 'hydro', icon: '💧', name: 'Hydro Power', desc: 'Steady & Reliable' },
            { type: 'geothermal', icon: '🌋', name: 'Geothermal', desc: "Earth's Heat" }
          ].map((source) => (
            <Card 
              key={source.type}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 text-center p-4"
              onClick={() => collectEnergy(source.type)}
            >
              <div className="text-4xl mb-2">{source.icon}</div>
              <h3 className="font-semibold mb-1">{source.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(gameState.energy[source.type as keyof typeof gameState.energy] / 25) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{source.desc}</p>
            </Card>
          ))}
        </div>
        
        <Button 
          onClick={() => setCurrentStage(3)} 
          disabled={!isStage2Complete}
          className="w-full"
        >
          {t.nextTransport}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStage3 = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t.stage3}</span>
          <Badge variant="secondary">Transport Systems</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">Use your collected energy to power eco-friendly transport!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'bus', icon: '🚌', name: 'Electric Bus', cost: 30, capacity: '50 people' },
            { type: 'train', icon: '🚊', name: 'Electric Train', cost: 50, capacity: '200 people' },
            { type: 'bike', icon: '🚲', name: 'E-Bike Station', cost: 10, capacity: '1 person' }
          ].map((transport) => (
            <Card 
              key={transport.type}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 text-center p-4 ${
                gameState.transport[transport.type as keyof typeof gameState.transport] 
                  ? 'bg-green-500/20 border-green-500' 
                  : gameState.energy.total >= transport.cost 
                    ? 'hover:bg-blue-500/10' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => powerTransport(transport.type, transport.cost)}
            >
              <div className="text-4xl mb-2">{transport.icon}</div>
              <h3 className="font-semibold mb-1">{transport.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">Cost: {transport.cost} Energy</p>
              <p className="text-sm text-muted-foreground">Capacity: {transport.capacity}</p>
              {gameState.transport[transport.type as keyof typeof gameState.transport] && (
                <div className="mt-2 text-green-600 font-semibold">✅ Powered!</div>
              )}
            </Card>
          ))}
        </div>
        
        <Button 
          onClick={() => setCurrentStage(4)} 
          disabled={!isStage3Complete}
          className="w-full"
        >
          {t.nextPuzzle}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStage4 = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t.stage4}</span>
          <Badge variant="secondary">Design Thinking</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🧩 Efficiency Puzzle</h3>
          <p className="text-muted-foreground mb-4">Arrange the energy flow to maximize efficiency! Click tiles to rotate them.</p>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {gameState.puzzle.grid.map((tile, index) => (
              <Button
                key={index}
                variant="outline"
                className="aspect-square text-lg hover:bg-blue-500/20"
                onClick={() => rotateTile(index)}
              >
                {tile.pattern}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={checkPuzzleSolution} variant="outline">
              {t.checkSolution}
            </Button>
            <Button onClick={generatePuzzle} variant="outline">
              {t.resetPuzzle}
            </Button>
          </div>
          
          {gameState.puzzle.solved && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-700">
              🎉 Puzzle Solved! Robot efficiency increased!
            </div>
          )}
        </div>
        
        <Button 
          onClick={finishGame} 
          disabled={!isStage4Complete}
          className="w-full"
        >
          {t.finish}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {currentStage === 1 && renderStage1()}
        {currentStage === 2 && renderStage2()}
        {currentStage === 3 && renderStage3()}
        {currentStage === 4 && renderStage4()}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">{gameState.stats.totalEnergy}</div>
            <div className="text-sm text-muted-foreground">Total Energy</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">{gameState.stats.transportsPowered}</div>
            <div className="text-sm text-muted-foreground">Transports Powered</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600 mb-1">{gameState.stats.efficiency}%</div>
            <div className="text-sm text-muted-foreground">Robot Efficiency</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">{gameState.stats.ecoImpact}</div>
            <div className="text-sm text-muted-foreground">Eco Impact Score</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overall9ET;

