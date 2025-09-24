import React, { useState } from 'react';
import RoboticsTreasureHunt from './robo9';
import SustainableEnergyHunt from './sus9';
import RoadTransportHunt from './tra9';
import DesignThinkingHunt from './des9';

interface Grade9EngineeringTopicsProps {
  selectedTopicId?: string;
}

const Grade9EngineeringTopics: React.FC<Grade9EngineeringTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'robotics-basics',
      name: 'Robotics Basics',
      component: RoboticsTreasureHunt,
      color: 'bg-blue-500',
      icon: '🤖'
    },
    {
      id: 'sustainable-energy',
      name: 'Sustainable Energy',
      component: SustainableEnergyHunt,
      color: 'bg-green-500',
      icon: '🌱'
    },
    {
      id: 'transport-systems',
      name: 'Transport Systems',
      component: RoadTransportHunt,
      color: 'bg-orange-500',
      icon: '🚗'
    },
    {
      id: 'design-thinking',
      name: 'Design Thinking',
      component: DesignThinkingHunt,
      color: 'bg-purple-500',
      icon: '💡'
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
          🔧 Grade 9 Engineering & Technology
        </h1>
        <p className="text-xl text-gray-600">
          Explore advanced engineering concepts through interactive treasure hunts!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {topic.id === 'robotics-basics' && 'Discover the world of robots, AI, and automation through an exciting treasure hunt!'}
                {topic.id === 'sustainable-energy' && 'Explore renewable energy sources and green technology solutions!'}
                {topic.id === 'transport-systems' && 'Learn about modern transportation systems and smart mobility!'}
                {topic.id === 'design-thinking' && 'Master the design thinking process for innovative problem-solving!'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Interactive Hunt</span>
                <div className="flex items-center text-orange-600">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-800 mb-2">Robotics</h3>
            <p className="text-sm text-gray-600">Understand robot components, programming, and AI integration</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-sm text-gray-600">Explore renewable energy and environmental engineering</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold text-gray-800 mb-2">Transportation</h3>
            <p className="text-sm text-gray-600">Learn about smart transport systems and mobility solutions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Design Process</h3>
            <p className="text-sm text-gray-600">Master human-centered design thinking methodologies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade9EngineeringTopics;
