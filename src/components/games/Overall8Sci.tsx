import React, { useState } from 'react';
import { CheckCircle, Lock, Play, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

// Data structure for lessons - EASY TO REPLACE LATER
interface Lesson {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

// TODO: Replace this dummy data with real questions and content
const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Crop Production and Management",
    question: "Which of the following is the first step in crop production?",
    options: ["Harvesting", "Preparation of soil", "Storage", "Irrigation"],
    correctAnswer: 1,
    explanation: "Preparation of soil is the first and most important step in crop production as it provides a suitable environment for seeds to grow."
  },
  {
    id: 2,
    title: "Microorganisms: Friend and Foe",
    question: "Which microorganism is used in making bread?",
    options: ["Bacteria", "Virus", "Yeast", "Algae"],
    correctAnswer: 2,
    explanation: "Yeast is a fungus that helps in fermentation, making bread rise and become fluffy."
  },
  {
    id: 3,
    title: "Synthetic Fibres and Plastics",
    question: "Which of these is a synthetic fibre?",
    options: ["Cotton", "Wool", "Polyester", "Silk"],
    correctAnswer: 2,
    explanation: "Polyester is a synthetic fibre made from chemicals, while cotton, wool, and silk are natural fibres."
  },
  {
    id: 4,
    title: "Materials: Metals and Non-Metals",
    question: "Which property is common to most metals?",
    options: ["They are brittle", "They conduct electricity", "They are dull", "They break easily"],
    correctAnswer: 1,
    explanation: "Most metals are good conductors of electricity due to the presence of free electrons."
  },
  {
    id: 5,
    title: "Coal and Petroleum",
    question: "Coal and petroleum are examples of:",
    options: ["Renewable resources", "Fossil fuels", "Metals", "Synthetic materials"],
    correctAnswer: 1,
    explanation: "Coal and petroleum are fossil fuels formed from dead plants and animals over millions of years."
  },
  {
    id: 6,
    title: "Combustion and Flame",
    question: "For combustion to occur, which of the following is essential?",
    options: ["Water", "Oxygen", "Carbon dioxide", "Nitrogen"],
    correctAnswer: 1,
    explanation: "Oxygen is essential for combustion. Without oxygen, burning cannot take place."
  },
  {
    id: 7,
    title: "Conservation of Plants and Animals",
    question: "What is the main purpose of national parks?",
    options: ["Tourism", "Mining", "Wildlife conservation", "Agriculture"],
    correctAnswer: 2,
    explanation: "National parks are established primarily to protect and conserve wildlife and their natural habitats."
  },
  {
    id: 8,
    title: "Cell – Structure and Functions",
    question: "Which part of the cell controls all activities?",
    options: ["Cell wall", "Cytoplasm", "Nucleus", "Cell membrane"],
    correctAnswer: 2,
    explanation: "The nucleus acts as the control center of the cell and controls all cellular activities."
  },
  {
    id: 9,
    title: "Reproduction in Animals",
    question: "The process by which animals produce offspring is called:",
    options: ["Respiration", "Reproduction", "Digestion", "Excretion"],
    correctAnswer: 1,
    explanation: "Reproduction is the biological process by which animals produce offspring to continue their species."
  },
  {
    id: 10,
    title: "Force and Pressure",
    question: "Force is measured in which unit?",
    options: ["Meter", "Newton", "Kilogram", "Second"],
    correctAnswer: 1,
    explanation: "Force is measured in Newton (N), named after Sir Isaac Newton who formulated the laws of motion."
  }
];

// Game states
type GameState = 'start' | 'playing' | 'completed';
type QuestionState = 'unanswered' | 'correct' | 'incorrect';

const Class8ScienceGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionState, setQuestionState] = useState<QuestionState>('unanswered');
  const [showExplanation, setShowExplanation] = useState(false);

  const currentLesson = LESSONS.find(lesson => lesson.id === currentLevel);

  // Start the game
  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
  };

  // Reset the entire game
  const resetGame = () => {
    setGameState('start');
    setCurrentLevel(1);
    setCompletedLevels(new Set());
    setSelectedAnswer(null);
    setQuestionState('unanswered');
    setShowExplanation(false);
  };

  // Submit answer for current question
  const submitAnswer = () => {
    if (selectedAnswer === null || !currentLesson) return;

    const isCorrect = selectedAnswer === currentLesson.correctAnswer;
    setQuestionState(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);

    if (isCorrect) {
      const newCompletedLevels = new Set(completedLevels);
      newCompletedLevels.add(currentLevel);
      setCompletedLevels(newCompletedLevels);

      // Check if all levels completed
      if (currentLevel === 10) {
        setTimeout(() => setGameState('completed'), 2000);
      }
    }
  };

  // Move to next level
  const nextLevel = () => {
    if (currentLevel < 10 && completedLevels.has(currentLevel)) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setQuestionState('unanswered');
      setShowExplanation(false);
    }
  };

  // Go to specific level (if unlocked)
  const goToLevel = (levelId: number) => {
    if (levelId === 1 || completedLevels.has(levelId - 1)) {
      setCurrentLevel(levelId);
      setSelectedAnswer(null);
      setQuestionState('unanswered');
      setShowExplanation(false);
    }
  };

  // START SCREEN
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Play size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Class 8 Science Game
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Master all 10 science lessons through interactive questions and unlock your scientific knowledge!
          </p>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Science Game
          </button>
        </div>
      </div>
    );
  }

  // COMPLETION SCREEN
  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Trophy size={50} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Congratulations! 🎉
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            You completed Class 8 Science!
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            You've mastered all 10 science lessons. Your scientific journey has been amazing!
          </p>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // MAIN GAME SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Class 8 Science Game</h1>
            <div className="text-sm text-gray-600">
              Progress: {completedLevels.size}/10 levels completed
            </div>
          </div>
          
          {/* Level selector */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {LESSONS.map((lesson) => {
              const isCompleted = completedLevels.has(lesson.id);
              const isUnlocked = lesson.id === 1 || completedLevels.has(lesson.id - 1);
              const isCurrent = lesson.id === currentLevel;
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => goToLevel(lesson.id)}
                  disabled={!isUnlocked}
                  className={`
                    w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center
                    ${isCurrent ? 'bg-blue-500 text-white scale-110 ring-4 ring-blue-300' :
                      isCompleted ? 'bg-green-500 text-white hover:bg-green-600' :
                      isUnlocked ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                      'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {isCompleted ? <CheckCircle size={16} /> :
                   !isUnlocked ? <Lock size={16} /> : lesson.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current lesson */}
        {currentLesson && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {currentLesson.id}
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {currentLesson.title}
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentLesson.question}
                </h3>
                
                <div className="space-y-3">
                  {currentLesson.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => questionState === 'unanswered' && setSelectedAnswer(index)}
                      disabled={questionState !== 'unanswered'}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-all duration-300 font-medium
                        ${questionState === 'unanswered' ?
                          (selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50') :
                          index === currentLesson.correctAnswer ? 'border-green-500 bg-green-50' :
                          selectedAnswer === index ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                          ${questionState === 'unanswered' ?
                            (selectedAnswer === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300') :
                            index === currentLesson.correctAnswer ? 'border-green-500 bg-green-500 text-white' :
                            selectedAnswer === index ? 'border-red-500 bg-red-500 text-white' : 'border-gray-300'}
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Answer feedback */}
              {showExplanation && (
                <div className={`
                  p-6 rounded-xl mb-6 animate-fadeIn
                  ${questionState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
                `}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${questionState === 'correct' ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                      {questionState === 'correct' ? 
                        <CheckCircle size={20} className="text-white" /> :
                        <span className="text-white font-bold">✗</span>
                      }
                    </div>
                    <h4 className={`font-bold text-lg ${questionState === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                      {questionState === 'correct' ? 'Correct!' : 'Incorrect!'}
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLesson.explanation}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-4 justify-center">
                {questionState === 'unanswered' && (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`
                      px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105
                      ${selectedAnswer !== null ? 
                        'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' :
                        'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Submit Answer
                  </button>
                )}
                
                {questionState === 'correct' && currentLevel < 10 && (
                  <button
                    onClick={nextLevel}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                  >
                    Next Level <ArrowRight size={20} />
                  </button>
                )}
                
                {questionState === 'incorrect' && (
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setQuestionState('unanswered');
                      setShowExplanation(false);
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Class8ScienceGame;