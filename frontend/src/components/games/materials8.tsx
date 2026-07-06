import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Trophy, Atom, CheckCircle, X } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'metal' | 'non-metal' | 'coal' | 'petroleum';
  properties: string[];
  uses: string[];
  emoji: string;
}

const materials: Material[] = [
  // Metals
  {
    id: 'iron',
    name: 'Iron',
    type: 'metal',
    properties: ['Strong', 'Magnetic', 'Conducts electricity', 'Rusts in air'],
    uses: ['Construction', 'Tools', 'Vehicles'],
    emoji: '🔩'
  },
  {
    id: 'copper',
    name: 'Copper',
    type: 'metal',
    properties: ['Good conductor', 'Reddish color', 'Malleable', 'Ductile'],
    uses: ['Electrical wires', 'Coins', 'Utensils'],
    emoji: '🪙'
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    type: 'metal',
    properties: ['Lightweight', 'Resistant to corrosion', 'Good conductor'],
    uses: ['Aircraft', 'Cans', 'Cookware'],
    emoji: '🥤'
  },
  {
    id: 'gold',
    name: 'Gold',
    type: 'metal',
    properties: ['Does not tarnish', 'Very malleable', 'Excellent conductor'],
    uses: ['Jewelry', 'Electronics', 'Currency'],
    emoji: '🥇'
  },
  
  // Non-metals
  {
    id: 'carbon',
    name: 'Carbon',
    type: 'non-metal',
    properties: ['Can be soft or hard', 'Poor conductor', 'Forms many compounds'],
    uses: ['Pencil lead', 'Diamond tools', 'Fuel'],
    emoji: '✏️'
  },
  {
    id: 'sulfur',
    name: 'Sulfur',
    type: 'non-metal',
    properties: ['Yellow powder', 'Brittle', 'Burns with blue flame'],
    uses: ['Fertilizers', 'Medicine', 'Rubber'],
    emoji: '💛'
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    type: 'non-metal',
    properties: ['Colorless gas', 'Supports combustion', 'Essential for life'],
    uses: ['Breathing', 'Combustion', 'Medical use'],
    emoji: '💨'
  },
  {
    id: 'phosphorus',
    name: 'Phosphorus',
    type: 'non-metal',
    properties: ['Glows in dark', 'Highly reactive', 'Waxy solid'],
    uses: ['Matches', 'Fertilizers', 'Fireworks'],
    emoji: '🔥'
  },
  
  // Coal types
  {
    id: 'anthracite',
    name: 'Anthracite',
    type: 'coal',
    properties: ['Hardest coal', 'High carbon content', 'Burns cleanly'],
    uses: ['Heating', 'Steel production', 'Power generation'],
    emoji: '⚫'
  },
  {
    id: 'bituminous',
    name: 'Bituminous',
    type: 'coal',
    properties: ['Medium hardness', 'High energy content', 'Most common type'],
    uses: ['Electricity', 'Steel making', 'Cement production'],
    emoji: '🪨'
  },
  
  // Petroleum products
  {
    id: 'petrol',
    name: 'Petrol',
    type: 'petroleum',
    properties: ['Liquid fuel', 'Highly flammable', 'Volatile'],
    uses: ['Vehicle fuel', 'Solvent', 'Chemical industry'],
    emoji: '⛽'
  },
  {
    id: 'diesel',
    name: 'Diesel',
    type: 'petroleum',
    properties: ['Heavy fuel oil', 'Less volatile than petrol', 'High energy density'],
    uses: ['Trucks', 'Ships', 'Generators'],
    emoji: '🚛'
  },
  {
    id: 'kerosene',
    name: 'Kerosene',
    type: 'petroleum',
    properties: ['Clear liquid', 'Burns with clean flame', 'Less volatile'],
    uses: ['Jet fuel', 'Heating', 'Lamps'],
    emoji: '✈️'
  },
  {
    id: 'lpg',
    name: 'LPG',
    type: 'petroleum',
    properties: ['Liquefied gas', 'Clean burning', 'Portable'],
    uses: ['Cooking', 'Heating', 'Vehicles'],
    emoji: '🔥'
  }
];

