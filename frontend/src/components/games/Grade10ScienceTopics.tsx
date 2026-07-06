import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, CheckCircle } from "lucide-react";

interface Grade10ScienceTopicsProps {
  selectedTopicId?: string;
}

const TOPICS = [
  {
    id: 'chemical-reactions',
    name: 'Chemical Reactions',
    color: 'bg-red-500',
    icon: '🧪',
    description: 'Explore different types of chemical reactions and their characteristics.',
    htmlFile: 'che10.html'
  },
  {
    id: 'acids-bases-salts',
    name: 'Acids, Bases, Salts',
    color: 'bg-yellow-500',
    icon: '⚗️',
    description: 'Learn about the properties and behavior of acids, bases, and salts.',
    htmlFile: 'abs10.html'
  },
  {
    id: 'metals-non-metals',
    name: 'Metals & Non-Metals',
    color: 'bg-gray-500',
    icon: '⚡',
    description: 'Study the properties and characteristics of metals and non-metals.',
    htmlFile: 'mn10.html'
  },
  {
    id: 'carbon-compounds',
    name: 'Carbon Compounds',
    color: 'bg-green-500',
    icon: '🌿',
    description: 'Discover the fascinating world of carbon-based compounds and organic chemistry.',
    htmlFile: 'car10.html'
  },
  {
    id: 'life-processes',
    name: 'Life Processes',
    color: 'bg-blue-500',
    icon: '🫀',
    description: 'Understand the essential processes that keep living organisms alive.',
    htmlFile: 'lp10.html'
  },
  {
    id: 'control-coordination',
    name: 'Control & Coordination',
    color: 'bg-purple-500',
    icon: '🧠',
    description: 'Learn about the nervous system, hormones, and how organisms coordinate their activities.',
    htmlFile: 'cc10.html'
  },
  {
    id: 'heredity-evolution',
    name: 'Heredity & Evolution',
    color: 'bg-pink-500',
    icon: '🧬',
    description: 'Explore how traits are inherited and how species evolve over time.',
    htmlFile: 'lov10.html'
  },
  {
    id: 'light-reflection',
    name: 'Light',
    color: 'bg-yellow-400',
    icon: '💡',
    description: 'Study light, reflection, refraction, and the human eye.',
    htmlFile: 'her10.html'
  },
  {
    id: 'electricity-magnetism',
    name: 'Electricity & Magnetism',
    color: 'bg-indigo-500',
    icon: '⚡',
    description: 'Understand the principles of electricity and magnetism.',
    htmlFile: 'em10.html'
  },
  {
    id: 'environment-sustainability',
    name: 'Environment & Sustainability',
    color: 'bg-emerald-500',
    icon: '🌍',
    description: 'Learn about environmental issues and sustainable practices.',
    htmlFile: 'es10.html'
  }
];

const Grade10ScienceTopics: React.FC<Grade10ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const handleTopicSelect = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (topic) {
      // Open the HTML file in a new tab
      const htmlPath = `/games_download/${topic.htmlFile}`;
      window.open(htmlPath, '_blank');

      // Mark topic as completed after opening
      setCompletedTopics(prev => new Set([...prev, topicId]));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Grade 10 Science Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <Card
            key={topic.id}
            className={`relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              selectedTopicId === topic.id ? 'ring-4 ring-blue-500' : ''
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Play size={20} /> Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Grade10ScienceTopics;
