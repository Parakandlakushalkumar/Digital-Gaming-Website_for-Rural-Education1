import React, { useState } from 'react';
import NumbersOperationsQuiz from './numbers6';
import FactorsMultiplesQuiz from './factors6';
import RatioProportionQuiz from './ratio6';
import GeometryBasicsQuiz from './geometry6';
import MensurationQuiz from './mensuration6';
import DataHandlingQuiz from './datahandling6';

interface Grade6MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade6MathematicsTopics: React.FC<Grade6MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'numbers-operations',
      name: 'Numbers & Operations',
      component: NumbersOperationsQuiz,
      color: 'bg-blue-500',
      icon: '🔢',
      description: 'Fractions, Decimals, Integers'
    },
    {
      id: 'factors-multiples',
      name: 'Factors & Multiples',
      component: FactorsMultiplesQuiz,
      color: 'bg-green-500',
      icon: '🔢',
      description: 'LCM, GCD, Prime Factors'
    },
    {
      id: 'ratio-proportion',
      name: 'Ratio & Proportion',
      component: RatioProportionQuiz,
      color: 'bg-purple-500',
      icon: '⚖️',
      description: 'Ratios, Proportions, Applications'
    },
    {
      id: 'geometry-basics',
      name: 'Geometry Basics',
      component: GeometryBasicsQuiz,
      color: 'bg-red-500',
      icon: '📐',
      description: 'Lines, Angles, Shapes'
    },
    {
      id: 'mensuration',
      name: 'Mensuration',
      component: MensurationQuiz,
      color: 'bg-yellow-500',
      icon: '📏',
      description: 'Area, Perimeter, Volume'
    },
    {
      id: 'data-handling',
      name: 'Data Handling',
      component: DataHandlingQuiz,
      color: 'bg-indigo-500',
      icon: '📊',
      description: 'Charts, Graphs, Statistics'
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
          🧮 Grade 6 Mathematics
        </h1>
        <p className="text-xl text-gray-600">
          Master fundamental mathematical concepts through interactive quizzes and challenges!
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
              <p className="text-sm opacity-90 mt-1">{topic.description}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {topic.id === 'numbers-operations' && 'Master fractions, decimals, and integers with interactive problem-solving!'}
                {topic.id === 'factors-multiples' && 'Explore LCM, GCD, and prime factors through engaging challenges!'}
                {topic.id === 'ratio-proportion' && 'Learn ratios and proportions with real-world applications!'}
                {topic.id === 'geometry-basics' && 'Discover lines, angles, and shapes through visual learning!'}
                {topic.id === 'mensuration' && 'Calculate areas, perimeters, and volumes with practical examples!'}
                {topic.id === 'data-handling' && 'Analyze data using charts, graphs, and statistical measures!'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Interactive Quiz</span>
                <div className="flex items-center text-green-600">
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
            <h3 className="font-semibold text-gray-800 mb-2">Numbers & Operations</h3>
            <p className="text-sm text-gray-600">Master fractions, decimals, and integer operations</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="font-semibold text-gray-800 mb-2">Factors & Multiples</h3>
            <p className="text-sm text-gray-600">Understand LCM, GCD, and prime factorization</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Ratio & Proportion</h3>
            <p className="text-sm text-gray-600">Solve problems using ratios and proportions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📐</div>
            <h3 className="font-semibold text-gray-800 mb-2">Geometry Basics</h3>
            <p className="text-sm text-gray-600">Explore lines, angles, and basic shapes</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📏</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mensuration</h3>
            <p className="text-sm text-gray-600">Calculate areas, perimeters, and volumes</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Data Handling</h3>
            <p className="text-sm text-gray-600">Interpret charts, graphs, and statistics</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Mathematical Adventures Await!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🎮 Interactive Learning</h3>
            <p className="text-sm text-gray-600">
              Each topic features engaging quizzes with immediate feedback, explanations, and progress tracking to make learning mathematics fun and effective.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🧠 Problem-Solving Skills</h3>
            <p className="text-sm text-gray-600">
              Develop critical thinking and problem-solving abilities through step-by-step solutions and real-world applications of mathematical concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade6MathematicsTopics;
