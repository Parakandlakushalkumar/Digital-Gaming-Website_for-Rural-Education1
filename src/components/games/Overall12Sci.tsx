import React, { useState, useEffect } from 'react';
import { 
  Zap, Eye, Atom, Cpu, FlaskConical, Dna, Leaf, 
  CheckCircle, X, RotateCcw, Trophy, Star, Timer,
  Play, Pause, Volume2
} from 'lucide-react';

const ScienceMatchingGame = () => {
  const [currentTopic, setCurrentTopic] = useState('menu');
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [shakeItem, setShakeItem] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [gameComplete, setGameComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const topics = [
    {
      id: 'charges',
      title: 'Electric Charges & Fields',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'current',
      title: 'Current Electricity',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      id: 'induction',
      title: 'Electromagnetic Induction',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'optics',
      title: 'Optics',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'atoms',
      title: 'Atoms & Nuclei',
      icon: <Atom className="w-6 h-6" />,
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50'
    },
    {
      id: 'semiconductors',
      title: 'Semiconductors',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'from-gray-50 to-slate-50'
    },
    {
      id: 'kinetics',
      title: 'Chemical Kinetics',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    },
    {
      id: 'genetics',
      title: 'Genetics',
      icon: <Dna className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50'
    },
    {
      id: 'ecology',
      title: 'Ecology',
      icon: <Leaf className="w-6 h-6" />,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50'
    }
  ];

  const gameData = {
    charges: {
      questions: [
        { id: 'q1', text: "Coulomb's Law", formula: true },
        { id: 'q2', text: "Electric Field", formula: true },
        { id: 'q3', text: "Electric Potential Energy", formula: true },
        { id: 'q4', text: "Capacitance Formula", formula: true }
      ],
      answers: [
        { id: 'a1', text: "F ∝ q₁q₂ / r²", matchId: 'q1' },
        { id: 'a2', text: "E = F / q", matchId: 'q2' },
        { id: 'a3', text: "U = kq₁q₂ / r", matchId: 'q3' },
        { id: 'a4', text: "C = Q / V", matchId: 'q4' }
      ]
    },
    current: {
      questions: [
        { id: 'q1', text: "Ohm's Law", formula: true },
        { id: 'q2', text: "Power Formula", formula: true },
        { id: 'q3', text: "Resistance in Series", formula: true },
        { id: 'q4', text: "Current Definition", formula: true }
      ],
      answers: [
        { id: 'a1', text: "V = IR", matchId: 'q1' },
        { id: 'a2', text: "P = VI", matchId: 'q2' },
        { id: 'a3', text: "R = R₁ + R₂ + R₃", matchId: 'q3' },
        { id: 'a4', text: "I = Q / t", matchId: 'q4' }
      ]
    },
    induction: {
      questions: [
        { id: 'q1', text: "Faraday's Law", formula: true },
        { id: 'q2', text: "Lenz's Law", concept: true },
        { id: 'q3', text: "Self Inductance", formula: true },
        { id: 'q4', text: "Motional EMF", formula: true }
      ],
      answers: [
        { id: 'a1', text: "ε = -dΦ/dt", matchId: 'q1' },
        { id: 'a2', text: "Opposes change in flux", matchId: 'q2' },
        { id: 'a3', text: "L = Φ / I", matchId: 'q3' },
        { id: 'a4', text: "ε = Blv", matchId: 'q4' }
      ]
    },
    optics: {
      questions: [
        { id: 'q1', text: "Convex Lens", concept: true },
        { id: 'q2', text: "Snell's Law", formula: true },
        { id: 'q3', text: "Mirror Formula", formula: true },
        { id: 'q4', text: "Critical Angle", concept: true }
      ],
      answers: [
        { id: 'a1', text: "Converging Rays", matchId: 'q1' },
        { id: 'a2', text: "n₁sin θ₁ = n₂sin θ₂", matchId: 'q2' },
        { id: 'a3', text: "1/f = 1/u + 1/v", matchId: 'q3' },
        { id: 'a4', text: "Total Internal Reflection", matchId: 'q4' }
      ]
    },
    atoms: {
      questions: [
        { id: 'q1', text: "Alpha Particle", concept: true },
        { id: 'q2', text: "Beta Particle", concept: true },
        { id: 'q3', text: "Binding Energy", formula: true },
        { id: 'q4', text: "Half Life", concept: true }
      ],
      answers: [
        { id: 'a1', text: "2 protons + 2 neutrons", matchId: 'q1' },
        { id: 'a2', text: "High energy electron", matchId: 'q2' },
        { id: 'a3', text: "E = Δmc²", matchId: 'q3' },
        { id: 'a4', text: "Time for 50% decay", matchId: 'q4' }
      ]
    },
    semiconductors: {
      questions: [
        { id: 'q1', text: "Diode", concept: true },
        { id: 'q2', text: "Transistor", concept: true },
        { id: 'q3', text: "P-type Doping", concept: true },
        { id: 'q4', text: "N-type Doping", concept: true }
      ],
      answers: [
        { id: 'a1', text: "One-way current flow", matchId: 'q1' },
        { id: 'a2', text: "Current amplifier", matchId: 'q2' },
        { id: 'a3', text: "Acceptor impurities", matchId: 'q3' },
        { id: 'a4', text: "Donor impurities", matchId: 'q4' }
      ]
    },
    kinetics: {
      questions: [
        { id: 'q1', text: "Catalyst", concept: true },
        { id: 'q2', text: "Rate Law", formula: true },
        { id: 'q3', text: "Arrhenius Equation", formula: true },
        { id: 'q4', text: "Order of Reaction", concept: true }
      ],
      answers: [
        { id: 'a1', text: "Lowers activation energy", matchId: 'q1' },
        { id: 'a2', text: "Rate = k[A]ᵐ[B]ⁿ", matchId: 'q2' },
        { id: 'a3', text: "k = Ae⁻ᴱᵃ/ᴿᵀ", matchId: 'q3' },
        { id: 'a4', text: "Sum of exponents", matchId: 'q4' }
      ]
    },
    genetics: {
      questions: [
        { id: 'q1', text: "DNA Base Pair: A", concept: true },
        { id: 'q2', text: "DNA Base Pair: G", concept: true },
        { id: 'q3', text: "Transcription", concept: true },
        { id: 'q4', text: "Mutation", concept: true }
      ],
      answers: [
        { id: 'a1', text: "T (Thymine)", matchId: 'q1' },
        { id: 'a2', text: "C (Cytosine)", matchId: 'q2' },
        { id: 'a3', text: "DNA → RNA", matchId: 'q3' },
        { id: 'a4', text: "Change in DNA sequence", matchId: 'q4' }
      ]
    },
    ecology: {
      questions: [
        { id: 'q1', text: "Ozone Layer", concept: true },
        { id: 'q2', text: "Greenhouse Effect", concept: true },
        { id: 'q3', text: "Food Chain", concept: true },
        { id: 'q4', text: "Biodiversity", concept: true }
      ],
      answers: [
        { id: 'a1', text: "UV Protection", matchId: 'q1' },
        { id: 'a2', text: "Heat trapping by gases", matchId: 'q2' },
        { id: 'a3', text: "Producer → Consumer", matchId: 'q3' },
        { id: 'a4', text: "Variety of life forms", matchId: 'q4' }
      ]
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isPlaying && currentTopic !== 'menu') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTopic]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ ...item, type });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem, targetType) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.type === targetType) {
      setDraggedItem(null);
      return;
    }

    const isCorrectMatch = 
      (draggedItem.type === 'question' && targetItem.matchId === draggedItem.id) ||
      (draggedItem.type === 'answer' && draggedItem.matchId === targetItem.id);

    if (isCorrectMatch) {
      // Correct match
      const matchKey = draggedItem.type === 'question' 
        ? `${draggedItem.id}-${targetItem.id}`
        : `${targetItem.id}-${draggedItem.id}`;
      
      setMatches(prev => ({ ...prev, [matchKey]: true }));
      setScore(prev => prev + 10);
      
      // Check if topic is complete
      const currentData = gameData[currentTopic];
      const newMatchCount = Object.keys(matches).length + 1;
      
      if (newMatchCount === currentData.questions.length) {
        setCompletedTopics(prev => new Set([...prev, currentTopic]));
        setScore(prev => prev + 50); // Bonus for completing topic
      }
    } else {
      // Wrong match
      setWrongAttempts(prev => prev + 1);
      setShakeItem(targetItem.id);
      setTimeout(() => setShakeItem(null), 600);
    }
    
    setDraggedItem(null);
  };

  const startGame = (topicId) => {
    setCurrentTopic(topicId);
    setMatches({});
    setIsPlaying(true);
    setTimeElapsed(0);
  };

  const resetGame = () => {
    setCurrentTopic('menu');
    setMatches({});
    setScore(0);
    setWrongAttempts(0);
    setDraggedItem(null);
    setShakeItem(null);
    setIsPlaying(false);
    setTimeElapsed(0);
  };

  const MenuScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center text-white">
        <div className="mb-12">
          <div className="inline-block p-6 bg-white bg-opacity-10 rounded-full mb-6">
            <Star className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Science Matching Challenge
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Master scientific concepts through drag-and-drop matching
          </p>
          <div className="flex justify-center items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span>Total Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Completed: {completedTopics.size}/{topics.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <div
              key={topic.id}
              onClick={() => startGame(topic.id)}
              className={`group relative overflow-hidden bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-20 ${
                completedTopics.has(topic.id) ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${topic.color} text-white`}>
                    {topic.icon}
                  </div>
                  {completedTopics.has(topic.id) && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Match concepts with their definitions and formulas
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    {completedTopics.has(topic.id) ? 'Completed ✅' : 'Start Challenge'}
                  </span>
                  <Play className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {completedTopics.size === topics.length && (
          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-black">
            <Trophy className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
            <p className="text-lg">You've mastered all science topics!</p>
          </div>
        )}
      </div>
    </div>
  );

  const GameScreen = () => {
    const currentData = gameData[currentTopic];
    const topic = topics.find(t => t.id === currentTopic);
    
    if (!currentData || !topic) return <MenuScreen />;

    const isTopicComplete = Object.keys(matches).length === currentData.questions.length;

    return (
      <div className={`min-h-screen bg-gradient-to-br ${topic.bgColor} p-6`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${topic.color} text-white`}>
                  {topic.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{topic.title}</h1>
                  <p className="text-gray-600">Drag questions to their matching answers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="text-lg font-bold text-gray-800">{formatTime(timeElapsed)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="text-lg font-bold text-green-600">{score}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Wrong</div>
                  <div className="text-lg font-bold text-red-600">{wrongAttempts}</div>
                </div>
                <button
                  onClick={() => setCurrentTopic('menu')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${topic.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${(Object.keys(matches).length / currentData.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Game Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Questions Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center bg-white rounded-lg p-3 shadow">
                📚 Concepts & Laws
              </h2>
              {currentData.questions.map(question => {
                const isMatched = Object.keys(matches).some(key => key.startsWith(question.id));
                return (
                  <div
                    key={question.id}
                    draggable={!isMatched}
                    onDragStart={(e) => handleDragStart(e, question, 'question')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-move select-none ${
                      isMatched
                        ? 'bg-green-100 border-green-400 text-green-800 shadow-lg cursor-default'
                        : shakeItem === question.id
                        ? 'bg-red-100 border-red-400 animate-bounce'
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${question.formula ? 'text-blue-600' : 'text-purple-600'}`}>
                        {question.text}
                      </span>
                      <div className="flex items-center gap-2">
                        {question.formula && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Formula</span>}
                        {question.concept && <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Concept</span>}
                        {isMatched && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answers Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center bg-white rounded-lg p-3 shadow">
                🎯 Answers & Definitions
              </h2>
              {currentData.answers.map(answer => {
                const isMatched = Object.keys(matches).some(key => key.endsWith(answer.id));
                return (
                  <div
                    key={answer.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, answer, 'answer')}
                    className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 min-h-[60px] flex items-center ${
                      isMatched
                        ? 'bg-green-100 border-green-400 text-green-800 shadow-lg'
                        : shakeItem === answer.id
                        ? 'bg-red-100 border-red-400 animate-pulse'
                        : 'bg-gray-50 border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-medium ${isMatched ? 'text-green-700' : 'text-gray-700'}`}>
                        {answer.text}
                      </span>
                      {isMatched && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Modal */}
          {isTopicComplete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl text-center max-w-md mx-4 animate-bounce">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Topic Mastered!</h3>
                <p className="text-gray-600 mb-4">
                  Congratulations! You've successfully matched all concepts in {topic.title}
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCurrentTopic('menu')}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue Learning
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return currentTopic === 'menu' ? <MenuScreen /> : <GameScreen />;
};

export default ScienceMatchingGame;