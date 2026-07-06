import React, { useState, useEffect } from 'react';
import { Home, Lightbulb, Fan, Mic, Speaker, Tv, Zap, Cpu, PenTool, Database, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Overall12ETProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

interface Component {
  id: string;
  name: string;
  symbol: string;
  type: string;
  placed: boolean;
  x?: number;
  y?: number;
}

interface GameState {
  currentStage: number;
  completedStages: boolean[];
  score: number;
  components: Component[];
  circuit: string[];
  sensors: string[];
  commands: string[];
}

const Overall12ET: React.FC<Overall12ETProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentStage: 0,
    completedStages: [false, false, false, false],
    score: 0,
    components: [],
    circuit: [],
    sensors: [],
    commands: []
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('living-room');
  const [codeInput, setCodeInput] = useState<string>('');
  const [drawingMode, setDrawingMode] = useState<string>('isometric');

  const translations = {
    en: {
      title: "🏠 Smart Home Tech Quest",
      subtitle: "Build your dream smart home by mastering 4 technology areas!",
      score: "Score",
      points: "points",
      back: "Back to Dashboard",
      electricalTech: "Electrical Tech",
      electronicsTech: "Electronics Tech", 
      engineeringGraphics: "Engineering Graphics",
      informationTech: "Information Tech",
      complete: "Complete",
      inProgress: "In Progress",
      locked: "Locked",
      congratulations: "Congratulations!",
      smartHomeComplete: "You've successfully built your Smart Home!",
      finalScore: "Final Score",
      completeAllStages: "Complete all stages to build your ultimate smart home!"
    },
    hi: {
      title: "🏠 स्मार्ट होम टेक क्वेस्ट",
      subtitle: "4 तकनीकी क्षेत्रों में महारत हासिल करके अपना सपनों का स्मार्ट होम बनाएं!",
      score: "स्कोर",
      points: "अंक",
      back: "डैशबोर्ड पर वापस जाएं",
      electricalTech: "इलेक्ट्रिकल टेक",
      electronicsTech: "इलेक्ट्रॉनिक्स टेक",
      engineeringGraphics: "इंजीनियरिंग ग्राफिक्स", 
      informationTech: "सूचना प्रौद्योगिकी",
      complete: "पूर्ण",
      inProgress: "प्रगति में",
      locked: "लॉक",
      congratulations: "बधाई हो!",
      smartHomeComplete: "आपने सफलतापूर्वक अपना स्मार्ट होम बनाया है!",
      finalScore: "अंतिम स्कोर",
      completeAllStages: "अपना अंतिम स्मार्ट होम बनाने के लिए सभी चरणों को पूरा करें!"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const stages = [
    { name: t.electricalTech, icon: <Zap className="w-6 h-6" />, color: 'bg-yellow-500' },
    { name: t.electronicsTech, icon: <Cpu className="w-6 h-6" />, color: 'bg-blue-500' },
    { name: t.engineeringGraphics, icon: <PenTool className="w-6 h-6" />, color: 'bg-green-500' },
    { name: t.informationTech, icon: <Database className="w-6 h-6" />, color: 'bg-purple-500' }
  ];

  const electricalComponents = [
    { id: 'bulb1', name: 'Light Bulb', symbol: '💡', type: 'light' },
    { id: 'fan1', name: 'Ceiling Fan', symbol: '🌀', type: 'fan' },
    { id: 'switch1', name: 'Switch', symbol: '🔘', type: 'switch' },
    { id: 'outlet1', name: 'Power Outlet', symbol: '🔌', type: 'outlet' }
  ];

  const electronicComponents = [
    { id: 'motion1', name: 'Motion Sensor', symbol: '👁️', type: 'sensor' },
    { id: 'mic1', name: 'Microphone', symbol: '🎤', type: 'audio' },
    { id: 'speaker1', name: 'Speaker', symbol: '🔊', type: 'audio' },
    { id: 'tv1', name: 'Smart TV', symbol: '📺', type: 'display' }
  ];

  // Stage 1: Electrical Circuit Building
  const ElectricalStage = () => {
    const [circuitComplete, setCircuitComplete] = useState(false);
    const [placedComponents, setPlacedComponents] = useState<Component[]>([]);

    const handleDrop = (e: React.DragEvent, zone: string) => {
      e.preventDefault();
      const componentId = e.dataTransfer.getData('text/plain');
      const component = electricalComponents.find(c => c.id === componentId);
      
      if (component) {
        const newComponent = { ...component, placed: true, x: e.clientX, y: e.clientY };
        setPlacedComponents(prev => [...prev, newComponent]);
        
        if (placedComponents.length >= 3) {
          setCircuitComplete(true);
          completeStage(0);
        }
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-yellow-600">Stage 1: Electrical Circuit Design</h3>
        <p className="text-gray-700">Drag and drop electrical components to create a working circuit!</p>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Components Toolbox</h4>
            <div className="grid grid-cols-2 gap-2">
              {electricalComponents.map(component => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', component.id)}
                  className="bg-white p-3 rounded border cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl text-center mb-1">{component.symbol}</div>
                  <div className="text-xs text-center">{component.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 min-h-64"
            onDrop={(e) => handleDrop(e, 'circuit')}
            onDragOver={(e) => e.preventDefault()}
          >
            <h4 className="font-semibold mb-3">Circuit Board</h4>
            <div className="relative h-full">
              {placedComponents.map((component, index) => (
                <div key={index} className="absolute bg-white p-2 rounded shadow-md">
                  <span className="text-lg">{component.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {circuitComplete && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Circuit Complete! Moving to next stage...
          </div>
        )}
      </div>
    );
  };

  // Stage 2: Electronics & Sensors
  const ElectronicsStage = () => {
    const [connectedSensors, setConnectedSensors] = useState<string[]>([]);
    
    const connectSensor = (sensorId: string) => {
      if (!connectedSensors.includes(sensorId)) {
        const newConnected = [...connectedSensors, sensorId];
        setConnectedSensors(newConnected);
        
        if (newConnected.length >= 3) {
          completeStage(1);
        }
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-blue-600">Stage 2: Electronics & Sensor Integration</h3>
        <p className="text-gray-700">Connect sensors and electronic devices to make your home smart!</p>
        
        <div className="grid grid-cols-3 gap-4">
          {electronicComponents.map(component => (
            <div 
              key={component.id}
              onClick={() => connectSensor(component.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                connectedSensors.includes(component.id) 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 bg-white hover:border-blue-500'
              }`}
            >
              <div className="text-3xl text-center mb-2">{component.symbol}</div>
              <div className="text-sm text-center font-medium">{component.name}</div>
              {connectedSensors.includes(component.id) && (
                <div className="text-green-600 text-center mt-2">
                  <CheckCircle className="w-4 h-4 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Connected Devices: {connectedSensors.length}/4</h4>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(connectedSensors.length / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Stage 3: Engineering Graphics
  const EngineeringStage = () => {
    const [drawingComplete, setDrawingComplete] = useState(false);
    const [selectedView, setSelectedView] = useState('isometric');
    
    const completeDrawing = () => {
      setDrawingComplete(true);
      completeStage(2);
    };

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-green-600">Stage 3: Engineering Graphics</h3>
        <p className="text-gray-700">Create technical drawings of your smart home!</p>
        
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setSelectedView('isometric')}
            className={`px-4 py-2 rounded ${selectedView === 'isometric' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Isometric View
          </button>
          <button 
            onClick={() => setSelectedView('orthographic')}
            className={`px-4 py-2 rounded ${selectedView === 'orthographic' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Orthographic View
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 h-64">
            <h4 className="font-semibold mb-3">{selectedView === 'isometric' ? 'Isometric' : 'Orthographic'} Drawing</h4>
            <div className="border border-gray-200 h-40 rounded bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                {selectedView === 'isometric' ? (
                  <div className="text-6xl">🏠</div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-12 h-12 bg-blue-200 rounded"></div>
                    <div className="w-12 h-12 bg-green-200 rounded"></div>
                    <div className="w-12 h-12 bg-yellow-200 rounded"></div>
                    <div className="w-12 h-12 bg-red-200 rounded"></div>
                  </div>
                )}
                <p className="text-sm mt-2">Click to complete drawing</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Drawing Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-gray-200 p-3 rounded hover:bg-gray-300">Line Tool</button>
              <button className="bg-gray-200 p-3 rounded hover:bg-gray-300">Rectangle</button>
              <button className="bg-gray-200 p-3 rounded hover:bg-gray-300">Circle</button>
              <button 
                onClick={completeDrawing}
                className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
              >
                Complete Drawing
              </button>
            </div>
          </div>
        </div>
        
        {drawingComplete && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Technical Drawing Complete!
          </div>
        )}
      </div>
    );
  };

  // Stage 4: Information Technology & Automation
  const ITStage = () => {
    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);
    
    const sampleCode = `if (motionSensor.detected) {
  lights.turnOn();
  speaker.play("Welcome home!");
} else {
  lights.turnOff();
}

if (temperature > 25) {
  fan.turnOn();
}`;

    const validateCode = (inputCode: string) => {
      const hasIfStatement = inputCode.includes('if');
      const hasCondition = inputCode.includes('sensor') || inputCode.includes('temperature');
      const hasAction = inputCode.includes('turnOn') || inputCode.includes('turnOff');
      
      if (hasIfStatement && hasCondition && hasAction) {
        setCodeValid(true);
        completeStage(3);
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-purple-600">Stage 4: Smart Home Automation</h3>
        <p className="text-gray-700">Write code to automate your smart home!</p>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Example Code:</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
              {sampleCode}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Your Automation Code:</h4>
            <textarea 
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                validateCode(e.target.value);
              }}
              placeholder="Write your if-else automation logic here..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-sm"
            />
            
            <div className="mt-4 space-y-2">
              <h5 className="font-medium">Requirements:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Use if-else statements</li>
                <li>✓ Include sensor conditions</li>
                <li>✓ Add device actions (turnOn/turnOff)</li>
              </ul>
            </div>
          </div>
        </div>
        
        {codeValid && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Automation Code Valid! Smart Home Complete!
          </div>
        )}
      </div>
    );
  };

  const completeStage = (stageIndex: number) => {
    setGameState(prev => {
      const newCompleted = [...prev.completedStages];
      newCompleted[stageIndex] = true;
      const newScore = prev.score + 250;
      const newCurrentStage = Math.min(stageIndex + 1, 3);
      
      // Check if all stages are completed
      const allCompleted = newCompleted.every(completed => completed);
      if (allCompleted) {
        // Calculate final score and complete the game
        const finalScore = Math.min(100, Math.floor(newScore / 10));
        setTimeout(() => onComplete(finalScore), 2000);
      }
      
      return {
        ...prev,
        completedStages: newCompleted,
        score: newScore,
        currentStage: newCurrentStage
      };
    });
  };

  const renderCurrentStage = () => {
    switch (gameState.currentStage) {
      case 0: return <ElectricalStage />;
      case 1: return <ElectronicsStage />;
      case 2: return <EngineeringStage />;
      case 3: return <ITStage />;
      default: 
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">{t.congratulations}</h2>
            <p className="text-xl text-gray-700 mb-6">{t.smartHomeComplete}</p>
            <p className="text-lg">{t.finalScore}: {gameState.score} {t.points}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Score Display */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {t.score}: {gameState.score} {t.points}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${gameState.completedStages[index] ? 'bg-green-500' : 
                    index === gameState.currentStage ? stage.color : 'bg-gray-300'}
                `}>
                  {gameState.completedStages[index] ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : index > gameState.currentStage ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    stage.icon
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <div className="font-medium">{stage.name}</div>
                  <div className="text-gray-500">
                    {gameState.completedStages[index] ? t.complete : 
                     index === gameState.currentStage ? t.inProgress : t.locked}
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded ${
                    gameState.completedStages[index] ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            {renderCurrentStage()}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p>{t.completeAllStages}</p>
        </div>
      </div>
    </div>
  );
};

export default Overall12ET;