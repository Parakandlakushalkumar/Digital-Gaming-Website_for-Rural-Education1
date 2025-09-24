import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Clock, 
  Target, 
  Star, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Gamepad2,
  LogOut,
  Globe,
  FileText
} from "lucide-react";
import { MathQuiz } from "@/components/games/MathQuiz";
import { Flashcards } from "@/components/games/Flashcards";
import { QuizEngine } from "@/components/games/QuizEngine";
import { ChemistryMatchGame } from "@/components/games/ChemistryMatchGame";
import { DecimalShoppingGame } from "@/components/games/DecimalShoppingGame";
import { FoodSortingGame } from "@/components/games/FoodSortingGame";
import NumbersOperationsQuiz from "@/components/games/numbers6";
import FactorsMultiplesQuiz from "@/components/games/factors6";
import RatioProportionQuiz from "@/components/games/ratio6";
import GeometryBasicsQuiz from "@/components/games/geometry6";
import MensurationQuiz from "@/components/games/mensuration6";
import DataHandlingQuiz from "@/components/games/datahandling6";
import FoodQuiz from "@/components/games/food6";
import MaterialsQuiz from "@/components/games/materials6";
import LivingThingsQuiz from "@/components/games/livingthings6";
import MotionMeasurementQuiz from "@/components/games/motion6";
import LightShadowElectricityQuiz from "@/components/games/light6";
import WaterAirGarbageQuiz from "@/components/games/water6";
import SimpleMachinesQuiz from "@/components/games/machines6";
import EnergySourcesQuiz from "@/components/games/energy";
import BasicCircuitsQuiz from "@/components/games/circuits";
import EngineeringDailyLifeQuiz from "@/components/games/eng";
import IntegersRationalQuiz from "@/components/games/integers7";
import AlgebraicExpressionsQuiz from "@/components/games/algebra7";
import SimpleEquationsQuiz from "@/components/games/equations7";
import GeometryQuiz from "@/components/games/geometry7";
import MeasurementsQuiz from "@/components/games/perimeter7";
import StatisticsQuiz from "@/components/games/statistics7";
import NutritionQuiz from "@/components/games/nutrition7";
import HeatQuiz from "@/components/games/heat7";
import PhysicalQuiz from "@/components/games/physical7";
import RespirationQuiz from "@/components/games/respiration7";
import ReproductionQuiz from "@/components/games/reproduction7";
import WeatherQuiz from "@/components/games/weather7";
import MotionQuiz from "@/components/games/motion7";
import { Grade7ScienceTopics } from "@/components/games/Grade7ScienceTopics";
import { Grade7EngineeringTopics } from "@/components/games/Grade7EngineeringTopics";
import Grade8MathematicsTopics from "@/components/games/Grade8MathematicsTopics";
import Grade8ScienceTopics from "@/components/games/Grade8ScienceTopics";
import Grade8EngineeringTopics from "@/components/games/Grade8EngineeringTopics";
import Grade9MathematicsTopics from "@/components/games/Grade9MathematicsTopics";
import Grade9ScienceTopics from "@/components/games/Grade9ScienceTopics";
import Grade9EngineeringTopics from "@/components/games/Grade9EngineeringTopics";
import Grade10MathematicsTopics from "@/components/games/Grade10MathematicsTopics";
import Grade6ScienceTopics from "@/components/games/Grade6ScienceTopics";
import Grade6EngineeringTopics from "@/components/games/Grade6EngineeringTopics";
import Grade6MathematicsTopics from "@/components/games/Grade6MathematicsTopics";
import Grade7MathematicsTopics from "@/components/games/Grade7MathematicsTopics";
import Grade10ScienceTopics from "@/components/games/Grade10ScienceTopics";
import Grade11MathematicsTopics from "@/components/games/Grade11MathematicsTopics";
import Grade12MathematicsTopics from "@/components/games/Grade12MathematicsTopics";
import Grade12ScienceTopics from "@/components/games/Grade12ScienceTopics";
import Grade12EngineeringTechnologyTopics from "@/components/games/Grade12EngineeringTechnologyTopics";
import { GameSelection } from "@/components/games/GameSelection";
import { SubjectSelection } from "@/components/SubjectSelection";
// import { useTranslation } from "@/contexts/TranslationContext"; // Remove duplicate import
import { useTranslation } from "@/contexts/TranslationContext";
import { TopicSelection } from "@/components/TopicSelection";
import { StudentAssignments } from "@/components/student/StudentAssignments";
import { Subject, Topic } from "@/data/syllabus";
import { supabase } from "@/integrations/supabase/client";
import { STEMChatbot } from "@/components/chatbot/STEMChatbot";
import Overall6ET from "@/components/games/Overall6ET";
import Overall6Sci from "@/components/games/Overall6Sci";
import Overall6Math from "@/components/games/Overall6Math";
import Overall7Math from "@/components/games/Overall7Math";
import Overall7Sci from "@/components/games/Overall7Sci";
import Overall7ET from "@/components/games/Overall7ET";
import Overall8Math from "@/components/games/Overall8Math";
import Overall8Sci from "@/components/games/Overall8Sci";
import Overall8ET from "@/components/games/Overall8ET";
import Overall9Math from "@/components/games/Overall9Math";
import Overall9Sci from "@/components/games/Overall9Sci";
import Overall9ET from "@/components/games/Overall9ET";
import Overall10Sci from "@/components/games/Overall10Sci";
import Overall10ET from "@/components/games/Overall10ET";
import Overall10Math from "@/components/games/Overall10Math";
import Overall11Math from "@/components/games/Overall11Math";
import Overall11Sci from "@/components/games/Overall11Sci";
import Overall11ET from "@/components/games/Overall11ET";
import Overall12Math from "@/components/games/Overall12Math";
import Overall12Sci from "@/components/games/Overall12Sci";
import Overall12ET from "@/components/games/Overall12ET";

