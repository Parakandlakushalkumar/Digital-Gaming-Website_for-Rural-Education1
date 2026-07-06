import React, { useState, useEffect } from 'react';
import { Eye, RotateCcw, Trophy, Zap, CheckCircle } from 'lucide-react';

interface Microorganism {
  id: string;
  name: string;
  type: 'bacteria' | 'virus' | 'fungi' | 'protozoa';
  image: string;
  facts: string[];
  matched: boolean;
}

const microorganisms: Microorganism[] = [
  {
    id: 'ecoli',
    name: 'E. coli',
    type: 'bacteria',
    image: '🦠',
    facts: ['Rod-shaped bacteria', 'Found in intestines', 'Some strains cause food poisoning'],
    matched: false
  },
  {
    id: 'streptococcus',
    name: 'Streptococcus',
    type: 'bacteria',
    image: '🔗',
    facts: ['Chain-forming bacteria', 'Causes strep throat', 'Spherical shape'],
    matched: false
  },
  {
    id: 'influenza',
    name: 'Influenza',
    type: 'virus',
    image: '🦠',
    facts: ['Causes flu', 'RNA virus', 'Spreads through respiratory droplets'],
    matched: false
  },
  {
    id: 'covid',
    name: 'Coronavirus',
    type: 'virus',
    image: '👑',
    facts: ['Crown-like appearance', 'RNA virus', 'Causes respiratory illness'],
    matched: false
  },
  {
    id: 'yeast',
    name: 'Yeast',
    type: 'fungi',
    image: '🍞',
    facts: ['Single-celled fungi', 'Used in baking', 'Fermentation process'],
    matched: false
  },
  {
    id: 'mushroom',
    name: 'Mushroom',
    type: 'fungi',
    image: '🍄',
    facts: ['Multicellular fungi', 'Reproduces by spores', 'Decomposes organic matter'],
    matched: false
  },
  {
    id: 'amoeba',
    name: 'Amoeba',
    type: 'protozoa',
    image: '🫧',
    facts: ['Single-celled organism', 'Changes shape constantly', 'Lives in water'],
    matched: false
  },
  {
    id: 'paramecium',
    name: 'Paramecium',
    type: 'protozoa',
    image: '🥿',
    facts: ['Slipper-shaped', 'Has cilia for movement', 'Found in pond water'],
    matched: false
  }
];

const categories = {
  bacteria: { name: 'Bacteria', color: 'bg-red-100 border-red-300', bgColor: 'bg-red-50' },
  virus: { name: 'Viruses', color: 'bg-purple-100 border-purple-300', bgColor: 'bg-purple-50' },
  fungi: { name: 'Fungi', color: 'bg-green-100 border-green-300', bgColor: 'bg-green-50' },
  protozoa: { name: 'Protozoa', color: 'bg-blue-100 border-blue-300', bgColor: 'bg-blue-50' }
};

const MicroorganismsPuzzle: React.FC = () => {
  const [organisms, setOrganisms] = useState<Microorganism[]>([]);
  const [selectedOrganism, setSelectedOrganism] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof categories>('bacteria');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFacts, setShowFacts] = useState<string | null>(null);

  useEffect(() => {
    shuffleOrganisms();
  }, []);

  useEffect(() => {
    const matchedCount = organisms.filter(org => org.matched).length;
    if (matchedCount === organisms.length && organisms.length > 0) {
      setGameComplete(true);
    }
  }, [organisms]);

  const shuffleOrganisms = () => {
    const shuffled = [...microorganisms]
      .map(org => ({ ...org, matched: false }))
      .sort(() => Math.random() - 0.5);
    setOrganisms(shuffled);
    setScore(0);
    setGameComplete(false);
    setSelectedOrganism(null);
    setShowFacts(null);
  };

  const handleOrganismClick = (organismId: string) => {
    const organism = organisms.find(org => org.id === organismId);
    if (!organism || organism.matched) return;

    if (organism.type === currentCategory) {
      // Correct match
      setOrganisms(prev => prev.map(org => 
        org.id === organismId ? { ...org, matched: true } : org
      ));
      setScore(score + 20);
      setSelectedOrganism(null);
    } else {
      // Show facts for incorrect selection
      setShowFacts(organismId);
      setTimeout(() => setShowFacts(null), 3000);
    }
  };

  const resetGame = () => {
    shuffleOrganisms();
    setCurrentCategory('bacteria');
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Excellent Work!</h2>
          <div className="text-6xl font-bold mb-4 text-purple-600">
            {score} Points
          </div>
          <p className="text-xl text-gray-600 mb-6">
            🔬 You've mastered microorganisms classification!
          </p>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentCategoryOrganisms = organisms.filter(org => org.type === currentCategory && !org.matched);
  const progress = organisms.filter(org => org.matched).length;
  const total = organisms.length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Microorganisms Explorer</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-purple-100">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-purple-100">Progress</div>
                <div className="text-2xl font-bold">{progress}/{total}</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-purple-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress / total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-purple-50 border-b">
          <h3 className="font-semibold text-purple-800 mb-2">How to Play:</h3>
          <p className="text-purple-700">
            Select the category below, then click on microorganisms that belong to that category. Learn facts about each one!
          </p>
        </div>

        {/* Category Selector */}
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-800 mb-4">Select Category to Find:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setCurrentCategory(key as keyof typeof categories)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  currentCategory === key 
                    ? `${category.color} border-blue-500 shadow-lg scale-105` 
                    : `${category.color} hover:scale-102`
                }`}
              >
                <div className="font-bold text-gray-800">{category.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {organisms.filter(org => org.type === key && !org.matched).length} remaining
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Target */}
        <div className={`p-4 ${categories[currentCategory].bgColor} border-b`}>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🎯 Find all {categories[currentCategory].name.toLowerCase()}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {currentCategoryOrganisms.length} remaining in this category
            </p>
          </div>
        </div>

        {/* Game Board */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {organisms.map((organism) => {
              const isTarget = organism.type === currentCategory && !organism.matched;
              const showingFacts = showFacts === organism.id;
              
              let cardClass = "p-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-300 transform ";
              
              if (organism.matched) {
                cardClass += `${categories[organism.type].color} border-green-500 scale-95 opacity-50`;
              } else if (isTarget) {
                cardClass += "border-green-500 bg-green-100 hover:scale-105 shadow-lg animate-pulse";
              } else if (showingFacts) {
                cardClass += "border-red-500 bg-red-100 scale-105 shadow-lg";
              } else {
                cardClass += "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 hover:scale-102";
              }

              return (
                <div key={organism.id} className="relative">
                  <div
                    onClick={() => handleOrganismClick(organism.id)}
                    className={cardClass}
                  >
                    <div className="text-4xl mb-2">{organism.image}</div>
                    <div className="font-medium text-gray-800 text-sm mb-1">
                      {organism.name}
                    </div>
                    <div className="text-xs text-gray-600 capitalize">
                      {organism.type}
                    </div>
                    {organism.matched && (
                      <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                    )}
                  </div>
                  
                  {/* Facts popup */}
                  {showingFacts && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border-2 border-red-300 rounded-lg shadow-lg z-10">
                      <div className="text-xs font-semibold text-red-600 mb-1">Facts about {organism.name}:</div>
                      {organism.facts.map((fact, index) => (
                        <div key={index} className="text-xs text-gray-700">• {fact}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center gap-4">
          <button
            onClick={shuffleOrganisms}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Shuffle
          </button>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default MicroorganismsPuzzle;