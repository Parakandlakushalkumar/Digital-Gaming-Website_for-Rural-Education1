import React, { useState } from 'react';
import TreasureHuntGame from './intro8';
import MaterialsStructuresTreasureHunt from './mat8';
import MechanicsTreasureHunt from './mech8';
import EnergyElectricityTreasureHunt from './en8';
import ElectronicsSensorsTreasureHunt from './el8';

interface Grade8EngineeringTopicsProps {
  selectedTopicId?: string;
}

const Grade8EngineeringTopics: React.FC<Grade8EngineeringTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'introduction-engineering-design',
      name: 'Introduction to Engineering & Design',
      component: TreasureHuntGame,
      color: 'bg-purple-500',
      icon: '🔍'
    },
    {
      id: 'materials-structures',
      name: 'Materials & Structures',
      component: MaterialsStructuresTreasureHunt,
      color: 'bg-orange-500',
      icon: '🏗️'
    },
    {
      id: 'mechanics-forces-motion',
      name: 'Mechanics (Forces & Motion)',
      component: MechanicsTreasureHunt,
      color: 'bg-blue-500',
      icon: '⚡'
    },
    {
      id: 'energy-electricity',
      name: 'Energy and Electricity',
      component: EnergyElectricityTreasureHunt,
      color: 'bg-yellow-500',
      icon: '🔋'
    },
    {
      id: 'electronics-sensors',
      name: 'Electronics & Sensors',
      component: ElectronicsSensorsTreasureHunt,
      color: 'bg-indigo-500',
      icon: '⚡'
    }
  ];

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  // If a specific topic is selected, show only that topic
  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic);
    if (topic) {
      const TopicComponent = topic.component;
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <button
                onClick={handleBackToTopics}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Topics
              </button>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${topic.color} rounded-full flex items-center justify-center text-white text-xl`}>
                  {topic.icon}
                </div>
                <h1 className="text-3xl font-bold text-white">{topic.name}</h1>
              </div>
            </div>
            <TopicComponent />
          </div>
        </div>
      );
    }
  }

  // Show all topics in parallel
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Grade 8 Engineering & Technology</h1>
          <p className="text-xl text-blue-200">Explore all engineering topics in parallel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {TOPICS.map((topic) => {
            const TopicComponent = topic.component;
            return (
              <div key={topic.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${topic.color} rounded-full flex items-center justify-center text-white text-lg`}>
                    {topic.icon}
                  </div>
                  <h2 className="text-xl font-bold text-white">{topic.name}</h2>
                </div>
                <div className="h-96 overflow-hidden rounded-lg">
                  <TopicComponent />
                </div>
                <button
                  onClick={() => handleTopicClick(topic.id)}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Focus on {topic.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grade8EngineeringTopics;
