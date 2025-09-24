import React, { useState, useEffect } from 'react';
import { Search, Lightbulb, Cog, Trophy, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const TreasureHuntGame = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [foundTreasures, setFoundTreasures] = useState([]);

  const stages = [
    {
      id: 1,
      title: "🔍 The Engineering Method",
      question: "You're an engineer tasked with designing a bridge. What's the FIRST step in the engineering design process?",
      options: [
        "Start building immediately",
        "Identify and define the problem",
        "Choose the materials",
        "Test the final design"
      ],
      correct: 1,
      explanation: "Great! Every engineering project starts with clearly defining the problem. This helps ensure you're solving the right challenge.",
      treasure: "🧠 Problem-Solving Compass"
    },
    {
      id: 2,
      title: "⚙️ Design Thinking",
      question: "A smartphone app keeps crashing. Using design thinking, what should you do first?",
      options: [
        "Redesign the entire interface",
        "Ask users about their experience and observe their behavior",
        "Add more features to distract from crashes",
        "Switch to a different programming language"
      ],
      correct: 1,
      explanation: "Excellent! Design thinking emphasizes empathy - understanding your users' needs and experiences before jumping to solutions.",
      treasure: "👥 Empathy Lens"
    },
    {
      id: 3,
      title: "🔬 Prototyping Power",
      question: "Why do engineers create prototypes before building the final product?",
      options: [
        "To make the project take longer",
        "To test ideas quickly and cheaply before committing resources",
        "Because it's required by law",
        "To impress their managers"
      ],
      correct: 1,
      explanation: "Perfect! Prototypes let you 'fail fast and cheap' - discovering problems early when they're easier and less expensive to fix.",
      treasure: "🛠️ Prototype Workshop Kit"
    },
    {
      id: 4,
      title: "🎯 User-Centered Design",
      question: "You're designing a new gaming controller. What's most important to consider?",
      options: [
        "Making it look cool and futuristic",
        "Using the cheapest materials possible",
        "How it feels in different users' hands and their gaming needs",
        "Adding as many buttons as possible"
      ],
      correct: 2,
      explanation: "Brilliant! User-centered design puts the needs, limitations, and preferences of users at the center of every design decision.",
      treasure: "🎮 User Experience Crystal"
    },
    {
      id: 5,
      title: "🔄 Iteration Innovation",
      question: "Your first design solution doesn't work perfectly. What's the best engineering approach?",
      options: [
        "Give up and try a completely different project",
        "Stick with it exactly as is",
        "Analyze what went wrong, learn from it, and improve the design",
        "Blame the testing conditions"
      ],
      correct: 2,
      explanation: "Outstanding! Iteration - the cycle of testing, learning, and improving - is at the heart of great engineering and design.",
      treasure: "🔄 Innovation Cycle Gear"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === stages[currentStage].correct) {
      setScore(score + 20);
      setFoundTreasures([...foundTreasures, stages[currentStage].treasure]);
    }
  };

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentStage(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setFoundTreasures([]);
  };

  const currentQ = stages[currentStage];
  const isCorrect = selectedAnswer === currentQ.correct;

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-bounce" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🎉 Quest Complete! 🎉
            </h1>
            <p className="text-xl mb-6">You've mastered the fundamentals of Engineering & Design!</p>
            
            <div className="bg-black/20 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Your Final Score: {score}/100</h2>
              <div className="text-lg mb-4">
                {score === 100 ? "🏆 Perfect Engineer!" : 
                 score >= 80 ? "🌟 Expert Designer!" :
                 score >= 60 ? "⚡ Rising Engineer!" : "🌱 Future Innovator!"}
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">🏴‍☠️ Treasures Found:</h3>
              <div className="grid grid-cols-1 gap-2 text-left">
                {foundTreasures.map((treasure, index) => (
                  <div key={index} className="flex items-center gap-2 text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    {treasure}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 mb-6 text-left">
              <h3 className="text-xl font-bold mb-4 text-center">🚀 Engineering & Design Principles Unlocked:</h3>
              <ul className="space-y-2 text-sm">
                <li>✨ <strong>Problem Definition:</strong> Always start by clearly understanding the challenge</li>
                <li>✨ <strong>Empathy & User Focus:</strong> Design for real people with real needs</li>
                <li>✨ <strong>Rapid Prototyping:</strong> Test ideas early and often</li>
                <li>✨ <strong>User-Centered Design:</strong> Put users at the heart of every decision</li>
                <li>✨ <strong>Iterative Improvement:</strong> Learn, adapt, and keep getting better</li>
              </ul>
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Adventure
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Search className="w-8 h-8 text-yellow-400" />
              Engineering Treasure Hunt
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{score}/100</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-black/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{width: `${((currentStage + 1) / stages.length) * 100}%`}}
              />
            </div>
            <span className="text-sm font-medium">
              Stage {currentStage + 1} of {stages.length}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">{currentQ.title}</h2>
          </div>
          
          <p className="text-lg mb-8 leading-relaxed">{currentQ.question}</p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] font-medium
                  ${showResult 
                    ? index === currentQ.correct
                      ? 'bg-green-500/30 border-2 border-green-400 text-green-100'
                      : selectedAnswer === index 
                        ? 'bg-red-500/30 border-2 border-red-400 text-red-100'
                        : 'bg-white/5 border border-white/20 text-white/70'
                    : selectedAnswer === index
                      ? 'bg-white/20 border-2 border-white/50 text-white shadow-lg'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        {showResult && (
          <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl border-2 
            ${isCorrect ? 'border-green-400' : 'border-red-400'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              <h3 className="text-xl font-bold">
                {isCorrect ? '🎉 Treasure Found!' : '💭 Learning Moment'}
              </h3>
            </div>
            
            <p className="text-white mb-4 leading-relaxed">{currentQ.explanation}</p>
            
            {isCorrect && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 mb-4 border border-yellow-400/30">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">Treasure Acquired: {currentQ.treasure}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={nextStage}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Cog className="w-5 h-5" />
              {currentStage < stages.length - 1 ? 'Next Challenge' : 'Complete Quest'}
            </button>
          </div>
        )}

        {/* Treasures Found */}
        {foundTreasures.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Treasures Collected ({foundTreasures.length}/5)
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {foundTreasures.map((treasure, index) => (
                <div key={index} className="text-sm text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {treasure}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureHuntGame;