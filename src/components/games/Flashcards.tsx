import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  category: string;
}

interface FlashcardsProps {
  onComplete: (correct: number, total: number) => void;
  onExit: () => void;
  currentLanguage?: string;
}

const flashcardData: FlashcardData[] = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "The process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
    category: "Biology"
  },
  {
    id: 2,
    front: "What is gravity?",
    back: "A force that attracts objects with mass toward each other. On Earth, it pulls objects toward the center of the planet.",
    category: "Physics"
  },
  {
    id: 3,
    front: "What is an algorithm?",
    back: "A step-by-step set of instructions used to solve a problem or complete a task, especially in computer programming.",
    category: "Engineering"
  },
  {
    id: 4,
    front: "What is the Pythagorean theorem?",
    back: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²",
    category: "Mathematics"
  },
  {
    id: 5,
    front: "What is DNA?",
    back: "Deoxyribonucleic acid - the molecule that carries genetic instructions for the development and function of living things.",
    category: "Biology"
  }
];

export const Flashcards = ({ onComplete, onExit }: FlashcardsProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [studiedCards, setStudiedCards] = useState<number[]>([]);

  const handleAnswer = (isCorrect: boolean) => {
    if (!studiedCards.includes(currentCard)) {
      setStudiedCards([...studiedCards, currentCard]);
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }

    // Move to next card or complete
    if (currentCard < flashcardData.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      onComplete(correctAnswers + (isCorrect && !studiedCards.includes(currentCard) ? 1 : 0), flashcardData.length);
    }
  };

  const goToPrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const goToNext = () => {
    if (currentCard < flashcardData.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const card = flashcardData[currentCard];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-science-light to-background">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-science">STEM Flashcards</CardTitle>
            <Button variant="outline" size="sm" onClick={onExit}>
              Exit
            </Button>
          </div>
          <ProgressBar 
            current={currentCard + 1} 
            total={flashcardData.length} 
            label="Card Progress"
            variant="science"
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="inline-block bg-science/10 text-science px-3 py-1 rounded-full text-sm font-medium">
              {card.category}
            </span>
          </div>

          <div className="relative h-80">
            <Card 
              className={`absolute inset-0 cursor-pointer transition-all duration-500 transform ${
                isFlipped ? 'rotate-y-180' : ''
              } bg-gradient-to-br from-background to-accent shadow-lg hover:shadow-xl`}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <CardContent className="p-8 h-full flex items-center justify-center">
                <div className={`text-center ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {card.front}
                  </h3>
                  <p className="text-muted-foreground">
                    Click to reveal answer
                  </p>
                  <RotateCcw className="w-6 h-6 mx-auto mt-4 text-muted-foreground animate-pulse" />
                </div>
                
                <div className={`text-center ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 absolute inset-0 p-8 flex items-center justify-center`}>
                  <div>
                    <p className="text-lg leading-relaxed text-foreground">
                      {card.back}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Did you get it right?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {isFlipped && (
            <div className="flex justify-center gap-4 animate-slide-up">
              <Button 
                variant="destructive" 
                size="lg"
                onClick={() => handleAnswer(false)}
                className="flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Incorrect
              </Button>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => handleAnswer(true)}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Correct
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={goToPrevious}
              disabled={currentCard === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Studied: {studiedCards.length}/{flashcardData.length}
              </p>
              <p className="text-sm font-medium">
                Correct: {correctAnswers}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={goToNext}
              disabled={currentCard === flashcardData.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};