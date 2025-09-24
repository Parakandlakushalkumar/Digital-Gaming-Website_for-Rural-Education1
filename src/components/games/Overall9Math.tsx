import React, { useState, useEffect } from 'react';
import { 
  Building, Calculator, MapPin, Circle, BarChart3, TrendingUp,
  Home, School, Hospital, ShoppingCart, Trees, Car, Droplets,
  DollarSign, Hammer, Zap, Users, Award, Info, X, CheckCircle
} from 'lucide-react';

interface Resource {
  bricks: number;
  wood: number;
  steel: number;
  money: number;
  paint: number;
  water: number;
}

interface CityBuilding {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'public' | 'infrastructure';
  x: number;
  y: number;
  width: number;
  height: number;
  cost: Resource;
  built: boolean;
  color: string;
}

interface MathChallenge {
  id: string;
  title: string;
  category: 'polynomials' | 'linear_equations' | 'coordinate_geometry' | 'geometry' | 'surface_volume' | 'statistics';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reward: Resource;
  building?: string;
  completed: boolean;
}

interface Overall9MathProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const MathCityBuilder: React.FC<Overall9MathProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [resources, setResources] = useState<Resource>({
    bricks: 50,
    wood: 50,
    steel: 30,
    money: 1000,
    paint: 20,
    water: 100
  });

  const [cityBuildings, setCityBuildings] = useState<CityBuilding[]>([]);
  const [challenges, setChallenges] = useState<MathChallenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<MathChallenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cityPopulation, setCityPopulation] = useState(1000);
  const [gamePhase, setGamePhase] = useState<'intro' | 'building' | 'challenge' | 'completed'>('intro');
  const [selectedBuilding, setSelectedBuilding] = useState<CityBuilding | null>(null);
  const [placingBuilding, setPlacingBuilding] = useState<CityBuilding | null>(null);

  const buildingTemplates: CityBuilding[] = [
    {
      id: 'house',
      name: 'House',
      type: 'residential',
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      cost: { bricks: 20, wood: 15, steel: 5, money: 100, paint: 5, water: 10 },
      built: false,
      color: 'bg-blue-200'
    },
    {
      id: 'school',
      name: 'School',
      type: 'public',
      x: 0,
      y: 0,
      width: 60,
      height: 50,
      cost: { bricks: 40, wood: 30, steel: 20, money: 300, paint: 15, water: 25 },
      built: false,
      color: 'bg-yellow-200'
    },
    {
      id: 'hospital',
      name: 'Hospital',
      type: 'public',
      x: 0,
      y: 0,
      width: 70,
      height: 60,
      cost: { bricks: 50, wood: 25, steel: 30, money: 500, paint: 20, water: 40 },
      built: false,
      color: 'bg-red-200'
    },
    {
      id: 'shop',
      name: 'Shop',
      type: 'commercial',
      x: 0,
      y: 0,
      width: 50,
      height: 40,
      cost: { bricks: 25, wood: 20, steel: 15, money: 200, paint: 10, water: 15 },
      built: false,
      color: 'bg-green-200'
    },
    {
      id: 'park',
      name: 'Park',
      type: 'public',
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      cost: { bricks: 10, wood: 40, steel: 5, money: 150, paint: 0, water: 50 },
      built: false,
      color: 'bg-green-300'
    }
  ];

  useEffect(() => {
    initializeChallenges();
  }, []);

  const initializeChallenges = () => {
    const mathChallenges: MathChallenge[] = [
      {
        id: 'poly1',
        title: 'Brick Production',
        category: 'polynomials',
        difficulty: 'medium',
        question: 'A brick factory produces bricks according to P(x) = 2x² + 3x + 5, where x is hours worked. How many bricks in 4 hours?',
        options: ['41', '45', '49', '53'],
        correctAnswer: 2,
        explanation: 'P(4) = 2(16) + 3(4) + 5 = 32 + 12 + 5 = 49',
        reward: { bricks: 30, wood: 0, steel: 0, money: 0, paint: 0, water: 0 },
        completed: false
      },
      {
        id: 'linear1',
        title: 'Budget Balance',
        category: 'linear_equations',
        difficulty: 'medium',
        question: 'Budget equation: 5x + 3y = 1500 (x=bricks, y=wood). If you buy 200 bricks, how much wood?',
        options: ['100', '150', '167', '200'],
        correctAnswer: 2,
        explanation: '5(200) + 3y = 1500 → 1000 + 3y = 1500 → 3y = 500 → y = 167',
        reward: { bricks: 0, wood: 20, steel: 0, money: 200, paint: 0, water: 0 },
        completed: false
      },
      {
        id: 'coord1',
        title: 'School Placement',
        category: 'coordinate_geometry',
        difficulty: 'medium',
        question: 'Place school equidistant from houses at (2,3), (6,7), and (4,1). Find optimal coordinates.',
        options: ['(4,4)', '(4,3.67)', '(3,4)', '(5,3)'],
        correctAnswer: 1,
        explanation: 'Centroid = ((2+6+4)/3, (3+7+1)/3) = (4, 3.67)',
        reward: { bricks: 15, wood: 10, steel: 5, money: 150, paint: 5, water: 10 },
        building: 'school',
        completed: false
      },
      {
        id: 'geom1',
        title: 'Park Design',
        category: 'geometry',
        difficulty: 'medium',
        question: 'Design circular park with radius 12m. What is the area?',
        options: ['144π m²', '452.16 m²', '24π m²', '150.72 m²'],
        correctAnswer: 1,
        explanation: 'Area = πr² = π(12)² = 144π ≈ 452.16 m²',
        reward: { bricks: 5, wood: 25, steel: 0, money: 100, paint: 0, water: 20 },
        building: 'park',
        completed: false
      },
      {
        id: 'surface1',
        title: 'Paint Calculator',
        category: 'surface_volume',
        difficulty: 'medium',
        question: 'House is 10m × 8m × 6m (height). Paint needed for exterior walls (no roof/floor)?',
        options: ['216 m²', '176 m²', '144 m²', '192 m²'],
        correctAnswer: 0,
        explanation: 'Surface area of 4 walls = 2(10×6) + 2(8×6) = 120 + 96 = 216 m²',
        reward: { bricks: 0, wood: 0, steel: 0, money: 50, paint: 25, water: 0 },
        completed: false
      },
      {
        id: 'stats1',
        title: 'Population Growth',
        category: 'statistics',
        difficulty: 'medium',
        question: 'Population: 2020(800), 2021(900), 2022(1000), 2023(1100), 2024(1250). Average annual growth?',
        options: ['112.5', '100', '125', '110'],
        correctAnswer: 0,
        explanation: 'Total growth = 1250-800 = 450 over 4 years. Average = 450/4 = 112.5 per year',
        reward: { bricks: 10, wood: 10, steel: 5, money: 200, paint: 5, water: 15 },
        completed: false
      }
    ];

    setChallenges(mathChallenges);
  };

  const startChallenge = (challenge: MathChallenge) => {
    setCurrentChallenge(challenge);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setGamePhase('challenge');
  };

  const submitAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    if (answerIndex === currentChallenge!.correctAnswer) {
      setResources(prev => ({
        bricks: prev.bricks + currentChallenge!.reward.bricks,
        wood: prev.wood + currentChallenge!.reward.wood,
        steel: prev.steel + currentChallenge!.reward.steel,
        money: prev.money + currentChallenge!.reward.money,
        paint: prev.paint + currentChallenge!.reward.paint,
        water: prev.water + currentChallenge!.reward.water
      }));

      setChallenges(prev => prev.map(c => 
        c.id === currentChallenge!.id ? { ...c, completed: true } : c
      ));

      if (currentChallenge!.building) {
        const buildingTemplate = buildingTemplates.find(b => b.id === currentChallenge!.building);
        if (buildingTemplate) {
          setPlacingBuilding({ ...buildingTemplate, id: `${buildingTemplate.id}_${Date.now()}` });
        }
      }
    }
  };

  const closeChallenge = () => {
    setCurrentChallenge(null);
    setGamePhase('building');
  };

  const canAffordBuilding = (building: CityBuilding) => {
    return (
      resources.bricks >= building.cost.bricks &&
      resources.wood >= building.cost.wood &&
      resources.steel >= building.cost.steel &&
      resources.money >= building.cost.money &&
      resources.paint >= building.cost.paint &&
      resources.water >= building.cost.water
    );
  };

  const placeBuilding = (x: number, y: number) => {
    if (!placingBuilding || !canAffordBuilding(placingBuilding)) return;

    const newBuilding = {
      ...placingBuilding,
      x: x - placingBuilding.width / 2,
      y: y - placingBuilding.height / 2,
      built: true
    };

    setCityBuildings(prev => [...prev, newBuilding]);
    
    setResources(prev => ({
      bricks: prev.bricks - placingBuilding.cost.bricks,
      wood: prev.wood - placingBuilding.cost.wood,
      steel: prev.steel - placingBuilding.cost.steel,
      money: prev.money - placingBuilding.cost.money,
      paint: prev.paint - placingBuilding.cost.paint,
      water: prev.water - placingBuilding.cost.water
    }));

    setCityPopulation(prev => prev + (newBuilding.type === 'residential' ? 50 : 10));
    setPlacingBuilding(null);
  };

  const selectBuildingTemplate = (template: CityBuilding) => {
    if (canAffordBuilding(template)) {
      setPlacingBuilding({ ...template, id: `${template.id}_${Date.now()}` });
    }
  };

  const getBuildingIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-4 h-4" />;
      case 'school': return <School className="w-4 h-4" />;
      case 'hospital': return <Hospital className="w-4 h-4" />;
      case 'shop': return <ShoppingCart className="w-4 h-4" />;
      case 'park': return <Trees className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'polynomials': return <Calculator className="w-4 h-4" />;
      case 'linear_equations': return <BarChart3 className="w-4 h-4" />;
      case 'coordinate_geometry': return <MapPin className="w-4 h-4" />;
      case 'geometry': return <Circle className="w-4 h-4" />;
      case 'surface_volume': return <Building className="w-4 h-4" />;
      case 'statistics': return <TrendingUp className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if all challenges are completed
  useEffect(() => {
    if (challenges.length > 0 && challenges.every(c => c.completed) && gamePhase !== 'completed') {
      setGamePhase('completed');
      if (onComplete) {
        onComplete(100); // Perfect score for completing all challenges
      }
    }
  }, [challenges, gamePhase, onComplete]);

  if (gamePhase === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center py-12">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CONGRATULATIONS!</h1>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">MATH CITY BUILDER MASTER!</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-semibold mb-4">🏆 Final Stats:</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>City Population:</span>
                <span className="font-bold text-blue-600">{cityPopulation}</span>
              </div>
              <div className="flex justify-between">
                <span>Buildings:</span>
                <span className="font-bold text-green-600">{cityBuildings.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Challenges:</span>
                <span className="font-bold text-purple-600">{challenges.filter(c => c.completed).length}/{challenges.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Resources:</span>
                <span className="font-bold text-yellow-600">${resources.money}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🧠 What You Learned:</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold">📊 Polynomials</h4>
                <p className="text-sm">Quadratic functions for production calculations!</p>
              </div>
              <div>
                <h4 className="font-semibold">📈 Linear Equations</h4>
                <p className="text-sm">System of equations for budget balancing!</p>
              </div>
              <div>
                <h4 className="font-semibold">📍 Coordinate Geometry</h4>
                <p className="text-sm">Optimal placement using centroids!</p>
              </div>
              <div>
                <h4 className="font-semibold">🔺 Geometry</h4>
                <p className="text-sm">Area and volume calculations!</p>
              </div>
              <div>
                <h4 className="font-semibold">📐 Surface & Volume</h4>
                <p className="text-sm">Material calculations for construction!</p>
              </div>
              <div>
                <h4 className="font-semibold">📊 Statistics</h4>
                <p className="text-sm">Population growth analysis!</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onExit ? onExit() : window.location.reload()}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            {onExit ? "🏠 Back to Dashboard" : "🔄 Build Another City"}
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'intro') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">🏙 Math City Builder 🏙</h1>
          <p className="text-lg text-gray-600 mb-6">Design and build your dream city using mathematics!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome, City Planner!</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>Use mathematical skills to solve challenges and earn resources to build your city.</p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Mathematical Skills:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Polynomials:</strong> Calculate resource production</li>
                <li>• <strong>Linear Equations:</strong> Balance budgets and materials</li>
                <li>• <strong>Coordinate Geometry:</strong> Optimal building placement</li>
                <li>• <strong>Geometry:</strong> Design parks and constructions</li>
                <li>• <strong>Surface Area & Volume:</strong> Calculate materials needed</li>
                <li>• <strong>Statistics:</strong> Analyze population growth</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Starting Resources:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>🧱 Bricks: 50</div>
                <div>🪵 Wood: 50</div>
                <div>🔩 Steel: 30</div>
                <div>💰 Money: $1,000</div>
                <div>🎨 Paint: 20L</div>
                <div>💧 Water: 100L</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setGamePhase('building')}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            Start Building Your City
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">🏙 Math City Builder</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="bg-white px-3 py-1 rounded shadow">🧱 {resources.bricks}</div>
          <div className="bg-white px-3 py-1 rounded shadow">🪵 {resources.wood}</div>
          <div className="bg-white px-3 py-1 rounded shadow">🔩 {resources.steel}</div>
          <div className="bg-white px-3 py-1 rounded shadow">💰 ${resources.money}</div>
          <div className="bg-white px-3 py-1 rounded shadow">🎨 {resources.paint}L</div>
          <div className="bg-white px-3 py-1 rounded shadow">💧 {resources.water}L</div>
          <div className="bg-white px-3 py-1 rounded shadow">👥 {cityPopulation}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">City Map</h3>
            <div 
              className="relative bg-green-100 border-2 border-gray-300 rounded-lg cursor-crosshair"
              style={{ width: '100%', height: '400px' }}
              onClick={(e) => {
                if (placingBuilding) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  placeBuilding(x, y);
                }
              }}
            >
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={`v${i}`} className="absolute w-px bg-gray-400" style={{ left: `${i * 5}%`, height: '100%' }} />
                ))}
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={`h${i}`} className="absolute h-px bg-gray-400" style={{ top: `${i * 6.25}%`, width: '100%' }} />
                ))}
              </div>

              {cityBuildings.map(building => (
                <div
                  key={building.id}
                  className={`absolute border-2 border-gray-400 rounded ${building.color} flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl`}
                  style={{
                    left: building.x,
                    top: building.y,
                    width: building.width,
                    height: building.height
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBuilding(building);
                  }}
                  title={building.name}
                >
                  {getBuildingIcon(building.id.split('_')[0])}
                </div>
              ))}
            </div>

            {placingBuilding && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700">
                  Click on the map to place your {placingBuilding.name}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">Buildings</h3>
            <div className="space-y-2">
              {buildingTemplates.map(template => {
                const affordable = canAffordBuilding(template);
                return (
                  <div
                    key={template.id}
                    className={`p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                      affordable 
                        ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={() => affordable && selectBuildingTemplate(template)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getBuildingIcon(template.id)}
                      <span className="font-medium text-sm">{template.name}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      🧱{template.cost.bricks} 🪵{template.cost.wood} 🔩{template.cost.steel} 💰${template.cost.money}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">City Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Population:</span>
                <span className="font-bold">{cityPopulation}</span>
              </div>
              <div className="flex justify-between">
                <span>Buildings:</span>
                <span className="font-bold">{cityBuildings.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Challenges:</span>
                <span className="font-bold">{challenges.filter(c => c.completed).length}/{challenges.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-3">Math Challenges</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {challenges.map(challenge => (
              <div
                key={challenge.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  challenge.completed 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                }`}
                onClick={() => !challenge.completed && startChallenge(challenge)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(challenge.category)}
                    <span className="font-medium text-sm">{challenge.title}</span>
                  </div>
                  {challenge.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {challenge.category.replace('_', ' ')}
                </div>
                <div className="text-xs text-gray-500">
                  Reward: 🧱{challenge.reward.bricks} 🪵{challenge.reward.wood} 🔩{challenge.reward.steel} 💰${challenge.reward.money}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentChallenge && gamePhase === 'challenge' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{currentChallenge.title}</h2>
                <button
                  onClick={closeChallenge}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(currentChallenge.category)}
                  <span className={`px-3 py-1 rounded text-sm ${getDifficultyColor(currentChallenge.difficulty)}`}>
                    {currentChallenge.category.replace('_', ' ')} - {currentChallenge.difficulty}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{currentChallenge.question}</p>
              </div>

              <div className="space-y-2 mb-6">
                {currentChallenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => submitAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                      selectedAnswer === null
                        ? 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        : selectedAnswer === index
                        ? index === currentChallenge.correctAnswer
                          ? 'border-green-500 bg-green-100'
                          : 'border-red-500 bg-red-100'
                        : index === currentChallenge.correctAnswer && showAnswer
                        ? 'border-green-500 bg-green-100'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}) {option}
                  </button>
                ))}
              </div>

              {showAnswer && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="font-bold">Explanation:</span>
                  </div>
                  <p className="text-sm text-gray-700">{currentChallenge.explanation}</p>
                  
                  {selectedAnswer === currentChallenge.correctAnswer && (
                    <div className="mt-3 p-2 bg-green-100 rounded">
                      <span className="text-green-800 font-medium">Correct! Resources earned:</span>
                      <div className="text-sm text-green-700 mt-1">
                        🧱{currentChallenge.reward.bricks} 🪵{currentChallenge.reward.wood} 🔩{currentChallenge.reward.steel} 💰${currentChallenge.reward.money} 🎨{currentChallenge.reward.paint}L 💧{currentChallenge.reward.water}L
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {showAnswer && selectedAnswer !== currentChallenge.correctAnswer && (
                    <span className="text-red-600">Try another challenge to earn resources!</span>
                  )}
                </div>
                <button
                  onClick={closeChallenge}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  {showAnswer ? 'Continue Building' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedBuilding.name}</h3>
                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {selectedBuilding.type}</p>
                <p><strong>Location:</strong> ({Math.round(selectedBuilding.x)}, {Math.round(selectedBuilding.y)})</p>
                <p><strong>Size:</strong> {selectedBuilding.width} × {selectedBuilding.height}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathCityBuilder;
