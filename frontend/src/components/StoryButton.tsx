import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryButtonProps {
  onClick: () => void;
  label?: string;
}

export const StoryButton = ({ onClick, label = "Read Story" }: StoryButtonProps) => (
  <Button
    size="sm"
    variant="secondary"
    className="flex items-center gap-2 group-hover:scale-105 transition-transform"
    onClick={e => { e.stopPropagation(); onClick(); }}
    type="button"
  >
    <BookOpen className="w-4 h-4" />
    {label}
  </Button>
);
