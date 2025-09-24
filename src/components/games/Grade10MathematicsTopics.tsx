import React, { useState } from 'react';
import RealNumbersQuiz from './real10';
import QuadraticEquationsQuiz from './qua10';
import ArithmeticProgressionsQuiz from './arith10';
import TrigonometryQuiz from './trig10';
import ProbabilityQuiz from './pro10';
import SurfaceAreasVolumesQuiz from './sv10';

interface Grade10MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade10MathematicsTopics: React.FC<Grade10MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'real-numbers',
      name: 'Real Numbers',
      component: RealNumbersQuiz,
      color: 'bg-purple-500',
      icon: '🔢'
    },
    {
      id: 'quadratic-equations',
      name: 'Quadratic Equations',
      component: QuadraticEquationsQuiz,
      color: 'bg-orange-500',
      icon: '⚡'
    },
    {
      id: 'arithmetic-progressions',
      name: 'Arithmetic Progressions',
      component: ArithmeticProgressionsQuiz,
      color: 'bg-indigo-500',
      icon: '📈'
    },
    {
      id: 'trigonometry',
      name: 'Trigonometry & Applications',
      component: TrigonometryQuiz,
      color: 'bg-teal-500',
      icon: '📐'
    },
    {
      id: 'probability-10',
      name: 'Probability',
      component: ProbabilityQuiz,
      color: 'bg-pink-500',
      icon: '🎲'
    },
    {
      id: 'surface-areas-volumes-10',
      name: 'Surface Areas & Volumes',
      component: SurfaceAreasVolumesQuiz,
      color: 'bg-emerald-500',
      icon: '📦'
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic);
    if (topic) {
      const TopicComponent = topic.component;
      return (
        <div className="relative">
          <div className="mb-4">
            <button
              onClick={handleBackToTopics}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Topics
            </button>
          </div>
          <TopicComponent />
        </div>
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🧮 Grade 10 Mathematics
        </h1>
        <p className="text-xl text-gray-600">
          Master advanced mathematical concepts through interactive quizzes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => handleTopicSelect(topic.id)}
          >
            <div className={`${topic.color} text-white p-6 rounded-t-xl`}>
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="text-xl font-bold">{topic.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {topic.id === 'real-numbers' && 'Explore rational and irrational numbers, HCF, LCM, and number properties!'}
                {topic.id === 'quadratic-equations' && 'Master quadratic equations, factoring, and the quadratic formula!'}
                {topic.id === 'arithmetic-progressions' && 'Learn about sequences, common differences, and sum formulas!'}
                {topic.id === 'trigonometry' && 'Discover trigonometric ratios, identities, and real-world applications!'}
                {topic.id === 'probability-10' && 'Understand probability concepts, events, and statistical calculations!'}
                {topic.id === 'surface-areas-volumes-10' && 'Calculate surface areas and volumes of 3D shapes and objects!'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Interactive Quiz</span>
                <div className="flex items-center text-blue-600">
                  <span className="text-sm font-medium">Start Learning</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎯 Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="font-semibold text-gray-800 mb-2">Real Numbers</h3>
            <p className="text-sm text-gray-600">Master number systems, HCF, LCM, and decimal representations</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Quadratic Equations</h3>
            <p className="text-sm text-gray-600">Solve quadratic equations using multiple methods and applications</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-800 mb-2">Progressions</h3>
            <p className="text-sm text-gray-600">Understand arithmetic sequences and their properties</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📐</div>
            <h3 className="font-semibold text-gray-800 mb-2">Trigonometry</h3>
            <p className="text-sm text-gray-600">Apply trigonometric ratios to solve real-world problems</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🎲</div>
            <h3 className="font-semibold text-gray-800 mb-2">Probability</h3>
            <p className="text-sm text-gray-600">Calculate probabilities and understand statistical concepts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-gray-800 mb-2">3D Geometry</h3>
            <p className="text-sm text-gray-600">Calculate surface areas and volumes of various 3D shapes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade10MathematicsTopics;
