import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Leaf, 
  Thermometer, 
  Atom, 
  Heart, 
  Flower, 
  Cloud, 
  Move,
  Trophy,
  Clock,
  Star
} from "lucide-react";
import NutritionQuizGame from "./nutrition7";
import HeatLightAcidsBasesQuiz from "./heat7";
import PhysicalChemicalChangesQuiz from "./physical7";
import RespirationTransportationQuiz from "./respiration7";
import ReproductionPlantsQuiz from "./reproduction7";
import WeatherClimateSoilQuiz from "./weather7";
import MotionTimeElectricCombinedQuiz from "./motion7";

interface Grade7ScienceTopicsProps {
  onBack: () => void;
  currentLanguage: string;
  selectedTopicId?: string;
}

const TOPICS = [
  {
    id: 'nutrition',
    name: 'Nutrition in Plants & Animals',
    description: 'Learn about photosynthesis, nutrition, and food chains',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    component: NutritionQuizGame
  },
  {
    id: 'heat-light-acids',
    name: 'Heat, Light, Acids & Bases',
    description: 'Explore heat transfer, light properties, and pH levels',
    icon: Thermometer,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    component: HeatLightAcidsBasesQuiz
  },
  {
    id: 'physical-chemical-changes',
    name: 'Physical & Chemical Changes',
    description: 'Understand the difference between physical and chemical changes',
    icon: Atom,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    component: PhysicalChemicalChangesQuiz
  },
  {
    id: 'respiration-transportation',
    name: 'Respiration & Transportation',
    description: 'Study breathing, circulation, and transport systems',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    component: RespirationTransportationQuiz
  },
  {
    id: 'reproduction-plants',
    name: 'Reproduction in Plants',
    description: 'Learn about plant reproduction and pollination',
    icon: Flower,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    component: ReproductionPlantsQuiz
  },
  {
    id: 'weather-climate-soil',
    name: 'Weather, Climate & Soil',
    description: 'Explore weather patterns, climate, and soil types',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    component: WeatherClimateSoilQuiz
  },
  {
    id: 'motion-time-current',
    name: 'Motion, Time & Electric Current',
    description: 'Study motion, time measurement, and electricity',
    icon: Move,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    component: MotionTimeElectricCombinedQuiz
  }
];

export const Grade7ScienceTopics = ({ onBack, currentLanguage, selectedTopicId }: Grade7ScienceTopicsProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(selectedTopicId || null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());


  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleTopicComplete = (topicId: string, score: number, total: number) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const translations = {
    en: {
      title: "Grade 7 Science Topics",
      subtitle: "Choose a topic to start learning",
      backToSubjects: "Back to Subjects",
      playGame: "Play Game",
      completed: "Completed",
      startLearning: "Start Learning",
      difficulty: "Difficulty",
      questions: "Questions",
      time: "Time"
    },
    hi: {
      title: "कक्षा 7 विज्ञान विषय",
      subtitle: "सीखना शुरू करने के लिए एक विषय चुनें",
      backToSubjects: "विषयों पर वापस जाएं",
      playGame: "खेल खेलें",
      completed: "पूर्ण",
      startLearning: "सीखना शुरू करें",
      difficulty: "कठिनाई",
      questions: "प्रश्न",
      time: "समय"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // If a topic is selected, show that specific quiz
  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic);
    if (topic) {
      const TopicComponent = topic.component;
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="bg-card/50 backdrop-blur-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={handleBackToTopics}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.backToSubjects}
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{topic.name}</h1>
                    <p className="text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto p-6">
            <TopicComponent />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToSubjects}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Progress Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      {completedTopics.size} of {TOPICS.length} topics completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((completedTopics.size / TOPICS.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedTopics.size / TOPICS.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic, index) => {
            const IconComponent = topic.icon;
            const isCompleted = completedTopics.has(topic.id);
            
            return (
              <Card 
                key={topic.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${topic.bgColor} ${topic.borderColor} border-2`}
                onClick={() => handleTopicSelect(topic.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${topic.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Topic {index + 1}
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-green-500 text-white text-xs">
                          {t.completed}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
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
                      <span>30 seconds per question</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      <span>8-10 questions</span>
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
                    {isCompleted ? 'Play Again' : t.startLearning}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedTopics.size === TOPICS.length && (
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                <p className="text-green-600 mb-4">
                  You have completed all Grade 7 Science topics! You're now a science expert!
                </p>
                <Button 
                  onClick={() => setCompletedTopics(new Set())}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Reset Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
