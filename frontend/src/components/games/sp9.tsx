import React, { useState, useEffect } from 'react';
import { BarChart3, Award, RotateCcw, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const StatisticsProbabilityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "The mean of 5, 8, 12, 15, 20 is:",
      options: ["10", "12", "15", "20"],
      correct: 1,
      explanation: "Mean = (5 + 8 + 12 + 15 + 20) ÷ 5 = 60 ÷ 5 = 12",
      topic: "Mean"
    },
    {
      id: 2,
      question: "The median of the data: 3, 7, 5, 9, 11, 2, 8 is:",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "Arrange in order: 2, 3, 5, 7, 8, 9, 11. The middle value (4th position) is 7.",
      topic: "Median"
    },
    {
      id: 3,
      question: "In the data set: 4, 6, 4, 8, 4, 9, 6, 4, the mode is:",
      options: ["4", "6", "8", "9"],
      correct: 0,
      explanation: "Mode is the most frequently occurring value. Here, 4 appears 4 times, more than any other value.",
      topic: "Mode"
    },
    {
      id: 4,
      question: "A coin is tossed twice. What is the probability of getting at least one head?",
      options: ["1/4", "1/2", "3/4", "1"],
      correct: 2,
      explanation: "P(at least one head) = 1 - P(no heads) = 1 - P(TT) = 1 - 1/4 = 3/4",
      topic: "Probability"
    },
    {
      id: 5,
      question: "The range of the data: 15, 22, 18, 30, 12, 28 is:",
      options: ["16", "18", "20", "22"],
      correct: 1,
      explanation: "Range = Maximum - Minimum = 30 - 12 = 18",
      topic: "Range"
    },
    {
      id: 6,
      question: "From a deck of 52 cards, the probability of drawing a red card is:",
      options: ["1/4", "1/3", "1/2", "2/3"],
      correct: 2,
      explanation: "There are 26 red cards (hearts + diamonds) in 52 cards. P = 26/52 = 1/2",
      topic: "Card Probability"
    },
    {
      id: 7,
      question: "If the mean of 6 numbers is 15, what is their sum?",
      options: ["75", "80", "85", "90"],
      correct: 3,
      explanation: "Mean = Sum ÷ Number of values, so 15 = Sum ÷ 6, therefore Sum = 15 × 6 = 90",
      topic: "Mean Calculation"
    },
    {
      id: 8,
      question: "A bag contains 5 red balls and 3 blue balls. The probability of drawing a blue ball is:",
      options: ["3/5", "3/8", "5/8", "1/3"],
      correct: 1,
      explanation: "Total balls = 5 + 3 = 8. P(blue) = Number of blue balls / Total balls = 3/8",
      topic: "Basic Probability"
    },
    {
      id: 9,
      question: "The cumulative frequency of the 3rd class interval represents:",
      options: ["Frequency of 3rd class only", "Sum of first 3 class frequencies", "Total frequency", "Relative frequency"],
      correct: 1,
      explanation: "Cumulative frequency of any class is the sum of frequencies of that class and all previous classes.",
      topic: "Cumulative Frequency"
    },
    {
      id: 10,
      question: "Two dice are rolled. What is the probability that their sum is 7?",
      options: ["1/6", "1/9", "1/12", "5/36"],
      correct: 0,
      explanation: "Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total = 36. P = 6/36 = 1/6",
      topic: "Dice Probability"
    }
  ];

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeLeft(40);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false);
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 5));
      setScore(score + 10 + timeBonus);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      startTimer();
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimerActive(false);
    setTimeLeft(40);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  useEffect(() => {
    if (!gameComplete && !showResult) {
      startTimer();
    }
  }, [currentQuestion]);

  if (gameComplete) {
    const percentage = Math.round((score / (questions.length * 18)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Statistics & Probability Expert!
            </h1>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-emerald-300">{score}</div>
                <div className="text-sm opacity-80">Total Score</div>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-cyan-300">{percentage}%</div>
                <div className="text-sm opacity-80">Accuracy</div>
              </div>
            </div>

            <div className="mb-6">
              {percentage >= 90 ? "📊 Data Master!" : 
               percentage >= 70 ? "📈 Statistical Expert!" :
               percentage >= 50 ? "🎯 Good Analysis!" : "📋 Keep Calculating!"}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
              Statistics & Probability
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className={`font-bold ${timeLeft <= 15 ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="bg-black/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-3 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 text-white shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center font-bold">
              {currentQuestion + 1}
            </div>
            <div className="text-sm bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
              {currentQ.topic}
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-6 leading-relaxed">{currentQ.question}</h2>
          
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
                {isCorrect ? 'Correct!' : selectedAnswer === -1 ? 'Time Up!' : 'Not Quite'}
              </h3>
            </div>
            
            <p className="text-white mb-4 leading-relaxed">{currentQ.explanation}</p>
            
            {isCorrect && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-3 mb-4 border border-green-400/30">
                <div className="text-sm text-green-300">
                  Points earned: {10 + Math.max(0, Math.floor(timeLeft / 5))} 
                  {timeLeft > 0 && ` (${Math.max(0, Math.floor(timeLeft / 5))} time bonus)`}
                </div>
              </div>
            )}
            
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 py-3 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsProbabilityQuiz;