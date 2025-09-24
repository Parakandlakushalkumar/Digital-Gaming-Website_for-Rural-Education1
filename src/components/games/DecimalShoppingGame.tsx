import { useState } from 'react';
import { ShoppingCart, RotateCcw, Trophy, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Item {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

interface DecimalShoppingGameProps {
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export const DecimalShoppingGame = ({ onComplete, onExit }: DecimalShoppingGameProps) => {
  const possibleTargets = [25.0, 30.0, 35.0, 40.0, 45.0, 50.0, 55.0, 60.0, 65.0, 70.0, 75.0];

  const shopItems: Item[] = [
    { id: 1, name: 'Notebook', price: 12.5, emoji: '📓' },
    { id: 2, name: 'Pencil Set', price: 7.25, emoji: '✏️' },
    { id: 3, name: 'Eraser', price: 3.75, emoji: '🧽' },
    { id: 4, name: 'Ruler', price: 8.5, emoji: '📏' },
    { id: 5, name: 'Markers', price: 15.25, emoji: '🖍️' },
    { id: 6, name: 'Glue Stick', price: 4.5, emoji: '🧴' },
    { id: 7, name: 'Scissors', price: 9.75, emoji: '✂️' },
    { id: 8, name: 'Calculator', price: 22.5, emoji: '🧮' },
    { id: 9, name: 'Folder', price: 6.25, emoji: '📁' },
    { id: 10, name: 'Highlighter', price: 5.75, emoji: '🖊️' },
    { id: 11, name: 'Stapler', price: 18.25, emoji: '📎' },
    { id: 12, name: 'Tape', price: 4.25, emoji: '🎭' },
    { id: 13, name: 'Sharpener', price: 2.75, emoji: '🔧' },
    { id: 14, name: 'Compass', price: 11.5, emoji: '🧭' },
    { id: 15, name: 'Protractor', price: 7.75, emoji: '📐' },
  ];

  const [cart, setCart] = useState<Item[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50.0);

  const BUDGET = 100.0;

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const remainingBudget = BUDGET - cartTotal;
  const targetDifference = Math.abs(cartTotal - targetAmount);

  const addToCart = (item: Item) => {
    if (remainingBudget >= item.price && !gameWon) {
      const newCart = [...cart, item];
      setCart(newCart);
      setAttempts((a) => a + 1);

      const newTotal = newCart.reduce((sum, cartItem) => sum + cartItem.price, 0);
      if (Math.abs(newTotal - targetAmount) < 0.01) {
        setGameWon(true);
        // score = 100 when exact match
        onComplete(100, 100);
      }
    }
  };

  const removeFromCart = (itemId: number) => {
    if (!gameWon) {
      setCart(cart.filter((item) => item.id !== itemId));
    }
  };

  const resetGame = () => {
    setCart([]);
    setGameWon(false);
    setAttempts(0);
    const newTarget = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
    setTargetAmount(newTarget);
  };

  const getScoreMessage = () => {
    if (gameWon) {
      return `🎉 Perfect! You spent exactly ₹${targetAmount.toFixed(2)}!`;
    } else if (targetDifference <= 1.0) {
      return `Very close! Only ₹${targetDifference.toFixed(2)} away from ₹${targetAmount.toFixed(2)}`;
    } else if (targetDifference <= 5.0) {
      return `Good try! ₹${targetDifference.toFixed(2)} away from target`;
    } else {
      return `Keep trying! ₹${targetDifference.toFixed(2)} away from ₹${targetAmount.toFixed(2)}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" /> Decimal Shopping Game
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onExit}>Exit</Button>
          <Button onClick={resetGame}>New Game</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏪 School Supply Shop</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shopItems.map((item) => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                disabled={remainingBudget < item.price || gameWon}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  remainingBudget >= item.price && !gameWon
                    ? 'border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer'
                    : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-bold text-green-600">₹{item.price.toFixed(2)}</span>
                </div>
                <div className="text-sm font-medium text-gray-700 mt-1">{item.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" /> Game Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Budget:</span>
                <span className="font-bold text-blue-600">₹{BUDGET.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Target:</span>
                <span className="font-bold text-purple-600">₹{targetAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Spent:</span>
                <span className="font-bold text-green-600">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Remaining:</span>
                <span className={`font-bold ${remainingBudget < 0 ? 'text-red-600' : 'text-gray-600'}`}>₹{remainingBudget.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 text-center text-sm font-medium">{getScoreMessage()}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Your Cart ({cart.length} items)
            </h3>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Cart is empty. Start shopping!</p>
            ) : (
              <div className="space-y-2 mb-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">₹{item.price.toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm" disabled={gameWon}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span className={`${gameWon ? 'text-green-600' : 'text-gray-800'}`}>₹{cartTotal.toFixed(2)}</span>
              </div>

              {gameWon && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4 text-center">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-bold">Congratulations!</p>
                  <p className="text-green-700 text-sm">You reached exactly ₹{targetAmount.toFixed(2)} in {attempts} moves!</p>
                </div>
              )}

              <Button onClick={resetGame} className="w-full flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Start New Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecimalShoppingGame;


