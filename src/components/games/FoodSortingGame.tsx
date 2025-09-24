import React, { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  emoji: string;
  correctGroup: FoodGroup;
}

type FoodGroup = 'Carbohydrates' | 'Proteins' | 'Fats' | 'Vitamins & Minerals';

interface DroppedFood extends Food {
  position: { x: number; y: number };
}

const FOODS: Food[] = [
  { id: '1', name: 'Rice', emoji: '🍚', correctGroup: 'Carbohydrates' },
  { id: '2', name: 'Milk', emoji: '🥛', correctGroup: 'Proteins' },
  { id: '3', name: 'Fish', emoji: '🐟', correctGroup: 'Proteins' },
  { id: '4', name: 'Apple', emoji: '🍎', correctGroup: 'Vitamins & Minerals' },
  { id: '5', name: 'Nuts', emoji: '🥜', correctGroup: 'Fats' },
  { id: '6', name: 'Bread', emoji: '🍞', correctGroup: 'Carbohydrates' },
  { id: '7', name: 'Chicken', emoji: '🍗', correctGroup: 'Proteins' },
  { id: '8', name: 'Avocado', emoji: '🥑', correctGroup: 'Fats' },
  { id: '9', name: 'Banana', emoji: '🍌', correctGroup: 'Vitamins & Minerals' },
  { id: '10', name: 'Pasta', emoji: '🍝', correctGroup: 'Carbohydrates' },
  { id: '11', name: 'Eggs', emoji: '🥚', correctGroup: 'Proteins' },
  { id: '12', name: 'Olive Oil', emoji: '🫒', correctGroup: 'Fats' },
  { id: '13', name: 'Broccoli', emoji: '🥦', correctGroup: 'Vitamins & Minerals' },
  { id: '14', name: 'Potato', emoji: '🥔', correctGroup: 'Carbohydrates' },
  { id: '15', name: 'Orange', emoji: '🍊', correctGroup: 'Vitamins & Minerals' }
];

const FOOD_GROUPS: FoodGroup[] = ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins & Minerals'];

const GAME_DURATION = 120; // 2 minutes

interface FoodSortingGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

