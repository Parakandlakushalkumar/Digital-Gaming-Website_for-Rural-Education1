import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';

interface Grade11MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade11MathematicsTopics: React.FC<Grade11MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const TOPICS = [
    {
      id: 'sets-relations-functions',
      name: 'Sets, Relations & Functions',
      description: 'Explore sets, relations, and various types of functions.',
      color: 'from-blue-500 to-cyan-600',
      icon: '📊',
      htmlFile: 'sets11.html'
    },
    {
      id: 'complex-numbers',
      name: 'Complex Numbers',
      description: 'Master complex numbers, their properties, and operations.',
      color: 'from-purple-500 to-pink-600',
      icon: '🔢',
      htmlFile: 'com11.html'
    },
    {
      id: 'sequences-series',
      name: 'Sequences & Series',
      description: 'Understand arithmetic and geometric progressions.',
      color: 'from-green-500 to-teal-600',
      icon: '📈',
      htmlFile: 'ss11.html'
    },
    {
      id: 'binomial-theorem',
      name: 'Binomial Theorem',
      description: 'Learn about binomial expansion and its applications.',
      color: 'from-orange-500 to-red-600',
      icon: '🧮',
      htmlFile: 'bt11.html'
    },
    {
      id: 'straight-lines-conics',
      name: 'Straight Lines & Conic Sections',
      description: 'Study straight lines, circles, parabolas, and ellipses.',
      color: 'from-indigo-500 to-purple-600',
      icon: '📐',
      htmlFile: 'sc11.html'
    },
    {
      id: 'probability-statistics-11',
      name: 'Probability & Statistics',
      description: 'Delve into probability theory and statistical analysis.',
      color: 'from-pink-500 to-rose-600',
      icon: '🎲',
      htmlFile: 'ps11.html'
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  return (
    <div className="p-4">
      {selectedTopic === 'sets-relations-functions' ? (
        <SetsRelationsFunctionsGames />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Grade 11 Mathematics Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <Card
                key={topic.id}
                className={`relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedTopic === topic.id ? 'ring-4 ring-blue-500' : ''
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mb-2"
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
        </>
      )}
    </div>
  );
};

import SetsRelationsFunctionsGames from './sets11';
export default Grade11MathematicsTopics;
