import React, { useState } from 'react';
import FoodSourceDetective from './food6';
import MaterialPropertyMatch from './materials6';
import HabitatHeroes from './livingthings6';
import MotionMeasurementGame from './motion6';
import LightElectricityPuzzle from './light6';
import WaterCycleRecyclingGame from './water6';

interface Grade6ScienceTopicsProps {
  selectedTopicId?: string;
}

const Grade6ScienceTopics: React.FC<Grade6ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'food',
      name: 'Food',
      component: FoodSourceDetective,
      color: 'bg-green-500',
      icon: '🍎'
    },
    {
      id: 'materials',
      name: 'Materials',
      component: MaterialPropertyMatch,
      color: 'bg-blue-500',
      icon: '🔬'
    },
    {
      id: 'living-things',
      name: 'Living Things',
      component: HabitatHeroes,
      color: 'bg-emerald-500',
      icon: '🦸‍♂️'
    },
    {
      id: 'motion-measurement',
      name: 'Motion & Measurement',
      component: MotionMeasurementGame,
      color: 'bg-purple-500',
      icon: '🚀'
    },
    {
      id: 'light-shadows-electricity',
      name: 'Light, Shadows, Electricity',
      component: LightElectricityPuzzle,
      color: 'bg-yellow-500',
      icon: '⚡'
    },
    {
      id: 'water-air-waste',
      name: 'Water, Air, Garbage & Waste',
      component: WaterCycleRecyclingGame,
      color: 'bg-cyan-500',
      icon: '🌍'
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
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🔬 Grade 6 Science
        </h1>
        <p className="text-xl text-gray-600">
          Explore the fascinating world of science through interactive games and activities!
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
                {topic.id === 'food' && 'Discover where our food comes from and learn about plant and animal sources!'}
                {topic.id === 'materials' && 'Explore different materials and their properties through interactive matching!'}
                {topic.id === 'living-things' && 'Help animals find their perfect habitats and learn about living things!'}
                {topic.id === 'motion-measurement' && 'Master forces, motion, and measurement tools in this exciting challenge!'}
                {topic.id === 'light-shadows-electricity' && 'Build circuits, understand light, and explore electricity concepts!'}
                {topic.id === 'water-air-waste' && 'Learn about water cycles, recycling, and keeping our environment clean!'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Interactive Game</span>
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
            <div className="text-3xl mb-3">🍎</div>
            <h3 className="font-semibold text-gray-800 mb-2">Food Sources</h3>
            <p className="text-sm text-gray-600">Understand where food comes from and identify plant vs animal sources</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="font-semibold text-gray-800 mb-2">Material Properties</h3>
            <p className="text-sm text-gray-600">Learn about different materials and their unique characteristics</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🦸‍♂️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Living Things</h3>
            <p className="text-sm text-gray-600">Explore habitats and understand how animals adapt to their environments</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800 mb-2">Motion & Forces</h3>
            <p className="text-sm text-gray-600">Discover how things move and learn to measure motion accurately</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Light & Electricity</h3>
            <p className="text-sm text-gray-600">Build circuits and understand how light and electricity work</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-gray-800 mb-2">Environment</h3>
            <p className="text-sm text-gray-600">Learn about water cycles, recycling, and protecting our planet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade6ScienceTopics;