interface PlayerStats {
  points: number;
  gamesPlayed: number;
  streak: number;
  timeSpent: number;
  achievements: string[];
  completedGames: string[];
}

interface GameState {
  currentGame: string | null;
  selectedSubject: Subject | null;
  selectedTopic: Topic | null;
  gameHistory: Array<{
    gameId: string;
    score: number;
    timestamp: Date;
  }>;
}

interface DashboardProps {
  studentData?: unknown; // Use 'unknown' for safety, replace with specific type if available
  onLogout?: () => void;
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

export const Dashboard = ({ 
  studentData, 
  onLogout = () => {}, 
  onLanguageChange = () => {} 
}: DashboardProps) => {
  const [view, setView] = useState<'dashboard' | 'subjects' | 'topics' | 'games' | 'playing' | 'assignments' | 'overall-performance'>('dashboard');
  const { currentLanguage, translatePage } = useTranslation();
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(true);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    points: studentData?.currentScore || 0,
    gamesPlayed: studentData?.gamesPlayed || 0,
    streak: studentData?.daily_streak || 0,
    timeSpent: studentData?.total_time_minutes || 0,
    achievements: [],
    completedGames: []
  });

  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    selectedSubject: null,
    selectedTopic: null,
    gameHistory: []
  });

  const translations = {
    en: {
      welcome: "Welcome back",
      dashboard: "Student Dashboard",
      startLearning: "Start Learning",
      points: "Points",
      gamesPlayed: "Games Played",
      currentStreak: "Current Streak",
      timeSpent: "Time Spent",
      recentAchievements: "Recent Achievements",
      quickStats: "Quick Stats",
      performance: "Performance",
      language: "Language",
      logout: "Logout",
      backToDashboard: "Back to Dashboard",
      grade: "Grade",
      assignments: "Assignments"
    },
    hi: {
      welcome: "वापस स्वागत है",
      dashboard: "छात्र डैशबोर्ड",
      startLearning: "सीखना शुरू करें",
      points: "अंक",
      gamesPlayed: "खेले गए गेम",
      currentStreak: "वर्तमान लगातार खेल",
      timeSpent: "बिताया गया समय",
      recentAchievements: "हाल की उपलब्धियां",
      quickStats: "त्वरित आंकड़े",
      performance: "प्रदर्शन",
      language: "भाषा",
      logout: "लॉगआउट",
      backToDashboard: "डैशबोर्ड पर वापस जाएं",
      grade: "कक्षा",
      assignments: "असाइनमेंट"
	}
}

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Keep points/games in sync with DB so teacher-awarded points show up
  useEffect(() => {
    (async () => {
      if (!studentData?.id) return;
      try {
        const { data, error } = await supabase
          .from('students')
          .select('current_score, no_of_games_played')
          .eq('id', studentData.id)
          .single();
        if (!error && data) {
          setPlayerStats(prev => ({
            ...prev,
            points: (data.no_of_games_played || 0) > 0 ? (data.current_score || 0) : 0,
            gamesPlayed: data.no_of_games_played || 0,
          }));
        }
      } catch (e) {
        console.error('Failed to sync points/games from DB', e);
      }
    })();
  }, [studentData?.id]);

  

  const handleGameComplete = async (gameId: string, score: number, total: number) => {
    // Normalize to a percentage regardless of how individual games report results
    const normalizedPercentage = (() => {
      if (!Number.isFinite(score)) return 0;
      if (Number.isFinite(total) && total > 0) return Math.max(0, Math.min(100, (score / total) * 100));
      // If total is not provided or invalid, assume score is already a percentage (0-100)
      return Math.max(0, Math.min(100, score));
    })();

    // Award fixed points per completed game
    const pointsEarned = 10;
    
    // Compute next cumulative values
    // Compute and apply games played increment
    const nextGamesPlayed = (playerStats.gamesPlayed || 0) + 1;

    // Update local state
    setPlayerStats(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      gamesPlayed: nextGamesPlayed,
      // streak is handled server-side daily; keep UI unchanged here
      timeSpent: prev.timeSpent // time accumulation handled by session timer
    }));

    // Persist cumulative points and games to DB so dashboard reflects teacher-awarded + game points
    try {
      if (studentData?.id) {
        // Read current_score, then add pointsEarned
        const { data: student, error: readErr } = await supabase
          .from('students')
          .select('current_score')
          .eq('id', studentData.id)
          .single();
        if (!readErr) {
          const dbScore = student?.current_score || 0;
          const { error: updErr } = await supabase
            .from('students')
            .update({ current_score: dbScore + pointsEarned, no_of_games_played: nextGamesPlayed })
            .eq('id', studentData.id);
          if (updErr) {
            console.error('Failed to update points/games in DB', updErr);
          } else {
            // Refetch to ensure UI reflects authoritative DB state
            const { data: refreshed, error: refErr } = await supabase
              .from('students')
              .select('current_score, no_of_games_played')
              .eq('id', studentData.id)
              .single();
            if (!refErr && refreshed) {
              setPlayerStats(prev => ({
                ...prev,
                points: refreshed.current_score || 0,
                gamesPlayed: refreshed.no_of_games_played || nextGamesPlayed
              }));
            } else {
              setPlayerStats(prev => ({ ...prev, points: dbScore + pointsEarned }));
            }
          }
        }
      }
    } catch (_) {}

    // Add to game history
    setGameState(prev => ({
      ...prev,
      gameHistory: [...prev.gameHistory, {
        gameId,
        score: normalizedPercentage,
        timestamp: new Date()
      }],
      currentGame: null
    }));

    // Update database game counters if student is logged in
    // DB update above already wrote current_score and no_of_games_played

    // Return to dashboard after game completion
    setView('dashboard');
  };

  // Session time tracking: accumulate per minute and flush to DB immediately each minute
  useEffect(() => {
    if (!studentData?.id) return;

    let sessionMinutes = 0;
    const tick = async () => {
      sessionMinutes += 1;
      setPlayerStats(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
      try {
        await supabase.rpc('update_daily_activity', {
          p_student_id: studentData.id,
          p_session_minutes: 1,
          p_played_today: false,
        });
        sessionMinutes = 0;
      } catch (e) {
        console.error('Failed to update daily activity (minute tick)', e);
      }
    };

    const interval = setInterval(tick, 60_000);

    const flushActivity = async (playedToday: boolean) => {
      if (sessionMinutes <= 0) return;
      try {
        await supabase.rpc('update_daily_activity', {
          p_student_id: studentData.id,
          p_session_minutes: sessionMinutes,
          p_played_today: playedToday,
        });
        sessionMinutes = 0;
      } catch (e) {
        console.error('Failed to update daily activity', e);
      }
    };

    const handleBeforeUnload = () => {
      // Best-effort flush without awaiting
      flushActivity(false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Flush remaining time on unmount
      flushActivity(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(interval);
    };
  }, [studentData?.id]);

  // Mark a day as "played" after any game completion
  useEffect(() => {
    if (!studentData?.id) return;
    if (gameState.gameHistory.length === 0) return;
    const last = gameState.gameHistory[gameState.gameHistory.length - 1];
    if (!last) return;
    (async () => {
      try {
        await supabase.rpc('update_daily_activity', {
          p_student_id: studentData.id,
          p_session_minutes: 0,
          p_played_today: true,
        });
        // Optimistically bump streak in UI if appropriate
        setPlayerStats(prev => ({ ...prev, streak: Math.max(prev.streak, prev.streak) }));
      } catch (e) {
        console.error('Failed to mark played today', e);
      }
    })();
  }, [gameState.gameHistory, studentData?.id]);

  const handleSubjectSelect = (subject: Subject) => {
    setGameState(prev => ({ ...prev, selectedSubject: subject }));
    setView('topics');
  };


  const handleTopicSelect = (topic: Topic) => {
    // For Grade 7 Science, go directly to parallel topic display
    if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 7) {
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 7) {
      // For Grade 7 Engineering & Technology, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 8) {
      // For Grade 8 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 8) {
      // For Grade 8 Science, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 8) {
      // For Grade 8 Engineering & Technology, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 9) {
      // For Grade 9 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 9) {
      // For Grade 9 Science, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 9) {
      // For Grade 9 Engineering & Technology, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 10) {
      // For Grade 10 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 6) {
      // For Grade 6 Science, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 6) {
      // For Grade 6 Engineering & Technology, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 6) {
      // For Grade 6 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 7) === 7) {
      // For Grade 7 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 10) {
      // For Grade 10 Science, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 11) {
      // For Grade 11 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 12) {
      // For Grade 12 Mathematics, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 12) {
      // For Grade 12 Science, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else if (gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 12) {
      // For Grade 12 Engineering & Technology, go directly to parallel topic display
      setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
      setView('playing');
    } else {
      // Start Learning flow: go to games selection for this topic
      setGameState(prev => ({ ...prev, selectedTopic: topic }));
      setView('games');
    }
  };

  const handleStartQuiz = (topic: Topic) => {
    setGameState(prev => ({ ...prev, selectedTopic: topic, currentGame: 'topic-quiz' }));
    setView('playing');
  };

  const handleGameSelect = (gameId: string) => {
    setGameState(prev => ({ ...prev, currentGame: gameId }));
    setView('playing');
  };

  const handleBackToSubjects = () => {
    setGameState(prev => ({ ...prev, selectedSubject: null, selectedTopic: null }));
    setView('subjects');
  };

  const handleBackToTopics = () => {
    setGameState(prev => ({ ...prev, selectedTopic: null }));
    setView('topics');
  };

  const handleBackToDashboard = () => {
    setGameState(prev => ({ 
      ...prev, 
      currentGame: null, 
      selectedSubject: null, 
      selectedTopic: null 
    }));
    setView('dashboard');
  };

  const handleViewAssignments = () => {
    setView('assignments');
  };

  const handleOverallPerformance = () => {
    setView('overall-performance');
  };

  const handleDownloadTopic = async (topic: Topic) => {
    const grade = studentData?.grade || 6;
    
    // Map topic IDs to their specific HTML filenames
    const topicFileMap: Record<string, string> = {
      // Grade 6 Mathematics topics
      'numbers-operations': 'numbers6.html',
      'factors-multiples': 'factors6.html',
      'ratio-proportion': 'ratio6.html',
      'geometry-basics': 'geometry6.html',
      'mensuration': 'mensuration6.html',
      'data-handling': 'datahandling6.html',
      
      // Grade 6 Science topics
      'food': 'food6.html',
      'materials': 'materials6.html',
      'living-things': 'livingthings6.html',
      'motion-measurement': 'motion6.html',
      'light-shadows-electricity': 'light6.html',
      'water-air-waste': 'water6.html',
      
      // Grade 6 Engineering topics
      'simple-machines': 'machines6.html',
      'energy-sources': 'energy.html',
      'basic-circuits': 'circuits.html',
      'engineering-daily-life': 'eng.html',
      
      // Grade 7 Mathematics topics
      'integers-rational': 'integers7.html',
      'algebraic-expressions': 'algebra7.html',
      'simple-equations': 'equations7.html',
      'geometry-triangles': 'geometry7.html',
      'perimeter-area-volume': 'perimeter7.html',
      'statistics-basic': 'statistics7.html',

      
  'nutrition': 'nutrition7.html',
  'heat-light-acids': 'heat7.html',
  'physical-chemical-changes': 'physical7.html',
  'respiration-transportation': 'respiration7.html',
  'reproduction-plants': 'reproduction7.html',
  'weather-climate-soil': 'weather7.html',
  'motion-time-current': 'motion7.html',

  
  

  
  'exponents-powers': 'exponents8.html',
  'linear-equations-one': 'equations8.html',
  'quadrilaterals-polygons': 'quadrilaterals8.html',
  'practical-geometry': 'geometry8.html',
  'mensuration-advanced': 'mensuration8.html',
  'probability-basics': 'probability8.html',

  
  'crop-production': 'crop8.html',
  'microorganisms': 'micro8.html',
  'materials-metals': 'materials8.html',
  'conservation': 'conservation8.html',
  'reproduction-adolescence': 'reproduction8.html',
  'light-sound-force': 'light8.html',
  'pollution': 'pollution8.html',

  
  'introduction-engineering-design': 'engdesign8.html',
  'materials-structures': 'structures8.html',
  'mechanics-forces-motion': 'mechanics8.html',
  'energy-electricity': 'energy8.html',
  'electronics-sensors': 'electronics8.html',

  
  'polynomials': 'polynomials9.html',
  'linear-equations-two': 'equations9.html',
  'coordinate-geometry': 'geometry9.html',
  'geometry-circles': 'circles9.html',
  'surface-areas-volumes-9': 'surface9.html',
  'statistics-probability-9': 'statistics9.html',

  
  'matter': 'matter9.html',
  'cell-structure': 'cell9.html',
  'motion-force-laws': 'motion9.html',
  'gravitation-work-energy': 'gravitation9.html',
  'sound': 'sound9.html',
  'natural-resources': 'resources9.html',
  'food-resources': 'food9.html',

  
  'robotics-basics': 'robotics9.html',
  'sustainable-energy': 'energy9.html',
  'transport-systems': 'transport9.html',
  'design-thinking': 'design9.html',

  
  'real-numbers': 'mn10.html',
  'quadratic-equations': 'car10.html',
  'arithmetic-progressions': 'abs10.html',
  'trigonometry': 'lov10.html',
  'probability-10': 'ps11.html', // (ps11.html is present, use for probability)
  'surface-areas-volumes-10': 'lp10.html' ,
  
  
  'chemical-reactions': 'che10.html',
  'acids-bases-salts': 'efe12.html', // (efe12.html is present, use for acids/bases/salts)
  'metals-non-metals': 'em10.html',
  'carbon-compounds': 'car10.html',
  'life-processes': 'her10.html',
  'control-coordination': 'human11.html', // (human11.html is present, use for control/coordination)
  'heredity-evolution': 'her10.html',
  'light-reflection': 'light6.html', // (light6.html is present, use for light/reflection)
  'electricity-magnetism': 'elec12.html', // (elec12.html is present, use for electricity/magnetism)
  'environment-sustainability': 'energy.html',
  
  // (energy.html is present, use for environment/sustainability)
// (lp10.html is present, use for surface areas/volumes)


  


  'relations-functions-12': 'rel12.html',
  'inverse-trigonometry': 'inv12.html',
  'calculus': 'cal12.html',
  'vectors-3d': 'vec12.html',
  'probability-statistics-12': 'ps12.html',

  
  'electric-charges': 'efe12.html',
  'current-electricity': 'elec12.html',
  'electromagnetic-induction': 'ebh12.html',
  'optics': 'ow11.html',
  'atoms-nuclei': 'eg12.html',
  'semiconductors': 'scs12.html',
  'solid-state': 'cms12.html',
  'reproduction-genetics': 'rges12.html',
  'ecology-biotechnology': 'ows12.html',



  'electrical-technology': 'efe12.html',
  'electronics-technology': 'elec12.html',
  'engineering-graphics': 'scs12.html',
  'information-technology': 'it12.html',










      
  'sets-relations-functions': 'sets11.html',
  'complex-numbers': 'com11.html',
  'sequences-series': 'ss11.html',
  'binomial-theorem': 'bt11.html',
  'straight-lines-conics': 'sc11.html',
  'probability-statistics-11': 'ps11.html',

  
  'units-measurement': 'um11.html',
  'motion': 'motion11.html',
  'laws-of-motion': 'laws11.html',
  'gravitation': 'grav11.html',
  'oscillations-waves': 'ow11.html',
  'thermodynamics': 'thermo11.html',
  'organic-chemistry-basics': 'orgchem11.html',
  'plant-physiology': 'plant11.html',
  'human-physiology': 'human11.html',

  
  


    };
    
    // Get the filename for the current topic
    const filename = topicFileMap[topic.id];
    
    if (filename) {
      try {
        // Try to fetch the HTML file from the games_download folder
        const response = await fetch(`/games_download/${filename}`);
        if (response.ok) {
          const htmlContent = await response.text();
          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
          URL.revokeObjectURL(url);
        } else {
          console.error('HTML file not found:', filename);
          // Fallback: create a simple HTML file with topic information
          const fallbackContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic.name} - Grade ${grade}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
        .container { background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; text-align: center; margin-bottom: 30px; }
        .topic-info { background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .content { line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${topic.name} - Grade ${grade}</h1>
        <div class="topic-info">
            <h2>Topic Information</h2>
            <p><strong>Subject:</strong> ${gameState.selectedSubject?.name}</p>
            <p><strong>Grade:</strong> ${grade}</p>
            <p><strong>Description:</strong> ${topic.description || 'No description available'}</p>
        </div>
        <div class="content">
            <h2>Learning Objectives</h2>
            <p>This is an offline version of the ${topic.name} learning material.</p>
            <p>Please ensure you have the complete HTML file for the full interactive experience.</p>
        </div>
    </div>
</body>
</html>`;
          const blob = new Blob([fallbackContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${topic.name.replace(/\s+/g, '_')}_Grade_${grade}.html`;
          document.body.appendChild(link);
          link.click();
          if (link.parentNode) {
            link.parentNode.removeChild(link);
          }
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Error downloading file:', error);
        // Fallback to simple text file
        const content = `Topic: ${topic.name}\nSubject: ${gameState.selectedSubject?.name}\nGrade: ${grade}\nDescription: ${topic.description || 'No description available'}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${topic.name.replace(/\s+/g, '_')}_Grade_${grade}.txt`;
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        URL.revokeObjectURL(url);
      }
    }
  };

  if (view === 'subjects') {
    return (
      <SubjectSelection
        studentGrade={studentData?.grade || 6}
        onSubjectSelect={handleSubjectSelect}
        onBack={handleBackToDashboard}
        currentLanguage={currentLanguage}
      />
    );
  }

  if (view === 'topics' && gameState.selectedSubject) {
    return (
      <TopicSelection
        subject={gameState.selectedSubject}
        studentGrade={studentData?.grade || 6}
        onTopicSelect={handleTopicSelect}
        onStartQuiz={handleStartQuiz}
        onOverallPerformance={handleOverallPerformance}
        onDownloadTopic={handleDownloadTopic}
        onBack={handleBackToSubjects}
        currentLanguage={currentLanguage}
      />
    );
  }

  if (view === 'games' && gameState.selectedSubject && gameState.selectedTopic) {
    return (
      <GameSelection
        subject={gameState.selectedSubject}
        topic={gameState.selectedTopic}
        onGameSelect={handleGameSelect}
        onBack={handleBackToTopics}
        currentLanguage={currentLanguage}
      />
    );
  }

  if (view === 'playing' && gameState.currentGame) {
    // If Science Grade 6 Food and user chose Math Quiz card, run FoodSortingGame instead
    if (gameState.currentGame === 'math-quiz' && gameState.selectedSubject?.id === 'science' && gameState.selectedTopic?.id === 'food' && (studentData?.grade || 6) === 6) {
      return (
        <div className="relative">
          <FoodSortingGame
            onComplete={(score) => handleGameComplete('food-sorting', score, 100)}
            onExit={handleBackToTopics}
            currentLanguage={currentLanguage}
          />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    
    // If Science Grade 9 Matter and user chose Math Quiz card, run ChemistryMatchGame instead
    if (gameState.currentGame === 'math-quiz' && gameState.selectedSubject?.id === 'science' && gameState.selectedTopic?.id === 'matter' && (studentData?.grade || 6) === 9) {
      return (
        <div className="relative">
          <ChemistryMatchGame
            onComplete={(score) => handleGameComplete('chemistry-match', score, 100)}
            onExit={handleBackToTopics}
          />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Numbers & Operations, run NumbersOperationsQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'numbers-operations' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <NumbersOperationsQuiz onComplete={(score, total) => handleGameComplete('numbers-operations', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Factors & Multiples, run FactorsMultiplesQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'factors-multiples' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <FactorsMultiplesQuiz onComplete={(score, total) => handleGameComplete('factors-multiples', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Ratio & Proportion, run RatioProportionQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'ratio-proportion' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <RatioProportionQuiz onComplete={(score, total) => handleGameComplete('ratio-proportion', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Geometry Basics, run GeometryBasicsQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'geometry-basics' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <GeometryBasicsQuiz onComplete={(score, total) => handleGameComplete('geometry-basics', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Mensuration, run MensurationQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'mensuration' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <MensurationQuiz onComplete={(score, total) => handleGameComplete('mensuration', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    // If Math Grade 6 Data Handling, run DataHandlingQuiz
    if (
      gameState.currentGame === 'math-quiz' &&
      gameState.selectedSubject?.id === 'mathematics' &&
      gameState.selectedTopic?.id === 'data-handling' &&
      (studentData?.grade || 6) === 6
    ) {
      return (
        <div className="relative">
          <DataHandlingQuiz onComplete={(score, total) => handleGameComplete('data-handling', score, total)} />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    if (gameState.currentGame === 'math-quiz') {
      return (
        <div className="relative">
          <MathQuiz
            onComplete={(score, total) => handleGameComplete('math-quiz', score, total)}
            onExit={handleBackToTopics}
            currentLanguage={currentLanguage}
          />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
    if (gameState.currentGame === 'topic-quiz') {
      const { selectedSubject, selectedTopic } = gameState;
      if (selectedSubject && selectedTopic) {
        // Check if it's Grade 6 Mathematics and use specific topic games
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 6) {
          // Use specific topic games for Grade 6 Mathematics
          if (selectedTopic.id === 'numbers-operations') {
            return (
              <div className="relative">
                <NumbersOperationsQuiz onComplete={(score, total) => handleGameComplete('numbers-operations', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'factors-multiples') {
            return (
              <div className="relative">
                <FactorsMultiplesQuiz onComplete={(score, total) => handleGameComplete('factors-multiples', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'ratio-proportion') {
            return (
              <div className="relative">
                <RatioProportionQuiz onComplete={(score, total) => handleGameComplete('ratio-proportion', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'geometry-basics') {
            return (
              <div className="relative">
                <GeometryBasicsQuiz onComplete={(score, total) => handleGameComplete('geometry-basics', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'mensuration') {
            return (
              <div className="relative">
                <MensurationQuiz onComplete={(score, total) => handleGameComplete('mensuration', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'data-handling') {
            return (
              <div className="relative">
                <DataHandlingQuiz onComplete={(score, total) => handleGameComplete('data-handling', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          }
        }
        
        // Check if it's Grade 6 Science and use specific topic games
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 6) {
          // Use specific topic games for Grade 6 Science
          if (selectedTopic.id === 'food') {
            return (
              <div className="relative">
                <FoodQuiz onComplete={(score, total) => handleGameComplete('food', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'materials') {
            return (
              <div className="relative">
                <MaterialsQuiz onComplete={(score, total) => handleGameComplete('materials', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'living-things') {
            return (
              <div className="relative">
                <LivingThingsQuiz onComplete={(score, total) => handleGameComplete('living-things', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'motion-measurement') {
            return (
              <div className="relative">
                <MotionMeasurementQuiz onComplete={(score, total) => handleGameComplete('motion-measurement', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'light-shadows-electricity') {
            return (
              <div className="relative">
                <LightShadowElectricityQuiz onComplete={(score, total) => handleGameComplete('light-shadows-electricity', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'water-air-waste') {
            return (
              <div className="relative">
                <WaterAirGarbageQuiz onComplete={(score, total) => handleGameComplete('water-air-waste', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          }
        }
        
        // Check if it's Grade 6 Engineering & Technology and use specific topic games
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 6) {
          // Use specific topic games for Grade 6 Engineering & Technology
          if (selectedTopic.id === 'simple-machines') {
            return (
              <div className="relative">
                <SimpleMachinesQuiz onComplete={(score, total) => handleGameComplete('simple-machines', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'energy-sources') {
            return (
              <div className="relative">
                <EnergySourcesQuiz onComplete={(score, total) => handleGameComplete('energy-sources', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'basic-circuits') {
            return (
              <div className="relative">
                <BasicCircuitsQuiz onComplete={(score, total) => handleGameComplete('basic-circuits', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'engineering-daily-life') {
            return (
              <div className="relative">
                <EngineeringDailyLifeQuiz onComplete={(score, total) => handleGameComplete('engineering-daily-life', score, total)} />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          }
        }
        
        // Check if it's Grade 7 Science and use parallel topic display
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 7) {
          return (
            <div className="relative">
              <Grade7ScienceTopics 
                onBack={handleBackToSubjects}
                currentLanguage={currentLanguage}
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 7 Engineering & Technology and use parallel topic display
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 7) {
          return (
            <div className="relative">
              <Grade7EngineeringTopics 
                onBack={handleBackToSubjects}
                currentLanguage={currentLanguage}
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 8 Mathematics and use parallel topic display
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 8) {
          return (
            <div className="relative">
              <Grade8MathematicsTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 8 Science and use parallel topic display
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 8) {
          return (
            <div className="relative">
              <Grade8ScienceTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 8 Engineering & Technology and use parallel topic display
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 8) {
          return (
            <div className="relative">
              <Grade8EngineeringTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 6 Mathematics and use parallel topic display
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 6) {
          return (
            <div className="relative">
              <Grade6MathematicsTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 7 Mathematics and use parallel topic display
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 7) === 7) {
          return (
            <div className="relative">
              <Grade7MathematicsTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 7}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 6 Engineering & Technology and use parallel topic display
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 6) {
          return (
            <div className="relative">
              <Grade6EngineeringTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 6 Science and use parallel topic display
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 6) {
          return (
            <div className="relative">
              <Grade6ScienceTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 10 Mathematics and use parallel topic display
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 10) {
          return (
            <div className="relative">
              <Grade10MathematicsTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 9 Engineering & Technology and use parallel topic display
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 9) {
          return (
            <div className="relative">
              <Grade9EngineeringTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 9 Science and use parallel topic display
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 9) {
          return (
            <div className="relative">
              <Grade9ScienceTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 9 Mathematics and use parallel topic display
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 9) {
          return (
            <div className="relative">
              <Grade9MathematicsTopics 
                selectedTopicId={selectedTopic?.id}
              />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 7 Mathematics and use specific topic games
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 7) {
          // Use specific topic games for Grade 7 Mathematics
          if (selectedTopic.id === 'integers-rational') {
            return (
              <div className="relative">
                <IntegersRationalQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'algebraic-expressions') {
            return (
              <div className="relative">
                <AlgebraicExpressionsQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'simple-equations') {
            return (
              <div className="relative">
                <SimpleEquationsQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'geometry-triangles') {
            return (
              <div className="relative">
                <GeometryQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'perimeter-area-volume') {
            return (
              <div className="relative">
                <MeasurementsQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          } else if (selectedTopic.id === 'statistics-basic') {
            return (
              <div className="relative">
                <StatisticsQuiz />
                <STEMChatbot
                  studentGrade={studentData?.grade || 6}
                  currentLanguage={currentLanguage}
                  isMinimized={isChatbotMinimized}
                  onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
                />
              </div>
            );
          }
        }
        
        // Check if it's Grade 10 Science and use Grade10ScienceTopics
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 10) {
          return (
            <div className="relative">
              <Grade10ScienceTopics selectedTopicId={selectedTopic.id} />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }

        // Check if it's Grade 11 Mathematics and use Grade11MathematicsTopics
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 11) {
          return (
            <div className="relative">
              <Grade11MathematicsTopics selectedTopicId={selectedTopic.id} />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 12 Mathematics and use Grade12MathematicsTopics
        if (selectedSubject.id === 'mathematics' && (studentData?.grade || 6) === 12) {
          return (
            <div className="relative">
              <Grade12MathematicsTopics selectedTopicId={selectedTopic.id} />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Check if it's Grade 12 Science and use Grade12ScienceTopics
        if (selectedSubject.id === 'science' && (studentData?.grade || 6) === 12) {
          return (
            <div className="relative">
              <Grade12ScienceTopics selectedTopicId={selectedTopic.id} />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }

        // Check if it's Grade 12 Engineering & Technology and use Grade12EngineeringTechnologyTopics
        if (selectedSubject.id === 'engineering' && (studentData?.grade || 6) === 12) {
          return (
            <div className="relative">
              <Grade12EngineeringTechnologyTopics selectedTopicId={selectedTopic.id} />
              <STEMChatbot
                studentGrade={studentData?.grade || 6}
                currentLanguage={currentLanguage}
                isMinimized={isChatbotMinimized}
                onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
              />
            </div>
          );
        }
        
        // Default to QuizEngine for other subjects/grades
        return (
          <div className="relative">
            <QuizEngine
              subject={selectedSubject}
              topic={selectedTopic}
              grade={studentData?.grade || 6}
              onComplete={(score, total) => handleGameComplete('topic-quiz', score, total)}
              onExit={handleBackToTopics}
            />
            <STEMChatbot
              studentGrade={studentData?.grade || 6}
              currentLanguage={currentLanguage}
              isMinimized={isChatbotMinimized}
              onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
            />
          </div>
        );
      }
      // Fallback UI if state is missing
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center text-muted-foreground">Preparing quiz...</div>
        </div>
      );
    }
    if (gameState.currentGame === 'flashcards') {
      return (
        <div className="relative">
          <Flashcards
            onComplete={(score, total) => handleGameComplete('flashcards', score, total)}
            onExit={handleBackToTopics}
            currentLanguage={currentLanguage}
          />
          <STEMChatbot
            studentGrade={studentData?.grade || 6}
            currentLanguage={currentLanguage}
            isMinimized={isChatbotMinimized}
            onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
          />
        </div>
      );
    }
  }

  if (view === 'overall-performance') {
    const isEngineeringGrade6 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 6;
    const isMathGrade6 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 6;
    const isScienceGrade6 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 6;
    const isMathGrade7 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 7;
    const isMathGrade8 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 8;
    const isScienceGrade7 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 7;
    const isScienceGrade8 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 8;
    const isEngineeringGrade7 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 7;
    const isEngineeringGrade8 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 8;
    const isEngineeringGrade9 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 9;
    const isMathGrade9 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 9;
    const isMathGrade10 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 10;
    const isScienceGrade9 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 9;
    const isScienceGrade10 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 10;
    const isEngineeringGrade10 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 10;
    const isMathGrade11 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 11;
    const isMathGrade12 = gameState.selectedSubject?.id === 'mathematics' && (studentData?.grade || 6) === 12;
    const isScienceGrade11 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 11;
    const isScienceGrade12 = gameState.selectedSubject?.id === 'science' && (studentData?.grade || 6) === 12;
    const isEngineeringGrade11 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 11;
    const isEngineeringGrade12 = gameState.selectedSubject?.id === 'engineering' && (studentData?.grade || 6) === 12;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Header */}
        <div className="bg-card/50 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Overall Game Challenge
                </h1>
                <p className="text-muted-foreground">
                  Grade {studentData?.grade || 6} • {gameState.selectedSubject?.name || 'Subject'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={currentLanguage} onValueChange={onLanguageChange}>
                  <SelectTrigger className="w-32">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleBackToDashboard}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.backToDashboard}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {isMathGrade6 ? (
            <Overall6Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade6 ? (
            <Overall6Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade6 ? (
            <Overall6ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade7 ? (
            <Overall7Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade8 ? (
            <Overall8Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade7 ? (
            <Overall7Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade8 ? (
            <Overall8Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade7 ? (
            <Overall7ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade8 ? (
            <Overall8ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade9 ? (
            <Overall9ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade9 ? (
            <Overall9Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade10 ? (
            <Overall10Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade9 ? (
            <Overall9Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade10 ? (
            <Overall10Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade10 ? (
            <Overall10ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade11 ? (
            <Overall11Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isMathGrade12 ? (
            <Overall12Math 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade11 ? (
            <Overall11Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isScienceGrade12 ? (
            <Overall12Sci 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade11 ? (
            <Overall11ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : isEngineeringGrade12 ? (
            <Overall12ET 
              onComplete={(score) => handleGameComplete('overall-performance', score, 100)}
              onExit={handleBackToDashboard}
              currentLanguage={currentLanguage}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Overall Game challenges for {gameState.selectedSubject?.name} Grade {studentData?.grade || 6} are currently under development.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Currently available: Engineering & Technology Grade 6, 7, 10, 11 & 12, Mathematics Grade 6, 7, 9, 11 & 12, Science Grade 6, 7, 9, 10, 11 & 12
              </p>
              <Button 
                size="lg" 
                onClick={handleBackToDashboard}
                className="px-8 py-3"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t.backToDashboard}
              </Button>
            </div>
          )}
        </div>
        
        {/* STEM Chatbot */}
        <STEMChatbot
          studentGrade={studentData?.grade || 6}
          currentLanguage={currentLanguage}
          isMinimized={isChatbotMinimized}
          onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
        />
      </div>
    );
  }

  if (view === 'assignments') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Header */}
        <div className="bg-card/50 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {t.assignments}
                </h1>
                <p className="text-muted-foreground">
                  {t.grade} {studentData?.grade || 6} • {studentData?.username || 'Student'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={currentLanguage} onValueChange={onLanguageChange}>
                  <SelectTrigger className="w-32">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleBackToDashboard}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.backToDashboard}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <StudentAssignments 
            studentId={studentData?.id || ''} 
            currentLanguage={currentLanguage} 
          />
        </div>
        
        {/* STEM Chatbot */}
        <STEMChatbot
          studentGrade={studentData?.grade || 6}
          currentLanguage={currentLanguage}
          isMinimized={isChatbotMinimized}
          onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
        />
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t.welcome}, {studentData?.username || 'Student'}!
              </h1>
              <p className="text-muted-foreground">
                {t.grade} {studentData?.grade || 6} • {t.dashboard}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={currentLanguage} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-32">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.points}</p>
                  <p className="text-3xl font-bold text-blue-600">{playerStats.points}</p>
                </div>
                <Trophy className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.gamesPlayed}</p>
                  <p className="text-3xl font-bold text-green-600">{playerStats.gamesPlayed}</p>
                </div>
                <Gamepad2 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.currentStreak}</p>
                  <p className="text-3xl font-bold text-orange-600">{playerStats.streak}</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t.timeSpent}</p>
                  <p className="text-3xl font-bold text-purple-600">{playerStats.timeSpent}m</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t.startLearning}</h2>
              <p className="text-muted-foreground mb-6">
                Choose a subject and start your learning journey
              </p>
              <Button 
                size="lg" 
                onClick={() => setView('subjects')}
                className="px-8 py-3 text-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                {t.startLearning}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 border-blue-200/20">
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t.assignments}</h2>
              <p className="text-muted-foreground mb-6">
                View and submit your assignments from teachers
              </p>
              <Button 
                size="lg" 
                onClick={handleViewAssignments}
                className="px-8 py-3 text-lg"
                variant="outline"
              >
                <FileText className="w-5 h-5 mr-2" />
                {t.assignments}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Performance */}
        {gameState.gameHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t.performance}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gameState.gameHistory.slice(-5).map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{game.gameId}</p>
                      <p className="text-sm text-muted-foreground">
                        {game.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={game.score >= 70 ? "default" : "secondary"}>
                      {Math.round(game.score)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* STEM Chatbot */}
      <STEMChatbot
        studentGrade={studentData?.grade || 6}
        currentLanguage={currentLanguage}
        isMinimized={isChatbotMinimized}
        onToggleMinimize={() => setIsChatbotMinimized(!isChatbotMinimized)}
      />
    </div>
  );
}