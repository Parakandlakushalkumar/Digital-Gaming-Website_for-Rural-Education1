import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';
import TreasureBoxGame from './Overall11Sci';

interface Grade11ScienceTopicsProps {
  selectedTopicId?: string;
}

const TOPICS = [
  {
    id: 'units-measurement',
    name: 'Units & Measurement',
    description: 'Learn about units and measurement in science.',
    color: 'from-blue-400 to-blue-600',
    icon: '📏',
    htmlFile: 'um11.html'
  },
  {
    id: 'motion',
    name: 'Motion',
    description: 'Explore the concepts of motion.',
    color: 'from-green-400 to-green-600',
    icon: '🏃',
    htmlFile: 'motion11.html'
  },
  {
    id: 'laws-of-motion',
    name: 'Laws of Motion',
    description: 'Understand Newton’s laws of motion.',
    color: 'from-red-400 to-red-600',
    icon: '⚖️',
    htmlFile: 'laws11.html'
  },
  {
    id: 'gravitation',
    name: 'Gravitation',
    description: 'Study the force of gravitation.',
    color: 'from-purple-400 to-purple-600',
    icon: '🌍',
    htmlFile: 'grav11.html'
  },
  {
    id: 'oscillations-waves',
    name: 'Oscillations & Waves',
    description: 'Learn about oscillations and waves.',
    color: 'from-cyan-400 to-cyan-600',
    icon: '🌊',
    htmlFile: 'ow11.html'
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    description: 'Explore thermodynamics concepts.',
    color: 'from-orange-400 to-orange-600',
    icon: '🔥',
    htmlFile: 'thermo11.html'
  },
  {
    id: 'organic-chemistry-basics',
    name: 'Organic Chemistry Basics',
    description: 'Introduction to organic chemistry.',
    color: 'from-yellow-400 to-yellow-600',
    icon: '🧪',
    htmlFile: 'orgchem11.html'
  },
  {
    id: 'plant-physiology',
    name: 'Plant Physiology',
    description: 'Learn about plant physiology.',
    color: 'from-lime-400 to-lime-600',
    icon: '🌱',
    htmlFile: 'plant11.html'
  },
  {
    id: 'human-physiology',
    name: 'Human Physiology',
    description: 'Explore human physiology.',
    color: 'from-pink-400 to-pink-600',
    icon: '🫀',
    htmlFile: 'human11.html'
  }
];

const Grade11ScienceTopics: React.FC<Grade11ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Grade 11 Science Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <Card
            key={topic.id}
            className={`relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              selectedTopic === topic.id ? 'ring-4 ring-yellow-500' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-20`}></div>
            <CardHeader className="relative flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 z-10">
                <span className="text-2xl">{topic.icon}</span> {topic.name}
              </CardTitle>
              {completedTopics.has(topic.id) && (
                <CheckCircle className="text-green-500 z-10" size={24} />
              )}
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{topic.description}</p>
              <Button
                onClick={() => handleTopicSelect(topic.id)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mb-2"
              >
                <Play size={20} /> Start Learning
              </Button>
              <a
                href={`/games_download/${topic.htmlFile}`}
                download={topic.htmlFile}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-center block mt-2"
              >
                Download HTML
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

}
export default Grade11ScienceTopics;
