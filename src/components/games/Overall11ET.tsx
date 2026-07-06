import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface TechLabGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  items: Array<{
    id: string;
    name: string;
    correctComponent: string;
    currentComponent?: string;
    isCorrect: boolean;
  }>;
  components: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  isCompleted: boolean;
}

const TechLabSimulator: React.FC<TechLabGameProps> = ({ onComplete, onExit, currentLanguage = 'en' }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const tasks: Task[] = [
    {
      id: 'iot',
      title: 'IoT Basics – Sensor Connection Challenge',
      description: 'Drag the correct sensor/controller to each device in the house.',
      items: [
        { id: 'thermostat', name: 'Thermostat', correctComponent: 'temp-sensor', isCorrect: false },
        { id: 'light', name: 'Light Bulb', correctComponent: 'light-controller', isCorrect: false },
        { id: 'door', name: 'Door Sensor', correctComponent: 'door-sensor', isCorrect: false }
      ],
      components: [
        { id: 'temp-sensor', name: 'Temp Sensor', type: 'sensor' },
        { id: 'light-controller', name: 'Light Controller', type: 'sensor' },
        { id: 'door-sensor', name: 'Door Sensor', type: 'sensor' }
      ],
      isCompleted: false
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Applications – Pattern Recognition Puzzle',
      description: 'Drag labels to classify the images correctly.',
      items: [
        { id: 'cat-image', name: 'Cat Image', correctComponent: 'cat', isCorrect: false },
        { id: 'dog-image', name: 'Dog Image', correctComponent: 'dog', isCorrect: false },
        { id: 'car-image', name: 'Car Image', correctComponent: 'car', isCorrect: false }
      ],
      components: [
        { id: 'cat', name: 'Cat', type: 'label' },
        { id: 'dog', name: 'Dog', type: 'label' },
        { id: 'car', name: 'Car', type: 'label' }
      ],
      isCompleted: false
    },
    {
      id: 'renewable',
      title: 'Renewable Technologies – Power the City',
      description: 'Drag energy sources to the correct spots in the city.',
      items: [
        { id: 'roof', name: 'Roof (for Solar)', correctComponent: 'solar-panel', isCorrect: false },
        { id: 'tower', name: 'Tower (for Wind)', correctComponent: 'wind-turbine', isCorrect: false },
        { id: 'storage', name: 'Storage (for Battery)', correctComponent: 'battery', isCorrect: false }
      ],
      components: [
        { id: 'solar-panel', name: 'Solar Panel', type: 'source' },
        { id: 'wind-turbine', name: 'Wind Turbine', type: 'source' },
        { id: 'battery', name: 'Battery', type: 'source' }
      ],
      isCompleted: false
    },
    {
      id: 'electronics',
      title: 'Electronics & Communication Basics – Circuit Builder',
      description: 'Drag components to build the circuit correctly (Battery -> Resistor -> LED -> Switch).',
      items: [
        { id: 'slot1', name: 'Slot 1', correctComponent: 'battery', isCorrect: false },
        { id: 'slot2', name: 'Slot 2', correctComponent: 'resistor', isCorrect: false },
        { id: 'slot3', name: 'Slot 3 (LED)', correctComponent: 'led', isCorrect: false },
        { id: 'slot4', name: 'Slot 4', correctComponent: 'switch', isCorrect: false }
      ],
      components: [
        { id: 'battery', name: 'Battery', type: 'component' },
        { id: 'resistor', name: 'Resistor', type: 'component' },
        { id: 'led', name: 'LED', type: 'component' },
        { id: 'switch', name: 'Switch', type: 'component' }
      ],
      isCompleted: false
    }
  ];

  const [gameTasks, setGameTasks] = useState<Task[]>(tasks);

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedItem(componentId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const task = gameTasks[currentTask];
    const item = task.items.find(i => i.id === itemId);
    const component = task.components.find(c => c.id === draggedItem);

    if (item && component) {
      const isCorrect = component.id === item.correctComponent;
      
      setGameTasks(prevTasks => 
        prevTasks.map((t, taskIndex) => 
          taskIndex === currentTask 
            ? {
                ...t,
                items: t.items.map(i => 
                  i.id === itemId 
                    ? { ...i, currentComponent: component.id, isCorrect }
                    : i
                )
              }
            : t
        )
      );

      if (isCorrect) {
        setScore(prev => prev + 10);
      }
    }

    setDraggedItem(null);
    checkTaskCompletion();
  };

  const checkTaskCompletion = () => {
    const currentTaskData = gameTasks[currentTask];
    const allCorrect = currentTaskData.items.every(item => item.isCorrect);
    
    if (allCorrect && !completedTasks.includes(currentTask)) {
      setCompletedTasks(prev => [...prev, currentTask]);
      setScore(prev => prev + 25); // Bonus for completing task
      
      setGameTasks(prevTasks => 
        prevTasks.map((t, index) => 
          index === currentTask 
            ? { ...t, isCompleted: true }
            : t
        )
      );
    }
  };

  const nextTask = () => {
    if (currentTask < gameTasks.length - 1) {
      setCurrentTask(currentTask + 1);
    }
  };

  const prevTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
    }
  };

  const resetGame = () => {
    setCurrentTask(0);
    setCompletedTasks([]);
    setScore(0);
    setGameTasks(tasks);
  };

  const allTasksCompleted = completedTasks.length === gameTasks.length;

  const getItemIcon = (itemId: string) => {
    switch (itemId) {
      case 'thermostat': return '🌡️';
      case 'light': return '💡';
      case 'door': return '🚪';
      case 'cat-image': return '🐱';
      case 'dog-image': return '🐕';
      case 'car-image': return '🚗';
      case 'roof': return '🏠';
      case 'tower': return '🏗️';
      case 'storage': return '🔋';
      case 'slot1': return '1️⃣';
      case 'slot2': return '2️⃣';
      case 'slot3': return '3️⃣';
      case 'slot4': return '4️⃣';
      default: return '📦';
    }
  };

  const getComponentIcon = (componentId: string) => {
    switch (componentId) {
      case 'temp-sensor': return '🌡️';
      case 'light-controller': return '💡';
      case 'door-sensor': return '🚪';
      case 'cat': return '🐱';
      case 'dog': return '🐕';
      case 'car': return '🚗';
      case 'solar-panel': return '☀️';
      case 'wind-turbine': return '💨';
      case 'battery': return '🔋';
      case 'resistor': return '⚡';
      case 'led': return '💡';
      case 'switch': return '🔘';
      default: return '🔧';
    }
  };

  const currentTaskData = gameTasks[currentTask];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                🔬 Tech Lab Simulator
              </h1>
              <p className="text-gray-600">
                Grade 11 Engineering & Technology Challenge
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <button
                onClick={onExit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Task {currentTask + 1} of {gameTasks.length}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevTask}
                disabled={currentTask === 0}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-semibold"
              >
                ← Previous
              </button>
              <button
                onClick={nextTask}
                disabled={currentTask === gameTasks.length - 1}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-semibold"
              >
                Next →
              </button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentTask + 1) / gameTasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Task */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentTaskData.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {currentTaskData.description}
          </p>

          {/* Task Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {currentTaskData.items.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${
                  item.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : item.currentComponent
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                <div className="text-3xl mb-2">{getItemIcon(item.id)}</div>
                <div className="font-semibold text-gray-800 mb-2">{item.name}</div>
                {item.currentComponent && (
                  <div className="text-sm text-gray-600">
                    Connected: {currentTaskData.components.find(c => c.id === item.currentComponent)?.name}
                  </div>
                )}
                {item.isCorrect && (
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
                )}
                {item.currentComponent && !item.isCorrect && (
                  <XCircle className="w-6 h-6 text-red-500 mx-auto mt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Components */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentTaskData.components.map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component.id)}
                className="p-4 bg-blue-100 border-2 border-blue-300 rounded-lg text-center cursor-grab hover:bg-blue-200 hover:scale-105 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{getComponentIcon(component.id)}</div>
                <div className="font-semibold text-blue-800">{component.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Status */}
        {currentTaskData.isCompleted && (
          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 mb-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Task Completed!</h3>
            <p className="text-green-700">Great job! You've successfully completed this engineering challenge.</p>
          </div>
        )}

        {/* All Tasks Completed */}
        {allTasksCompleted && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">🎉 All Tasks Completed! 🎉</h2>
            <p className="text-xl mb-6">Congratulations! You've mastered all Engineering & Technology challenges!</p>
            <p className="text-2xl font-bold mb-6">Final Score: {score}</p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onComplete(Math.min(score, 100))}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Complete Game
              </button>
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {!allTasksCompleted && (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechLabSimulator;
