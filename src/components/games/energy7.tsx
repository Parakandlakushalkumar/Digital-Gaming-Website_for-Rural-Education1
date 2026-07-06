import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Zap } from 'lucide-react';

const EnergySourcesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "Which energy transformation occurs in a solar panel?",
      options: ["Chemical to electrical", "Light to electrical", "Mechanical to electrical", "Heat to electrical"],
      correct: 1,
      difficulty: "Medium",
      explanation: "Solar panels use photovoltaic cells to convert light energy (photons) directly into electrical energy through the photoelectric effect."
    },
    {
      question: "What is the main disadvantage of fossil fuels as an energy source?",
      options: ["High efficiency", "Easy storage", "Environmental pollution", "Low cost"],
      correct: 2,
      difficulty: "Easy",
      explanation: "Fossil fuels release greenhouse gases and pollutants when burned, contributing to climate change and air pollution, making environmental impact their major disadvantage."
    },
    {
      question: "In a hydroelectric power plant, what type of energy conversion occurs?",
      options: ["Potential → Kinetic → Electrical", "Chemical → Heat → Electrical", "Nuclear → Heat → Electrical", "Solar → Heat → Electrical"],
      correct: 0,
      difficulty: "Hard",
      explanation: "Water stored at height has potential energy, which converts to kinetic energy as it flows down, then to mechanical energy in turbines, and finally to electrical energy in generators."
    },
    {
      question: "Which renewable energy source is most dependent on weather conditions?",
      options: ["Geothermal", "Hydroelectric", "Wind power", "Biomass"],
      correct: 2,
      difficulty: "Medium",
      explanation: "Wind power is highly variable and depends on wind speed and consistency, making it the most weather-dependent renewable source among the options."
    },
    {
      question: "What percentage of the world's electricity comes from renewable sources approximately?",
      options: ["About 10%", "About 30%", "About 50%", "About 70%"],
      correct: 1,
      difficulty: "Hard",
      explanation: "As of recent years, renewable energy sources account for approximately 30% of global electricity generation, with this percentage growing annually."
    },
    {
      question: "Which energy source produces the most energy per unit of fuel mass?",
      options: ["Coal", "Natural gas", "Uranium (nuclear)", "Wood"],
      correct: 2,
      difficulty: "Hard",
      explanation: "Nuclear fuel (uranium) has an extremely high energy density - millions of times more energy per unit mass than chemical fuels like coal or gas."
    },
    {
      question: "What is biomass energy?",
      options: ["Energy from moving water", "Energy from organic materials", "Energy from underground heat", "Energy from tidal movements"],
      correct: 1,
      difficulty: "Easy",
      explanation: "Biomass energy comes from organic materials like wood, crop residues, and organic waste that can be burned or converted to biofuels."
    },
    {
      question: "Which factor does NOT affect the efficiency of a wind turbine?",
      options: ["Wind speed", "Blade design", "Tower height", "Soil composition"],
      correct: 3,
      difficulty: "Medium",
      explanation: "Soil composition doesn't affect wind turbine efficiency. The key factors are wind speed, blade aerodynamics, tower height (for better wind access), and turbine design."
    },
    {
      question: "What is the main challenge with storing solar energy?",
      options: ["Too much energy produced", "Energy only available during sunlight", "High storage costs", "Both B and C"],
      correct: 3,
      difficulty: "Hard",
      explanation: "Solar energy faces the dual challenge of being intermittent (only available during daylight) and requiring expensive battery systems for large-scale storage."
    },
    {
      question: "Which energy source is considered carbon-neutral during operation?",
      options: ["Natural gas", "Nuclear power", "Coal", "Oil"],
      correct: 1,
      difficulty: "Medium",
      explanation: "Nuclear power produces no carbon emissions during electricity generation, making it carbon-neutral in operation, though there are emissions in fuel processing and plant construction."
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowResult(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Energy Expert Quiz Complete!</h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <p className="text-xl mb-2">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <p className="text-gray-600 mb-6">
            {score >= 8 ? "Outstanding! You're an energy expert!" : 
             score >= 6 ? "Great job! You understand energy well." :
             "Keep learning about our energy future!"}
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Energy Sources Advanced Quiz</h1>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
            {questions[currentQuestion].difficulty}
          </span>
          <span className="text-sm text-gray-500">Renewable & Non-renewable</span>
        </div>
        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200'
                  : 'hover:bg-green-50 border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === questions[currentQuestion].correct && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold mb-2">Detailed Explanation:</h3>
          <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score}/{questions.length} • {Math.round((score / Math.max(currentQuestion, 1)) * 100)}%
        </div>
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Final Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EnergySourcesQuiz;