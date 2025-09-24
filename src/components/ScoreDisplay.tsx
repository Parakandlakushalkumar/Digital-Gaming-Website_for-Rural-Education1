import { Star, Trophy, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ScoreDisplayProps {
  points: number;
  level: number;
  streak: number;
  className?: string;
}

export const ScoreDisplay = ({ points, level, streak, className }: ScoreDisplayProps) => {
  return (
    <Card className={`bg-gradient-primary text-white border-0 shadow-lg ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-warning text-warning" />
            <div>
              <p className="text-sm opacity-90">Points</p>
              <p className="text-xl font-bold">{points.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 fill-warning text-warning" />
            <div>
              <p className="text-sm opacity-90">Level</p>
              <p className="text-xl font-bold">{level}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 fill-warning text-warning" />
            <div>
              <p className="text-sm opacity-90">Streak</p>
              <p className="text-xl font-bold">{streak}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};