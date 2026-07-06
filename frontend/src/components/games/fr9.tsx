import React, { useState, useEffect } from 'react';
import { Wheat, RotateCcw, Trophy, Sprout, Droplets } from 'lucide-react';

const FoodResourcesPuzzle = () => {
  const [gameData] = useState({
    crops: [
      { id: 1, name: 'Wheat', type: 'cereal', season: 'rabi', water: 'medium', icon: '🌾' },
      { id: 2, name: 'Rice', type: 'cereal', season: 'kharif', water: 'high', icon: '🌾' },
      { id: 3, name: 'Maize', type: 'cereal', season: 'kharif', water: 'medium', icon: '🌽' },
      { id: 4, name: 'Sugarcane', type: 'cash', season: 'year-round', water: 'high', icon: '🎋' },
      { id: 5, name: 'Cotton', type: 'cash', season: 'kharif', water: 'medium', icon: '🌸' },
      { id: 6, name: 'Potato', type: 'tuber', season: 'rabi', water: 'medium', icon: '🥔' },
      { id: 7, name: 'Tomato', type: 'vegetable', season: 'year-round', water: 'medium', icon: '🍅' },
      { id: 8, name: 'Onion', type: 'vegetable', season: 'rabi', water: 'low', icon: '🧅' }
    ],
    techniques: [
      { id: 1, name: 'Crop Rotation', benefit: 'Improves soil fertility', type: 'sustainable' },
      { id: 2, name: 'Organic Manure', benefit: 'Natural fertilizer', type: 'sustainable' },
      { id: 3, name: 'Drip Irrigation', benefit: 'Water conservation', type: 'sustainable' },
      { id: 4, name: 'Pesticide Spraying', benefit: 'Pest control', type: 'chemical' },
      { id: 5, name: 'Chemical Fertilizers', benefit: 'Quick nutrients', type: 'chemical' },
      { id: 6, name: 'Hybrid Seeds', benefit: 'Higher yield', type: 'modern' },
      { id: 7, name: 'Greenhouse Farming', benefit: 'Controlled environment', type: 'modern' },
      { id: 8, name: 'Intercropping', benefit: 'Multiple crops together', type: 'sustainable' }
    ]
  });

  const [farmPlots, setFarmPlots] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [season, setSeason] = useState('kharif');
  const [waterAvailable, setWaterAvailable] = useState(100);
  const [score, setScore] = useState(0);
  const [year, setYear] = useState(1);
  const [gameMessages, setGameMessages] = useState([]);

  const initializeGame = () => {
    setFarmPlots([
      { id: 1, crop: null, technique: null, yield: 0, health: 100 },
      { id: 2, crop: null, technique: null, yield: 0, health: 100 },
      { id: 3, crop: null, technique: null, yield: 0, health: 100 },
      { id: 4, crop: null, technique: null, yield: 0, health: 100 }
    ]);
    setScore(0);
    setYear(1);
    setWaterAvailable(100);
    setGameMessages([]);
    setSelectedCrop(null);
    setSelectedTechnique(null);
    setSeason('kharif');
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const addMessage = (text, type) => {
    const message = { id: Date.now(), text, type };
    setGameMessages(prev => [message, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setGameMessages(prev => prev.filter(m => m.id !== message.id));
    }, 3000);
  };

  const plantCrop = (plotId) => {
    if (!selectedCrop) {
      addMessage('Please select a crop first!', 'warning');
      return;
    }

    const crop = gameData.crops.find(c => c.id === selectedCrop);
    const waterNeeded = crop.water === 'high' ? 40 : crop.water === 'medium' ? 25 : 10;

    if (waterAvailable < waterNeeded) {
      addMessage('Not enough water for this crop!', 'error');
      return;
    }

    if (crop.season !== season && crop.season !== 'year-round') {
      addMessage(`${crop.name} cannot be grown in ${season} season!`, 'error');
      return;
    }

    setFarmPlots(prev => prev.map(plot =>
      plot.id === plotId
        ? { ...plot, crop: selectedCrop, yield: 0, health: 100 }
        : plot
    ));

    setWaterAvailable(prev => prev - waterNeeded);
    addMessage(`${crop.name} planted successfully!`, 'success');
    setSelectedCrop(null);
  };

  const applyTechnique = (plotId) => {
    if (!selectedTechnique) {
      addMessage('Please select a technique first!', 'warning');
      return;
    }

    const plot = farmPlots.find(p => p.id === plotId);
    if (!plot.crop) {
      addMessage('Plant a crop first!', 'warning');
      return;
    }

    setFarmPlots(prev => prev.map(p =>
      p.id === plotId
        ? { ...p, technique: selectedTechnique }
        : p
    ));

    const technique = gameData.techniques.find(t => t.id === selectedTechnique);
    addMessage(`${technique.name} applied!`, 'success');
    setSelectedTechnique(null);
  };

  const harvest = () => {
    let totalYield = 0;
    const newPlots = farmPlots.map(plot => {
      if (plot.crop) {
        const crop = gameData.crops.find(c => c.id === plot.crop);
        const technique = plot.technique ? gameData.techniques.find(t => t.id === plot.technique) : null;
        
        let baseYield = 50;
        let multiplier = 1;

        if (crop.season === season || crop.season === 'year-round') {
          multiplier += 0.2;
        }

        if (technique) {
          switch (technique.type) {
            case 'sustainable':
              multiplier += 0.3;
              break;
            case 'modern':
              multiplier += 0.4;
              break;
            case 'chemical':
              multiplier += 0.2;
              break;
            default:
              break;
          }
        }

        const yieldAmount = Math.floor(baseYield * multiplier);
        totalYield += yieldAmount;
        
        return { ...plot, yield: yieldAmount, crop: null, technique: null, health: 100 };
      }
      return plot;
    });

    setFarmPlots(newPlots);
    setScore(prev => prev + totalYield);
    setYear(prev => prev + 1);
    setWaterAvailable(100);
    
    addMessage(`Harvest complete! Total yield: ${totalYield} units`, 'success');
    setSeason(prev => prev === 'kharif' ? 'rabi' : 'kharif');
  };

  const getPlotColor = (plot) => {
    if (!plot.crop) return 'bg-amber-100 border-amber-300';
    if (plot.technique) return 'bg-green-200 border-green-400';
    return 'bg-blue-100 border-blue-300';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Wheat className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Food Resources Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-600">Score: {score}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Farm
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-1">📅</div>
            <div className="font-semibold">Year {year}</div>
            <div className="text-sm text-gray-600">Season: {season}</div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <Droplets className="w-6 h-6 mx-auto mb-1 text-blue-600" />
            <div className="font-semibold">Water: {waterAvailable}%</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <Sprout className="w-6 h-6 mx-auto mb-1 text-green-600" />
            <div className="font-semibold">Plots</div>
            <div className="text-sm text-gray-600">
              {farmPlots.filter(p => p.crop).length}/4 Planted
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-1">🌾</div>
            <div className="font-semibold">Total Yield</div>
            <div className="text-sm text-gray-600">{score} units</div>
          </div>
        </div>

        {gameMessages.length > 0 && (
          <div className="mb-6 space-y-2">
            {gameMessages.map(message => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' :
                  message.type === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Crops</h2>
          <div className="space-y-3">
            {gameData.crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedCrop === crop.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{crop.icon}</span>
                  <div>
                    <div className="font-semibold">{crop.name}</div>
                    <div className="text-sm text-gray-600">
                      {crop.type} • {crop.season} • Water: {crop.water}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Farm Plots</h2>
            <button
              onClick={harvest}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              🌾 Harvest All
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {farmPlots.map((plot) => {
              const crop = plot.crop ? gameData.crops.find(c => c.id === plot.crop) : null;
              const technique = plot.technique ? gameData.techniques.find(t => t.id === plot.technique) : null;
              
              return (
                <div
                  key={plot.id}
                  className={`border-2 rounded-lg p-4 min-h-[120px] transition-all ${getPlotColor(plot)}`}
                >
                  <div className="text-center mb-3">
                    <h3 className="font-semibold">Plot {plot.id}</h3>
                  </div>
                  
                  {crop ? (
                    <div className="text-center">
                      <div className="text-2xl mb-1">{crop.icon}</div>
                      <div className="font-medium">{crop.name}</div>
                      {technique && (
                        <div className="text-xs text-green-700 mt-1">
                          {technique.name}
                        </div>
                      )}
                      {plot.yield > 0 && (
                        <div className="text-sm font-bold text-green-800 mt-1">
                          Yield: {plot.yield}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-1">🌱</div>
                      <div className="text-sm">Empty Plot</div>
                    </div>
                  )}
                  
                  <div className="flex gap-1 mt-3">
                    <button
                      onClick={() => plantCrop(plot.id)}
                      disabled={plot.crop !== null}
                      className="flex-1 bg-green-600 text-white text-xs py-1 rounded disabled:bg-gray-300"
                    >
                      Plant
                    </button>
                    <button
                      onClick={() => applyTechnique(plot.id)}
                      disabled={!plot.crop || plot.technique}
                      className="flex-1 bg-blue-600 text-white text-xs py-1 rounded disabled:bg-gray-300"
                    >
                      Tech
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Techniques</h2>
          <div className="space-y-3">
            {gameData.techniques.map((technique) => (
              <button
                key={technique.id}
                onClick={() => setSelectedTechnique(technique.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedTechnique === technique.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-sm">{technique.name}</div>
                <div className="text-xs text-gray-600 mt-1">{technique.benefit}</div>
                <div className={`text-xs mt-1 font-medium ${
                  technique.type === 'sustainable' ? 'text-green-600' :
                  technique.type === 'modern' ? 'text-purple-600' : 'text-red-600'
                }`}>
                  {technique.type}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">How to Play</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <strong>1. Select & Plant:</strong> Choose a crop and click "Plant" on an empty plot. 
            Consider season and water requirements!
          </div>
          <div>
            <strong>2. Apply Techniques:</strong> Select farming techniques to improve yield. 
            Sustainable methods give better long-term results.
          </div>
          <div>
            <strong>3. Harvest:</strong> Click "Harvest All" to collect crops and advance to the next year. 
            Try different combinations for maximum yield!
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodResourcesPuzzle;