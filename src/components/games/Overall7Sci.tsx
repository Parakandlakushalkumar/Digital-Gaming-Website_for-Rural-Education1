import React, { useState, useEffect } from 'react';
import { Lightbulb, Trophy, RotateCcw, Users, Play, Pause } from 'lucide-react';

interface BingoItem {
  id: string;
  answer: string;
  topic: string;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Player {
  id: number;
  name: string;
  card: BingoItem[];
  markedItems: Set<string>;
  hasWon: boolean;
}

interface Overall7SciProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const ScienceBingoGame: React.FC<Overall7SciProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'paused' | 'ended'>('setup');
  const [winner, setWinner] = useState<Player | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [gameMessage, setGameMessage] = useState('');

  // Science topics and answers
  const bingoAnswers: BingoItem[] = [
    // Nutrition in Plants & Animals
    { id: 'chlorophyll', answer: 'Chlorophyll', topic: 'Nutrition in Plants & Animals' },
    { id: 'photosynthesis', answer: 'Photosynthesis', topic: 'Nutrition in Plants & Animals' },
    { id: 'carnivore', answer: 'Carnivore', topic: 'Nutrition in Plants & Animals' },
    { id: 'herbivore', answer: 'Herbivore', topic: 'Nutrition in Plants & Animals' },
    { id: 'omnivore', answer: 'Omnivore', topic: 'Nutrition in Plants & Animals' },
    { id: 'glucose', answer: 'Glucose', topic: 'Nutrition in Plants & Animals' },
    { id: 'stomata', answer: 'Stomata', topic: 'Nutrition in Plants & Animals' },
    { id: 'protein', answer: 'Protein', topic: 'Nutrition in Plants & Animals' },
    
    // Heat, Light, Acids & Bases
    { id: 'conduction', answer: 'Conduction', topic: 'Heat, Light, Acids & Bases' },
    { id: 'convection', answer: 'Convection', topic: 'Heat, Light, Acids & Bases' },
    { id: 'radiation', answer: 'Radiation', topic: 'Heat, Light, Acids & Bases' },
    { id: 'reflection', answer: 'Reflection', topic: 'Heat, Light, Acids & Bases' },
    { id: 'refraction', answer: 'Refraction', topic: 'Heat, Light, Acids & Bases' },
    { id: 'litmus', answer: 'Litmus', topic: 'Heat, Light, Acids & Bases' },
    { id: 'neutral', answer: 'Neutral', topic: 'Heat, Light, Acids & Bases' },
    { id: 'indicator', answer: 'Indicator', topic: 'Heat, Light, Acids & Bases' },
    
    // Physical & Chemical Changes
    { id: 'melting', answer: 'Melting', topic: 'Physical & Chemical Changes' },
    { id: 'evaporation', answer: 'Evaporation', topic: 'Physical & Chemical Changes' },
    { id: 'condensation', answer: 'Condensation', topic: 'Physical & Chemical Changes' },
    { id: 'rusting', answer: 'Rusting', topic: 'Physical & Chemical Changes' },
    { id: 'burning', answer: 'Burning', topic: 'Physical & Chemical Changes' },
    { id: 'crystallization', answer: 'Crystallization', topic: 'Physical & Chemical Changes' },
    { id: 'sublimation', answer: 'Sublimation', topic: 'Physical & Chemical Changes' },
    { id: 'reversible', answer: 'Reversible', topic: 'Physical & Chemical Changes' },
    
    // Respiration, Transportation in Living Beings
    { id: 'heart', answer: 'Heart', topic: 'Respiration, Transportation' },
    { id: 'lungs', answer: 'Lungs', topic: 'Respiration, Transportation' },
    { id: 'blood', answer: 'Blood', topic: 'Respiration, Transportation' },
    { id: 'oxygen', answer: 'Oxygen', topic: 'Respiration, Transportation' },
    { id: 'co2', answer: 'CO2', topic: 'Respiration, Transportation' },
    { id: 'arteries', answer: 'Arteries', topic: 'Respiration, Transportation' },
    { id: 'veins', answer: 'Veins', topic: 'Respiration, Transportation' },
    { id: 'breathing', answer: 'Breathing', topic: 'Respiration, Transportation' },
    
    // Reproduction in Plants
    { id: 'flower', answer: 'Flower', topic: 'Reproduction in Plants' },
    { id: 'pollen', answer: 'Pollen', topic: 'Reproduction in Plants' },
    { id: 'seed', answer: 'Seed', topic: 'Reproduction in Plants' },
    { id: 'fruit', answer: 'Fruit', topic: 'Reproduction in Plants' },
    { id: 'pollination', answer: 'Pollination', topic: 'Reproduction in Plants' },
    { id: 'germination', answer: 'Germination', topic: 'Reproduction in Plants' },
    { id: 'stamen', answer: 'Stamen', topic: 'Reproduction in Plants' },
    { id: 'pistil', answer: 'Pistil', topic: 'Reproduction in Plants' },
    
    // Weather, Climate, Soil
    { id: 'clayey', answer: 'Clayey', topic: 'Weather, Climate, Soil' },
    { id: 'sandy', answer: 'Sandy', topic: 'Weather, Climate, Soil' },
    { id: 'loamy', answer: 'Loamy', topic: 'Weather, Climate, Soil' },
    { id: 'humidity', answer: 'Humidity', topic: 'Weather, Climate, Soil' },
    { id: 'precipitation', answer: 'Precipitation', topic: 'Weather, Climate, Soil' },
    { id: 'monsoon', answer: 'Monsoon', topic: 'Weather, Climate, Soil' },
    { id: 'humus', answer: 'Humus', topic: 'Weather, Climate, Soil' },
    { id: 'erosion', answer: 'Erosion', topic: 'Weather, Climate, Soil' },
    
    // Motion, Time, Electric Current
    { id: 'speed', answer: 'Speed', topic: 'Motion, Time, Electric Current' },
    { id: 'velocity', answer: 'Velocity', topic: 'Motion, Time, Electric Current' },
    { id: 'friction', answer: 'Friction', topic: 'Motion, Time, Electric Current' },
    { id: 'circuit', answer: 'Circuit', topic: 'Motion, Time, Electric Current' },
    { id: 'conductor', answer: 'Conductor', topic: 'Motion, Time, Electric Current' },
    { id: 'insulator', answer: 'Insulator', topic: 'Motion, Time, Electric Current' },
    { id: 'battery', answer: 'Battery', topic: 'Motion, Time, Electric Current' },
    { id: 'switch', answer: 'Switch', topic: 'Motion, Time, Electric Current' }
  ];

  const questions: Question[] = [
    // Nutrition in Plants & Animals
    { id: 'q1', question: 'Which green pigment helps plants make food?', answer: 'Chlorophyll', topic: 'Nutrition', difficulty: 'easy' },
    { id: 'q2', question: 'What is the process by which plants make food using sunlight?', answer: 'Photosynthesis', topic: 'Nutrition', difficulty: 'easy' },
    { id: 'q3', question: 'Animals that eat only meat are called?', answer: 'Carnivore', topic: 'Nutrition', difficulty: 'easy' },
    { id: 'q4', question: 'Animals that eat only plants are called?', answer: 'Herbivore', topic: 'Nutrition', difficulty: 'easy' },
    { id: 'q5', question: 'Animals that eat both plants and meat are called?', answer: 'Omnivore', topic: 'Nutrition', difficulty: 'easy' },
    { id: 'q6', question: 'What sugar is produced during photosynthesis?', answer: 'Glucose', topic: 'Nutrition', difficulty: 'medium' },
    { id: 'q7', question: 'Tiny pores on leaves through which gases exchange?', answer: 'Stomata', topic: 'Nutrition', difficulty: 'medium' },
    { id: 'q8', question: 'Which nutrient helps in body building and repair?', answer: 'Protein', topic: 'Nutrition', difficulty: 'easy' },

    // Heat, Light, Acids & Bases
    { id: 'q9', question: 'Heat transfer through direct contact is called?', answer: 'Conduction', topic: 'Heat & Light', difficulty: 'easy' },
    { id: 'q10', question: 'Heat transfer through liquids and gases is called?', answer: 'Convection', topic: 'Heat & Light', difficulty: 'medium' },
    { id: 'q11', question: 'Heat transfer without any medium is called?', answer: 'Radiation', topic: 'Heat & Light', difficulty: 'medium' },
    { id: 'q12', question: 'Bouncing back of light from a surface is called?', answer: 'Reflection', topic: 'Heat & Light', difficulty: 'easy' },
    { id: 'q13', question: 'Bending of light when it passes through different mediums?', answer: 'Refraction', topic: 'Heat & Light', difficulty: 'medium' },
    { id: 'q14', question: 'Which paper is used to test acids and bases?', answer: 'Litmus', topic: 'Acids & Bases', difficulty: 'easy' },
    { id: 'q15', question: 'A solution that is neither acidic nor basic is?', answer: 'Neutral', topic: 'Acids & Bases', difficulty: 'easy' },
    { id: 'q16', question: 'Substances that show different colors in acids and bases?', answer: 'Indicator', topic: 'Acids & Bases', difficulty: 'medium' },

    // Physical & Chemical Changes
    { id: 'q17', question: 'Change of ice into water is called?', answer: 'Melting', topic: 'Changes', difficulty: 'easy' },
    { id: 'q18', question: 'Change of water into water vapor is called?', answer: 'Evaporation', topic: 'Changes', difficulty: 'easy' },
    { id: 'q19', question: 'Change of water vapor into water is called?', answer: 'Condensation', topic: 'Changes', difficulty: 'easy' },
    { id: 'q20', question: 'What happens when iron is exposed to air and moisture?', answer: 'Rusting', topic: 'Changes', difficulty: 'easy' },
    { id: 'q21', question: 'What type of change is burning of paper?', answer: 'Burning', topic: 'Changes', difficulty: 'medium' },
    { id: 'q22', question: 'Process of forming crystals from solution?', answer: 'Crystallization', topic: 'Changes', difficulty: 'hard' },
    { id: 'q23', question: 'Direct change from solid to gas without melting?', answer: 'Sublimation', topic: 'Changes', difficulty: 'hard' },
    { id: 'q24', question: 'Changes that can be undone are called?', answer: 'Reversible', topic: 'Changes', difficulty: 'medium' },

    // Respiration, Transportation
    { id: 'q25', question: 'Which organ pumps blood in our body?', answer: 'Heart', topic: 'Body Systems', difficulty: 'easy' },
    { id: 'q26', question: 'Which organs help us breathe?', answer: 'Lungs', topic: 'Body Systems', difficulty: 'easy' },
    { id: 'q27', question: 'Red liquid that carries oxygen in our body?', answer: 'Blood', topic: 'Body Systems', difficulty: 'easy' },
    { id: 'q28', question: 'Which gas do we breathe in?', answer: 'Oxygen', topic: 'Body Systems', difficulty: 'easy' },
    { id: 'q29', question: 'Which gas do we breathe out?', answer: 'CO2', topic: 'Body Systems', difficulty: 'easy' },
    { id: 'q30', question: 'Blood vessels that carry blood away from heart?', answer: 'Arteries', topic: 'Body Systems', difficulty: 'medium' },
    { id: 'q31', question: 'Blood vessels that carry blood to the heart?', answer: 'Veins', topic: 'Body Systems', difficulty: 'medium' },
    { id: 'q32', question: 'The process of taking in and giving out air?', answer: 'Breathing', topic: 'Body Systems', difficulty: 'easy' },

    // Reproduction in Plants
    { id: 'q33', question: 'Colorful part of plant used for reproduction?', answer: 'Flower', topic: 'Plant Reproduction', difficulty: 'easy' },
    { id: 'q34', question: 'Powdery substance produced by flowers?', answer: 'Pollen', topic: 'Plant Reproduction', difficulty: 'easy' },
    { id: 'q35', question: 'What develops from the flower after fertilization?', answer: 'Seed', topic: 'Plant Reproduction', difficulty: 'medium' },
    { id: 'q36', question: 'Fleshy covering around seeds?', answer: 'Fruit', topic: 'Plant Reproduction', difficulty: 'easy' },
    { id: 'q37', question: 'Transfer of pollen from one flower to another?', answer: 'Pollination', topic: 'Plant Reproduction', difficulty: 'medium' },
    { id: 'q38', question: 'Process of seed growing into a new plant?', answer: 'Germination', topic: 'Plant Reproduction', difficulty: 'medium' },
    { id: 'q39', question: 'Male part of a flower?', answer: 'Stamen', topic: 'Plant Reproduction', difficulty: 'hard' },
    { id: 'q40', question: 'Female part of a flower?', answer: 'Pistil', topic: 'Plant Reproduction', difficulty: 'hard' },

    // Weather, Climate, Soil
    { id: 'q41', question: 'Which soil is best for growing rice?', answer: 'Clayey', topic: 'Weather & Soil', difficulty: 'easy' },
    { id: 'q42', question: 'Which soil has the largest particles?', answer: 'Sandy', topic: 'Weather & Soil', difficulty: 'medium' },
    { id: 'q43', question: 'Which soil is best for most crops?', answer: 'Loamy', topic: 'Weather & Soil', difficulty: 'medium' },
    { id: 'q44', question: 'Amount of water vapor in air is called?', answer: 'Humidity', topic: 'Weather & Soil', difficulty: 'medium' },
    { id: 'q45', question: 'Rain, snow, and hail are forms of?', answer: 'Precipitation', topic: 'Weather & Soil', difficulty: 'medium' },
    { id: 'q46', question: 'Seasonal winds that bring rain to India?', answer: 'Monsoon', topic: 'Weather & Soil', difficulty: 'easy' },
    { id: 'q47', question: 'Decaying organic matter in soil is called?', answer: 'Humus', topic: 'Weather & Soil', difficulty: 'medium' },
    { id: 'q48', question: 'Wearing away of soil by wind and water?', answer: 'Erosion', topic: 'Weather & Soil', difficulty: 'easy' },

    // Motion, Time, Electric Current
    { id: 'q49', question: 'Distance covered per unit time is called?', answer: 'Speed', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q50', question: 'Speed in a particular direction is called?', answer: 'Velocity', topic: 'Motion & Electricity', difficulty: 'medium' },
    { id: 'q51', question: 'Force that opposes motion is called?', answer: 'Friction', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q52', question: 'Complete path for electric current is called?', answer: 'Circuit', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q53', question: 'Materials that allow electricity to pass through?', answer: 'Conductor', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q54', question: 'Materials that do not allow electricity to pass?', answer: 'Insulator', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q55', question: 'Device that provides electric current?', answer: 'Battery', topic: 'Motion & Electricity', difficulty: 'easy' },
    { id: 'q56', question: 'Device used to control electric current in circuit?', answer: 'Switch', topic: 'Motion & Electricity', difficulty: 'easy' }
  ];

  const generateBingoCard = (): BingoItem[] => {
    const shuffled = [...bingoAnswers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 25); // 5x5 grid
  };

  const setupGame = () => {
    const newPlayers: Player[] = [];
    for (let i = 1; i <= playerCount; i++) {
      newPlayers.push({
        id: i,
        name: `Player ${i}`,
        card: generateBingoCard(),
        markedItems: new Set(),
        hasWon: false
      });
    }
    setPlayers(newPlayers);
    setAskedQuestions(new Set());
    setGamePhase('playing');
    setWinner(null);
    setGameMessage('Game started! Click "Next Question" to begin.');
  };

  const askQuestion = () => {
    const availableQuestions = questions.filter(q => !askedQuestions.has(q.id));
    if (availableQuestions.length === 0) {
      setGameMessage('All questions have been asked!');
      return;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setAskedQuestions(prev => new Set([...prev, randomQuestion.id]));
    setShowAnswer(false);
    setGameMessage(`Question: ${randomQuestion.question}`);
  };

  const revealAnswer = () => {
    if (!currentQuestion) return;
    
    setShowAnswer(true);
    setGameMessage(`Answer: ${currentQuestion.answer}`);
    
    // Update player cards
    setPlayers(prev => prev.map(player => {
      const hasAnswer = player.card.some(item => item.answer === currentQuestion.answer);
      if (hasAnswer) {
        const newMarkedItems = new Set(player.markedItems);
        const matchingItem = player.card.find(item => item.answer === currentQuestion.answer);
        if (matchingItem) {
          newMarkedItems.add(matchingItem.id);
        }
        return { ...player, markedItems: newMarkedItems };
      }
      return player;
    }));

    // Check for winners after a short delay
    setTimeout(checkForWinners, 1000);
  };

  const checkForWinners = () => {
    const updatedPlayers = players.map(player => {
      const card = player.card;
      const marked = player.markedItems;
      
      // Check rows
      for (let row = 0; row < 5; row++) {
        if (card.slice(row * 5, (row + 1) * 5).every(item => marked.has(item.id))) {
          return { ...player, hasWon: true };
        }
      }
      
      // Check columns
      for (let col = 0; col < 5; col++) {
        if ([0, 1, 2, 3, 4].every(row => marked.has(card[row * 5 + col].id))) {
          return { ...player, hasWon: true };
        }
      }
      
      // Check diagonals
      if ([0, 6, 12, 18, 24].every(index => marked.has(card[index].id)) ||
          [4, 8, 12, 16, 20].every(index => marked.has(card[index].id))) {
        return { ...player, hasWon: true };
      }
      
      return player;
    });
    
    const winner = updatedPlayers.find(p => p.hasWon);
    if (winner) {
      setWinner(winner);
      setGamePhase('ended');
      setGameMessage(`🎉 ${winner.name} shouted "SCIENCE BINGO!" and wins! 🎉`);
      // Call onComplete with a score based on questions answered
      if (onComplete) {
        onComplete(askedQuestions.size * 10); // 10 points per question
      }
    }
    
    setPlayers(updatedPlayers);
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentQuestion(null);
    setAskedQuestions(new Set());
    setGamePhase('setup');
    setWinner(null);
    setShowAnswer(false);
    setGameMessage('');
  };

  const getTopicColor = (topic: string) => {
    const colors: { [key: string]: string } = {
      'Nutrition in Plants & Animals': 'bg-green-100 text-green-800',
      'Heat, Light, Acids & Bases': 'bg-red-100 text-red-800',
      'Physical & Chemical Changes': 'bg-blue-100 text-blue-800',
      'Respiration, Transportation': 'bg-purple-100 text-purple-800',
      'Reproduction in Plants': 'bg-yellow-100 text-yellow-800',
      'Weather, Climate, Soil': 'bg-indigo-100 text-indigo-800',
      'Motion, Time, Electric Current': 'bg-pink-100 text-pink-800'
    };
    return colors[topic] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">🧪 Science Bingo Game 🧪</h1>
        <p className="text-lg text-gray-600">Answer science questions and mark your bingo card!</p>
      </div>

      {gamePhase === 'setup' && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Game Setup</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Players:
            </label>
            <select 
              value={playerCount} 
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>1 Player</option>
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          <button
            onClick={setupGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" /> Start Game
          </button>

          <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-bold mb-2">Science Topics Covered:</h3>
            <ul className="space-y-1">
              <li>• Nutrition in Plants & Animals</li>
              <li>• Heat, Light, Acids & Bases</li>
              <li>• Physical & Chemical Changes</li>
              <li>• Respiration, Transportation in Living Beings</li>
              <li>• Reproduction in Plants</li>
              <li>• Weather, Climate, Soil</li>
              <li>• Motion, Time, Electric Current</li>
            </ul>
          </div>
        </div>
      )}

      {(gamePhase === 'playing' || gamePhase === 'ended') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Question Master
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={askQuestion}
                  disabled={gamePhase === 'ended'}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Next Question
                </button>
                
                <button
                  onClick={revealAnswer}
                  disabled={!currentQuestion || showAnswer || gamePhase === 'ended'}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Reveal Answer
                </button>

                <button
                  onClick={resetGame}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> New Game
                </button>

                {onExit && (
                  <button
                    onClick={onExit}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    Exit Game
                  </button>
                )}
              </div>

              {gameMessage && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                  {gameMessage}
                </div>
              )}

              {currentQuestion && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className={`text-xs font-medium px-2 py-1 rounded mb-2 inline-block ${getTopicColor(currentQuestion.topic)}`}>
                    {currentQuestion.topic}
                  </div>
                  <p className="font-medium text-sm">{currentQuestion.question}</p>
                  {showAnswer && (
                    <div className="mt-2 p-2 bg-green-100 rounded">
                      <span className="font-bold text-green-800">Answer: {currentQuestion.answer}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                <p>Questions asked: {askedQuestions.size} / {questions.length}</p>
              </div>
            </div>

            {winner && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-yellow-800">Winner!</h3>
                <p className="text-yellow-700">{winner.name}</p>
              </div>
            )}
          </div>

          {/* Bingo Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map(player => (
                <div key={player.id} className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-lg ${player.hasWon ? 'text-green-600' : 'text-gray-800'}`}>
                      {player.name} {player.hasWon && '🏆'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {player.markedItems.size}/25
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1">
                    {player.card.map((item, index) => (
                      <div
                        key={`${player.id}-${item.id}`}
                        className={`
                          aspect-square border-2 rounded flex items-center justify-center text-xs font-medium p-1 text-center
                          ${player.markedItems.has(item.id) 
                            ? 'bg-green-100 border-green-500 text-green-800' 
                            : 'bg-white border-gray-300 text-gray-800'
                          }
                        `}
                      >
                        {item.answer}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScienceBingoGame;