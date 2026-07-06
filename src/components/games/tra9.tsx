import React, { useState } from 'react';
import { Car, Truck, Bus, MapPin, Trophy, RotateCcw } from 'lucide-react';

const RoadTransportHunt = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const clues = [
    {
      question: "I carry many passengers on fixed routes through the city. I stop at designated places. What am I?",
      options: ["Car", "Bus", "Motorcycle", "Bicycle"],
      correct: "Bus",
      icon: <Bus className="w-8 h-8" />,
      hint: "I'm bigger than a car and painted in bright colors!"
    },
    {
      question: "I have two wheels and an engine. I'm faster than a bicycle but smaller than a car. What am I?",
      options: ["Truck", "Van", "Motorcycle", "Bus"],
      correct: "Motorcycle",
      icon: <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">🏍️</div>,
      hint: "Vroom vroom! I need a helmet to ride safely."
    },
    {
      question: "I'm used to transport heavy goods and cargo. I have a large back area for loading. What am I?",
      options: ["Car", "Motorcycle", "Truck", "Bicycle"],
      correct: "Truck",
      icon: <Truck className="w-8 h-8" />,
      hint: "I'm much bigger than a car and carry things, not people!"
    },
    {
      question: "I'm a personal vehicle that families use. I have 4 wheels and usually carry 2-5 people. What am I?",
      options: ["Bus", "Truck", "Motorcycle", "Car"],
      correct: "Car",
      icon: <Car className="w-8 h-8" />,
      hint: "Most families have one of me in their garage!"
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === clues[currentClue].correct) {
      setScore(score + 1);
    }
    
    if (currentClue < clues.length - 1) {
      setCurrentClue(currentClue + 1);
      setSelectedAnswer('');
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentClue(0);
    setScore(0);
    setGameComplete(false);
    setSelectedAnswer('');
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Treasure Found! 🎉</h2>
          <p className="text-xl mb-4">You scored {score} out of {clues.length} clues!</p>
          <div className="mb-6">
            {score === clues.length ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Perfect Score!</strong> You're a road transport expert! 🚗
              </div>
            ) : score >= clues.length / 2 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Good Job!</strong> You know your road vehicles well! 🚌
              </div>
            ) : (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>Keep Learning!</strong> Try again to improve your score! 🏍️
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">🚗 Road Transport Treasure Hunt</h1>
        <p className="text-gray-600">Find the treasure by solving transport clues!</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <MapPin className="w-5 h-5 text-red-500" />
          <span>Clue {currentClue + 1} of {clues.length}</span>
          <span className="bg-yellow-100 px-3 py-1 rounded">Score: {score}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {clues[currentClue].icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          {clues[currentClue].question}
        </h3>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {clues[currentClue].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`p-3 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Hint:</strong> {clues[currentClue].hint}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`w-full py-3 rounded-lg font-semibold ${
            selectedAnswer
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentClue === clues.length - 1 ? 'Find Treasure!' : 'Next Clue'}
        </button>
      </div>
    </div>
  );
};

export default RoadTransportHunt;