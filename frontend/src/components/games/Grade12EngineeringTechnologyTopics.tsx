import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star, CheckCircle } from 'lucide-react';

interface Grade12EngineeringTechnologyTopicsProps {
  selectedTopicId?: string;
}

const Grade12EngineeringTechnologyTopics: React.FC<Grade12EngineeringTechnologyTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const TOPICS = [
    {
      id: 'electrical-technology',
      name: 'Electrical Technology',
      description: 'Power systems, circuits, and electrical engineering principles',
      color: 'from-blue-500 to-cyan-600',
      icon: '⚡',
      htmlFile: 'ele12.html'
    },
    {
      id: 'electronics-technology',
      name: 'Electronics Technology',
      description: 'Electronic components, circuits, and digital systems',
      color: 'from-yellow-500 to-orange-600',
      icon: '🔌',
      htmlFile: 'elec12.html'
    },
    {
      id: 'engineering-graphics',
      name: 'Engineering Graphics / Drawing',
      description: 'Technical drawing, CAD, and engineering visualization',
      color: 'from-purple-500 to-pink-600',
      icon: '📐',
      htmlFile: 'eg12.html'
    },
    {
      id: 'information-technology',
      name: 'Information Technology',
      description: 'Computer systems, programming, and IT applications',
      color: 'from-green-500 to-emerald-600',
      icon: '💻',
      htmlFile: 'it12.html'
    }
  ];

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

  const getTopicById = (id: string) => TOPICS.find(topic => topic.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔧 Engineering & Technology Grade 12
          </h1>
          <p className="text-lg text-gray-600">
            Explore advanced engineering concepts and technology applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOPICS.map((topic) => {
            const isCompleted = completedTopics.has(topic.id);
            const isSelected = selectedTopic === topic.id;
            
            return (
              <Card 
                key={topic.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isSelected ? 'ring-2 ring-orange-500 shadow-lg' : ''
                } ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-5`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`text-3xl p-3 rounded-full bg-gradient-to-r ${topic.color} text-white`}>
                        {topic.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          {topic.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    
                    {isCompleted && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>30-45 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>Advanced</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleTopicSelect(topic.id)}
                      className={`bg-gradient-to-r ${topic.color} hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                        isCompleted ? 'bg-green-500 hover:bg-green-600' : ''
                      }`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Review Again' : 'Start Learning'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {completedTopics.size > 0 && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              🎉 Progress Update
            </h3>
            <p className="text-green-700">
              You've completed {completedTopics.size} out of {TOPICS.length} topics! 
              Keep up the great work in your engineering journey!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grade12EngineeringTechnologyTopics;
