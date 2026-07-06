import React, { useState } from 'react';
import { ChevronRight, Sun, Wind, Zap, Droplets, Atom, CheckCircle } from 'lucide-react';

const EnergySourcesGame = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const stages = [
    {
      title: "The Solar Village",
      story: "You arrive at a village powered entirely by the sun! The villagers explain they capture sunlight using special panels. What type of energy source is this?",
      icon: <Sun className="w-16 h-16 text-yellow-500" />,
      question: "Solar panels convert sunlight into electricity. This is an example of:",
      options: [
        { id: 'renewable', text: 'Renewable Energy', correct: true },
        { id: 'fossil', text: 'Fossil Fuel', correct: false },
        { id: 'nuclear', text: 'Nuclear Energy', correct: false }
      ],
      explanation: "Solar energy is renewable because the sun provides unlimited energy that won't run out!"
    },
    {
      title: "Windy Mountain Peak",
      story: "At the mountain top, giant wind turbines spin gracefully. The wind makes them turn, generating power for the nearby town.",
      icon: <Wind className="w-16 h-16 text-blue-500" />,
      question: "Wind turbines work by:",
      options: [
        { id: 'burning', text: 'Burning wind to create heat', correct: false },
        { id: 'spinning', text: 'Converting spinning motion to electricity', correct: true },
        { id: 'storing', text: 'Storing wind in containers', correct: false }
      ],
      explanation: "Wind turbines use generators that convert the spinning motion into electrical energy!"
    },
    {
      title: "The Hydroelectric Dam",
      story: "You discover a massive dam where rushing water flows through turbines. The force of the water generates clean electricity for thousands of homes.",
      icon: <Droplets className="w-16 h-16 text-blue-600" />,
      question: "Hydroelectric power uses:",
      options: [
        { id: 'moving', text: 'Moving water to spin turbines', correct: true },
        { id: 'heating', text: 'Heating water to create steam', correct: false },
        { id: 'storing', text: 'Storing water in batteries', correct: false }
      ],
      explanation: "The flowing water's kinetic energy spins the turbines, which generate electricity!"
    },
    {
      title: "The Power Plant",
      story: "You find a coal power plant with tall smokestacks. Workers explain they burn coal to heat water, creating steam that turns generators.",
      icon: <Zap className="w-16 h-16 text-gray-600" />,
      question: "Coal is considered a:",
      options: [
        { id: 'renewable', text: 'Renewable resource', correct: false },
        { id: 'fossil', text: 'Fossil fuel', correct: true },
        { id: 'unlimited', text: 'Unlimited energy source', correct: false }
      ],
      explanation: "Coal is a fossil fuel formed over millions of years - once we use it up, it's gone!"
    },
    {
      title: "Nuclear Research Facility",
      story: "At the final location, scientists show you how splitting atoms releases enormous amounts of energy. This powers entire cities with just small amounts of fuel.",
      icon: <Atom className="w-16 h-16 text-green-500" />,
      question: "Nuclear energy is created by:",
      options: [
        { id: 'splitting', text: 'Splitting atoms apart', correct: true },
        { id: 'combining', text: 'Combining different chemicals', correct: false },
        { id: 'heating', text: 'Heating uranium in ovens', correct: false }
      ],
      explanation: "Nuclear fission splits uranium atoms, releasing massive amounts of energy from tiny amounts of fuel!"
    }
  ];

  const handleAnswer = (optionId) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
    
    const correct = stages[currentStage].options.find(opt => opt.id === optionId)?.correct;
    if (correct) {
      setScore(score + 20);
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
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Energy Sources Treasure Hunt</h1>
        <p className="text-lg text-gray-600">Discover different ways we power our world!</p>
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
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
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
                    className="w-full p-4 text-left bg-gray-50 hover:bg-blue-100 rounded-lg border-2 border-transparent hover:border-blue-300 transition-all duration-200"
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
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
                >
                  Next Location <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">Treasure Hunt Complete!</h2>
          <p className="text-xl text-gray-700 mb-6">Final Score: {score}/100</p>
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">What You Learned:</h3>
            <ul className="text-left space-y-2">
              <li>• Solar and wind are renewable energy sources</li>
              <li>• Hydroelectric power uses flowing water</li>
              <li>• Coal is a fossil fuel that will eventually run out</li>
              <li>• Nuclear energy comes from splitting atoms</li>
              <li>• Different energy sources have different advantages</li>
            </ul>
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default EnergySourcesGame;