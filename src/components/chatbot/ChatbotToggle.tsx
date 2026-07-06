import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { STEMChatbot } from "./STEMChatbot";

interface ChatbotToggleProps {
  studentGrade?: number;
  currentLanguage?: string;
  className?: string;
}

export const ChatbotToggle = ({ 
  studentGrade = 6, 
  currentLanguage = "en",
  className = ""
}: ChatbotToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <STEMChatbot
          studentGrade={studentGrade}
          currentLanguage={currentLanguage}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsOpen(true)}
      size="lg"
      className={`fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 shadow-lg ${className}`}
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};