export const FoodSortingGame = ({ onComplete, onExit, currentLanguage = 'en' }: FoodSortingGameProps) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [draggedFood, setDraggedFood] = useState<Food | null>(null);
  const [sortedFoods, setSortedFoods] = useState<Record<FoodGroup, Food[]>>({
    'Carbohydrates': [],
    'Proteins': [],
    'Fats': [],
    'Vitamins & Minerals': []
  });
  const [availableFoods, setAvailableFoods] = useState<Food[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null; message: string }>({ type: null, message: '' });

  const translations = {
    en: {
      title: 'Food Group Sorting Challenge',
      subtitle: 'Learn about nutrition by sorting foods into their correct food groups!',
      howToPlay: 'How to Play:',
      instructions: [
        'Drag and drop food items into the correct food groups',
        'Earn 10 points for correct answers, lose 5 for incorrect ones',
        'You have 2 minutes to sort as many foods as possible',
        'Try to achieve the highest score!'
      ],
      startGame: 'Start Game!',
      availableFoods: 'Available Foods',
      dropHere: 'Drop foods here that belong to',
      allSorted: 'All foods sorted!',
      greatJob: 'Great job!',
      gameComplete: 'Game Complete!',
      finalScore: 'Final Score',
      foodsSorted: 'Foods Sorted',
      accuracy: 'Accuracy',
      playAgain: 'Play Again',
      score: 'Score:',
      timeLeft: 'Time Left:'
    },
    hi: {
      title: 'भोजन समूह छँटाई चुनौती',
      subtitle: 'भोजन को उनके सही भोजन समूहों में छाँटकर पोषण के बारे में जानें!',
      howToPlay: 'कैसे खेलें:',
      instructions: [
        'भोजन की वस्तुओं को सही भोजन समूहों में खींचकर छोड़ें',
        'सही उत्तरों के लिए 10 अंक प्राप्त करें, गलत के लिए 5 अंक खोएं',
        'आपके पास जितने भोजन छाँटने हैं उसके लिए 2 मिनट हैं',
        'उच्चतम स्कोर प्राप्त करने का प्रयास करें!'
      ],
      startGame: 'खेल शुरू करें!',
      availableFoods: 'उपलब्ध भोजन',
      dropHere: 'यहाँ उन भोजनों को छोड़ें जो संबंधित हैं',
      allSorted: 'सभी भोजन छाँटे गए!',
      greatJob: 'बहुत बढ़िया!',
      gameComplete: 'खेल पूरा!',
      finalScore: 'अंतिम स्कोर',
      foodsSorted: 'भोजन छाँटे गए',
      accuracy: 'सटीकता',
      playAgain: 'फिर से खेलें',
      score: 'स्कोर:',
      timeLeft: 'बचा समय:'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const startGame = useCallback(() => {
    const shuffledFoods = [...FOODS].sort(() => Math.random() - 0.5);
    setAvailableFoods(shuffledFoods);
    setSortedFoods({
      'Carbohydrates': [],
      'Proteins': [],
      'Fats': [],
      'Vitamins & Minerals': []
    });
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    setFeedback({ type: null, message: '' });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('ready');
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setFeedback({ type: null, message: '' });
  }, []);

  const handleExit = () => {
    onExit();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
      onComplete(score);
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, score, onComplete]);

  const handleDragStart = (e: React.DragEvent, food: Food) => {
    setDraggedFood(food);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetGroup: FoodGroup) => {
    e.preventDefault();
    
    if (!draggedFood) return;

    const isCorrect = draggedFood.correctGroup === targetGroup;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({ type: 'correct', message: `Correct! ${draggedFood.name} belongs to ${targetGroup}!` });
      setSortedFoods(prev => ({
        ...prev,
        [targetGroup]: [...prev[targetGroup], draggedFood]
      }));
      setAvailableFoods(prev => prev.filter(food => food.id !== draggedFood.id));
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setFeedback({ 
        type: 'incorrect', 
        message: `Incorrect! ${draggedFood.name} belongs to ${draggedFood.correctGroup}, not ${targetGroup}.` 
      });
    }

    setDraggedFood(null);
    
    // Clear feedback after 3 seconds
    setTimeout(() => setFeedback({ type: null, message: '' }), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateFinalScore = () => {
    const totalSorted = Object.values(sortedFoods).reduce((sum, foods) => sum + foods.length, 0);
    const accuracy = totalSorted > 0 ? Math.round((score / (totalSorted * 10)) * 100) : 0;
    return { totalSorted, accuracy };
  };

  const getScoreColor = () => {
    if (score >= 100) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (gameState === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🍎 {t.title} 🥛</h1>
            <div className="text-lg text-gray-600 space-y-4 mb-8">
              <p>{t.subtitle}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {FOOD_GROUPS.map(group => (
                  <div key={group} className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-blue-800">{group}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">{t.howToPlay}</h3>
              <ul className="text-yellow-700 text-left space-y-1">
                {t.instructions.map((instruction, index) => (
                  <li key={index}>• {instruction}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors duration-200"
              >
                {t.startGame} 🎮
              </button>
              <button
                onClick={handleExit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const { totalSorted, accuracy } = calculateFinalScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.gameComplete}</h1>
              <p className="text-xl text-gray-600">{t.greatJob}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-blue-800">{t.finalScore}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{totalSorted}</div>
                <div className="text-green-800">{t.foodsSorted}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
                <div className="text-purple-800">{t.accuracy}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Final Results by Food Group:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FOOD_GROUPS.map(group => (
                  <div key={group} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold text-gray-800 mb-2">{group}</div>
                    <div className="text-2xl font-bold text-blue-600">{sortedFoods[group].length}</div>
                    <div className="text-sm text-gray-600">items sorted</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors duration-200"
              >
                <RefreshCw className="inline w-5 h-5 mr-2" />
                {t.playAgain}
              </button>
              <button
                onClick={handleExit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-mono text-lg font-semibold text-blue-800">{formatTime(timeLeft)}</span>
              </div>
              <div className={`flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg`}>
                <span className="text-gray-600">{t.score}</span>
                <span className={`font-bold text-lg ${getScoreColor()}`}>{score}</span>
              </div>
              <button
                onClick={handleExit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
          
          {feedback.type && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              feedback.type === 'correct' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {feedback.type === 'correct' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="font-semibold">{feedback.message}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Foods */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.availableFoods}</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableFoods.map(food => (
                <div
                  key={food.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, food)}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{food.emoji}</span>
                    <span className="font-medium text-gray-700">{food.name}</span>
                  </div>
                </div>
              ))}
              {availableFoods.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">🎉 {t.allSorted}</p>
                  <p className="text-sm">{t.greatJob}</p>
                </div>
              )}
            </div>
          </div>

          {/* Food Groups */}
          {FOOD_GROUPS.map(group => (
            <div
              key={group}
              className="bg-white rounded-xl shadow-lg p-4 min-h-96"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, group)}
            >
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 bg-blue-50 rounded-lg py-2">
                {group}
              </h3>
              <div className="space-y-2 min-h-80">
                {sortedFoods[group].map(food => (
                  <div
                    key={food.id}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{food.emoji}</span>
                      <span className="font-medium text-green-700">{food.name}</span>
                    </div>
                  </div>
                ))}
                {sortedFoods[group].length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400 h-full flex items-center justify-center">
                    <div>
                      <p className="text-sm">{t.dropHere}</p>
                      <p className="text-xs font-semibold">{group}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
