import { cn } from "@/lib/utils";
import { Star, Trophy, Target, Zap, Award, Crown } from "lucide-react";

interface BadgeProps {
  type: "star" | "trophy" | "target" | "zap" | "award" | "crown";
  variant?: "earned" | "locked";
  size?: "sm" | "md" | "lg";
  title: string;
  description?: string;
  className?: string;
}

export const Badge = ({ 
  type, 
  variant = "earned", 
  size = "md", 
  title, 
  description,
  className 
}: BadgeProps) => {
  const icons = {
    star: Star,
    trophy: Trophy,
    target: Target,
    zap: Zap,
    award: Award,
    crown: Crown,
  };

  const Icon = icons[type];

  const sizeClasses = {
    sm: "w-12 h-12 p-2",
    md: "w-16 h-16 p-3",
    lg: "w-20 h-20 p-4",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const isEarned = variant === "earned";

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300",
        sizeClasses[size],
        isEarned 
          ? "bg-gradient-success text-success-foreground shadow-lg animate-pulse-glow" 
          : "bg-muted text-muted-foreground grayscale opacity-50"
      )}>
        <Icon className={iconSizes[size]} />
      </div>
      <div className="text-center">
        <p className={cn(
          "font-medium text-sm",
          isEarned ? "text-foreground" : "text-muted-foreground"
        )}>
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};