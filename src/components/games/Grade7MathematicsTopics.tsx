import React, { useState } from 'react';
import IntegersRationalQuiz from './integers7';
import AlgebraicExpressionsQuiz from './algebra7';
import SimpleEquationsQuiz from './equations7';
import GeometryQuiz from './geometry7';
import MeasurementsQuiz from './perimeter7';
import StatisticsQuiz from './statistics7';

interface Grade7MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade7MathematicsTopics: React.FC<Grade7MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'integers-rational',
      name: 'Integers, Rational Numbers',
      component: IntegersRationalQuiz,
      color: 'bg-indigo-500',
      icon: '🔢',
      description: 'Integers, Rational Numbers, Operations'
    },
    {
      id: 'algebraic-expressions',
      name: 'Algebraic Expressions',
      component: AlgebraicExpressionsQuiz,
      color: 'bg-purple-500',
      icon: '📝',
      description: 'Variables, Coefficients, Simplification'
    },
    {
      id: 'simple-equations',
      name: 'Simple Equations',
      component: SimpleEquationsQuiz,
      color: 'bg-cyan-500',
      icon: '⚖️',
      description: 'Solving Linear Equations'
    },
    {
      id: 'geometry-triangles',
      name: 'Geometry',
      component: GeometryQuiz,
      color: 'bg-violet-500',
      icon: '📐',
      description: 'Triangles, Congruence'
    },
    {
      id: 'perimeter-area-volume',
      name: 'Perimeter, Area, Surface Area, Volume',
      component: MeasurementsQuiz,
      color: 'bg-amber-500',
      icon: '📏',
      description: 'Advanced Measurements'
    },
    {
      id: 'statistics-basic',
      name: 'Statistics',
      component: StatisticsQuiz,
      color: 'bg-teal-500',
      icon: '📊',
      description: 'Mean, Median, Mode'
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
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🧮 Grade 7 Mathematics
        </h1>
        <p className="text-xl text-gray-600">
          Advance your mathematical skills with algebra, geometry, and statistics through interactive challenges!
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
                {topic.id === 'integers-rational' && 'Master integers and rational numbers with advanced operations and problem-solving!'}
                {topic.id === 'algebraic-expressions' && 'Explore variables, coefficients, and algebraic simplification techniques!'}
                {topic.id === 'simple-equations' && 'Solve linear equations step-by-step with interactive problem-solving!'}
                {topic.id === 'geometry-triangles' && 'Discover triangle properties, congruence, and geometric relationships!'}
                {topic.id === 'perimeter-area-volume' && 'Calculate advanced measurements including surface area and volume!'}
                {topic.id === 'statistics-basic' && 'Analyze data using mean, median, mode, and statistical measures!'}
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
            <h3 className="font-semibold text-gray-800 mb-2">Integers & Rational Numbers</h3>
            <p className="text-sm text-gray-600">Master advanced number operations and properties</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Algebraic Expressions</h3>
            <p className="text-sm text-gray-600">Work with variables, coefficients, and simplification</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Simple Equations</h3>
            <p className="text-sm text-gray-600">Solve linear equations and word problems</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📐</div>
            <h3 className="font-semibold text-gray-800 mb-2">Geometry</h3>
            <p className="text-sm text-gray-600">Explore triangles, congruence, and geometric proofs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📏</div>
            <h3 className="font-semibold text-gray-800 mb-2">Advanced Measurements</h3>
            <p className="text-sm text-gray-600">Calculate perimeter, area, surface area, and volume</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Statistics</h3>
            <p className="text-sm text-gray-600">Analyze data using measures of central tendency</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Advanced Mathematical Challenges!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🎮 Interactive Problem Solving</h3>
            <p className="text-sm text-gray-600">
              Each topic features challenging quizzes with step-by-step solutions, immediate feedback, and progress tracking to build advanced mathematical skills.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🧠 Critical Thinking Development</h3>
            <p className="text-sm text-gray-600">
              Develop advanced problem-solving abilities through algebraic thinking, geometric reasoning, and statistical analysis with real-world applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade7MathematicsTopics;
