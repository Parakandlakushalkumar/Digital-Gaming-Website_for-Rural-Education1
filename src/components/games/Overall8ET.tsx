import React, { useState } from 'react';
import { Check, Lock, Play, Trophy, Zap, Cog, Code, Cpu, Leaf, Building, Wifi, Brain, Rocket } from 'lucide-react';

// Data structure for lessons - Easy to modify questions/tasks later
interface Lesson {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Engineering & Design Thinking",
    icon: <Cog className="w-6 h-6" />,
    description: "Learn the basics of engineering design process",
    question: "What is the first step in the engineering design process?",
    options: ["Build a prototype", "Identify the problem", "Test the solution", "Market the product"],
    correctAnswer: 1,
    explanation: "Identifying the problem is the crucial first step in engineering design thinking!"
  },
  {
    id: 2,
    title: "Basics of Electricity and Circuits",
    icon: <Zap className="w-6 h-6" />,
    description: "Understand electrical circuits and components",
    question: "In a series circuit, if one bulb burns out, what happens to the others?",
    options: ["They get brighter", "They stay the same", "They all go out", "Only half go out"],
    correctAnswer: 2,
    explanation: "In a series circuit, current flows through all components in sequence, so if one fails, all stop working!"
  },
  {
    id: 3,
    title: "Simple Machines and Mechanisms",
    icon: <Cog className="w-6 h-6" />,
    description: "Explore levers, pulleys, and mechanical advantage",
    question: "Which simple machine makes it easier to lift heavy objects by changing direction of force?",
    options: ["Lever", "Inclined plane", "Pulley", "Wheel and axle"],
    correctAnswer: 2,
    explanation: "Pulleys redirect force and can provide mechanical advantage to lift heavy loads!"
  },
  {
    id: 4,
    title: "Fundamentals of Coding",
    icon: <Code className="w-6 h-6" />,
    description: "Basic programming concepts with Scratch/Python",
    question: "What is a 'loop' in programming?",
    options: ["A bug in code", "A repeated instruction", "A variable", "A function"],
    correctAnswer: 1,
    explanation: "Loops allow us to repeat instructions multiple times efficiently!"
  },
  {
    id: 5,
    title: "Robotics Basics",
    icon: <Cpu className="w-6 h-6" />,
    description: "Learn about motors, sensors, and robot control",
    question: "What component allows a robot to 'sense' its environment?",
    options: ["Motor", "Battery", "Sensor", "Wire"],
    correctAnswer: 2,
    explanation: "Sensors are the 'eyes and ears' of robots, helping them understand their surroundings!"
  },
  {
    id: 6,
    title: "Renewable Energy",
    icon: <Leaf className="w-6 h-6" />,
    description: "Discover solar, wind, and hydro power",
    question: "Which renewable energy source works best during cloudy weather?",
    options: ["Solar power", "Wind power", "Hydro power", "All work equally"],
    correctAnswer: 1,
    explanation: "Wind power can generate electricity even when it's cloudy, unlike solar panels!"
  },
  {
    id: 7,
    title: "Engineering in Daily Life",
    icon: <Building className="w-6 h-6" />,
    description: "How engineering shapes bridges, buildings, and roads",
    question: "What shape is strongest for bridge construction?",
    options: ["Square", "Circle", "Triangle", "Rectangle"],
    correctAnswer: 2,
    explanation: "Triangles distribute weight evenly and are the strongest geometric shape in construction!"
  },
  {
    id: 8,
    title: "Communication Technology",
    icon: <Wifi className="w-6 h-6" />,
    description: "Understanding internet and network basics",
    question: "What does 'WWW' stand for in web addresses?",
    options: ["World Wide Web", "Wireless Web Work", "World Web Way", "Wide Web World"],
    correctAnswer: 0,
    explanation: "World Wide Web is the system of interconnected documents accessed via the internet!"
  },
  {
    id: 9,
    title: "Artificial Intelligence Basics",
    icon: <Brain className="w-6 h-6" />,
    description: "Introduction to AI and machine learning",
    question: "What is machine learning?",
    options: ["Robots learning to walk", "Computers learning from data", "Building smart machines", "Programming robots"],
    correctAnswer: 1,
    explanation: "Machine learning allows computers to improve their performance by learning from data patterns!"
  },
  {
    id: 10,
    title: "Future of Technology & Innovation",
    icon: <Rocket className="w-6 h-6" />,
    description: "Explore emerging technologies and career paths",
    question: "Which technology is expected to revolutionize transportation?",
    options: ["Faster cars", "Electric vehicles", "Flying cars", "Teleportation"],
    correctAnswer: 1,
    explanation: "Electric vehicles are already transforming transportation with cleaner, more efficient technology!"
  }
];

