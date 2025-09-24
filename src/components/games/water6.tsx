import React, { useState, useEffect } from 'react';
import { Droplets, Recycle, Wind, RotateCcw, Trophy, CheckCircle } from 'lucide-react';

const WaterCycleRecyclingGame = () => {
  const [currentGame, setCurrentGame] = useState('menu'); // menu, water-cycle, recycling, air-quality, complete
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameComplete, setGameComplete] = useState(false);

  // Water Cycle Game State
  const [waterCycleStage, setWaterCycleStage] = useState(0);
  const [waterCycleAnswers, setWaterCycleAnswers] = useState([]);

  // Recycling Game State
  const [recyclingScore, setRecyclingScore] = useState(0);

  // Air Quality Game State
  const [airQuestions, setAirQuestions] = useState(0);
  const [airScore, setAirScore] = useState(0);

  const waterCycleStages = [
    {
      id: 1,
      stage: 'evaporation',
      question: 'The sun heats water in oceans, lakes, and rivers. What happens next?',
      image: '☀️💧',
      options: ['Water turns to gas', 'Water freezes', 'Water disappears'],
      correct: 'Water turns to gas',
      explanation: 'Heat from the sun causes water to evaporate and turn into invisible water vapor!'
    },
    {
      id: 2,
      stage: 'condensation',
      question: 'Water vapor rises high in the sky where it is cold. What forms?',
      image: '☁️',
      options: ['Rain', 'Clouds', 'Ice'],
      correct: 'Clouds',
      explanation: 'Water vapor condenses into tiny droplets that form clouds!'
    },
    {
      id: 3,
      stage: 'precipitation',
      question: 'When cloud droplets get too heavy, what happens?',
      image: '🌧️',
      options: ['They float away', 'They fall as rain', 'They turn to steam'],
      correct: 'They fall as rain',
      explanation: 'Heavy water droplets fall from clouds as precipitation - rain, snow, or hail!'
    },
    {
      id: 4,
      stage: 'collection',
      question: 'Where does the rainwater go after it falls?',
      image: '🏔️💧',
      options: ['Back to oceans and rivers', 'Into the ground only', 'It vanishes'],
      correct: 'Back to oceans and rivers',
      explanation: 'Rainwater flows back to rivers, lakes, and oceans, completing the cycle!'
    }
  ];

  const recyclingCategories = [
    { id: 'paper', name: 'Paper', color: 'bg-blue-200', emoji: '📄' },
    { id: 'plastic', name: 'Plastic', color: 'bg-yellow-200', emoji: '🥤' },
    { id: 'metal', name: 'Metal', color: 'bg-gray-200', emoji: '🥫' },
    { id: 'glass', name: 'Glass', color: 'bg-green-200', emoji: '🍶' },
    { id: 'organic', name: 'Organic', color: 'bg-orange-200', emoji: '🍌' },
    { id: 'general', name: 'General Waste', color: 'bg-red-200', emoji: '🗑️' }
  ];

  const wasteItems = [
    { name: 'Newspaper', category: 'paper', emoji: '📰' },
    { name: 'Water Bottle', category: 'plastic', emoji: '🍶' },
    { name: 'Banana Peel', category: 'organic', emoji: '🍌' },
    { name: 'Soda Can', category: 'metal', emoji: '🥤' },
    { name: 'Glass Jar', category: 'glass', emoji: '🫙' },
    { name: 'Cardboard Box', category: 'paper', emoji: '📦' },
    { name: 'Plastic Bag', category: 'plastic', emoji: '👜' },
    { name: 'Apple Core', category: 'organic', emoji: '🍎' },
    { name: 'Tin Can', category: 'metal', emoji: '🥫' },
    { name: 'Broken Toy', category: 'general', emoji: '🧸' }
  ];

  const airQualityQuestions = [
    {
      question: 'Which of these helps keep air clean?',
      options: ['Cars', 'Trees', 'Factories'],
      correct: 'Trees',
      explanation: 'Trees absorb carbon dioxide and release oxygen, cleaning our air!',
      image: '🌳'
    },
    {
      question: 'What makes air dirty?',
      options: ['Rain', 'Pollution from vehicles', 'Wind'],
      correct: 'Pollution from vehicles',
      explanation: 'Vehicle exhaust releases harmful gases that pollute the air.',
      image: '🚗💨'
    },
    {
      question: 'How can we reduce air pollution?',
      options: ['Use more cars', 'Walk or bike more', 'Cut down trees'],
      correct: 'Walk or bike more',
      explanation: 'Walking and biking do not create pollution like cars do!',
      image: '🚶‍♂️🚴‍♀️'
    }
  ];

  const [currentWasteItems, setCurrentWasteItems] = useState(
    [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 6)
  );
  const [draggedItem, setDraggedItem] = useState(null);
  const [sortedItems, setSortedItems] = useState({});

  const handleWaterCycleAnswer = (answer) => {
    const currentStage = waterCycleStages[waterCycleStage];
    const isCorrect = answer === currentStage.correct;
    
    setWaterCycleAnswers([...waterCycleAnswers, { stage: waterCycleStage, correct: isCorrect }]);
    
    if (isCorrect) {
      setScore(score + 15);
      setFeedback(`✅ Correct! ${currentStage.explanation}`);
    } else {
      setFeedback(`❌ Not quite. ${currentStage.explanation}`);
    }

    setTimeout(() => {
      if (waterCycleStage < waterCycleStages.length - 1) {
        setWaterCycleStage(waterCycleStage + 1);
        setFeedback('');
      } else {
        setCurrentGame('recycling');
        setFeedback('🌊 Great job! Now let us learn about recycling!');
        setTimeout(() => setFeedback(''), 2000);
      }
    }, 2500);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    if (!draggedItem) return;

    const isCorrect = draggedItem.category === category;
    
    if (isCorrect) {
      setRecyclingScore(recyclingScore + 10);
      setScore(score + 10);
      setSortedItems({
        ...sortedItems,
        [draggedItem.name]: category
      });
      setCurrentWasteItems(currentWasteItems.filter(item => item.name !== draggedItem.name));
      setFeedback(`✅ Perfect! ${draggedItem.name} goes in ${recyclingCategories.find(cat => cat.id === category)?.name}!`);
    } else {
      const correctCategory = recyclingCategories.find(cat => cat.id === draggedItem.category);
      setFeedback(`❌ Try again! ${draggedItem.name} should go in ${correctCategory?.name}.`);
    }

    setDraggedItem(null);
    
    if (currentWasteItems.length === 1 && isCorrect) {
      setTimeout(() => {
        setCurrentGame('air-quality');
        setFeedback('♻️ Excellent recycling! Now let us learn about air quality!');
        setTimeout(() => setFeedback(''), 2000);
      }, 1500);
    } else {
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleAirQualityAnswer = (answer) => {
    const currentQuestion = airQualityQuestions[airQuestions];
    const isCorrect = answer === currentQuestion.correct;
    
    if (isCorrect) {
      setAirScore(airScore + 15);
      setScore(score + 15);
      setFeedback(`✅ Excellent! ${currentQuestion.explanation}`);
    } else {
      setFeedback(`❌ Not quite. ${currentQuestion.explanation}`);
    }

    setTimeout(() => {
      if (airQuestions < airQualityQuestions.length - 1) {
        setAirQuestions(airQuestions + 1);
        setFeedback('');
      } else {
        setCurrentGame('complete');
        setGameComplete(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentGame('menu');
    setScore(0);
    setWaterCycleStage(0);
    setWaterCycleAnswers([]);
    setRecyclingScore(0);
    setAirScore(0);
    setAirQuestions(0);
    setFeedback('');
    setGameComplete(false);
    setCurrentWasteItems([...wasteItems].sort(() => Math.random() - 0.5).slice(0, 6));
    setSortedItems({});
  };

  // Menu Screen
  if (currentGame === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-green-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-cyan-800 mb-4">
            🌍 Earth Science Challenge
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn about water cycles, recycling, and clean air!
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Three Fun Games</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-bold text-lg mb-2">Water Cycle</h3>
                <p className="text-sm text-gray-600">Learn how water moves around Earth</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">♻️</div>
                <h3 className="font-bold text-lg mb-2">Recycling Sort</h3>
                <p className="text-sm text-gray-600">Sort waste into the right bins</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🌬️</div>
                <h3 className="font-bold text-lg mb-2">Clean Air</h3>
                <p className="text-sm text-gray-600">Discover how to keep air healthy</p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentGame('water-cycle')}
              className="bg-cyan-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-cyan-600 transition-colors mt-6"
            >
              🚀 Start Earth Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Complete Screen
  if (currentGame === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🌍 Earth Science Master!
            </h1>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl mb-6">You have completed all three challenges!</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="text-3xl mb-2">🌊</div>
                <h3 className="font-bold">Water Cycle</h3>
                <p className="text-sm text-gray-600">
                  {waterCycleAnswers.filter(a => a.correct).length}/{waterCycleStages.length} correct
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-3xl mb-2">♻️</div>
                <h3 className="font-bold">Recycling</h3>
                <p className="text-sm text-gray-600">Score: {recyclingScore}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-3xl mb-2">🌬️</div>
                <h3 className="font-bold">Air Quality</h3>
                <p className="text-sm text-gray-600">Score: {airScore}</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">🎉 Total Score: {score} points</h3>
              <p className="text-gray-700">You are now an Earth Science Expert!</p>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Water Cycle Game
  if (currentGame === 'water-cycle') {
    const currentStage = waterCycleStages[waterCycleStage];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              🌊 Water Cycle Adventure
            </h1>
            <p className="text-gray-600">Stage {waterCycleStage + 1} of {waterCycleStages.length}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Droplets className="text-blue-500" size={20} />
              <span className="font-semibold">Score: {score}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{currentStage.image}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentStage.question}</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {currentStage.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleWaterCycleAnswer(option)}
                    className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl text-lg font-semibold transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-lg font-semibold">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Recycling Game
  if (currentGame === 'recycling') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              ♻️ Recycling Rally
            </h1>
            <p className="text-gray-600">Drag items to the correct recycling bins!</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Recycle className="text-green-500" size={20} />
              <span className="font-semibold">Recycling Score: {recyclingScore}</span>
              <span className="font-semibold">Items Left: {currentWasteItems.length}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            
            {/* Items to Sort */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-center mb-4">🗑️ Items to Sort</h3>
              <div className="space-y-2">
                {currentWasteItems.map(item => (
                  <div
                    key={item.name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="bg-gray-100 p-3 rounded-lg cursor-move hover:bg-gray-200 transition-colors flex items-center gap-3 border-2 border-dashed border-gray-300"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                ))}
                
                {currentWasteItems.length === 0 && (
                  <div className="text-center text-green-600 py-8">
                    <CheckCircle size={48} className="mx-auto mb-2" />
                    <p className="font-bold">All sorted!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recycling Bins */}
            <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recyclingCategories.map(category => (
                <div
                  key={category.id}
                  className={`${category.color} p-4 rounded-xl shadow-lg border-2 border-dashed border-gray-400 min-h-[200px]`}
                  onDrop={(e) => handleDrop(e, category.id)}
                  onDragOver={handleDragOver}
                >
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{category.emoji}</div>
                    <h4 className="font-bold text-lg">{category.name}</h4>
                  </div>
                  
                  {/* Sorted Items */}
                  <div className="space-y-2">
                    {Object.entries(sortedItems)
                      .filter(([itemName, itemCategory]) => itemCategory === category.id)
                      .map(([itemName, itemCategory]) => {
                        const item = wasteItems.find(w => w.name === itemName);
                        return (
                          <div key={itemName} className="bg-white bg-opacity-80 p-2 rounded flex items-center gap-2">
                            <span className="text-lg">{item?.emoji}</span>
                            <span className="text-sm font-semibold">{itemName}</span>
                            <span className="ml-auto text-green-600">✅</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedback && (
            <div className="mt-4 bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-lg font-semibold">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Air Quality Game
  if (currentGame === 'air-quality') {
    const currentQuestion = airQualityQuestions[airQuestions];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🌬️ Clean Air Challenge
            </h1>
            <p className="text-gray-600">Question {airQuestions + 1} of {airQualityQuestions.length}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Wind className="text-gray-500" size={20} />
              <span className="font-semibold">Air Score: {airScore}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{currentQuestion.image}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAirQualityAnswer(option)}
                    className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-semibold transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-lg font-semibold">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default WaterCycleRecyclingGame;