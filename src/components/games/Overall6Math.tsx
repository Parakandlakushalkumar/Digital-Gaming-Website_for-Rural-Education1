import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Users, ChefHat, Calculator } from 'lucide-react';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  servings: number;
}

interface Team {
  id: number;
  name: string;
  score: number;
  currentAnswer: Ingredient[];
}

interface Challenge {
  recipe: Recipe;
  scaleFactor: number;
  description: string;
}

const RatioRecipeGame: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Team Alpha', score: 0, currentAnswer: [] },
    { id: 2, name: 'Team Beta', score: 0, currentAnswer: [] }
  ]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(5);

  const sampleRecipes: Recipe[] = [
    {
      name: "Chocolate Chip Cookies",
      ingredients: [
        { name: "Flour", amount: 2.5, unit: "cups" },
        { name: "Sugar", amount: 1, unit: "cup" },
        { name: "Butter", amount: 0.5, unit: "cup" },
        { name: "Eggs", amount: 2, unit: "pieces" }
      ],
      servings: 24
    },
    {
      name: "Pancake Mix",
      ingredients: [
        { name: "Flour", amount: 2, unit: "cups" },
        { name: "Milk", amount: 1.5, unit: "cups" },
        { name: "Sugar", amount: 0.25, unit: "cup" },
        { name: "Baking Powder", amount: 2, unit: "tsp" }
      ],
      servings: 8
    },
    {
      name: "Pizza Dough",
      ingredients: [
        { name: "Flour", amount: 3, unit: "cups" },
        { name: "Water", amount: 1, unit: "cup" },
        { name: "Yeast", amount: 1, unit: "tbsp" },
        { name: "Salt", amount: 1, unit: "tsp" }
      ],
      servings: 4
    }
  ];

  const scaleFactors = [1.5, 2, 2.5, 3, 0.5, 0.75];
  const scaleDescriptions = [
    "50% more people",
    "double the servings",
    "2.5 times more people", 
    "triple the recipe",
    "half the servings",
    "three-quarters portion"
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const generateChallenge = (): Challenge => {
    const recipe = sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)];
    const factorIndex = Math.floor(Math.random() * scaleFactors.length);
    return {
      recipe,
      scaleFactor: scaleFactors[factorIndex],
      description: scaleDescriptions[factorIndex]
    };
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentChallenge(generateChallenge());
    setTimeLeft(60);
    setRound(1);
    // Reset team answers
    setTeams(teams.map(team => ({ ...team, currentAnswer: [] })));
  };

  const calculateCorrectAnswer = (recipe: Recipe, scaleFactor: number): Ingredient[] => {
    return recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: Math.round((ingredient.amount * scaleFactor) * 100) / 100 // Round to 2 decimal places
    }));
  };

  const updateTeamAnswer = (teamId: number, ingredientIndex: number, newAmount: number) => {
    if (!currentChallenge) return;
    
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const newAnswer = [...currentChallenge.recipe.ingredients];
        newAnswer[ingredientIndex] = { ...newAnswer[ingredientIndex], amount: newAmount };
        return { ...team, currentAnswer: newAnswer };
      }
      return team;
    }));
  };

  const checkAnswer = (teamAnswer: Ingredient[], correctAnswer: Ingredient[]): number => {
    let correctCount = 0;
    for (let i = 0; i < teamAnswer.length; i++) {
      const userAmount = teamAnswer[i]?.amount || 0;
      const correctAmount = correctAnswer[i].amount;
      // Allow 5% tolerance for rounding
      if (Math.abs(userAmount - correctAmount) <= correctAmount * 0.05) {
        correctCount++;
      }
    }
    return Math.round((correctCount / correctAnswer.length) * 100);
  };

  const submitAnswers = () => {
    if (!currentChallenge) return;
    
    const correctAnswer = calculateCorrectAnswer(currentChallenge.recipe, currentChallenge.scaleFactor);
    
    setTeams(teams.map(team => {
      const score = checkAnswer(team.currentAnswer, correctAnswer);
      return { ...team, score: team.score + score };
    }));

    if (round < maxRounds) {
      setRound(round + 1);
      setCurrentChallenge(generateChallenge());
      setTimeLeft(60);
      setTeams(teams.map(team => ({ ...team, currentAnswer: [] })));
    } else {
      setGameState('results');
    }
  };

  const handleTimeUp = () => {
    submitAnswers();
  };

  const resetGame = () => {
    setGameState('setup');
    setTeams(teams.map(team => ({ ...team, score: 0, currentAnswer: [] })));
    setRound(1);
  };

  const formatNumber = (num: number): string => {
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-orange-800 mb-4 flex items-center justify-center gap-3">
              <ChefHat className="w-10 h-10" />
              Ratio Recipe Challenge
            </h1>
            <p className="text-lg text-orange-700">Master ratios, proportions, and scaling with cooking!</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play:</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Game Rules:</h3>
                <ul className="space-y-2">
                  <li>• Teams compete to scale recipe ingredients correctly</li>
                  <li>• Each round presents a new recipe and scaling challenge</li>
                  <li>• 60 seconds per round to calculate and submit answers</li>
                  <li>• Points awarded based on accuracy (within 5% tolerance)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Math Skills Practiced:</h3>
                <ul className="space-y-2">
                  <li>• Ratios and Proportions</li>
                  <li>• Decimal multiplication</li>
                  <li>• Fraction operations</li>
                  <li>• Scaling factors</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Teams:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {teams.map(team => (
                <div key={team.id} className="bg-blue-50 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => setTeams(teams.map(t => 
                      t.id === team.id ? { ...t, name: e.target.value } : t
                    ))}
                    className="text-lg font-semibold bg-transparent border-b-2 border-blue-300 text-center focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Start Cooking Challenge! 🍳
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === 'playing' && currentChallenge) {
    const correctAnswer = calculateCorrectAnswer(currentChallenge.recipe, currentChallenge.scaleFactor);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Round {round}/{maxRounds}</h1>
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl font-bold">{timeLeft}s</span>
                </div>
              </div>
              <button
                onClick={submitAnswers}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Submit Answers
              </button>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentChallenge.recipe.name}</h2>
            <p className="text-lg text-gray-600 mb-4">
              Original serves {currentChallenge.recipe.servings} • Scale for: <span className="font-bold text-blue-600">{currentChallenge.description}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">Scale Factor: {currentChallenge.scaleFactor}x</p>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Original Recipe:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {currentChallenge.recipe.ingredients.map((ingredient, idx) => (
                  <div key={idx} className="bg-white rounded p-2 text-center">
                    <div className="font-semibold">{ingredient.name}</div>
                    <div className="text-blue-600">{formatNumber(ingredient.amount)} {ingredient.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            {teams.map(team => (
              <div key={team.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{team.name} (Score: {team.score})</h3>
                <div className="space-y-3">
                  {currentChallenge.recipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <label className="w-20 text-sm font-medium">{ingredient.name}:</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0"
                        value={team.currentAnswer[idx]?.amount || ''}
                        onChange={(e) => updateTeamAnswer(team.id, idx, parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 w-12">{ingredient.unit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Math helper */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4" />
                    <span className="text-sm font-medium">Quick Math:</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Multiply each ingredient by {currentChallenge.scaleFactor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const winner = teams.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Game Complete!</h1>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">🏆 Winner: {winner.name}!</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {teams.map(team => (
                  <div key={team.id} className={`rounded-lg p-6 ${team.id === winner.id ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-bold">{team.name}</h3>
                    <p className="text-3xl font-bold text-blue-600">{team.score} points</p>
                    <p className="text-sm text-gray-600">{Math.round(team.score / maxRounds)}% average accuracy</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-3">Math Skills Mastered:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>✓ Ratio scaling and proportions</div>
                <div>✓ Decimal multiplication</div>
                <div>✓ Fraction operations</div>
                <div>✓ Mental math practice</div>
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RatioRecipeGame;