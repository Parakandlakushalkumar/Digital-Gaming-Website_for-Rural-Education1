import React, { useState, useEffect } from 'react';
import { Zap, Star, MapPin, CheckCircle, RotateCcw, Activity } from 'lucide-react';

const ElectronicsSensorsTreasureHunt = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [foundTreasures, setFoundTreasures] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const treasures = [
    {
      id: 1,
      clue: "I'm the flow of electric charge through a conductor. I'm measured in amperes and I'm what powers your devices. What am I?",
      answer: "current",
      alternateAnswers: ["electric current", "electrical current"],
      treasure: "Lightning Current Crystal",
      hint: "Think about what flows through wires to power electronics...",
      explanation: "Electric current is the flow of electric charge (usually electrons) through a conductor. It's measured in amperes (amps) and is essential for all electronic devices!"
    },
    {
      id: 2,
      clue: "I oppose the flow of current in a circuit. I'm measured in ohms and I can control how much current flows. What am I?",
      answer: "resistance",
      alternateAnswers: ["resistor", "electrical resistance"],
      treasure: "Resistance Shield",
      hint: "I make it harder for current to flow, like a narrow pipe restricts water flow...",
      explanation: "Resistance opposes current flow and is measured in ohms (Ω). Resistors are components that provide specific amounts of resistance to control current in circuits."
    },
    {
      id: 3,
      clue: "I can detect light and convert it into an electrical signal. You'll find me in cameras, solar panels, and automatic lighting systems. What am I?",
      answer: "photosensor",
      alternateAnswers: ["light sensor", "photodiode", "photoresistor", "ldr"],
      treasure: "Luminous Detection Gem",
      hint: "I'm sensitive to light and can 'see' when it's bright or dark...",
      explanation: "Photosensors (like photoresistors, photodiodes, or phototransistors) detect light intensity and convert it to electrical signals. They're used in cameras, automatic lights, and solar panels!"
    },
    {
      id: 4,
      clue: "I measure temperature and can tell a microcontroller when things get too hot or cold. I might be a thermistor or a digital type. What am I?",
      answer: "temperature sensor",
      alternateAnswers: ["thermometer", "thermistor", "thermal sensor", "temp sensor"],
      treasure: "Thermal Guardian Medallion",
      hint: "I can feel heat and cold, just like your skin, but I send electrical signals...",
      explanation: "Temperature sensors like thermistors, thermocouples, or digital sensors (like DS18B20) measure temperature and convert it to electrical signals for monitoring and control systems."
    },
    {
      id: 5,
      clue: "I'm a tiny computer that can read sensors and control outputs. I have GPIO pins and can be programmed. Arduino and Raspberry Pi are examples. What am I?",
      answer: "microcontroller",
      alternateAnswers: ["microprocessor", "mcu", "single board computer"],
      treasure: "Master Control Crown",
      hint: "I'm the 'brain' of electronic projects that can be programmed to make decisions...",
      explanation: "Microcontrollers are small computers that can read sensor inputs, make decisions, and control outputs. They're the heart of most modern electronic projects and IoT devices!"
    },
    {
      id: 6,
      clue: "I can detect motion by sensing changes in infrared radiation. Security systems and automatic doors use me to know when someone is nearby. What am I?",
      answer: "pir sensor",
      alternateAnswers: ["motion sensor", "pir", "passive infrared sensor", "movement sensor"],
      treasure: "Motion Detective Badge",
      hint: "I can sense the heat from moving bodies and trigger when motion is detected...",
      explanation: "PIR (Passive Infrared) sensors detect motion by measuring changes in infrared radiation. They're commonly used in security systems, automatic lighting, and smart home devices."
    },
    {
      id: 7,
      clue: "I measure distance by sending out sound waves and timing how long they take to bounce back. Bats use this principle naturally. What am I?",
      answer: "ultrasonic sensor",
      alternateAnswers: ["ultrasonic", "sonar sensor", "distance sensor", "hc-sr04"],
      treasure: "Echo Ranger Compass",
      hint: "I use sound waves that bounce back to measure how far away things are...",
      explanation: "Ultrasonic sensors (like the HC-SR04) use sound waves above human hearing range to measure distance. They work like sonar - sending out pulses and measuring echo return time."
    }
  ];

  const checkAnswer = (userAnswer) => {
    const current = treasures[currentClue];
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const isCorrect = current.answer === normalizedAnswer || 
                     current.alternateAnswers?.some(alt => alt === normalizedAnswer);
    
    if (isCorrect) {
      const newTreasure = { ...current, found: true };
      setFoundTreasures([...foundTreasures, newTreasure]);
      setScore(score + 100);
      
      if (currentClue < treasures.length - 1) {
        setTimeout(() => {
          setCurrentClue(currentClue + 1);
          setShowHint(false);
        }, 2000);
      } else {
        setGameComplete(true);
      }
    }
    
    return isCorrect;
  };

  const resetGame = () => {
    setCurrentClue(0);
    setFoundTreasures([]);
    setGameComplete(false);
    setScore(0);
    setShowHint(false);
  };

  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkAnswer(answer)) {
      setFeedback('⚡ Treasure found! Excellent work!');
      setAnswer('');
    } else {
      setFeedback('🔧 Not quite right. Keep trying!');
    }
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
        <div className="text-center">
          <Zap className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Circuit Complete!</h1>
          <p className="text-xl mb-6">You've mastered Electronics & Sensors!</p>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">Final Score: {score} points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundTreasures.map((treasure, index) => (
                <div key={treasure.id} className="flex items-center p-3 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="font-medium">{treasure.treasure}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentTreasure = treasures[currentClue];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-2">⚡ Electronics & Sensors Treasure Hunt</h1>
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-semibold">Score: {score}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-semibold">Circuit {currentClue + 1} of {treasures.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-purple-500 mr-2" />
          <h2 className="text-xl font-bold">Electronic Clue #{currentClue + 1}</h2>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-400">
          <p className="text-lg">{currentTreasure.clue}</p>
        </div>

        <div className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Connect!
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg mb-4 ${
            feedback.includes('⚡') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {feedback}
            {feedback.includes('⚡') && (
              <div className="mt-3 p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                <p className="font-medium">Learn More:</p>
                <p className="text-sm">{currentTreasure.explanation}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-purple-600 hover:text-purple-800 text-sm underline"
        >
          {showHint ? 'Hide Hint' : 'Need a Circuit Clue?'}
        </button>

        {showHint && (
          <div className="mt-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-sm">{currentTreasure.hint}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-bold mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          Electronic Treasures Found ({foundTreasures.length}/{treasures.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {treasures.map((treasure, index) => (
            <div
              key={treasure.id}
              className={`px-3 py-1 rounded-full text-sm ${
                foundTreasures.find(f => f.id === treasure.id)
                  ? 'bg-green-200 text-green-800'
                  : index === currentClue
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {foundTreasures.find(f => f.id === treasure.id)
                ? `✓ ${treasure.treasure}`
                : index === currentClue
                ? `→ Circuit ${index + 1}`
                : `Circuit ${index + 1}`
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSensorsTreasureHunt;