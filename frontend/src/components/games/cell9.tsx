import React, { useState, useEffect } from 'react';
import { Microscope, Award, RotateCcw, CheckCircle, XCircle, Dna, Target } from 'lucide-react';

const CellStructurePuzzle = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);
  const [timerActive, setTimerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [assembledCell, setAssembledCell] = useState([]);

  const puzzles = [
    {
      id: 1,
      type: "cell-assembly",
      title: "Build a Plant Cell",
      question: "Drag the organelles to build a complete plant cell:",
      organelles: [
        { name: "Cell Wall", description: "Rigid outer boundary", position: "outer" },
        { name: "Cell Membrane", description: "Controls entry/exit", position: "membrane" },
        { name: "Nucleus", description: "Control center", position: "center" },
        { name: "Chloroplasts", description: "Photosynthesis sites", position: "cytoplasm" },
        { name: "Mitochondria", description: "Powerhouse", position: "cytoplasm" },
        { name: "Vacuole", description: "Storage and support", position: "large" }
      ],
      explanation: "Plant cells have a rigid cell wall, large vacuole, and chloroplasts for photosynthesis, unlike animal cells.",
      topic: "Plant Cell Structure"
    },
    {
      id: 2,
      type: "function-match",
      title: "Match Cell Parts to Functions",
      question: "Connect each organelle with its primary function:",
      pairs: [
        { left: "Nucleus", right: "Controls cell activities" },
        { left: "Mitochondria", right: "Produces energy (ATP)" },
        { left: "Ribosomes", right: "Protein synthesis" },
        { left: "Golgi Body", right: "Packages and modifies proteins" },
        { left: "Endoplasmic Reticulum", right: "Transport system" },
        { left: "Lysosomes", right: "Digests waste materials" }
      ],
      explanation: "Each organelle has specific functions that work together to maintain cellular life and activities.",
      topic: "Organelle Functions"
    },
    {
      id: 3,
      type: "tissue-classification",
      title: "Classify Plant Tissues",
      question: "Sort these tissues into their correct categories:",
      tissues: ["Xylem", "Phloem", "Epidermis", "Parenchyma", "Collenchyma", "Sclerenchyma", "Meristem", "Cork"],
      categories: {
        "Simple Tissues": ["Parenchyma", "Collenchyma", "Sclerenchyma"],
        "Complex Tissues": ["Xylem", "Phloem"],
        "Protective Tissues": ["Epidermis", "Cork"],
        "Meristematic Tissue": ["Meristem"]
      },
      explanation: "Simple tissues have one cell type, complex tissues have multiple types, protective tissues guard plant surfaces, and meristematic tissues help in growth.",
      topic: "Plant Tissues"
    },
    {
      id: 4,
      type: "microscope-focus",
      title: "Identify Cell Structures Under Microscope",
      question: "Click on the correct structures as they appear under the microscope:",
      structures: [
        { name: "Cell Wall", description: "Thick outer boundary", visible: true },
        { name: "Nucleus", description: "Large dark circular structure", visible: true },
        { name: "Chloroplasts", description: "Green oval organelles", visible: true },
        { name: "Cytoplasm", description: "Jelly-like substance", visible: true }
      ],
      explanation: "Under a light microscope, you can clearly see cell walls, nucleus, chloroplasts, and cytoplasm in plant cells.",
      topic: "Microscopy"
    },
    {
      id: 5,
      type: "process-sequence",
      title: "Cell Division Process",
      question: "Arrange the stages of mitosis in correct order:",
      stages: ["Telophase", "Prophase", "Metaphase", "Anaphase"],
      correctOrder: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      explanation: "Mitosis follows PMAT: Prophase (chromosomes condense), Metaphase (align at center), Anaphase (separate), Telophase (nuclear membranes reform).",
      topic: "Cell Division"
    }
  ];

  const [sequenceOrder, setSequenceOrder] = useState([]);
  const [identifiedStructures, setIdentifiedStructures] = useState([]);

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
    setTimeLeft(50);
  };

  const checkAnswer = () => {
    const puzzle = puzzles[currentPuzzle];
    let isCorrect = false;
    let points = 0;

    switch (puzzle.type) {
      case "cell-assembly":
        isCorrect = assembledCell.length === puzzle.organelles.length;
        points = assembledCell.length * 4;
        break;

      case "function-match":
        isCorrect = matchedPairs.length === puzzle.pairs.length;
        points = matchedPairs.length * 4;
        break;

      case "tissue-classification":
        const correctClassifications = Object.keys(puzzle.categories).every(category => {
          return puzzle.categories[category].every(tissue => 
            droppedItems[tissue] === category
          );
        });
        isCorrect = correctClassifications;
        points = isCorrect ? 24 : Object.keys(droppedItems).length * 2;
        break;

      case "microscope-focus":
        isCorrect = identifiedStructures.length === puzzle.structures.length;
        points = identifiedStructures.length * 6;
        break;

      case "process-sequence":
        isCorrect = JSON.stringify(sequenceOrder) === JSON.stringify(puzzle.correctOrder);
        points = isCorrect ? 24 : 0;
        break;
    }

    const timeBonus = timeLeft > 25 ? 6 : 0;
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
    setShowResult(false);
    setDraggedItem(null);
    setDroppedItems({});
    setSelectedAnswers([]);
    setMatchedPairs([]);
    setSelectedLeft(null);
    setAssembledCell([]);
    setSequenceOrder([]);
    setIdentifiedStructures([]);
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

  const handleMatching = (item) => {
    if (selectedLeft === item) {
      setSelectedLeft(null);
    } else if (selectedLeft) {
      const existingPair = matchedPairs.find(pair => 
        pair.left === selectedLeft || pair.right === selectedLeft ||
        pair.left === item || pair.right === item
      );
      if (!existingPair) {
        setMatchedPairs(prev => [...prev, { left: selectedLeft, right: item }]);
      }
      setSelectedLeft(null);
    } else {
      setSelectedLeft(item);
    }
  };

  const addToSequence = (stage) => {
    if (!sequenceOrder.includes(stage)) {
      setSequenceOrder(prev => [...prev, stage]);
    }
  };

  const removeFromSequence = (index) => {
    setSequenceOrder(prev => prev.filter((_, i) => i !== index));
  };

  const addToCell = (organelle) => {
    if (!assembledCell.includes(organelle)) {
      setAssembledCell(prev => [...prev, organelle]);
    }
  };

  const identifyStructure = (structure) => {
    if (!identifiedStructures.includes(structure)) {
      setIdentifiedStructures(prev => [...prev, structure]);
    }
  };

  const currentPuzzleData = puzzles[currentPuzzle];

  if (gameComplete) {
    const percentage = Math.round((score / 150) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Cell Biology Expert!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-emerald-300">{percentage}%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>

            <div className="mb-6 text-xl">
              {percentage >= 90 ? "🔬 Cellular Master!" : 
               percentage >= 70 ? "🧬 Biology Expert!" :
               percentage >= 50 ? "🌱 Good Observer!" : "📚 Keep Learning!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
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
      case "cell-assembly":
        return (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6 min-h-48">
              <h3 className="font-bold text-center mb-4 text-yellow-300">Plant Cell Assembly</h3>
              <div className="grid grid-cols-2 gap-2 min-h-32">
                {assembledCell.map((organelle, index) => (
                  <div key={index} className="bg-green-500/30 border border-green-400 text-white text-sm p-2 rounded text-center">
                    {organelle.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentPuzzleData.organelles.filter(org => !assembledCell.includes(org)).map(organelle => (
                <button
                  key={organelle.name}
                  onClick={() => addToCell(organelle)}
                  className="bg-blue-500/30 border border-blue-400 text-white p-3 rounded-lg hover:bg-blue-500/50 transition-all"
                >
                  <div className="font-bold">{organelle.name}</div>
                  <div className="text-xs opacity-80">{organelle.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case "function-match":
        return (
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-300 text-center">Organelles</h3>
              {currentPuzzleData.pairs.map(pair => (
                <button
                  key={pair.left}
                  onClick={() => handleMatching(pair.left)}
                  className={`w-full p-3 rounded-lg transition-all ${
                    selectedLeft === pair.left ? 'bg-yellow-500/50 border-2 border-yellow-400' :
                    matchedPairs.find(mp => mp.left === pair.left || mp.right === pair.left) ? 'bg-green-500/30 border-2 border-green-400' :
                    'bg-white/10 border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {pair.left}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-yellow-300 text-center">Functions</h3>
              {currentPuzzleData.pairs.map(pair => (
                <button
                  key={pair.right}
                  onClick={() => handleMatching(pair.right)}
                  className={`w-full p-3 rounded-lg transition-all text-sm ${
                    selectedLeft === pair.right ? 'bg-yellow-500/50 border-2 border-yellow-400' :
                    matchedPairs.find(mp => mp.left === pair.right || mp.right === pair.right) ? 'bg-green-500/30 border-2 border-green-400' :
                    'bg-white/10 border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {pair.right}
                </button>
              ))}
            </div>
          </div>
        );

      case "tissue-classification":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(currentPuzzleData.categories).map(category => (
                <div
                  key={category}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(category)}
                  className="bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-4 min-h-32"
                >
                  <h3 className="font-bold text-center mb-2 text-yellow-300 text-sm">{category}</h3>
                  <div className="space-y-1">
                    {currentPuzzleData.tissues.filter(tissue => droppedItems[tissue] === category).map(tissue => (
                      <div key={tissue} className="bg-green-500/30 text-white text-xs p-2 rounded text-center">
                        {tissue}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentPuzzleData.tissues.filter(tissue => !droppedItems[tissue]).map(tissue => (
                <div
                  key={tissue}
                  draggable
                  onDragStart={() => handleDragStart(tissue)}
                  className="bg-blue-500/30 border border-blue-400 text-white p-2 rounded cursor-move hover:bg-blue-500/50 transition-all text-sm"
                >
                  {tissue}
                </div>
              ))}
            </div>
          </div>
        );

      case "microscope-focus":
        return (
          <div className="space-y-6">
            <div className="bg-black/30 border-4 border-gray-600 rounded-full w-80 h-80 mx-auto relative overflow-hidden">
              <div className="absolute inset-4 bg-green-100/20 rounded-full border-2 border-green-400">
                {currentPuzzleData.structures.map((structure, index) => (
                  <button
                    key={structure.name}
                    onClick={() => identifyStructure(structure.name)}
                    className={`absolute w-16 h-16 rounded-full border-2 text-xs font-bold transition-all ${
                      identifiedStructures.includes(structure.name) 
                        ? 'bg-green-500 border-green-300 text-white' 
                        : 'bg-blue-500/50 border-blue-300 text-white hover:bg-blue-600/70'
                    }`}
                    style={{
                      top: `${20 + index * 35}%`,
                      left: `${15 + (index % 2) * 45}%`
                    }}
                  >
                    {structure.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center text-sm">
              <p className="text-yellow-300 mb-2">Click on the structures you can identify:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {identifiedStructures.map(structure => (
                  <span key={structure} className="bg-green-500/30 px-2 py-1 rounded text-xs">
                    ✓ {structure}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "process-sequence":
        return (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-bold text-yellow-300 mb-3">Mitosis Sequence:</h3>
              <div className="flex flex-wrap gap-2 min-h-12">
                {sequenceOrder.map((stage, index) => (
                  <div
                    key={index}
                    onClick={() => removeFromSequence(index)}
                    className="bg-green-500/30 border border-green-400 text-white p-3 rounded cursor-pointer hover:bg-red-500/30 flex items-center gap-2"
                  >
                    <span className="font-bold">{index + 1}.</span>
                    {stage}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentPuzzleData.stages.map(stage => (
                <button
                  key={stage}
                  onClick={() => addToSequence(stage)}
                  disabled={sequenceOrder.includes(stage)}
                  className={`p-4 rounded-lg transition-all ${
                    sequenceOrder.includes(stage) ? 'bg-gray-500/30 cursor-not-allowed' :
                    'bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/30'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Microscope className="w-8 h-8 text-green-400" />
              Cell Structure & Tissues
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
                <span className={`font-bold ${timeLeft <= 20 ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="bg-black/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentPuzzle + 1) / puzzles.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Puzzle Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center font-bold">
              {currentPuzzle + 1}
            </div>
            <div>
              <h2 className="text-xl font-bold">{currentPuzzleData.title}</h2>
              <div className="text-sm bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 inline-block mt-1">
                {currentPuzzleData.topic}
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-6">{currentPuzzleData.question}</p>
          
          {renderPuzzle()}
          
          {!showResult && (
            <button
              onClick={checkAnswer}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentPuzzle < puzzles.length - 1 ? 'Next Puzzle' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CellStructurePuzzle;