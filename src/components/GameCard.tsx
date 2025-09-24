import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Clock } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  points: number;
  subject: "math" | "science" | "tech" | "engineering";
  isCompleted?: boolean;
  onPlay: () => void;
}

export const GameCard = ({
  title,
  description,
  icon,
  difficulty,
  estimatedTime,
  points,
  subject,
  isCompleted = false,
  onPlay,
}: GameCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy": return "text-success";
      case "Medium": return "text-warning";
      case "Hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 shadow-md bg-gradient-to-br from-background to-accent">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-${subject} text-${subject}-foreground shadow-md`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{estimatedTime}</span>
                <span className={getDifficultyColor()}>• {difficulty}</span>
              </div>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-success animate-bounce-in">
              <Trophy className="w-5 h-5" />
              <Star className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span>{points} points</span>
          </div>
          <Button 
            variant={subject as any} 
            size="sm" 
            onClick={onPlay}
            className="font-medium"
          >
            {isCompleted ? "Play Again" : "Start Game"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};