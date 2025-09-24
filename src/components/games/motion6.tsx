import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Target, Timer } from 'lucide-react';

const MotionMeasurementGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('menu'); // menu, playing, complete
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const levels = [
    {
      id: 1,
      type: 'force',
      title: 'Push or Pull?',
      question: 'A person opening a door',
      image: '🚪',
      options: ['Push', 'Pull', 'Both'],
      correct: 'Pull',
      explanation: 'Opening a door towards you requires pulling!'
    },
    {
      id: 2,
      type: 'measurement',
      title: 'Choose the Right Tool',
      question: 'What do you use to measure the length of a pencil?',
      image: '✏️',
      options: ['Scale', 'Ruler', 'Clock'],
      correct: 'Ruler',
      explanation: 'A ruler measures length and distance!'
    },
    {
      id: 3,
      type: 'motion',
      title: 'Types of Motion',
      question: 'A spinning top shows what kind of motion?',
      image: '🔄',
      options: ['Straight line', 'Circular', 'Up and down'],
      correct: 'Circular',
      explanation: 'Spinning motion moves in circles!'
    },
    {
      id: 4,
      type: 'force',
      title: 'Force Detective',
      question: 'Kicking a football is an example of:',
      image: '⚽',
      options: ['Push', 'Pull', 'Neither'],
      correct: 'Push',
      explanation: 'Kicking pushes the ball away from you!'
    },
    {
      id: 5,
      type: 'measurement',
      title: 'Measurement Units',
      question: 'Which unit is best for measuring your height?',
      image: '📏',
      options: ['Centimeters', 'Kilograms', 'Liters'],
      correct: 'Centimeters',
      explanation: 'Centimeters measure length and height!'
    },
    {
      id: 6,
      type: 'motion',
      title: 'Speed Challenge',
      question: 'Which moves fastest?',
      image: '🏃‍♂️',
      options: ['Walking', 'Running', 'Crawling'],
      correct: 'Running',
      explanation: 'Running covers more distance in less time!'
    },
    {
      id: 7,
      type: 'force',
      title: 'Gravity Game',
      question: 'What makes a ball fall down when you drop it?',
      image: '⚽',
      options: ['Wind', 'Gravity', 'Magnetism'],
      correct: 'Gravity',
      explanation: 'Gravity pulls everything toward the Earth!'
    },
    {
      id: 8,
      type: 'measurement',
      title: 'Weight vs Mass',
      question: 'What do you use to measure how heavy something is?',
      image: '⚖️',
      options: ['Ruler', 'Scale', 'Thermometer'],
      correct: 'Scale',
      explanation: 'A scale measures weight and mass!'
    }
  ];

  const currentQuestion = levels[currentLevel - 1];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setScore(0);
    setTimeLeft(30);
    setIsTimerRunning(true);
    setFeedback('');
  };

  const handleTimeUp = () => {
    setIsTimerRunning(false);
    setFeedback('⏰ Time\'s up! Try again with more speed!');
    setTimeout(() => {
      setGameState('menu');
      resetGame();
    }, 2000);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setIsTimerRunning(false);
    
    if (answer === currentQuestion.correct) {
      const timeBonus = Math.floor(timeLeft / 2);
      setScore(score + 10 + timeBonus);
      setFeedback(`✅ Correct! ${currentQuestion.explanation} (+${10 + timeBonus} points)`);
      
      setTimeout(() => {
        if (currentLevel >= levels.length) {
          setGameState('complete');
        } else {
          nextLevel();
        }
      }, 2500);
    } else {
      setFeedback(`❌ Not quite! ${currentQuestion.explanation}`);
      setTimeout(() => {
        nextLevel();
      }, 2500);
    }
  };

  const nextLevel = () => {
    if (currentLevel >= levels.length) {
      setGameState('complete');
      return;
    }
    
    setCurrentLevel(currentLevel + 1);
    setSelectedAnswer(null);
    setFeedback('');
    setTimeLeft(30);
    setIsTimerRunning(true);
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setGameState('menu');
    setSelectedAnswer(null);
    setFeedback('');
    setTimeLeft(30);
    setIsTimerRunning(false);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'force': return 'bg-red-500';
      case 'motion': return 'bg-blue-500';
      case 'measurement': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'force': return '💪';
      case 'motion': return '🏃';
      case 'measurement': return '📏';
      default: return '❓';
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            🚀 Motion & Measurement Challenge
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Test your knowledge of forces, motion, and measurement tools!
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Game Rules</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💪</div>
                <h3 className="font-bold">Forces</h3>
                <p>Push, pull, and gravity questions</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🏃</div>
                <h3 className="font-bold">Motion</h3>
                <p>Speed, direction, and movement types</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📏</div>
                <h3 className="font-bold">Measurement</h3>
                <p>Tools, units, and measuring techniques</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                ⏱️ Answer each question within 30 seconds<br/>
                🏆 Faster answers earn bonus points!
              </p>
              
              <button
                onClick={startGame}
                className="bg-purple-500 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-purple-600 transition-colors flex items-center gap-3 mx-auto"
              >
                <Play size={24} />
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🏆 Challenge Complete!
            </h1>
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl mb-4">Fantastic work, Science Champion!</p>
            <p className="text-xl text-gray-600 mb-8">Final Score: {score} points</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-4 rounded-lg">
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="font-bold">Questions</h3>
                <p className="text-2xl">{levels.length}</p>
              </div>
              <div className="bg-gradient-to-b from-green-200 to-green-300 p-4 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold">Your Score</h3>
                <p className="text-2xl">{score}</p>
              </div>
              <div className="bg-gradient-to-b from-blue-200 to-blue-300 p-4 rounded-lg">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-bold">Level</h3>
                <p className="text-2xl">Expert!</p>
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold">
              Level {currentLevel}/{levels.length}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Target className="text-green-500" size={20} />
                <span className="font-bold">Score: {score}</span>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${timeLeft <= 10 ? 'bg-red-100' : 'bg-blue-100'}`}>
                <Timer className={timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'} size={16} />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentLevel / levels.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getTypeColor(currentQuestion.type)} text-white mb-4`}>
              <span>{getTypeIcon(currentQuestion.type)}</span>
              <span className="font-bold">{currentQuestion.title}</span>
            </div>
            
            <div className="text-8xl mb-4">{currentQuestion.image}</div>
            <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.question}</h2>
          </div>

          {/* Answer Options */}
          <div className="grid md:grid-cols-3 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl text-lg font-semibold transition-all ${
                  selectedAnswer === option
                    ? option === currentQuestion.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : selectedAnswer !== null && option === currentQuestion.correct
                      ? 'bg-green-200 text-green-800'
                      : selectedAnswer !== null
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="bg-white p-4 rounded-xl shadow-lg text-center">
            <p className="text-lg font-semibold">{feedback}</p>
          </div>
        )}

        {/* Pause Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsTimerRunning(!isTimerRunning);
            }}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 mx-auto"
          >
            {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
            {isTimerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* Learning Tips */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">💡 Quick Tips</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Forces:</strong> Push moves away, pull brings closer</p>
            <p><strong>Motion:</strong> Speed = distance ÷ time</p>
            <p><strong>Measurement:</strong> Choose the right tool for what you're measuring</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionMeasurementGame;