import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Trophy, Play, Pause } from 'lucide-react';

const SoundWavePuzzle = () => {
  const [gameData] = useState({
    waveProperties: [
      { id: 1, property: 'Frequency', unit: 'Hz', description: 'Number of waves per second', value: 440, min: 100, max: 1000 },
      { id: 2, property: 'Amplitude', unit: 'dB', description: 'Height of the wave (loudness)', value: 60, min: 20, max: 100 },
      { id: 3, property: 'Wavelength', unit: 'm', description: 'Distance between wave peaks', value: 0.77, min: 0.3, max: 3.0 },
      { id: 4, property: 'Speed', unit: 'm/s', description: 'How fast the wave travels', value: 343, min: 300, max: 400 }
    ],
    questions: [
      {
        id: 1,
        question: "What happens to pitch when frequency increases?",
        options: ["Pitch gets higher", "Pitch gets lower", "Pitch stays the same", "Pitch disappears"],
        correct: 0,
        explanation: "Higher frequency means more waves per second, creating a higher pitch."
      },
      {
        id: 2,
        question: "What does amplitude determine in sound?",
        options: ["Pitch", "Loudness", "Speed", "Direction"],
        correct: 1,
        explanation: "Amplitude determines the loudness or volume of the sound."
      },
      {
        id: 3,
        question: "Sound waves are what type of waves?",
        options: ["Transverse", "Longitudinal", "Standing", "Electromagnetic"],
        correct: 1,
        explanation: "Sound waves are longitudinal waves where particles vibrate parallel to wave direction."
      },
      {
        id: 4,
        question: "What is the speed of sound in air at room temperature?",
        options: ["300 m/s", "343 m/s", "400 m/s", "500 m/s"],
        correct: 1,
        explanation: "Sound travels at approximately 343 m/s in air at room temperature."
      },
      {
        id: 5,
        question: "Which frequency range can humans typically hear?",
        options: ["20 Hz - 20,000 Hz", "1 Hz - 100 Hz", "100 Hz - 1,000 Hz", "20,000 Hz - 100,000 Hz"],
        correct: 0,
        explanation: "Humans can typically hear frequencies from 20 Hz to 20,000 Hz (20 kHz)."
      }
    ]
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [waveAnimation, setWaveAnimation] = useState(true);
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(60);

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    gameData.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / gameData.questions.length) * 100);
  };

  const submitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < gameData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Generate wave path for SVG
  const generateWavePath = () => {
    const width = 400;
    const height = 100;
    const centerY = height / 2;
    const waveLength = width / (frequency / 100);
    const waveHeight = (amplitude / 100) * 30;
    
    let path = `M 0 ${centerY}`;
    for (let x = 0; x <= width; x += 2) {
      const y = centerY + Math.sin((x / waveLength) * 2 * Math.PI) * waveHeight;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const currentQuestionData = gameData.questions[currentQuestion];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Volume2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Sound Waves Interactive Quiz</h1>
          </div>
          <div className="flex items-center gap-4">
            {showResults && (
              <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-600">Score: {score}%</span>
              </div>
            )}
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Quiz
            </button>
          </div>
        </div>

        {/* Wave Visualizer */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Interactive Wave Visualizer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <svg width="400" height="100" className="border rounded bg-white">
                <path
                  d={generateWavePath()}
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  className={waveAnimation ? 'animate-pulse' : ''}
                />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              </svg>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency: {frequency} Hz
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amplitude: {amplitude} dB
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={() => setWaveAnimation(!waveAnimation)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {waveAnimation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {waveAnimation ? 'Pause' : 'Play'} Animation
              </button>
            </div>
          </div>
        </div>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Question {currentQuestion + 1} of {gameData.questions.length}
            </h2>
            <div className="bg-gray-200 rounded-full h-2 w-32">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / gameData.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {currentQuestionData.question}
            </h3>
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionData.id] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestionData.id] === undefined}
              className={`px-4 py-2 rounded-lg ${
                selectedAnswers[currentQuestionData.id] === undefined
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : currentQuestion === gameData.questions.length - 1
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentQuestion === gameData.questions.length - 1 ? 'Submit Quiz' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-lg text-gray-600">Your Score: {score}%</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Review Your Answers:</h3>
            {gameData.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <p className="font-medium text-gray-800 mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <p className={`mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    Your answer: {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-green-600 mb-2">
                      Correct answer: {question.options[question.correct]}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 italic">
                    {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundWavePuzzle;