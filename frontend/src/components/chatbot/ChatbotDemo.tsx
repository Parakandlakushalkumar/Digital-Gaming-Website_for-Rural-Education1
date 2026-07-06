import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Bot, 
  BookOpen, 
  Calculator, 
  Atom, 
  Monitor, 
  Cog,
  Lightbulb,
  Star
} from "lucide-react";
import { STEMChatbot } from "./STEMChatbot";

interface ChatbotDemoProps {
  studentGrade?: number;
  currentLanguage?: string;
}

const demoQuestions = {
  en: [
    {
      question: "What is algebra?",
      subject: "Mathematics",
      icon: Calculator,
      color: "bg-blue-100 text-blue-800"
    },
    {
      question: "How does photosynthesis work?",
      subject: "Science", 
      icon: Atom,
      color: "bg-green-100 text-green-800"
    },
    {
      question: "How do I learn programming?",
      subject: "Engineering",
      icon: Monitor,
      color: "bg-purple-100 text-purple-800"
    },
    {
      question: "What is engineering?",
      subject: "Engineering",
      icon: Cog,
      color: "bg-orange-100 text-orange-800"
    }
  ],
  hi: [
    {
      question: "बीजगणित क्या है?",
      subject: "गणित",
      icon: Calculator,
      color: "bg-blue-100 text-blue-800"
    },
    {
      question: "प्रकाश संश्लेषण कैसे काम करता है?",
      subject: "विज्ञान",
      icon: Atom,
      color: "bg-green-100 text-green-800"
    },
    {
      question: "मैं प्रोग्रामिंग कैसे सीखूं?",
      subject: "कंप्यूटर विज्ञान",
      icon: Monitor,
      color: "bg-purple-100 text-purple-800"
    },
    {
      question: "इंजीनियरिंग क्या है?",
      subject: "इंजीनियरिंग",
      icon: Cog,
      color: "bg-orange-100 text-orange-800"
    }
  ]
};

export const ChatbotDemo = ({ 
  studentGrade = 6, 
  currentLanguage = "en" 
}: ChatbotDemoProps) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const questions = demoQuestions[currentLanguage as keyof typeof demoQuestions] || demoQuestions.en;

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setIsChatbotOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            {currentLanguage === 'hi' ? 'STEM AI सहायक' : 'STEM AI Assistant'}
          </CardTitle>
          <p className="text-muted-foreground">
            {currentLanguage === 'hi' 
              ? 'गणित, विज्ञान और इंजीनियरिंग के बारे में अपने सवाल पूछें'
              : 'Ask questions about Mathematics, Science, and Engineering'
            }
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQuestionClick(item.question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">{item.question}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.subject}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-sm">
                {currentLanguage === 'hi' ? 'विशेषताएं:' : 'Features:'}
              </span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                {currentLanguage === 'hi' 
                  ? 'ग्रेड-उपयुक्त सामग्री' 
                  : 'Grade-appropriate content'
                }
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                {currentLanguage === 'hi' 
                  ? 'उदाहरण और संबंधित अवधारणाएं' 
                  : 'Examples and related concepts'
                }
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                {currentLanguage === 'hi' 
                  ? 'बहुभाषी समर्थन' 
                  : 'Multilingual support'
                }
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                {currentLanguage === 'hi' 
                  ? 'विषय-विशिष्ट प्रतिक्रियाएं' 
                  : 'Subject-specific responses'
                }
              </li>
            </ul>
          </div>

          <div className="mt-4 flex justify-center">
            <Button 
              onClick={() => setIsChatbotOpen(true)}
              className="px-6"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {currentLanguage === 'hi' ? 'चैटबॉट खोलें' : 'Open Chatbot'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chatbot */}
      {isChatbotOpen && (
        <STEMChatbot
          studentGrade={studentGrade}
          currentLanguage={currentLanguage}
          onClose={() => setIsChatbotOpen(false)}
        />
      )}
    </div>
  );
};
