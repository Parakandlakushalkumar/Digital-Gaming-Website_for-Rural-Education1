import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, Trophy, Sprout, CheckCircle } from 'lucide-react';

interface PuzzlePiece {
  id: string;
  content: string;
  category: 'crop' | 'season' | 'tool' | 'practice';
  matched: boolean;
}

const puzzleData: PuzzlePiece[] = [
  // Crops
  { id: 'rice', content: 'Rice', category: 'crop', matched: false },
  { id: 'wheat', content: 'Wheat', category: 'crop', matched: false },
  { id: 'maize', content: 'Maize', category: 'crop', matched: false },
  { id: 'sugarcane', content: 'Sugarcane', category: 'crop', matched: false },
  
  // Seasons
  { id: 'kharif', content: 'Kharif Season', category: 'season', matched: false },
  { id: 'rabi', content: 'Rabi Season', category: 'season', matched: false },
  { id: 'zaid', content: 'Zaid Season', category: 'season', matched: false },
  { id: 'monsoon', content: 'Monsoon', category: 'season', matched: false },
  
  // Tools
  { id: 'plough', content: 'Plough', category: 'tool', matched: false },
  { id: 'sickle', content: 'Sickle', category: 'tool', matched: false },
  { id: 'hoe', content: 'Hoe', category: 'tool', matched: false },
  { id: 'tractor', content: 'Tractor', category: 'tool', matched: false },
  
  // Practices
  { id: 'irrigation', content: 'Irrigation', category: 'practice', matched: false },
  { id: 'fertilizer', content: 'Fertilizers', category: 'practice', matched: false },
  { id: 'pesticide', content: 'Pesticides', category: 'practice', matched: false },
  { id: 'harvesting', content: 'Harvesting', category: 'practice', matched: false }
];

const categories = {
  crop: { name: 'Crops', color: 'bg-green-100 border-green-300', icon: '🌾' },
  season: { name: 'Seasons', color: 'bg-blue-100 border-blue-300', icon: '🌤️' },
  tool: { name: 'Tools', color: 'bg-yellow-100 border-yellow-300', icon: '🔧' },
  practice: { name: 'Practices', color: 'bg-purple-100 border-purple-300', icon: '💧' }
};

const CropProductionPuzzle: React.FC = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    shufflePieces();
  }, []);

  useEffect(() => {
    const matchedCount = pieces.filter(piece => piece.matched).length;
    if (matchedCount === pieces.length && pieces.length > 0) {
      setGameComplete(true);
    }
  }, [pieces]);

  const shufflePieces = () => {
    const shuffled = [...puzzleData].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setScore(0);
    setGameComplete(false);
    setAttempts(0);
    setSelectedPiece(null);
  };

  const handlePieceClick = (pieceId: string) => {
    if (pieces.find(p => p.id === pieceId)?.matched) return;

    if (!selectedPiece) {
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null);
    } else {
      setAttempts(attempts + 1);
      const piece1 = pieces.find(p => p.id === selectedPiece);
      const piece2 = pieces.find(p => p.id === pieceId);
      
      if (piece1 && piece2 && piece1.category === piece2.category) {
        // Match found
        setPieces(prev => prev.map(p => 
          p.id === selectedPiece || p.id === pieceId 
            ? { ...p, matched: true }
            : p
        ));
        setScore(score + 10);
        setSelectedPiece(null);
      } else {
        // No match
        setTimeout(() => setSelectedPiece(null), 1000);
      }
    }
  };

  const resetGame = () => {
    setPieces(puzzleData.map(p => ({ ...p, matched: false })));
    shufflePieces();
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Puzzle Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-green-600">
            {score} Points
          </div>
          <p className="text-xl text-gray-600 mb-6">
            🎉 Great job learning about crop production!
          </p>
          <div className="text-lg text-gray-700 mb-8">
            Completed in {attempts} attempts
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Crop Production Puzzle</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-green-100">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="text-right">
                <div className="text-green-100">Attempts</div>
                <div className="text-2xl font-bold">{attempts}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-green-50 border-b">
          <h3 className="font-semibold text-green-800 mb-2">How to Play:</h3>
          <p className="text-green-700">
            Match items that belong to the same category. Click two pieces of the same category to match them!
          </p>
        </div>

        {/* Category Legend */}
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-800 mb-4">Categories:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className={`p-3 rounded-lg border-2 ${category.color} text-center`}>
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-medium text-gray-800">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Board */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {pieces.map((piece) => {
              const isSelected = selectedPiece === piece.id;
              const categoryInfo = categories[piece.category];
              
              let cardClass = "p-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-300 transform ";
              
              if (piece.matched) {
                cardClass += `${categoryInfo.color} border-green-500 scale-95 opacity-75`;
              } else if (isSelected) {
                cardClass += "border-blue-500 bg-blue-100 scale-105 shadow-lg";
              } else {
                cardClass += "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 hover:scale-102";
              }

              return (
                <div
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  className={cardClass}
                >
                  <div className="text-2xl mb-2">{categoryInfo.icon}</div>
                  <div className="font-medium text-gray-800 text-sm">
                    {piece.content}
                  </div>
                  {piece.matched && (
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="p-6 border-t bg-gray-50 flex justify-center gap-4">
          <button
            onClick={shufflePieces}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Shuffle
          </button>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropProductionPuzzle;