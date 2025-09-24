import React, { useState } from 'react';
import { Download } from 'lucide-react';
import MatterPuzzleGame from './matter9';
import CellStructurePuzzle from './cell9';
import MotionForcePuzzle from './motion9';
import GravitationEnergyPuzzle from './gra9';
import SoundWavePuzzle from './sou9';
import NaturalResourcesPuzzle from './nat9';
import FoodResourcesPuzzle from './fr9';

interface Grade9ScienceTopicsProps {
  selectedTopicId?: string;
}

const Grade9ScienceTopics: React.FC<Grade9ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);

  const TOPICS = [
    {
      id: 'matter',
      name: 'Matter (Atoms, Molecules, States)',
      component: MatterPuzzleGame,
      color: 'bg-violet-500',
      icon: '⚛️',
      downloadFile: 'matter9.html'
    },
    {
      id: 'cell-structure',
      name: 'Cell Structure & Tissues',
      component: CellStructurePuzzle,
      color: 'bg-green-500',
      icon: '🧬',
      downloadFile: 'cell9.html'
    },
    {
      id: 'motion-force-laws',
      name: 'Motion, Force, Laws of Motion',
      component: MotionForcePuzzle,
      color: 'bg-blue-500',
      icon: '⚡',
      downloadFile: 'motion9.html'
    },
    {
      id: 'gravitation-work-energy',
      name: 'Gravitation, Work, Energy',
      component: GravitationEnergyPuzzle,
      color: 'bg-purple-500',
      icon: '🌌',
      downloadFile: 'gra9.html'
    },
    {
      id: 'sound',
      name: 'Sound',
      component: SoundWavePuzzle,
      color: 'bg-cyan-500',
      icon: '🔊',
      downloadFile: 'sou9.html'
    },
    {
      id: 'natural-resources',
      name: 'Natural Resources',
      component: NaturalResourcesPuzzle,
      color: 'bg-emerald-500',
      icon: '🌍',
      downloadFile: 'nat9.html'
    },
    {
      id: 'food-resources',
      name: 'Improvement in Food Resources',
      component: FoodResourcesPuzzle,
      color: 'bg-yellow-500',
      icon: '🌾',
      downloadFile: 'fr9.html'
    }
  ];

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const handleDownload = (fileName: string) => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = `/games_download/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };

  // If a specific topic is selected, show only that topic
  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic);
    if (topic) {
      const TopicComponent = topic.component;
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <button
                onClick={handleBackToTopics}
                className="flex items-center gap-2 text-white hover:text-green-300 transition-colors mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Topics
              </button>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${topic.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {topic.icon}
                  </div>
                  <h1 className="text-3xl font-bold text-white">{topic.name}</h1>
                </div>
                <button
                  onClick={() => handleDownload(topic.downloadFile)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
                  title={`Download ${topic.name} Game`}
                >
                  <Download className="w-4 h-4" />
                  Download Game
                </button>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Grade 9 Science</h1>
          <p className="text-xl text-green-200">Explore all science topics in parallel</p>
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
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleTopicClick(topic.id)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  >
                    Focus on {topic.name}
                  </button>
                  <button
                    onClick={() => handleDownload(topic.downloadFile)}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
                    title={`Download ${topic.name} Game`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grade9ScienceTopics;
