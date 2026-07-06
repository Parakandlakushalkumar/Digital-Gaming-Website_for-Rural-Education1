import React, { useState, useEffect } from 'react';
import { Check, X, Shuffle, Star } from 'lucide-react';

const MaterialPropertyMatch = () => {
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');

  const materials = [
    { id: 1, name: 'Glass', emoji: '🪟', properties: ['Transparent', 'Hard', 'Brittle'] },
    { id: 2, name: 'Cotton', emoji: '🧵', properties: ['Soft', 'Flexible', 'Absorbent'] },
    { id: 3, name: 'Iron', emoji: '⚙️', properties: ['Hard', 'Heavy', 'Magnetic'] },
    { id: 4, name: 'Rubber', emoji: '🎈', properties: ['Flexible', 'Elastic', 'Waterproof'] },
    { id: 5, name: 'Wood', emoji: '🪵', properties: ['Hard', 'Natural', 'Floats'] },
    { id: 6, name: 'Plastic', emoji: '🥤', properties: ['Light', 'Waterproof', 'Flexible'] }
  ];

  const allProperties = [
    'Transparent', 'Hard', 'Brittle', 'Soft', 'Flexible', 'Absorbent', 
    'Heavy', 'Magnetic', 'Elastic', 'Waterproof', 'Natural', 'Light', 'Floats'
  ];

  const [currentRound, setCurrentRound] = useState(0);
  const [usedMaterials, setUsedMaterials] = useState([]);
  const [roundProperties, setRoundProperties] = useState([]);

  // Initialize first round
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    if (currentRound >= materials.length) {
      setGameComplete(true);
      return;
    }

    const currentMaterial = materials[currentRound];
    // Mix correct properties with some incorrect ones
    const incorrectProps = allProperties.filter(prop => 
      !currentMaterial.properties.includes(prop)
    ).slice(0, 3);
    
    const shuffledProps = [...currentMaterial.properties, ...incorrectProps]
      .sort(() => Math.random() - 0.5);
    
    setRoundProperties(shuffledProps);
    setSelectedMaterial(null);
    setSelectedProperty(null);
  };

  const handleMaterialSelect = (material) => {
    if (usedMaterials.includes(material.id)) return;
    setSelectedMaterial(material);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleMatch = () => {
    if (!selectedMaterial || !selectedProperty) return;

    const isCorrect = selectedMaterial.properties.includes(selectedProperty);
    
    if (isCorrect) {
      setScore(score + 10);
      setMatches({
        ...matches,
        [selectedMaterial.id]: [...(matches[selectedMaterial.id] || []), selectedProperty]
      });
      setFeedback(`✅ Correct! ${selectedMaterial.name} is ${selectedProperty.toLowerCase()}!`);
      
      // Check if all properties for this material are found
      const materialMatches = [...(matches[selectedMaterial.id] || []), selectedProperty];
      if (materialMatches.length === selectedMaterial.properties.length) {
        setUsedMaterials([...usedMaterials, selectedMaterial.id]);
        setTimeout(() => {
          setCurrentRound(currentRound + 1);
          startNewRound();
        }, 1500);
      }
    } else {
      setFeedback(`❌ Not quite! ${selectedMaterial.name} is not ${selectedProperty.toLowerCase()}.`);
    }

    setSelectedProperty(null);
    setTimeout(() => setFeedback(''), 1500);
  };

  const resetGame = () => {
    setScore(0);
    setMatches({});
    setCurrentRound(0);
    setUsedMaterials([]);
    setGameComplete(false);
    setFeedback('');
    setSelectedMaterial(null);
    setSelectedProperty(null);
    startNewRound();
  };

  const currentMaterial = materials[currentRound];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            🔬 Material Property Match
          </h1>
          <p className="text-gray-600">Match materials with their properties!</p>
          
          {/* Progress & Score */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Round: {currentRound + 1}/{materials.length}</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4 p-3 bg-white rounded-lg shadow">
            <p className="font-semibold text-lg">{feedback}</p>
          </div>
        )}

        {!gameComplete ? (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Current Material */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">🧪 Current Material</h3>
              {currentMaterial && (
                <div className="text-center">
                  <div className="text-6xl mb-4">{currentMaterial.emoji}</div>
                  <h4 className="text-2xl font-bold mb-2">{currentMaterial.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Find all {currentMaterial.properties.length} properties for this material
                  </p>
                  
                  {/* Found Properties */}
                  <div className="space-y-2">
                    {(matches[currentMaterial.id] || []).map((prop, idx) => (
                      <div key={idx} className="bg-green-100 p-2 rounded flex items-center justify-center gap-2">
                        <Check className="text-green-600" size={16} />
                        <span className="text-sm font-semibold">{prop}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-xs text-gray-500">
                      Progress: {(matches[currentMaterial.id] || []).length}/{currentMaterial.properties.length}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${((matches[currentMaterial.id] || []).length / currentMaterial.properties.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Properties */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">⚡ Properties</h3>
              <div className="grid grid-cols-2 gap-2">
                {roundProperties.map((property, idx) => {
                  const isUsed = currentMaterial && (matches[currentMaterial.id] || []).includes(property);
                  const isSelected = selectedProperty === property;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => !isUsed && handlePropertySelect(property)}
                      disabled={isUsed}
                      className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                        isUsed 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {property}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Match Controls */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">🎯 Match Control</h3>
              
              <div className="space-y-4">
                {selectedProperty && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Selected Property:</p>
                    <p className="font-bold text-blue-800">{selectedProperty}</p>
                  </div>
                )}
                
                <button
                  onClick={handleMatch}
                  disabled={!selectedProperty}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {selectedProperty ? `Match with ${currentMaterial?.name}` : 'Select a Property'}
                </button>
                
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Game Complete */
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🏆 Congratulations!</h2>
            <p className="text-xl mb-4">You've mastered material properties!</p>
            <p className="text-gray-600 mb-6">Final Score: {score} points</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {materials.map(material => (
                <div key={material.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl mb-2">{material.emoji}</div>
                  <h4 className="font-bold mb-2">{material.name}</h4>
                  <div className="text-xs space-y-1">
                    {material.properties.map((prop, idx) => (
                      <div key={idx} className="bg-green-100 px-2 py-1 rounded">
                        {prop}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Shuffle size={20} />
            New Game
          </button>
        </div>

        {/* Learning Info */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">🧠 Material Properties</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Physical Properties:</strong> How materials look, feel, and behave (hard, soft, transparent, etc.)</p>
            <p><strong>Why it matters:</strong> Understanding properties helps us choose the right material for different jobs!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialPropertyMatch;