import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Brain, 
  Play 
} from "lucide-react";
import { Subject, Topic } from "@/data/syllabus";

interface GameSelectionProps {
  subject: Subject;
  topic: Topic;
  onGameSelect: (gameId: string) => void;
  onBack: () => void;
  currentLanguage: string;
}

const GAMES = [
  {
    id: "topic-quiz",
    name: "Topic Quiz",
    nameHi: "टॉपिक क्विज़",
    description: "MCQ quiz based on this topic",
    descriptionHi: "इस विषय पर आधारित MCQ प्रश्नोत्तरी",
    icon: Brain,
    color: "from-primary to-blue-500",
    difficulty: "Easy to Medium",
    difficultyHi: "आसान से मध्यम"
  },
  {
    id: "math-quiz",
    name: "Adventure Quiz",
    nameHi: "साहसिक क्विज़",
    description: "Story-based puzzles and challenges",
    descriptionHi: "कहानी आधारित पहेलियां और चुनौतियां",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    difficulty: "Easy to Medium",
    difficultyHi: "आसान से मध्यम"
  }
];

// Expose how many games this topic offers; currently we show two card options per topic.
export const getNumGamesForTopic = () => GAMES.length;

export const GameSelection = ({ 
  subject, 
  topic, 
  onGameSelect, 
  onBack, 
  currentLanguage 
}: GameSelectionProps) => {
  const translations = {
    en: {
      title: "Choose Your Game",
      subtitle: `${subject.name} • ${topic.name}`,
      back: "Back to Topics",
      playGame: "Play Game",
      difficulty: "Difficulty"
    },
    hi: {
      title: "अपना गेम चुनें",
      subtitle: `${subject.name} • ${topic.name}`,
      back: "विषयों पर वापस जाएं",
      playGame: "गेम खेलें",
      difficulty: "कठिनाई"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => {
            const IconComponent = game.icon;
            
            return (
              <Card 
                key={game.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm"
                onClick={() => onGameSelect(game.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${game.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {subject.id === 'science' && topic.id === 'matter' && game.id === 'math-quiz'
                      ? (currentLanguage === 'hi' ? 'रसायन मिलान' : 'Chemistry Match')
                      : subject.id === 'science' && topic.id === 'food' && game.id === 'math-quiz'
                      ? (currentLanguage === 'hi' ? 'भोजन समूह छँटाई' : 'Food Group Sorting')
                      : (currentLanguage === 'hi' ? game.nameHi : game.name)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {subject.id === 'science' && topic.id === 'matter' && game.id === 'math-quiz'
                      ? (currentLanguage === 'hi' ? 'तत्व-प्रतीक मिलान खेल' : 'Element-symbol matching game')
                      : subject.id === 'science' && topic.id === 'food' && game.id === 'math-quiz'
                      ? (currentLanguage === 'hi' ? 'भोजन को सही समूहों में छाँटें' : 'Sort foods into correct groups')
                      : (currentLanguage === 'hi' ? game.descriptionHi : game.description)}
                  </p>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Badge variant="secondary" className="text-xs">
                    {t.difficulty}: {currentLanguage === 'hi' ? game.difficultyHi : game.difficulty}
                  </Badge>
                  <Button className="w-full group-hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 mr-2" />
                    {t.playGame}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};