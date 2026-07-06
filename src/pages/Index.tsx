import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Play, Users, Globe } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";
import gamesImage from "@/assets/games-grid.jpg";
import ImprovedTranslate from "@/components/ImprovedTranslate";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative max-w-4xl mx-auto text-center text-white space-y-8">
          {/* ...existing code... */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-5xl md:text-6xl font-bold">
              Learn<span className="text-warning">Spark</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Gamified STEM learning platform designed for rural students. 
            Master Science, Technology, Engineering & Math through interactive games!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/student">
              <Button 
                variant="hero" 
                size="lg"
                className="text-xl px-8 py-4"
              >
                <Play className="w-6 h-6 mr-2" />
                Student Login
              </Button>
            </Link>
            <Link to="/teacher">
              <Button 
                variant="outline" 
                size="lg"
                className="text-xl px-8 py-4 bg-white/10 text-white border-white hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                <Users className="w-6 h-6 mr-2" />
                Teacher Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose LearnSpark?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for rural education with offline support and multilingual content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-game rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Interactive Games</h3>
                <p className="text-muted-foreground">
                  Math adventures, science flashcards, and engineering simulations make learning fun and engaging.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Offline Ready</h3>
                <p className="text-muted-foreground">
                  Works perfectly without internet connection. Sync progress when you're back online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-math rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Teacher Analytics</h3>
                <p className="text-muted-foreground">
                  Track student progress, identify learning gaps, and customize learning paths.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games Preview */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore Our Games
            </h2>
            <p className="text-xl text-muted-foreground">
              Five exciting game types covering all STEM subjects
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={gamesImage} 
                alt="Educational games preview" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-math rounded-full"></div>
                  <span className="text-lg font-medium">Math Quiz Adventures</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-science rounded-full"></div>
                  <span className="text-lg font-medium">Interactive Flashcards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-tech rounded-full"></div>
                  <span className="text-lg font-medium">Drag & Drop Experiments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-engineering rounded-full"></div>
                  <span className="text-lg font-medium">STEM Trivia Battles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-game rounded-full"></div>
                  <span className="text-lg font-medium">Engineering Simulations</span>
                </div>
              </div>
              <Button 
                variant="game" 
                size="lg"
                onClick={() => navigate('/student')}
                className="w-full text-lg"
              >
                Try Games Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Start Your STEM Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of rural students already mastering STEM concepts through our gamified platform.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/student')}
            className="bg-white text-primary hover:bg-gray-100 text-xl px-8 py-4"
          >
            <Play className="w-6 h-6 mr-2" />
            Begin Learning Adventure
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
