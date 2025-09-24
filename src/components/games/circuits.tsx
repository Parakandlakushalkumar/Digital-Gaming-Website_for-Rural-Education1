import React, { useState } from 'react';
import { ChevronRight, Battery, Lightbulb, Zap, Cable, CheckCircle } from 'lucide-react';

const CircuitsGame = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const stages = [
    {
      title: "The Battery Cave",
      story: "Deep in an ancient cave, you discover glowing crystals that store electrical energy. The cave guardian explains these are like batteries - they provide the 'push' that makes electricity flow through wires.",
      icon: <Battery className="w-16 h-16 text-green-500" />,
      question: "A battery in a circuit provides:",
      options: [
        { id: 'voltage', text: 'Voltage (electrical pressure)', correct: true },
        { id: 'resistance', text: 'Resistance (blocking electricity)', correct: false },
        { id: 'color', text: 'Color to the wires', correct: false }
      ],
      explanation: "Batteries provide voltage - the electrical 'pressure' that pushes current through a circuit!"
    },
    {
      title: "The Wire Bridge",
      story: "You come to a rickety bridge made entirely of copper wires. A friendly robot explains that electricity flows through these wires like water flows through pipes, creating a path for current.",
      icon: <Cable className="w-16 h-16 text-orange-500" />,
      question: "Wires in a circuit:",
      options: [
        { id: 'block', text: 'Block the flow of electricity', correct: false },
        { id: 'conduct', text: 'Provide a path for electricity to flow', correct: true },
        { id: 'create', text: 'Create electricity from nothing', correct: false }
      ],
      explanation: "Wires are conductors - they provide a pathway for electric current to flow from one place to another!"
    },
    {
      title: "The Resistance Mountain",
      story: "Climbing a steep mountain, you notice it gets harder to move as you go up. A wise engineer explains that some materials resist the flow of electricity, just like the mountain resists your movement.",
      icon: <Zap className="w-16 h-16 text-red-500" />,
      question: "Resistance in a circuit:",
      options: [
        { id: 'speeds', text: 'Makes electricity flow faster', correct: false },
        { id: 'opposes', text: 'Opposes the flow of current', correct: true },
        { id: 'creates', text: 'Creates more voltage', correct: false }
      ],
      explanation: "Resistance opposes electric current flow, like friction slows down moving objects!"
    },
    {
      title: "The Light Bulb Tower",
      story: "At the top of a tall tower, you find magical orbs that glow when electricity passes through them. The tower keeper shows you how these bulbs light up when connected in a complete loop with wires and a battery.",
      icon: <Lightbulb className="w-16 h-16 text-yellow-500" />,
      question: "For a light bulb to work, you need:",
      options: [
        { id: 'complete', text: 'A complete circuit from battery to bulb and back', correct: true },
        { id: 'just-battery', text: 'Just a battery touching the bulb', correct: false },
        { id: 'magic', text: 'Magic words to activate it', correct: false }
      ],
      explanation: "A complete circuit forms a closed loop - electricity flows from the battery, through the bulb, and back to the battery!"
    },
    {
      title: "The Switch Castle",
      story: "You arrive at a grand castle with magical doors that can open and close the flow of electricity. The castle wizard demonstrates how these switches can control whether electricity flows through the circuit.",
      icon: <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">⚡</div>,
      question: "A switch in a circuit can:",
      options: [
        { id: 'increase', text: 'Increase the voltage', correct: false },
        { id: 'control', text: 'Open or close the circuit', correct: true },
        { id: 'change-color', text: 'Change the color of electricity', correct: false }
      ],
      explanation: "Switches control the flow of electricity by opening (stopping flow) or closing (allowing flow) the circuit!"
    },
    {
      title: "The Circuit Diagram Library",
      story: "In an ancient library, you discover books filled with simple drawings that represent electrical circuits. The librarian teaches you how engineers use symbols to plan their circuits before building them.",
      icon: <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl">📋</div>,
      question: "Circuit diagrams use:",
      options: [
        { id: 'photos', text: 'Photographs of real circuits', correct: false },
        { id: 'symbols', text: 'Standard symbols to represent components', correct: true },
        { id: 'colors', text: 'Only colors with no shapes', correct: false }
      ],
      explanation: "Circuit diagrams use standardized symbols (like lines for wires, circles for bulbs) to show how components connect!"
    }
  ];

  const handleAnswer = (optionId) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
    
    const correct = stages[currentStage].options.find(opt => opt.id === optionId)?.correct;
    if (correct) {
      setScore(score + Math.round(100/stages.length));
    }
  };

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const resetGame = () => {
    setCurrentStage(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const currentStageData = stages[currentStage];
  const isComplete = currentStage === stages.length - 1 && showResult;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">Basic Circuits Treasure Hunt</h1>
        <p className="text-lg text-gray-600">Explore the magical world of electricity!</p>
        <div className="mt-4 bg-white rounded-lg p-4 shadow-md">
          <div className="text-xl font-semibold text-green-600">Score: {score}/100</div>
          <div className="text-sm text-gray-500">Stage {currentStage + 1} of {stages.length}</div>
        </div>
      </div>

      {!isComplete ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            {currentStageData.icon}
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{currentStageData.title}</h2>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">{currentStageData.story}</p>
          </div>

          {!showResult ? (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">{currentStageData.question}</h3>
              <div className="space-y-3">
                {currentStageData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-purple-100 rounded-lg border-2 border-transparent hover:border-purple-300 transition-all duration-200"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              {stages[currentStage].options.find(opt => opt.id === selectedAnswer)?.correct ? (
                <div className="text-green-600 mb-4">
                  <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">Correct!</h3>
                </div>
              ) : (
                <div className="text-red-600 mb-4">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-3xl">✗</span>
                  </div>
                  <h3 className="text-2xl font-bold">Not quite!</h3>
                </div>
              )}
              
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{currentStageData.explanation}</p>
              </div>
              
              {currentStage < stages.length - 1 ? (
                <button
                  onClick={nextStage}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center mx-auto"
                >
                  Next Location <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Circuit Master!</h2>
          <p className="text-xl text-gray-700 mb-6">Final Score: {score}/100</p>
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">What You Learned:</h3>
            <ul className="text-left space-y-2">
              <li>• Batteries provide voltage to push current through circuits</li>
              <li>• Wires conduct electricity and create pathways</li>
              <li>• Resistance opposes the flow of electric current</li>
              <li>• Complete circuits form closed loops</li>
              <li>• Switches control whether electricity can flow</li>
              <li>• Circuit diagrams use symbols to represent components</li>
            </ul>
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CircuitsGame;