import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showNumbers?: boolean;
  variant?: "default" | "success" | "warning" | "math" | "science";
}

export const ProgressBar = ({ 
  current, 
  total, 
  label = "Progress", 
  showNumbers = true,
  variant = "default" 
}: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);
  
  const getProgressColor = () => {
    switch (variant) {
      case "success": return "bg-success";
      case "warning": return "bg-warning";
      case "math": return "bg-math";
      case "science": return "bg-science";
      default: return "bg-primary";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {showNumbers && (
          <span className="text-sm text-muted-foreground">
            {current}/{total} ({percentage}%)
          </span>
        )}
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-3 bg-muted"
        />
        <div 
          className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};