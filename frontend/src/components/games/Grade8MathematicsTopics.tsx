import React, { useState } from 'react';
import ExponentsPowersQuiz from './expo8';
import AlgebraLinearEquationsQuiz from './alg8';
import QuadrilateralsPolygonsQuiz from './qua8';
import PracticalGeometryQuiz from './pra8';
import MensurationQuiz from './men8';
import ProbabilityQuiz from './pro8';

interface Grade8MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade8MathematicsTopics: React.FC<Grade8MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'exponents-powers',
      name: 'Exponents & Powers',
      component: ExponentsPowersQuiz,
      color: 'bg-blue-500',
      icon: '📊'
    },
    {
      id: 'linear-equations-one',
      name: 'Algebra - Linear Equations',
      component: AlgebraLinearEquationsQuiz,
      color: 'bg-purple-500',
      icon: '🔢'
    },
    {
      id: 'quadrilaterals-polygons',
      name: 'Quadrilaterals & Polygons',
      component: QuadrilateralsPolygonsQuiz,
      color: 'bg-green-500',
      icon: '📐'
    },
    {
      id: 'practical-geometry',
      name: 'Practical Geometry',
      component: PracticalGeometryQuiz,
      color: 'bg-indigo-500',
      icon: '📏'
    },
    {
      id: 'mensuration-advanced',
      name: 'Mensuration - Surface Area & Volume',
      component: MensurationQuiz,
      color: 'bg-orange-500',
      icon: '📦'
    },
    {
      id: 'probability-basics',
      name: 'Probability Basics',
      component: ProbabilityQuiz,
      color: 'bg-pink-500',
      icon: '🎲'
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grade 8 Mathematics Topics
          </h1>
          <p className="text-xl text-gray-600">
            Click on any topic to start the quiz, or view all topics in parallel
          </p>
        </div>

        {/* Topic Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                selectedTopic === topic.id
                  ? `${topic.color} text-white shadow-xl scale-105`
                  : 'bg-white text-gray-700 hover:shadow-xl'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{topic.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                <p className="text-sm opacity-80">
                  {selectedTopic === topic.id ? 'Selected - Click to deselect' : 'Click to select'}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Quiz Display Area */}
        <div className="space-y-8">
          {selectedTopic ? (
            // Single selected topic
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {TOPICS.find(t => t.id === selectedTopic)?.name} Quiz
                </h2>
              </div>
              {(() => {
                const topic = TOPICS.find(t => t.id === selectedTopic);
                const QuizComponent = topic?.component;
                return QuizComponent ? <QuizComponent /> : null;
              })()}
            </div>
          ) : (
            // All topics in parallel
            <div className="space-y-8">
              {TOPICS.map((topic) => {
                const QuizComponent = topic.component;
                return (
                  <div key={topic.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">{topic.icon}</span>
                        {topic.name} Quiz
                      </h2>
                    </div>
                    <QuizComponent />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grade8MathematicsTopics;
