import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star, CheckCircle } from 'lucide-react';

interface Grade12ScienceTopicsProps {
  selectedTopicId?: string;
}

const Grade12ScienceTopics: React.FC<Grade12ScienceTopicsProps> = ({ selectedTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const TOPICS = [
    {
      id: 'electric-charges',
      name: 'Electric Charges & Fields, Electrostatics',
      description: 'Electric charges, fields, electrostatics, and their applications',
      color: 'from-blue-500 to-cyan-600',
      icon: '⚡',
      htmlFile: 'efe12.html'
    },
    {
      id: 'current-electricity',
      name: 'Current Electricity, Magnetism',
      description: 'Electric current, circuits, magnetism, and electromagnetic phenomena',
      color: 'from-yellow-500 to-orange-600',
      icon: '🔌',
      htmlFile: 'cms12.html'
    },
    {
      id: 'electromagnetic-induction',
      name: 'Electromagnetic Induction, Alternating Current',
      description: 'Electromagnetic induction, AC circuits, and electromagnetic waves',
      color: 'from-purple-500 to-pink-600',
      icon: '🌀',
      htmlFile: 'eae12.html'
    },
    {
      id: 'optics',
      name: 'Optics, Wave Optics',
      description: 'Light, reflection, refraction, wave optics, and optical instruments',
      color: 'from-green-500 to-emerald-600',
      icon: '👁️',
      htmlFile: 'ows12.html'
    },
    {
      id: 'atoms-nuclei',
      name: 'Atoms & Nuclei',
      description: 'Atomic structure, nuclear physics, radioactivity, and nuclear reactions',
      color: 'from-red-500 to-rose-600',
      icon: '⚛️',
      htmlFile: 'ans12.html'
    },
    {
      id: 'semiconductors',
      name: 'Semiconductors & Communication',
      description: 'Semiconductor devices, communication systems, and modern electronics',
      color: 'from-gray-500 to-slate-600',
      icon: '📡',
      htmlFile: 'scs12.html'
    },
    {
      id: 'solid-state',
      name: 'Solid State, Solutions, Chemical Kinetics',
      description: 'Solid state chemistry, solutions, and chemical reaction rates',
      color: 'from-teal-500 to-cyan-600',
      icon: '🧪',
      htmlFile: 'sscs12.html'
    },
    {
      id: 'reproduction-genetics',
      name: 'Reproduction, Genetics, Evolution',
      description: 'Biological reproduction, genetics, inheritance, and evolution',
      color: 'from-indigo-500 to-blue-600',
      icon: '🧬',
      htmlFile: 'rges12.html'
    },
    {
      id: 'ecology-biotechnology',
      name: 'Ecology, Biotechnology, Human Health',
      description: 'Ecosystems, biotechnology applications, and human health sciences',
      color: 'from-emerald-500 to-green-600',
      icon: '🌱',
      htmlFile: 'ebh12.html'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
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
                  Click the button below to open the interactive treasure hunt for {topic.name}.
                </p>
                <Button 
                  size="lg"
                  className={`bg-gradient-to-r ${topic.color} hover:opacity-90 text-white`}
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Interactive Treasure Hunt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grade 12 Science Topics
          </h1>
          <p className="text-lg text-gray-600">
            Advanced science concepts for Grade 12 students. Click on any topic to start learning with interactive treasure hunt games.
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
                      <span>Interactive treasure hunt format</span>
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
                  You've completed all Grade 12 Science topics! Keep up the excellent work!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grade12ScienceTopics;
