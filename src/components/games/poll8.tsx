import React, { useState, useEffect } from 'react';
import { AlertTriangle, RotateCcw, Trophy, Wind, Droplets, Leaf, Factory } from 'lucide-react';

interface PollutionScenario {
  id: string;
  title: string;
  description: string;
  type: 'air-pollution' | 'water-pollution';
  pollutants: string[];
  sources: string[];
  effects: string[];
  solutions: string[];
  emoji: string;
  severity: 'low' | 'medium' | 'high';
}

const pollutionScenarios: PollutionScenario[] = [
  // Air Pollution Scenarios
  {
    id: 'vehicle-emissions',
    title: 'Vehicle Emissions',
    description: 'Cars and trucks releasing exhaust gases',
    type: 'air-pollution',
    pollutants: ['Carbon monoxide', 'Nitrogen oxides', 'Particulates'],
    sources: ['Cars', 'Trucks', 'Motorcycles', 'Buses'],
    effects: ['Respiratory problems', 'Smog formation', 'Global warming'],
    solutions: ['Use public transport', 'Electric vehicles', 'Carpooling', 'Walking/cycling'],
    emoji: '🚗',
    severity: 'high'
  },
  {
    id: 'factory-smoke',
    title: 'Industrial Emissions',
    description: 'Factories releasing harmful gases and particles',
    type: 'air-pollution',
    pollutants: ['Sulfur dioxide', 'Carbon dioxide', 'Heavy metals'],
    sources: ['Power plants', 'Steel mills', 'Chemical factories', 'Refineries'],
    effects: ['Acid rain', 'Lung diseases', 'Climate change'],
    solutions: ['Clean technology', 'Pollution control devices', 'Renewable energy'],
    emoji: '🏭',
    severity: 'high'
  },
  {
    id: 'burning-waste',
    title: 'Waste Burning',
    description: 'Open burning of garbage and agricultural waste',
    type: 'air-pollution',
    pollutants: ['Dioxins', 'Particulate matter', 'Toxic gases'],
    sources: ['Garbage burning', 'Crop residue burning', 'Plastic burning'],
    effects: ['Cancer risk', 'Respiratory issues', 'Environmental damage'],
    solutions: ['Proper waste disposal', 'Composting', 'Recycling programs'],
    emoji: '🔥',
    severity: 'high'
  },
  {
    id: 'dust-pollution',
    title: 'Dust and Particulates',
    description: 'Fine particles suspended in air',
    type: 'air-pollution',
    pollutants: ['PM2.5', 'PM10', 'Dust particles'],
    sources: ['Construction sites', 'Road dust', 'Desert winds', 'Mining'],
    effects: ['Breathing problems', 'Eye irritation', 'Reduced visibility'],
    solutions: ['Water spraying', 'Covering construction sites', 'Tree planting'],
    emoji: '💨',
    severity: 'medium'
  },

  // Water Pollution Scenarios
  {
    id: 'industrial-waste',
    title: 'Industrial Waste Discharge',
    description: 'Factories dumping chemicals into water bodies',
    type: 'water-pollution',
    pollutants: ['Heavy metals', 'Chemicals', 'Toxic compounds'],
    sources: ['Textile industries', 'Chemical plants', 'Mining operations'],
    effects: ['Water contamination', 'Fish death', 'Health problems'],
    solutions: ['Wastewater treatment', 'Strict regulations', 'Clean production'],
    emoji: '🏭',
    severity: 'high'
  },
  {
    id: 'sewage-discharge',
    title: 'Sewage and Domestic Waste',
    description: 'Untreated sewage flowing into rivers and lakes',
    type: 'water-pollution',
    pollutants: ['Bacteria', 'Viruses', 'Organic matter', 'Nutrients'],
    sources: ['Households', 'Hospitals', 'Hotels', 'Cities'],
    effects: ['Waterborne diseases', 'Eutrophication', 'Bad odor'],
    solutions: ['Sewage treatment plants', 'Septic tanks', 'Water recycling'],
    emoji: '🚽',
    severity: 'high'
  },
  {
    id: 'agricultural-runoff',
    title: 'Agricultural Runoff',
    description: 'Fertilizers and pesticides washing into water',
    type: 'water-pollution',
    pollutants: ['Nitrogen', 'Phosphorus', 'Pesticides'],
    sources: ['Farms', 'Fertilizer use', 'Pesticide spraying', 'Irrigation'],
    effects: ['Algal blooms', 'Fish kills', 'Groundwater contamination'],
    solutions: ['Organic farming', 'Controlled fertilizer use', 'Buffer zones'],
    emoji: '🌾',
    severity: 'medium'
  },
  {
    id: 'plastic-waste',
    title: 'Plastic Pollution',
    description: 'Plastic waste accumulating in water bodies',
    type: 'water-pollution',
    pollutants: ['Microplastics', 'Plastic debris', 'Chemical additives'],
    sources: ['Plastic bottles', 'Bags', 'Food packaging', 'Fishing nets'],
    effects: ['Marine life death', 'Food chain contamination', 'Ecosystem damage'],
    solutions: ['Reduce plastic use', 'Recycling', 'Biodegradable alternatives'],
    emoji: '🥤',
    severity: 'high'
  },
  {
    id: 'oil-spills',
    title: 'Oil Contamination',
    description: 'Oil and petroleum products in water',
    type: 'water-pollution',
    pollutants: ['Crude oil', 'Petroleum products', 'Hydrocarbons'],
    sources: ['Oil tankers', 'Offshore drilling', 'Refineries', 'Pipelines'],
    effects: ['Marine ecosystem damage', 'Bird mortality', 'Beach pollution'],
    solutions: ['Better safety measures', 'Quick cleanup', 'Alternative energy'],
    emoji: '🛢️',
    severity: 'high'
  }
];

