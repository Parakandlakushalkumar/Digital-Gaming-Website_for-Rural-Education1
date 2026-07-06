import React, { useState } from 'react';
import { ChevronRight, Home, Car, Smartphone, Wrench, Building, CheckCircle } from 'lucide-react';

const EngineeringDailyLifeGame = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const stages = [
    {
      title: "The Smart Home",
      story: "You wake up in a house where lights turn on automatically, the temperature adjusts itself, and your coffee maker starts brewing before you get to the kitchen. Everything works together like magic!",
      icon: <Home className="w-16 h-16 text-blue-500" />,
      question: "The engineering that makes smart homes work involves:",
      options: [
        { id: 'sensors', text: 'Sensors, programming, and electrical systems', correct: true },
        { id: 'magic', text: 'Magic spells and fairy dust', correct: false },
        { id: 'humans', text: 'People hiding in the walls', correct: false }
      ],
      explanation: "Smart homes use sensors to detect conditions, computer programming to make decisions, and electrical engineering to control devices!"
    },
    {
      title: "The Bridge to School",
      story: "Walking to school, you cross a sturdy bridge that spans a wide river. Despite heavy trucks passing over it daily, the bridge remains strong and stable, safely carrying everyone across.",
      icon: <Building className="w-16 h-16 text-gray-600" />,
      question: "What type of engineering ensures bridges are safe?",
      options: [
        { id: 'computer', text: 'Computer Engineering', correct: false },
        { id: 'civil', text: 'Civil Engineering', correct: true },
        { id: 'chemical', text: 'Chemical Engineering', correct: false }
      ],
      explanation: "Civil engineers design bridges, roads, and buildings to be safe and strong, calculating loads and stresses to prevent collapse!"
    },
    {
      title: "The School Bus Engine",
      story: "Your school bus rumbles to life as the driver turns the key. The engine converts gasoline into motion, the brakes stop safely at every corner, and the steering responds perfectly to keep everyone secure.",
      icon: <Car className="w-16 h-16 text-yellow-500" />,
      question: "Car engines demonstrate which engineering principle?",
      options: [
        { id: 'energy', text: 'Converting one form of energy to another', correct: true },
        { id: 'creating', text: 'Creating energy from nothing', correct: false },
        { id: 'destroying', text: 'Destroying energy completely', correct: false }
      ],
      explanation: "Car engines are amazing examples of energy conversion - they transform chemical energy (gasoline) into mechanical energy (motion)!"
    },
    {
      title: "The Smartphone Lab",
      story: "During lunch, you use your phone to video chat with a friend across the world. The tiny device processes your voice, transmits it through the air, and displays your friend's face in real-time - incredible technology in your pocket!",
      icon: <Smartphone className="w-16 h-16 text-black" />,
      question: "Smartphones combine multiple types of engineering including:",
      options: [
        { id: 'one', text: 'Only electrical engineering', correct: false },
        { id: 'multiple', text: 'Electrical, computer, and materials engineering', correct: true },
        { id: 'none', text: 'No engineering - they work naturally', correct: false }
      ],
      explanation: "Smartphones are marvels of multiple engineering fields working together - electrical circuits, computer processors, and advanced materials!"
    },
    {
      title: "The Water Treatment Plant",
      story: "Turning on the tap at school, clean water flows out instantly. You learn this water traveled from a treatment plant where engineers designed systems to remove harmful substances and make it safe to drink.",
      icon: <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center text-white text-2xl">💧</div>,
      question: "Water treatment plants use which engineering discipline?",
      options: [
        { id: 'environmental', text: 'Environmental Engineering', correct: true },
        { id: 'aerospace', text: 'Aerospace Engineering', correct: false },
        { id: 'gaming', text: 'Gaming Engineering', correct: false }
      ],
      explanation: "Environmental engineers design systems to clean our water, manage waste, and protect the environment we all depend on!"
    },
    {
      title: "The Medical Center",
      story: "Visiting the school nurse, you see an amazing X-ray machine that can see inside your body, and a digital thermometer that instantly measures temperature. These tools help keep students healthy and safe.",
      icon: <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-2xl">🏥</div>,
      question: "Medical devices like X-ray machines represent:",
      options: [
        { id: 'biomedical', text: 'Biomedical Engineering', correct: true },
        { id: 'cooking', text: 'Cooking Engineering', correct: false },
        { id: 'music', text: 'Music Engineering', correct: false }
      ],
      explanation: "Biomedical engineers create devices that help doctors diagnose and treat patients, combining engineering with medical knowledge!"
    },
    {
      title: "The Problem-Solving Workshop",
      story: "In the final room, you meet engineers from different fields. They explain that whether designing a phone, building a bridge, or creating clean water systems, they all follow the same process: identify problems and design solutions!",
      icon: <Wrench className="w-16 h-16 text-orange-500" />,
      question: "The main goal of all engineering is to:",
      options: [
        { id: 'money', text: 'Make lots of money', correct: false },
        { id: 'solve', text: 'Solve problems and improve life', correct: true },
        { id: 'complicated', text: 'Make things more complicated', correct: false }
      ],
      explanation: "All engineers share the same mission: solving problems to make life better, safer, and more convenient for everyone!"
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
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-orange-50 to-yellow-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-800 mb-2">Engineering in Daily Life Hunt</h1>
        <p className="text-lg text-gray-600">Discover how engineering shapes your everyday world!</p>
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
          
          <div className="bg-orange-50 rounded-lg p-6 mb-6">
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
                    className="w-full p-4 text-left bg-gray-50 hover:bg-orange-100 rounded-lg border-2 border-transparent hover:border-orange-300 transition-all duration-200"
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
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center mx-auto"
                >
                  Next Location <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Engineering Explorer!</h2>
          <p className="text-xl text-gray-700 mb-6">Final Score: {score}/100</p>
          <div className="bg-orange-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">What You Learned:</h3>
            <ul className="text-left space-y-2">
              <li>• Smart homes use sensors and programming</li>
              <li>• Civil engineers design safe bridges and buildings</li>
              <li>• Car engines convert chemical energy to motion</li>
              <li>• Smartphones combine multiple engineering fields</li>
              <li>• Environmental engineers keep our water clean</li>
              <li>• Biomedical engineers create medical devices</li>
              <li>• All engineering aims to solve problems and help people</li>
            </ul>
          </div>
          <button
            onClick={resetGame}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default EngineeringDailyLifeGame;