const Class8TechGame: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'completed'>('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentLesson = lessonsData.find(lesson => lesson.id === currentLevel);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setUnlockedLevels(1);
    setScore(0);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === currentLesson!.correctAnswer) {
      setScore(score + 1);
      
      // Unlock next level after a delay
      setTimeout(() => {
        if (currentLevel === 10) {
          setGameState('completed');
        } else {
          setUnlockedLevels(Math.max(unlockedLevels, currentLevel + 1));
        }
      }, 2000);
    }
  };

  const nextLevel = () => {
    if (currentLevel < 10 && currentLevel < unlockedLevels) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const selectLevel = (levelId: number) => {
    if (levelId <= unlockedLevels) {
      setCurrentLevel(levelId);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restartGame = () => {
    setGameState('start');
    setCurrentLevel(1);
    setUnlockedLevels(1);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  // Start Screen
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Class 8 Technology Game
            </h1>
            <p className="text-gray-600">
              Master Engineering & Technology through 10 exciting levels!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-semibold text-blue-700">10 Levels</div>
              <div className="text-blue-600">Sequential Learning</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="font-semibold text-green-700">Interactive</div>
              <div className="text-green-600">Learn by Doing</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 w-full shadow-lg"
          >
            <Play className="w-5 h-5" />
            Start Technology Game
          </button>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 Congratulations! 🎉
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              You completed Class 8 Engineering & Technology!
            </h2>
            <p className="text-gray-600 mb-4">
              You've mastered all 10 levels and earned your technology badge!
            </p>
            
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg mb-6">
              <div className="text-2xl font-bold text-gray-800">Final Score: {score}/10</div>
              <div className="text-gray-600">
                {score === 10 ? "Perfect Score! Amazing!" : 
                 score >= 8 ? "Excellent Work!" :
                 score >= 6 ? "Good Job!" : "Keep Learning!"}
              </div>
            </div>
          </div>

          <button
            onClick={restartGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 w-full"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Class 8 Technology Game</h1>
            <div className="text-lg font-semibold text-gray-700">Score: {score}/10</div>
          </div>
          
          {/* Level Progress Bar */}
          <div className="grid grid-cols-10 gap-2">
            {lessonsData.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => selectLevel(lesson.id)}
                disabled={lesson.id > unlockedLevels}
                className={`
                  h-12 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200
                  ${lesson.id === currentLevel 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                    : lesson.id <= unlockedLevels
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
                title={lesson.title}
              >
                {lesson.id <= unlockedLevels ? (
                  lesson.id === currentLevel ? lesson.icon : <Check className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Level Content */}
        {currentLesson && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white">
                {currentLesson.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Level {currentLesson.id}: {currentLesson.title}
                </h2>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>
            </div>

            {!showResult ? (
              <>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {currentLesson.question}
                  </h3>
                  
                  <div className="grid gap-3">
                    {currentLesson.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`
                          p-4 rounded-lg text-left transition-all duration-200 border-2
                          ${selectedAnswer === index
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className={`
                    px-8 py-3 rounded-xl font-semibold transition-all duration-200
                    ${selectedAnswer !== null
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className={`
                  p-6 rounded-2xl mb-6
                  ${selectedAnswer === currentLesson.correctAnswer
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                  }
                `}>
                  <div className={`
                    text-6xl mb-4
                    ${selectedAnswer === currentLesson.correctAnswer ? 'text-green-500' : 'text-red-500'}
                  `}>
                    {selectedAnswer === currentLesson.correctAnswer ? '✅' : '❌'}
                  </div>
                  <h3 className={`
                    text-2xl font-bold mb-2
                    ${selectedAnswer === currentLesson.correctAnswer ? 'text-green-700' : 'text-red-700'}
                  `}>
                    {selectedAnswer === currentLesson.correctAnswer ? 'Correct!' : 'Incorrect!'}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {currentLesson.explanation}
                  </p>
                  {selectedAnswer !== currentLesson.correctAnswer && (
                    <p className="text-gray-600 mt-2">
                      The correct answer was: <strong>{currentLesson.options[currentLesson.correctAnswer]}</strong>
                    </p>
                  )}
                </div>

                {currentLevel < 10 && selectedAnswer === currentLesson.correctAnswer && (
                  <button
                    onClick={nextLevel}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 mr-4"
                  >
                    Next Level
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }}
                  className="bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Class8TechGame;