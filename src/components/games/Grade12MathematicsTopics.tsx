import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star, CheckCircle } from 'lucide-react';

interface Grade12MathematicsTopicsProps {
  selectedTopicId?: string;
}

const Grade12MathematicsTopics: React.FC<Grade12MathematicsTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const TOPICS = [
    {
      id: 'relations-functions-12',
      name: 'Relations & Functions',
      description: 'Functions, domain, range, composition, inverse functions',
      color: 'from-purple-500 to-indigo-600',
      icon: '🔗',
      htmlFile: 'rel12.html'
    },
    {
      id: 'inverse-trigonometry',
      name: 'Inverse Trigonometry',
      description: 'Inverse trigonometric functions, domains, ranges, principal values',
      color: 'from-red-500 to-pink-600',
      icon: '📐',
      htmlFile: 'inv12.html'
    },
    {
      id: 'calculus',
      name: 'Calculus',
      description: 'Limits, derivatives, integrals, and their applications',
      color: 'from-teal-500 to-cyan-600',
      icon: '📊',
      htmlFile: 'cal12.html'
    },
    {
      id: 'vectors-3d',
      name: 'Vectors & 3D Geometry',
      description: 'Vector operations, 3D geometry, planes, lines in space',
      color: 'from-purple-600 to-blue-600',
      icon: '🎯',
      htmlFile: 'vec12.html'
    },
    {
      id: 'probability-statistics-12',
      name: 'Probability & Statistics',
      description: 'Advanced probability, statistical distributions, hypothesis testing',
      color: 'from-orange-500 to-red-600',
      icon: '🎲',
      htmlFile: 'ps12.html'
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

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={handleBackToTopics}
              className="mb-4"
            >
              ← Back to Topics
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {topic.name}
            </h1>
            <p className="text-gray-600">
              {topic.description}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-4xl">{topic.icon}</span>
                Interactive Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Start Learning?</h3>
                <p className="text-gray-600 mb-6">
                  Click the button below to open the interactive quiz for {topic.name}.
                </p>
                <Button 
                  size="lg"
                  className={`bg-gradient-to-r ${topic.color} hover:opacity-90 text-white`}
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Interactive Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grade 12 Mathematics Topics
          </h1>
          <p className="text-lg text-gray-600">
            Advanced mathematics concepts for Grade 12 students. Click on any topic to start learning with interactive quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic, index) => {
            const isCompleted = completedTopics.has(topic.id);
            
            return (
              <Card 
                key={topic.id}
                className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  isCompleted ? 'ring-2 ring-green-400' : ''
                }`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${topic.color} text-white`}>
                      <span className="text-2xl">{topic.icon}</span>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </div>
                  
                  <CardTitle className="text-xl font-bold mb-2">
                    {topic.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {topic.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Interactive quiz format</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      <span>Advanced difficulty level</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full group-hover:scale-105 transition-transform bg-gradient-to-r ${topic.color} hover:opacity-90`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTopicSelect(topic.id);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Play Again' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedTopics.size === TOPICS.length && (
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="text-center py-8">
                <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                <p className="text-lg">
                  You've completed all Grade 12 Mathematics topics! Keep up the excellent work!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grade12MathematicsTopics;