const categories = {
  metal: { name: 'Metals', color: 'bg-gray-100 border-gray-400', icon: '🔩' },
  'non-metal': { name: 'Non-Metals', color: 'bg-yellow-100 border-yellow-400', icon: '💎' },
  coal: { name: 'Coal', color: 'bg-stone-100 border-stone-400', icon: '⚫' },
  petroleum: { name: 'Petroleum', color: 'bg-amber-100 border-amber-400', icon: '⛽' }
};

const MaterialsPuzzle: React.FC = () => {
  const [gameMode, setGameMode] = useState<'classify' | 'properties'>('classify');
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  });

  useEffect(() => {
    if (questionsAnswered === 0) {
      nextQuestion();
    }
  }, []);

  useEffect(() => {
    if (questionsAnswered >= 15) {
      setGameComplete(true);
    }
  }, [questionsAnswered]);

  const nextQuestion = () => {
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
    setCurrentMaterial(randomMaterial);
    setUserAnswer('');
    setFeedback({ show: false, correct: false, message: '' });
  };

  const handleAnswer = (answer: string) => {
    if (!currentMaterial) return;

    const isCorrect = answer === currentMaterial.type;
    const points = isCorrect ? 10 : 0;
    
    setScore(score + points);
    setQuestionsAnswered(questionsAnswered + 1);
    
    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect 
        ? `Correct! ${currentMaterial.name} is a ${currentMaterial.type}.`
        : `Incorrect. ${currentMaterial.name} is a ${currentMaterial.type}, not a ${answer}.`
    });

    setTimeout(() => {
      if (questionsAnswered < 14) {
        nextQuestion();
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setGameComplete(false);
    setCurrentMaterial(null);
    setFeedback({ show: false, correct: false, message: '' });
    nextQuestion();
  };

  if (gameComplete) {
    const percentage = (score / (questionsAnswered * 10)) * 100;
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-stone-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-amber-600">
            {score}/{questionsAnswered * 10}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            🎯 Accuracy: {percentage.toFixed(1)}%
          </p>
          <div className="text-lg text-gray-700 mb-8">
            {percentage >= 80 ? '🏆 Excellent knowledge of materials!' :
             percentage >= 60 ? '👍 Good understanding of materials!' :
             '📚 Keep studying materials and their properties!'}
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-amber-500 to-stone-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-stone-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentMaterial) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-stone-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-stone-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Materials Classification</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-amber-100">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-amber-100">Question</div>
                <div className="text-2xl font-bold">{questionsAnswered + 1}/15</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-amber-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((questionsAnswered + 1) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{currentMaterial.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentMaterial.name}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              What type of material is this?
            </p>
          </div>

          {/* Properties Display */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3">Properties:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentMaterial.properties.map((property, index) => (
                <div key={index} className="text-blue-700 flex items-center gap-2">
                  <Atom className="w-4 h-4" />
                  {property}
                </div>
              ))}
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={feedback.show}
                className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  feedback.show 
                    ? (key === currentMaterial.type 
                        ? 'bg-green-100 border-green-500' 
                        : 'bg-gray-100 border-gray-300 opacity-50')
                    : `${category.color} hover:shadow-lg`
                } ${feedback.show ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-bold text-gray-800">{category.name}</div>
                {feedback.show && key === currentMaterial.type && (
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback.show && (
            <div className={`p-4 rounded-lg border-2 text-center ${
              feedback.correct 
                ? 'bg-green-100 border-green-500 text-green-800' 
                : 'bg-red-100 border-red-500 text-red-800'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {feedback.correct ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <X className="w-6 h-6" />
                )}
                <span className="font-semibold">{feedback.message}</span>
              </div>
              
              {/* Uses */}
              <div className="mt-4 text-sm">
                <strong>Common uses:</strong> {currentMaterial.uses.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPuzzle