import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, Trophy, Target } from 'lucide-react';

const MotionForcePuzzle = () => {
  const [gameData] = useState({
    concepts: [
      { id: 1, term: "Newton's First Law", definition: "An object at rest stays at rest, an object in motion stays in motion unless acted upon by a force" },
      { id: 2, term: "Newton's Second Law", definition: "Force equals mass times acceleration (F = ma)" },
      { id: 3, term: "Newton's Third Law", definition: "For every action, there is an equal and opposite reaction" },
      { id: 4, term: "Inertia", definition: "The tendency of an object to resist changes in its motion" },
      { id: 5, term: "Momentum", definition: "The product of an object's mass and velocity (p = mv)" },
      { id: 6, term: "Friction", definition: "A force that opposes the relative motion between surfaces in contact" },
      { id: 7, term: "Velocity", definition: "The rate of change of displacement with respect to time" },
      { id: 8, term: "Acceleration", definition: "The rate of change of velocity with respect to time" }
    ]
  });

  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    setShuffledTerms(shuffleArray(gameData.concepts.map(c => ({ id: c.id, text: c.term }))));
    setShuffledDefinitions(shuffleArray(gameData.concepts.map(c => ({ id: c.id, text: c.definition }))));
    setMatches([]);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setScore(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleTermClick = (term) => {
    if (matches.some(m => m.termId === term.id)) return;
    setSelectedTerm(term);
    
    if (selectedDefinition && selectedDefinition.id === term.id) {
      // Match found!
      setMatches([...matches, { termId: term.id, definitionId: selectedDefinition.id }]);
      setScore(score + 10);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      if (matches.length + 1 === gameData.concepts.length) {
        setGameComplete(true);
      }
    }
  };

  const handleDefinitionClick = (definition) => {
    if (matches.some(m => m.definitionId === definition.id)) return;
    setSelectedDefinition(definition);
    
    if (selectedTerm && selectedTerm.id === definition.id) {
      // Match found!
      setMatches([...matches, { termId: selectedTerm.id, definitionId: definition.id }]);
      setScore(score + 10);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      if (matches.length + 1 === gameData.concepts.length) {
        setGameComplete(true);
      }
    }
  };

  const isMatched = (id, type) => {
    return matches.some(m => type === 'term' ? m.termId === id : m.definitionId === id);
  };

  const isSelected = (id, type) => {
    return type === 'term' ? selectedTerm?.id === id : selectedDefinition?.id === id;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Motion & Force Laws Puzzle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Score: {score}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
        </div>

        {gameComplete && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 text-center">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-green-800 mb-1">Congratulations! 🎉</h2>
            <p className="text-green-700">You've mastered the laws of motion! Final Score: {score}</p>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Match the physics terms with their correct definitions</p>
          <p className="text-sm text-gray-500">Click a term and its matching definition to score points!</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Terms Column */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Terms</h2>
          <div className="space-y-3">
            {shuffledTerms.map((term) => (
              <button
                key={term.id}
                onClick={() => handleTermClick(term)}
                disabled={isMatched(term.id, 'term')}
                className={`w-full p-4 rounded-lg text-left font-medium transition-all transform hover:scale-105 ${
                  isMatched(term.id, 'term')
                    ? 'bg-green-100 text-green-800 border-2 border-green-300 cursor-not-allowed'
                    : isSelected(term.id, 'term')
                    ? 'bg-blue-200 text-blue-800 border-2 border-blue-400 shadow-lg'
                    : 'bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                {term.text}
              </button>
            ))}
          </div>
        </div>

        {/* Definitions Column */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Definitions</h2>
          <div className="space-y-3">
            {shuffledDefinitions.map((definition) => (
              <button
                key={definition.id}
                onClick={() => handleDefinitionClick(definition)}
                disabled={isMatched(definition.id, 'definition')}
                className={`w-full p-4 rounded-lg text-left text-sm leading-relaxed transition-all transform hover:scale-105 ${
                  isMatched(definition.id, 'definition')
                    ? 'bg-green-100 text-green-800 border-2 border-green-300 cursor-not-allowed'
                    : isSelected(definition.id, 'definition')
                    ? 'bg-blue-200 text-blue-800 border-2 border-blue-400 shadow-lg'
                    : 'bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                {definition.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Matches: {matches.length} / {gameData.concepts.length}
        </p>
      </div>
    </div>
  );
};

export default MotionForcePuzzle;