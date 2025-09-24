import React, { useState, useEffect } from 'react';
import { Atom, Zap, RotateCcw, CheckCircle, XCircle, Sparkles, Target } from 'lucide-react';

const MatterPuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [timerActive, setTimerActive] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});

  const puzzles = [
    {
      id: 1,
      type: "drag-drop",
      title: "Classify States of Matter",
      question: "Drag each example to its correct state of matter:",
      items: ["Ice", "Steam", "Water", "Oxygen", "Wood", "Mercury"],
      categories: {
        "Solid": ["Ice", "Wood"],
        "Liquid": ["Water", "Mercury"], 
        "Gas": ["Steam", "Oxygen"]
      },
      explanation: "Solids have fixed shape and volume. Liquids have fixed volume but take container's shape. Gases have neither fixed shape nor volume.",
      topic: "States of Matter"
    },
    {
      id: 2,
      type: "word-puzzle",
      title: "Complete the Atomic Structure",
      question: "Fill in the missing parts of atomic structure:",
      template: "An atom consists of a nucleus containing _____ and _____, surrounded by _____.",
      correctAnswers: ["protons", "neutrons", "electrons"],
      options: ["protons", "neutrons", "electrons", "photons", "ions", "molecules"],
      explanation: "The nucleus contains positively charged protons and neutral neutrons, while negatively charged electrons orbit around it.",
      topic: "Atomic Structure"
    },
    {
      id: 3,
      type: "matching",
      title: "Match Molecules to Their Properties",
      question: "Connect each molecule with its correct property:",
      pairs: [
        { left: "H₂O", right: "Essential for life" },
        { left: "CO₂", right: "Greenhouse gas" },
        { left: "O₂", right: "Supports combustion" },
        { left: "N₂", right: "78% of atmosphere" }
      ],
      explanation: "Water (H₂O) is vital for life, CO₂ traps heat, O₂ is needed for burning, and N₂ makes up most of our air.",
      topic: "Molecules"
    },
    {
      id: 4,
      type: "sequence",
      title: "Arrange the Particle Size Order",
      question: "Arrange from smallest to largest particle size:",
      items: ["Molecule", "Atom", "Proton", "Nucleus"],
      correctOrder: ["Proton", "Nucleus", "Atom", "Molecule"],
      explanation: "Protons are subatomic particles, nucleus contains protons and neutrons, atoms contain nucleus and electrons, molecules contain multiple atoms.",
      topic: "Particle Size"
    },
    {
      id: 5,
      type: "fill-blanks",
      title: "States of Matter Changes",
      question: "Complete the process names:",
      statements: [
        "Solid to Liquid: _____",
        "Liquid to Gas: _____", 
        "Gas to Liquid: _____",
        "Liquid to Solid: _____"
      ],
      answers: ["Melting", "Evaporation", "Condensation", "Freezing"],
      explanation: "These are the fundamental phase transitions that occur when matter changes between different states due to temperature changes.",
      topic: "Phase Changes"
    }
  ];

  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [sequenceOrder, setSequenceOrder] = useState([]);
  const [fillAnswers, setFillAnswers] = useState({});

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      checkAnswer();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeLeft(45);
  };

  const checkAnswer = () => {
    const puzzle = puzzles[currentPuzzle];
    let isCorrect = false;
    let points = 0;

    switch (puzzle.type) {
      case "drag-drop":
        const correctPlacements = Object.keys(puzzle.categories).every(category => {
          return puzzle.categories[category].every(item => 
            droppedItems[item] === category
          );
        });
        isCorrect = correctPlacements && Object.keys(droppedItems).length === puzzle.items.length;
        points = isCorrect ? 20 : 0;
        break;

      case "word-puzzle":
        const userAnswers = userAnswer.toLowerCase().split(',').map(a => a.trim());
        const correctAnswers = puzzle.correctAnswers.map(a => a.toLowerCase());
        isCorrect = userAnswers.length === correctAnswers.length && 
                   userAnswers.every((answer, i) => answer === correctAnswers[i]);
        points = isCorrect ? 20 : 0;
        break;

      case "matching":
        isCorrect = matchedPairs.length === puzzle.pairs.length;
        points = isCorrect ? 20 : matchedPairs.length * 5;
        break;

      case "sequence":
        isCorrect = JSON.stringify(sequenceOrder) === JSON.stringify(puzzle.correctOrder);
        points = isCorrect ? 20 : 0;
        break;

      case "fill-blanks":
        const correctFills = puzzle.answers.every((answer, i) => 
          fillAnswers[i]?.toLowerCase().trim() === answer.toLowerCase()
        );
        isCorrect = correctFills;
        points = isCorrect ? 20 : Object.keys(fillAnswers).length * 5;
        break;
    }

    const timeBonus = timeLeft > 20 ? 5 : 0;
    setScore(score + points + timeBonus);
    setShowResult(true);
    setTimerActive(false);
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      resetPuzzleState();
    } else {
      setGameComplete(true);
    }
  };

  const resetPuzzleState = () => {
    setUserAnswer('');
    setShowResult(false);
    setDraggedItem(null);
    setDroppedItems({});
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSequenceOrder([]);
    setFillAnswers({});
    startTimer();
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setScore(0);
    setGameComplete(false);
    resetPuzzleState();
  };

  useEffect(() => {
    if (!gameComplete) {
      startTimer();
    }
  }, [currentPuzzle]);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (category) => {
    if (draggedItem) {
      setDroppedItems(prev => ({ ...prev, [draggedItem]: category }));
      setDraggedItem(null);
    }
  };

  const handleMatching = (leftItem) => {
    if (selectedLeft === leftItem) {
      setSelectedLeft(null);
    } else if (selectedLeft) {
      const existingPair = matchedPairs.find(pair => pair.left === selectedLeft || pair.left === leftItem);
      if (!existingPair) {
        setMatchedPairs(prev => [...prev, { left: selectedLeft, right: leftItem }]);
      }
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftItem);
    }
  };

  const addToSequence = (item) => {
    if (!sequenceOrder.includes(item)) {
      setSequenceOrder(prev => [...prev, item]);
    }
  };

  const removeFromSequence = (index) => {
    setSequenceOrder(prev => prev.filter((_, i) => i !== index));
  };

  const currentPuzzleData = puzzles[currentPuzzle];

  if (gameComplete) {
    const percentage = Math.round((score / (puzzles.length * 25)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
              Matter Master!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-violet-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-300">{percentage}%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>

            <div className="mb-6 text-xl">
              {percentage >= 90 ? "⚛️ Atomic Expert!" : 
               percentage >= 70 ? "🔬 Matter Scientist!" :
               percentage >= 50 ? "🧪 Good Observer!" : "🌟 Keep Exploring!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderPuzzle = () => {
    switch (currentPuzzleData.type) {
      case "drag-drop":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.keys(currentPuzzleData.categories).map(category => (
                <div
                  key={category}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(category)}
                  className="bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-4 min-h-32"
                >
                  <h3 className="font-bold text-center mb-2 text-yellow-300">{category}</h3>
                  <div className="space-y-1">
                    {currentPuzzleData.items.filter(item => droppedItems[item] === category).map(item => (
                      <div key={item} className="bg-green-500/30 text-white text-sm p-2 rounded text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentPuzzleData.items.filter(item => !droppedItems[item]).map(item => (
                <div
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className="bg-blue-500/30 border border-blue-400 text-white p-3 rounded-lg cursor-move hover:bg-blue-500/50 transition-all"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        );

      case "word-puzzle":
        return (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-lg mb-4">{currentPuzzleData.template}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter answers separated by commas"
                className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {currentPuzzleData.options.map(option => (
                <button
                  key={option}
                  onClick={() => setUserAnswer(prev => prev ? `${prev}, ${option}` : option)}
                  className="bg-violet-500/30 hover:bg-violet-500/50 border border-violet-400/30 text-white p-2 rounded text-sm transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "matching":
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-300 text-center">Molecules</h3>
              {currentPuzzleData.pairs.map(pair => (
                <button
                  key={pair.left}
                  onClick={() => handleMatching(pair.left)}
                  className={`w-full p-3 rounded-lg transition-all ${
                    selectedLeft === pair.left ? 'bg-yellow-500/50 border-2 border-yellow-400' :
                    matchedPairs.find(mp => mp.left === pair.left) ? 'bg-green-500/30 border-2 border-green-400' :
                    'bg-white/10 border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {pair.left}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-300 text-center">Properties</h3>
              {currentPuzzleData.pairs.map(pair => (
                <button
                  key={pair.right}
                  onClick={() => handleMatching(pair.right)}
                  className={`w-full p-3 rounded-lg transition-all ${
                    selectedLeft === pair.right ? 'bg-yellow-500/50 border-2 border-yellow-400' :
                    matchedPairs.find(mp => mp.right === pair.right) ? 'bg-green-500/30 border-2 border-green-400' :
                    'bg-white/10 border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {pair.right}
                </button>
              ))}
            </div>
          </div>
        );

      case "sequence":
        return (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-bold text-yellow-300 mb-3">Your Sequence:</h3>
              <div className="flex flex-wrap gap-2 min-h-12">
                {sequenceOrder.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => removeFromSequence(index)}
                    className="bg-green-500/30 border border-green-400 text-white p-2 rounded cursor-pointer hover:bg-red-500/30"
                  >
                    {index + 1}. {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentPuzzleData.items.map(item => (
                <button
                  key={item}
                  onClick={() => addToSequence(item)}
                  disabled={sequenceOrder.includes(item)}
                  className={`p-3 rounded-lg transition-all ${
                    sequenceOrder.includes(item) ? 'bg-gray-500/30 cursor-not-allowed' :
                    'bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/30'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );

      case "fill-blanks":
        return (
          <div className="space-y-4">
            {currentPuzzleData.statements.map((statement, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4">
                <p className="mb-2">{statement.split('_____')[0]}</p>
                <input
                  type="text"
                  value={fillAnswers[index] || ''}
                  onChange={(e) => setFillAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                  className="bg-white/20 border border-white/30 rounded p-2 text-white placeholder-white/60"
                  placeholder="Fill in the blank"
                />
                <p>{statement.split('_____')[1]}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Atom className="w-8 h-8 text-violet-400" />
              Matter Puzzle Game
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Puzzle {currentPuzzle + 1} of {puzzles.length}</span>
                <span className={`font-bold ${timeLeft <= 15 ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="bg-black/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-violet-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentPuzzle + 1) / puzzles.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Puzzle Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-600 rounded-full flex items-center justify-center font-bold">
              {currentPuzzle + 1}
            </div>
            <div>
              <h2 className="text-xl font-bold">{currentPuzzleData.title}</h2>
              <div className="text-sm bg-violet-500/20 px-3 py-1 rounded-full border border-violet-400/30 inline-block mt-1">
                {currentPuzzleData.topic}
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-6">{currentPuzzleData.question}</p>
          
          {renderPuzzle()}
          
          {!showResult && (
            <button
              onClick={checkAnswer}
              className="w-full mt-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" />
              Submit Answer
            </button>
          )}
        </div>

        {/* Result Card */}
        {showResult && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl border-2 border-green-400">
            <div className="flex items-center gap-3 mb-4 text-green-300">
              <CheckCircle className="w-8 h-8" />
              <h3 className="text-xl font-bold">Puzzle Complete!</h3>
            </div>
            
            <p className="text-white mb-4 leading-relaxed">{currentPuzzleData.explanation}</p>
            
            <button
              onClick={nextPuzzle}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentPuzzle < puzzles.length - 1 ? 'Next Puzzle' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatterPuzzleGame;