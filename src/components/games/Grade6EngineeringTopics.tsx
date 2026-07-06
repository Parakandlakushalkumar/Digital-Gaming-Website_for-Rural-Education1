import React, { useState } from 'react';
import SimpleMachinesTreasureHunt from './machines6';
import EnergySourcesGame from './energy';
import CircuitsGame from './circuits';
import EngineeringDailyLifeGame from './eng';

interface Grade6EngineeringTopicsProps {
  selectedTopicId?: string;
}

const Grade6EngineeringTopics: React.FC<Grade6EngineeringTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'simple-machines',
      name: 'Simple Machines',
      component: SimpleMachinesTreasureHunt,
      color: 'bg-blue-500',
      icon: '⚙️'
    },
    {
      id: 'energy-sources',
      name: 'Energy Sources',
      component: EnergySourcesGame,
      color: 'bg-green-500',
      icon: '⚡'
    },
    {
      id: 'basic-circuits',
      name: 'Basic Circuits',
      component: CircuitsGame,
      color: 'bg-purple-500',
      icon: '🔌'
    },
    {
      id: 'engineering-daily-life',
      name: 'Engineering in Daily Life',
      component: EngineeringDailyLifeGame,
      color: 'bg-orange-500',
      icon: '🏠'
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
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🔧 Grade 6 Engineering & Technology
        </h1>
        <p className="text-xl text-gray-600">
          Discover the amazing world of engineering and technology through interactive adventures!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {topic.id === 'simple-machines' && 'Explore the 6 simple machines through an exciting treasure hunt adventure!'}
                {topic.id === 'energy-sources' && 'Journey through different energy sources and discover how we power our world!'}
                {topic.id === 'basic-circuits' && 'Learn about electricity and circuits through magical adventures and experiments!'}
                {topic.id === 'engineering-daily-life' && 'See how engineering shapes your everyday life from homes to transportation!'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Interactive Adventure</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Simple Machines</h3>
            <p className="text-sm text-gray-600">Understand the 6 simple machines and how they make work easier</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Energy Sources</h3>
            <p className="text-sm text-gray-600">Explore renewable and non-renewable energy sources</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🔌</div>
            <h3 className="font-semibold text-gray-800 mb-2">Basic Circuits</h3>
            <p className="text-sm text-gray-600">Learn about electricity, circuits, and electrical components</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="font-semibold text-gray-800 mb-2">Engineering in Daily Life</h3>
            <p className="text-sm text-gray-600">Discover how engineering impacts our everyday experiences</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Engineering Adventures Await!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🎮 Interactive Learning</h3>
            <p className="text-sm text-gray-600">
              Each topic features engaging treasure hunts and adventures that make learning engineering concepts fun and memorable.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Real-World Connections</h3>
            <p className="text-sm text-gray-600">
              Connect engineering principles to everyday objects and experiences, helping you understand how technology shapes our world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade6EngineeringTopics;
