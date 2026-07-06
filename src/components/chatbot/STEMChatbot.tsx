import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getGeminiAnswer } from "@/services/geminiChatApi";
import { 
  Bot, 
  User, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  MessageCircle,
  BookOpen,
  Calculator,
  Atom,
  Monitor,
  Cog,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  subject?: string;
  topic?: string;
  examples?: string[];
  relatedConcepts?: string[];
}

interface STEMChatbotProps {
  studentGrade?: number;
  currentLanguage?: string;
  onClose?: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

const SUBJECT_ICONS = {
  mathematics: Calculator,
  engineering: Cog,
  general: HelpCircle
};

const SUBJECT_COLORS = {
  mathematics: "text-blue-600 bg-blue-100",
  science: "text-green-600 bg-green-100", 
  engineering: "text-orange-600 bg-orange-100",
  general: "text-gray-600 bg-gray-100"
};

export const STEMChatbot = ({ 
  studentGrade = 6, 
  currentLanguage = "en",
  onClose,
  isMinimized = false,
  onToggleMinimize
}: STEMChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: currentLanguage === 'hi' 
        ? `नमस्ते! मैं आपका STEM सहायक हूं। मैं गणित, विज्ञान और इंजीनियरिंग के बारे में आपके सवालों का जवाब दे सकता हूं। आप क्या जानना चाहते हैं?`
        : `Hello! I'm your STEM assistant. I can help you with questions about Mathematics, Science, and Engineering. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date(),
      subject: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectSubject = (message: string): string => {
    const mathKeywords = ['math', 'mathematics', 'गणित', 'calculate', 'equation', 'algebra', 'geometry', 'trigonometry', 'calculus'];
    const scienceKeywords = ['science', 'विज्ञान', 'physics', 'chemistry', 'biology', 'atom', 'molecule', 'force', 'energy'];
    const csKeywords = ['computer', 'programming', 'code', 'algorithm', 'software', 'कंप्यूटर', 'प्रोग्रामिंग'];
    const engKeywords = ['engineering', 'technology', 'robot', 'machine', 'इंजीनियरिंग', 'तकनीक'];

    const lowerMessage = message.toLowerCase();
    
    if (mathKeywords.some(keyword => lowerMessage.includes(keyword))) return 'mathematics';
    if (scienceKeywords.some(keyword => lowerMessage.includes(keyword))) return 'science';
    if (csKeywords.some(keyword => lowerMessage.includes(keyword))) return 'computer_science';
    if (engKeywords.some(keyword => lowerMessage.includes(keyword))) return 'engineering';
    
    return 'general';
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      const answer = await getGeminiAnswer(userMessage, { grade: studentGrade, language: currentLanguage });
      return {
        content: answer,
        subject: detectSubject(userMessage)
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        content: currentLanguage === 'hi' 
          ? 'क्षमा करें, मैं आपके सवाल का जवाब नहीं दे सका। कृपया फिर से कोशिश करें।'
          : 'Sorry, I couldn\'t process your question. Please try again.'
      };
    }
  };
  
  const handleSendMessage = async () => {
    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      subject: detectSubject(inputValue)
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    try {
      const answer = await getGeminiAnswer(userMessage.content, { grade: studentGrade, language: currentLanguage });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: answer,
        sender: 'bot',
        timestamp: new Date(),
        subject: detectSubject(userMessage.content)
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = currentLanguage === 'hi' ? [
    "गणित में बीजगणित क्या है?",
    "प्रकाश कैसे काम करता है?",
    "प्रोग्रामिंग कैसे सीखें?",
    "इंजीनियरिंग क्या है?"
  ] : [
    "What is algebra in mathematics?",
    "How does light work?",
    "How to learn programming?",
    "What is engineering?"
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] z-50 shadow-2xl border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">STEM Assistant</CardTitle>
              <p className="text-xs text-muted-foreground">Grade {studentGrade}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const IconComponent = SUBJECT_ICONS[message.subject as keyof typeof SUBJECT_ICONS] || HelpCircle;
              const colorClass = SUBJECT_COLORS[message.subject as keyof typeof SUBJECT_COLORS] || "text-gray-600 bg-gray-100";
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={colorClass}>
                        <IconComponent className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Examples */}
                      {message.examples && message.examples.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium opacity-75">
                            {currentLanguage === 'hi' ? 'उदाहरण:' : 'Examples:'}
                          </p>
                          {message.examples.map((example, idx) => (
                            <div key={idx} className="bg-background/50 rounded p-2 text-xs font-mono">
                              {example}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Related Concepts */}
                      {message.relatedConcepts && message.relatedConcepts.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium opacity-75 mb-2">
                            {currentLanguage === 'hi' ? 'संबंधित अवधारणाएं:' : 'Related Concepts:'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {message.relatedConcepts.map((concept, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.subject && message.subject !== 'general' && (
                        <Badge variant="outline" className="text-xs">
                          {message.subject.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-muted">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              {currentLanguage === 'hi' ? 'सुझाए गए सवाल:' : 'Suggested questions:'}
            </p>
            <div className="space-y-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2 text-xs"
                  onClick={() => setInputValue(question)}
                >
                  <Lightbulb className="w-3 h-3 mr-2 flex-shrink-0" />
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentLanguage === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your question...'}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
