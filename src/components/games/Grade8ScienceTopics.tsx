import React, { useState } from 'react';
import CropProductionPuzzle from './crop8';
import MicroorganismsPuzzle from './micro8';
import MaterialsPuzzle from './materials8';
import ConservationPuzzle from './con8';
import ReproductionAdolescencePuzzle from './repro8';
import PhysicsPuzzle from './light8';
import PollutionPuzzle from './poll8';

interface Grade8ScienceTopicsProps {
  selectedTopicId?: string;
}

const Grade8ScienceTopics: React.FC<Grade8ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'crop-production',
      name: 'Crop Production',
      component: CropProductionPuzzle,
      color: 'bg-green-500',
      icon: '🌾'
    },
    {
      id: 'microorganisms',
      name: 'Microorganisms',
      component: MicroorganismsPuzzle,
      color: 'bg-purple-500',
      icon: '🦠'
    },
    {
      id: 'materials-metals',
      name: 'Materials - Metals & Non-metals',
      component: MaterialsPuzzle,
      color: 'bg-amber-500',
      icon: '🔩'
    },
    {
      id: 'conservation',
      name: 'Conservation of Plants & Animals',
      component: ConservationPuzzle,
      color: 'bg-emerald-500',
      icon: '🛡️'
    },
    {
      id: 'reproduction-adolescence',
      name: 'Reproduction & Adolescence',
      component: ReproductionAdolescencePuzzle,
      color: 'bg-pink-500',
      icon: '👥'
    },
    {
      id: 'light-sound-force',
      name: 'Light, Sound, Force & Friction',
      component: PhysicsPuzzle,
      color: 'bg-yellow-500',
      icon: '⚡'
    },
    {
      id: 'pollution',
      name: 'Pollution of Air & Water',
      component: PollutionPuzzle,
      color: 'bg-blue-500',
      icon: '🌍'
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grade 8 Science Topics
          </h1>
          <p className="text-xl text-gray-600">
            Click on any topic to start the interactive learning experience, or view all topics in parallel
          </p>
        </div>

        {/* Topic Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                <h3 className="text-lg font-semibold mb-2">{topic.name}</h3>
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
                  {TOPICS.find(t => t.id === selectedTopic)?.name} Interactive Learning
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
                        {topic.name} Interactive Learning
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

export default Grade8ScienceTopics;
