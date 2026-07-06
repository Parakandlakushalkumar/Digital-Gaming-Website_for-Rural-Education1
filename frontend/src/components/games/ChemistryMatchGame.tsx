import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardItem {
  id: number;
  content: string;
  type: 'element' | 'symbol';
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: CardItem[];
  flippedCards: number[];
  matches: number;
  moves: number;
  gameComplete: boolean;
}

interface ChemistryMatchGameProps {
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export const ChemistryMatchGame = ({ onComplete, onExit }: ChemistryMatchGameProps) => {
  const elements = [
    { element: 'Sodium', symbol: 'Na' },
    { element: 'Potassium', symbol: 'K' },
    { element: 'Iron', symbol: 'Fe' },
    { element: 'Gold', symbol: 'Au' },
    { element: 'Silver', symbol: 'Ag' },
    { element: 'Carbon', symbol: 'C' },
    { element: 'Oxygen', symbol: 'O' },
    { element: 'Hydrogen', symbol: 'H' },
  ];

  const totalPairs = elements.length;

  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matches: 0,
    moves: 0,
    gameComplete: false,
  });

  const initializeGame = (): void => {
    const cards: CardItem[] = [];
    elements.forEach((item, index) => {
      cards.push({ id: index * 2, content: item.element, type: 'element', matchId: index, isFlipped: false, isMatched: false });
      cards.push({ id: index * 2 + 1, content: item.symbol, type: 'symbol', matchId: index, isFlipped: false, isMatched: false });
    });
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setGameState({ cards: shuffledCards, flippedCards: [], matches: 0, moves: 0, gameComplete: false });
  };

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameState.gameComplete) {
      // Score = matches/totalPairs * 100 (rounded)
      const scorePercent = Math.round((gameState.matches / totalPairs) * 100);
      onComplete(scorePercent, 100);
    }
  }, [gameState.gameComplete]);

  const handleCardClick = (cardId: number): void => {
    if (gameState.gameComplete) return;
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || gameState.flippedCards.length >= 2) return;

    const newFlipped = [...gameState.flippedCards, cardId];
    const updatedCards = gameState.cards.map(c => (c.id === cardId ? { ...c, isFlipped: true } : c));

    setGameState(prev => ({ ...prev, cards: updatedCards, flippedCards: newFlipped }));

    if (newFlipped.length === 2) {
      setTimeout(() => checkForMatch(newFlipped, updatedCards), 700);
    }
  };

  const checkForMatch = (flipped: number[], cards: CardItem[]): void => {
    const [aId, bId] = flipped;
    const a = cards.find(c => c.id === aId);
    const b = cards.find(c => c.id === bId);
    if (!a || !b) return;

    const isMatch = a.matchId === b.matchId && a.type !== b.type; // ensure element-symbol pairing
    const newMatches = gameState.matches + (isMatch ? 1 : 0);
    const newMoves = gameState.moves + 1;

    const updated = cards.map(c => {
      if (c.id === aId || c.id === bId) {
        return { ...c, isMatched: isMatch, isFlipped: isMatch ? true : false };
      }
      return c;
    });

    const gameComplete = newMatches === totalPairs;

    setGameState(prev => ({
      ...prev,
      cards: updated,
      flippedCards: [],
      matches: newMatches,
      moves: newMoves,
      gameComplete,
    }));
  };

  const getCardStyle = (card: CardItem): string => {
    let base = 'w-24 h-32 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-center font-semibold shadow-md hover:shadow-lg transform hover:scale-105';
    if (card.isMatched) base += ' bg-green-200 border-green-400 text-green-800';
    else if (card.isFlipped) base += card.type === 'element' ? ' bg-blue-200 border-blue-400 text-blue-800' : ' bg-purple-200 border-purple-400 text-purple-800';
    else base += ' bg-gray-300 border-gray-400 text-gray-600';
    return base;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chemistry Match the Pairs</h1>
            <p className="text-sm text-gray-600">Match chemical elements with their symbols</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onExit}>Exit</Button>
            <Button onClick={initializeGame}>New Game</Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex justify-center gap-8">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-xs text-gray-500">Matches</span>
                <div className="text-xl font-bold text-blue-600">{gameState.matches}/{totalPairs}</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-xs text-gray-500">Moves</span>
                <div className="text-xl font-bold text-purple-600">{gameState.moves}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {gameState.gameComplete && (
          <div className="text-center mb-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg inline-block">
              <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
              <p>You completed the game in {gameState.moves} moves!</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {gameState.cards.map(card => (
            <div key={card.id} className={getCardStyle(card)} onClick={() => handleCardClick(card.id)}>
              <span className="text-sm px-2">{card.isFlipped || card.isMatched ? card.content : '?'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChemistryMatchGame;


