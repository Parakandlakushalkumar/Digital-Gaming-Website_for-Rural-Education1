import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, Trophy, Lightbulb, Check } from 'lucide-react';

const GravitationEnergyPuzzle = () => {
  const [puzzleData] = useState({
    questions: [
      {
        id: 1,
        question: "What force attracts objects toward Earth's center?",
        answer: "GRAVITY",
        hint: "Force pulling things down",
        category: "Forces"
      },
      {
        id: 2,
        question: "What type of energy is stored due to position?",
        answer: "POTENTIAL",
        hint: "Energy at height",
        category: "Energy"
      },
      {
        id: 3,
        question: "What is energy of motion called?",
        answer: "KINETIC",
        hint: "Moving energy",
        category: "Energy"
      },
      {
        id: 4,
        question: "What equals force times distance?",
        answer: "WORK",
        hint: "W = F × d",
        category: "Physics"
      },
      {
        id: 5,
        question: "What is the rate of doing work?",
        answer: "POWER",
        hint: "P = W/t",
        category: "Physics"
      },
      {
        id: 6,
        question: "Who discovered the law of universal gravitation?",
        answer: "NEWTON",
        hint: "Famous physicist",
        category: "Scientists"
      },
      {
        id: 7,
        question: "What is the unit of energy?",
        answer: "JOULE",
        hint: "SI unit symbol J",
        category: "Units"
      },
      {
        id: 8,
        question: "What can neither be created nor destroyed?",
        answer: "ENERGY",
        hint: "Conservation law",
        category: "Laws"
      }
    ]
  });

  const [answers, setAnswers] = useState({});
  const [hintsUsed, setHintsUsed] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const initializeGame = () => {
    const initialAnswers = {};
    puzzleData.questions.forEach(q => {
      initialAnswers[q.id] = '';
    });
    setAnswers(initialAnswers);
    setHintsUsed([]);
    setScore(0);
    setGameComplete(false);
    setSelectedQuestion(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = {
      ...answers,
      [questionId]: value.toUpperCase()
    };
    setAnswers(newAnswers);
    checkCompletion(newAnswers);
  };

  const checkCompletion = (currentAnswers) => {
    let correctCount = 0;
    let totalQuestions = puzzleData.questions.length;

    puzzleData.questions.forEach(question => {
      if (currentAnswers[question.id] === question.answer) {
        correctCount++;
      }
    });

    const newScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(newScore);

    if (correctCount === totalQuestions) {
      setGameComplete(true);
    }
  };

  const useHint = (questionId) => {
    if (hintsUsed.includes(questionId)) return;
    
    const question = puzzleData.questions.find(q => q.id === questionId);
    const newAnswers = {
      ...answers,
      [questionId]: question.answer[0] // Give first letter
    };
    
    setAnswers(newAnswers);
    setHintsUsed([...hintsUsed, questionId]);
    checkCompletion(newAnswers);
  };

  const isCorrect = (questionId) => {
    const question = puzzleData.questions.find(q => q.id === questionId);
    return answers[questionId] === question.answer;
  };

  const getInputClass = (questionId) => {
    const question = puzzleData.questions.find(q => q.id === questionId);
    const userAnswer = answers[questionId];
    
    if (!userAnswer) return 'border-gray-300';
    if (userAnswer === question.answer) return 'border-green-500 bg-green-50';
    if (userAnswer.length === question.answer.length) return 'border-red-500 bg-red-50';
    return 'border-blue-300 bg-blue-50';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Forces': 'bg-red-100 text-red-800',
      'Energy': 'bg-green-100 text-green-800',
      'Physics': 'bg-blue-100 text-blue-800',
      'Scientists': 'bg-purple-100 text-purple-800',
      'Units': 'bg-yellow-100 text-yellow-800',
      'Laws': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const showAnswer = (questionId) => {
    const question = puzzleData.questions.find(q => q.id === questionId);
    const newAnswers = {
      ...answers,
      [questionId]: question.answer
    };
    setAnswers(newAnswers);
    checkCompletion(newAnswers);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Gravitation & Energy Word Puzzle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-600">Score: {score}%</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {gameComplete && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 text-center">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-green-800 mb-1">Excellent Work! 🎉</h2>
            <p className="text-green-700">You've mastered gravitation and energy concepts!</p>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Answer the questions about gravitation, work, and energy</p>
          <p className="text-sm text-gray-500">Type your answers in the boxes below</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {puzzleData.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                    {question.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {question.question}
                </h3>
              </div>
              {isCorrect(question.id) && (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer ({question.answer.length} letters)
                </label>
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className={`w-full p-3 border-2 rounded-lg text-lg font-mono tracking-wider transition-colors ${getInputClass(question.id)}`}
                  placeholder="Type your answer..."
                  maxLength={question.answer.length}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => useHint(question.id)}
                  disabled={hintsUsed.includes(question.id) || isCorrect(question.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    hintsUsed.includes(question.id) || isCorrect(question.id)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </button>
                
                <button
                  onClick={() => showAnswer(question.id)}
                  disabled={isCorrect(question.id)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isCorrect(question.id)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Show Answer
                </button>
              </div>

              {hintsUsed.includes(question.id) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Hint:</strong> {question.hint}
                  </p>
                </div>
              )}

              {isCorrect(question.id) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    ✅ Correct! <strong>{question.answer}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Progress</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {puzzleData.questions.filter(q => isCorrect(q.id)).length} / {puzzleData.questions.length} Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default GravitationEnergyPuzzle;