const PollutionPuzzle: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<PollutionScenario | null>(null);
  const [gameMode, setGameMode] = useState<'identify' | 'solutions'>('identify');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    type: 'type' | 'source' | 'effect' | 'solution';
    options: string[];
    correct: string;
  } | null>(null);

  useEffect(() => {
    if (questionsAnswered === 0) {
      nextScenario();
    }
  }, []);

  useEffect(() => {
    if (questionsAnswered >= 15) {
      setGameComplete(true);
    }
  }, [questionsAnswered]);

  const nextScenario = () => {
    const scenario = pollutionScenarios[Math.floor(Math.random() * pollutionScenarios.length)];
    setCurrentScenario(scenario);
    generateQuestion(scenario);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const generateQuestion = (scenario: PollutionScenario) => {
    const questionTypes = ['type', 'source', 'effect', 'solution'] as const;
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let options: string[] = [];
    let correct: string = '';
    
    switch (questionType) {
      case 'type':
        options = ['air-pollution', 'water-pollution'];
        correct = scenario.type;
        break;
      case 'source':
        const allSources = pollutionScenarios.flatMap(s => s.sources);
        options = [scenario.sources[0], ...allSources.filter(s => !scenario.sources.includes(s)).slice(0, 2)];
        correct = scenario.sources[0];
        break;
      case 'effect':
        const allEffects = pollutionScenarios.flatMap(s => s.effects);
        options = [scenario.effects[0], ...allEffects.filter(e => !scenario.effects.includes(e)).slice(0, 2)];
        correct = scenario.effects[0];
        break;
      case 'solution':
        const allSolutions = pollutionScenarios.flatMap(s => s.solutions);
        options = [scenario.solutions[0], ...allSolutions.filter(s => !scenario.solutions.includes(s)).slice(0, 2)];
        correct = scenario.solutions[0];
        break;
    }
    
    options = options.sort(() => Math.random() - 0.5);
    setCurrentQuestion({ type: questionType, options, correct });
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || !currentScenario) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === currentQuestion.correct;
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
    
    setTimeout(() => {
      if (questionsAnswered < 14) {
        nextScenario();
      }
    }, 3000);
  };

  const resetGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setGameComplete(false);
    setCurrentScenario(null);
    setCurrentQuestion(null);
    setShowFeedback(false);
    nextScenario();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-400 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-400 text-green-800';
      default: return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const getQuestionText = () => {
    if (!currentQuestion) return '';
    
    switch (currentQuestion.type) {
      case 'type': return 'What type of pollution is this?';
      case 'source': return 'Which is a major source of this pollution?';
      case 'effect': return 'What is a major effect of this pollution?';
      case 'solution': return 'Which is a solution to reduce this pollution?';
    }
  };

  if (gameComplete) {
    const percentage = (score / (questionsAnswered * 10)) * 100;
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Environment Guardian!</h2>
          <div className="text-6xl font-bold mb-4 text-green-600">
            {score}/{questionsAnswered * 10}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            🌍 You're helping protect our planet!
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Environmental Awareness: {percentage.toFixed(1)}%
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-blue-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentScenario || !currentQuestion) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Pollution Detective</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-blue-100">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-blue-100">Question</div>
                <div className="text-2xl font-bold">{questionsAnswered + 1}/15</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((questionsAnswered + 1) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scenario Display */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{currentScenario.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentScenario.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {currentScenario.description}
            </p>
            
            {/* Severity Badge */}
            <div className={`inline-block px-4 py-2 rounded-full border-2 font-semibold ${getSeverityColor(currentScenario.severity)}`}>
              Severity: {currentScenario.severity.toUpperCase()}
            </div>
          </div>

          {/* Question */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
              {getQuestionText()}
            </h3>
            
            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-4 border-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ";
                
                if (!showFeedback) {
                  buttonClass += "border-gray-300 hover:border-blue-400 hover:bg-blue-50";
                } else if (option === currentQuestion.correct) {
                  buttonClass += "border-green-500 bg-green-100 text-green-800";
                } else if (option === selectedAnswer && option !== currentQuestion.correct) {
                  buttonClass += "border-red-500 bg-red-100 text-red-800";
                } else {
                  buttonClass += "border-gray-300 bg-gray-50 text-gray-500";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-6 rounded-lg border-2 ${
              selectedAnswer === currentQuestion.correct 
                ? 'bg-green-50 border-green-300' 
                : 'bg-red-50 border-red-300'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pollution Type */}
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  {currentScenario.type === 'air-pollution' ? (
                    <Wind className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Droplets className="w-6 h-6 text-blue-500" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">Type</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {currentScenario.type.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {/* Severity */}
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <div>
                    <div className="font-semibold text-gray-800">Severity</div>
                    <div className={`text-sm font-medium capitalize ${
                      currentScenario.severity === 'high' ? 'text-red-600' :
                      currentScenario.severity === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {currentScenario.severity}
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Solutions to Reduce This Pollution:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentScenario.solutions.map((solution, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                      <span className="text-green-500">•</span>
                      {solution}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center">
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

export default PollutionPuzzle;