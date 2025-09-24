import React, { useState } from 'react';
import { Zap, Battery, Trophy, Lightbulb, Power, CheckCircle, Bolt } from 'lucide-react';

const EnergyElectricityTreasureHunt = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const treasures = [
    {
      id: 1,
      clue: "I can never be created or destroyed, just changed from one form to me. What am I?",
      answer: "energy",
      hint: "The law of conservation says I always stay the same in total amount",
      treasure: "Energy Conservation Crystal",
      funFact: "Energy can transform from potential to kinetic, chemical to electrical, but the total amount never changes!",
      icon: "⚡"
    },
    {
      id: 2,
      clue: "I'm the energy of moving things, from cars to swings to birds with wings. What am I?",
      answer: "kinetic energy",
      hint: "The faster something moves, the more of me it has",
      treasure: "Motion Power Core",
      funFact: "A hummingbird's wings beat 80 times per second, creating amazing kinetic energy!",
      icon: "🏃"
    },
    {
      id: 3,
      clue: "I'm stored energy, waiting to spring, like water behind a dam or a stretched-out string. What am I?",
      answer: "potential energy",
      hint: "Think about energy that's stored and ready to be released",
      treasure: "Potential Storage Unit",
      funFact: "A stretched rubber band has elastic potential energy - release it and watch it fly!",
      icon: "🏔️"
    },
    {
      id: 4,
      clue: "I flow through wires like water through pipes, making devices work and turning on lights. What am I?",
      answer: "electricity",
      hint: "I'm made of moving electrons",
      treasure: "Electric Flow Controller",
      funFact: "Electricity travels through copper wires at about 2/3 the speed of light!",
      icon: "⚡"
    },
    {
      id: 5,
      clue: "I'm the path that electricity takes, through circuits and loops, whatever it makes. What am I?",
      answer: "current",
      hint: "I'm measured in amperes (amps)",
      treasure: "Current Commander",
      funFact: "Lightning can carry up to 30,000 amperes of current - that's 3,000 times more than a household outlet!",
      icon: "🔄"
    },
    {
      id: 6,
      clue: "I resist the flow of electrons through me, like a narrow pipe slows water, you see. What am I?",
      answer: "resistance",
      hint: "I'm measured in ohms and I make circuits warm up",
      treasure: "Resistance Regulator",
      funFact: "Incandescent light bulbs work because their resistance creates heat that makes the filament glow!",
      icon: "🔥"
    },
    {
      id: 7,
      clue: "I'm the push that makes electricity flow, like pressure in pipes, I make the current go. What am I?",
      answer: "voltage",
      hint: "I'm measured in volts and I'm the electrical pressure",
      treasure: "Voltage Amplifier",
      funFact: "A typical smartphone battery provides 3.7 volts, while a car battery provides 12 volts!",
      icon: "🔋"
    }
  ];

  const checkAnswer = (answer) => {
    const userAnswer = answer.toLowerCase().trim();
    const correctAnswer = treasures[currentClue].answer.toLowerCase();
    
    if (userAnswer === correctAnswer || userAnswer.includes(correctAnswer.split(' ')[0])) {
      setFoundTreasures([...foundTreasures, treasures[currentClue]]);
      setScore(score + 100);
      
      if (currentClue < treasures.length - 1) {
        setTimeout(() => {
          setCurrentClue(currentClue + 1);
          setShowHint(false);
        }, 2000);
      } else {
        setGameComplete(true);
      }
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkAnswer(userAnswer)) {
      setFeedback('⚡ Electrifying! You\'ve charged up the right answer!');
      setUserAnswer('');
    } else {
      setFeedback('🔋 Not quite charged up yet! Keep trying to complete the circuit!');
    }
  };

  const resetGame = () => {
    setCurrentClue(0);
    setFoundTreasures([]);
    setScore(0);
    setGameComplete(false);
    setShowHint(false);
    setUserAnswer('');
    setFeedback('');
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg">
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-yellow-800 mb-4">⚡ Energy Master! ⚡</h1>
          <p className="text-xl text-gray-700 mb-6">You've harnessed the power of energy and electricity!</p>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Your Energy Arsenal:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundTreasures.map((treasure) => (
                <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                  <span className="text-2xl mr-3">{treasure.icon}</span>
                  <div>
                    <p className="font-semibold text-yellow-700">{treasure.treasure}</p>
                    <p className="text-sm text-gray-600">{treasure.funFact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-lg mb-6">Final Score: <span className="font-bold text-yellow-600">{score} points</span></p>
          <button
            onClick={resetGame}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Recharge & Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-800 mb-2">⚡ Energy and Electricity Treasure Hunt</h1>
        <p className="text-lg text-gray-700">Power up your knowledge of energy and electric circuits!</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Battery className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-semibold">Power Quest {currentClue + 1} of {treasures.length}</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-semibold">{score} points</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <Power className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-xl font-bold text-yellow-800">Energy Challenge:</h3>
          </div>
          <p className="text-lg text-gray-800 italic">{treasures[currentClue].clue}</p>
        </div>

        <div className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
            >
              <Bolt className="w-4 h-4 mr-2" />
              Power Up!
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mb-4 ${feedback.includes('Electrifying') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {feedback}
            {feedback.includes('Electrifying') && (
              <div className="mt-2 p-3 bg-white rounded-lg">
                <p className="font-semibold text-yellow-700">🎁 Powered Up: {treasures[currentClue].treasure}</p>
                <p className="text-sm text-gray-600 mt-1">{treasures[currentClue].funFact}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHint ? 'Hide Circuit Diagram' : 'Show Circuit Diagram'}
          </button>
          <div className="text-sm text-gray-600">
            Energy sources found: {foundTreasures.length}/{treasures.length}
          </div>
        </div>

        {showHint && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">💡 <strong>Circuit Hint:</strong> {treasures[currentClue].hint}</p>
          </div>
        )}
      </div>

      {foundTreasures.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Your Power Collection:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {foundTreasures.map((treasure) => (
              <div key={treasure.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-yellow-700">{treasure.treasure}</p>
                  <p className="text-xs text-gray-600">{treasure.icon}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyElectricityTreasureHunt;