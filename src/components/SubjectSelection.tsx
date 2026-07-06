import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Atom, Monitor, Cog, ArrowLeft } from "lucide-react";
import { StoryButton } from "./StoryButton";
import { StoryModal } from "./StoryModal";
import React, { useState } from "react";
import { getSubjectsForGrade, Subject } from "@/data/syllabus";

interface SubjectSelectionProps {
  studentGrade: number;
  onSubjectSelect: (subject: Subject) => void;
  onBack: () => void;
  currentLanguage: string;
}

const iconMap = {
  Calculator,
  Atom, 
  Monitor,
  Cog
};

export const SubjectSelection = ({ 
  studentGrade, 
  onSubjectSelect, 
  onBack, 
  currentLanguage
}: SubjectSelectionProps) => {
  const subjects = getSubjectsForGrade(studentGrade);

  const [storyModal, setStoryModal] = useState<{ open: boolean; url: string; title: string }>({ open: false, url: "", title: "" });

  const openStory = (subjectId: string, subjectName: string) => {
    if (studentGrade === 6) {
      if (subjectId === "science") {
        setStoryModal({ open: true, url: "/src/components/stories/6sci.html", title: `${subjectName} Story` });
        return;
      }
      if (subjectId === "mathematics" || subjectId === "math") {
        setStoryModal({ open: true, url: "/stories/6math.html", title: `${subjectName} Story` });
        return;
      }
      if (subjectId === "engineering_technology" || subjectId === "engineering&technology" || subjectId === "engineering" || subjectId === "technology") {
        setStoryModal({ open: true, url: "/src/components/stories/6et.html", title: `${subjectName} Story` });
        return;
      }
    }
    if (studentGrade === 10) {
      if (subjectId === "science") {
        setStoryModal({ open: true, url: "/stories/10science.html", title: `${subjectName} Story` });
        return;
      }
      if (
        subjectId === "engineering_technology" ||
        subjectId === "engineering&technology" ||
        subjectId === "engineering" ||
        subjectId === "technology"
      ) {
        setStoryModal({ open: true, url: "/stories/10engineering.html", title: `${subjectName} Story` });
        return;
      }
    }
    if (studentGrade === 11) {
      if (subjectId === "mathematics" || subjectId === "math") {
        setStoryModal({ open: true, url: "/stories/11math.html", title: `${subjectName} Story` });
        return;
      }
      if (subjectId === "science") {
        setStoryModal({ open: true, url: "/stories/11science.html", title: `${subjectName} Story` });
        return;
      }
      if (
        subjectId === "engineering_technology" ||
        subjectId === "engineering&technology" ||
        subjectId === "engineering" ||
        subjectId === "technology"
      ) {
        setStoryModal({ open: true, url: "/stories/11engineering.html", title: `${subjectName} Story` });
        return;
      }
    }
    if (studentGrade === 9) {
      if (subjectId === "mathematics" || subjectId === "math") {
        setStoryModal({ open: true, url: "/stories/9math.html", title: `${subjectName} Story` });
        return;
      }
      if (subjectId === "science") {
        setStoryModal({ open: true, url: "/stories/9science.html", title: `${subjectName} Story` });
        return;
      }
      if (
        subjectId === "engineering_technology" ||
        subjectId === "engineering&technology" ||
        subjectId === "engineering" ||
        subjectId === "technology"
      ) {
        setStoryModal({ open: true, url: "/stories/9engineering.html", title: `${subjectName} Story` });
        return;
      }
    }
    if (studentGrade === 12) {
      if (subjectId === "mathematics" || subjectId === "math") {
        setStoryModal({ open: true, url: "/stories/12math.html", title: `${subjectName} Story` });
        return;
      }
      if (subjectId === "science") {
        setStoryModal({ open: true, url: "/stories/12science.html", title: `${subjectName} Story` });
        return;
      }
      if (
        subjectId === "engineering_technology" ||
        subjectId === "engineering&technology" ||
        subjectId === "engineering" ||
        subjectId === "technology"
      ) {
        setStoryModal({ open: true, url: "/stories/12engineering.html", title: `${subjectName} Story` });
        return;
      }
    }
    // fallback: show not available
    setStoryModal({ open: true, url: "", title: `No story available for ${subjectName}` });
  };

  const closeStory = () => setStoryModal({ open: false, url: "", title: "" });

  const translations = {
    en: {
      title: "Choose Your Subject",
      subtitle: `Grade ${studentGrade} Subjects`,
      back: "Back",
      selectSubject: "Select Subject"
    },
    hi: {
      title: "अपना विषय चुनें",
      subtitle: `कक्षा ${studentGrade} के विषय`,
      back: "वापस",
      selectSubject: "विषय चुनें"
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
          {subjects.map((subject) => {
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap];
            const topicCount = subject.topics[studentGrade]?.length || 0;
            // Handler for story button
            const handleReadStory = (e?: React.MouseEvent) => {
              if (e) e.stopPropagation();
              openStory(subject.id, subject.name);
            };
            return (
              <Card 
                key={subject.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm"
                onClick={() => onSubjectSelect(subject)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${subject.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Badge variant="secondary" className="text-sm">
                    {topicCount} Topics
                  </Badge>
                  <div className="flex flex-col gap-2">
                    <Button className="w-full group-hover:scale-105 transition-transform">
                      {t.selectSubject}
                    </Button>
                    <StoryButton onClick={handleReadStory} label="Read Story" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Story Modal */}
      <StoryModal open={storyModal.open} onOpenChange={closeStory} storyUrl={storyModal.url} title={storyModal.title} />
    </div>
  );
};