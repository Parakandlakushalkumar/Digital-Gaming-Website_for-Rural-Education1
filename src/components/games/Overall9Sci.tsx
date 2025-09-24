import React, { useState } from 'react';
import { 
  Zap, CheckCircle, X, Trophy, Star, 
  Lightbulb, Microscope, Car, Globe, Volume2, 
  Recycle, Wheat, Award, Info
} from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface Overall9SciProps {
  onComplete?: (score: number) => void;
  onExit?: () => void;
  currentLanguage?: string;
}

const STEMAdventureGame: React.FC<Overall9SciProps> = ({ 
  onComplete, 
  onExit, 
  currentLanguage = "en" 
}) => {
  const [score, setScore] = useState(0);
  const [completedMissions, setCompletedMissions] = useState(0);
  const [currentMission, setCurrentMission] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const missions: Mission[] = [
    {
      id: 'matter',
      title: 'States of Matter Bridge',
      description: 'Cross the river by changing water\'s states!',
      completed: false,
      points: 150
    },
    {
      id: 'cells',
      title: 'Cell Detective',
      description: 'Fix the microscope and identify cells to cure the disease!',
      completed: false,
      points: 150
    },
    {
      id: 'motion',
      title: 'Motion Master',
      description: 'Use Newton\'s laws to overcome obstacles!',
      completed: false,
      points: 150
    },
    {
      id: 'gravity',
      title: 'Gravity Jump',
      description: 'Jump across planets using gravity and energy!',
      completed: false,
      points: 150
    },
    {
      id: 'sound',
      title: 'Sound Wave Solver',
      description: 'Open secret doors with sound puzzles!',
      completed: false,
      points: 150
    },
    {
      id: 'resources',
      title: 'Resource Guardian',
      description: 'Stop pollution and conserve energy!',
      completed: false,
      points: 200
    },
    {
      id: 'food',
      title: 'Crop Champion',
      description: 'Help farmers grow better crops!',
      completed: false,
      points: 200
    }
  ];

  const [missionStates, setMissionStates] = useState<{[key: string]: boolean}>({
    matter: false,
    cells: false,
    motion: false,
    gravity: false,
    sound: false,
    resources: false,
    food: false
  });

  const getStoryText = (mission: string) => {
    const stories: {[key: string]: string} = {
      matter: "🧊 You approach a raging river blocking your path to the research facility. The water is too dangerous to swim across. Use your knowledge of states of matter to find a safe way!",
      cells: "🔬 The laboratory's microscope is malfunctioning! A mysterious disease is spreading, and you need to identify the pathogen. Fix the microscope by identifying the correct cell type!",
      motion: "🚴 You're racing down a mountain path on a cart when suddenly a boulder blocks your way! Apply Newton's laws of motion to overcome this obstacle safely!",
      gravity: "🪐 You've reached the space station! To collect energy crystals from different planets, you need to calculate the perfect jump force for each planet's gravity!",
      sound: "🔊 The secret laboratory door is locked with a sound-based security system. Analyze the sound waves and match the correct frequency to unlock it!",
      resources: "♻ The city is suffering from severe pollution! As an environmental scientist, choose the best combination of actions to restore the ecosystem!",
      food: "🌱 The local farmers are struggling with poor crop yields. Use your agricultural science knowledge to help them improve food production sustainably!"
    };
    return stories[mission] || '';
  };

  const startMission = (missionId: string) => {
    if (missionStates[missionId]) return; // Already completed
    setCurrentMission(missionId);
    setShowResult(false);
    setGamePhase('playing');
  };

  const completeMission = (missionId: string, points: number) => {
    if (missionStates[missionId]) return; // Already completed
    
    setMissionStates(prev => ({ ...prev, [missionId]: true }));
    setCompletedMissions(prev => prev + 1);
    setScore(prev => prev + points);
    
    // Check if all missions are completed
    const newCompleted = completedMissions + 1;
    if (newCompleted === missions.length) {
      setGamePhase('completed');
      if (onComplete) {
        onComplete(score + points);
      }
    }
  };

  const showMissionResult = (message: string, success: boolean) => {
    setResultMessage(message);
    setIsSuccess(success);
    setShowResult(true);
    
    if (success) {
      setTimeout(() => {
        setCurrentMission(null);
        setShowResult(false);
      }, 2000);
    }
  };

  const handleMatterState = (state: string) => {
    if (state === 'ice') {
      showMissionResult("🎉 Brilliant! You froze the water into ice, creating a solid bridge to safely cross the river! The molecular structure changed from liquid to solid, providing a stable path.", true);
      completeMission('matter', 150);
    } else if (state === 'water') {
      showMissionResult("❌ Keeping it as water won't help you cross safely. The liquid state is still too dangerous to navigate.", false);
    } else {
      showMissionResult("❌ Steam rises up and disappears! The gaseous state won't create a path to cross.", false);
    }
  };

  const handleCellSelection = (cellType: string) => {
    if (cellType === 'bacteria') {
      showMissionResult("🎉 Excellent detection! You identified the bacterial pathogen! Bacteria lack a nucleus and have cell walls, making them prokaryotes. The microscope is fixed and the cure can be developed!", true);
      completeMission('cells', 150);
    } else if (cellType === 'plant') {
      showMissionResult("❌ Plant cells have chloroplasts and cell walls, but they're not the disease-causing agent here.", false);
    } else {
      showMissionResult("❌ Animal cells have centrioles but no cell walls, but they're not the pathogen in this case.", false);
    }
  };

  const handleMotionLaw = (law: string) => {
    if (law === 'second') {
      showMissionResult("🎉 Perfect application of Newton's Second Law (F=ma)! You applied the right amount of force to accelerate and jump over the boulder safely!", true);
      completeMission('motion', 150);
    } else if (law === 'first') {
      showMissionResult("❌ Newton's First Law (inertia) means objects at rest stay at rest. This won't help you overcome the boulder!", false);
    } else {
      showMissionResult("❌ Newton's Third Law involves equal and opposite reactions, but you need active force to overcome this obstacle!", false);
    }
  };

  const handlePlanetSelection = (planet: string) => {
    if (planet === 'moon') {
      showMissionResult("🎉 Excellent choice! The Moon's low gravity (1.6 m/s²) requires the least energy for jumping. You successfully collected the energy crystal with minimal effort!", true);
      completeMission('gravity', 150);
    } else if (planet === 'earth') {
      showMissionResult("❌ Earth's gravity (9.8 m/s²) requires too much energy for efficient crystal collection. Try a planet with lower gravity!", false);
    } else {
      showMissionResult("❌ Mars's gravity (3.7 m/s²) requires too much energy for efficient crystal collection. Try a planet with lower gravity!", false);
    }
  };

  const handleSoundFrequency = (freq: number) => {
    if (freq === 440) {
      showMissionResult("🎉 Perfect! You matched the 440 Hz frequency! The sound wave resonance unlocked the door. This is the standard A note frequency!", true);
      completeMission('sound', 150);
    } else if (freq === 880) {
      showMissionResult("❌ 880 Hz is too high! This frequency doesn't match the door's lock mechanism.", false);
    } else {
      showMissionResult("❌ 220 Hz is too low! The door requires a higher frequency to unlock.", false);
    }
  };

  const handleResourceAction = (action: string) => {
    if (action === 'all') {
      showMissionResult("🎉 Outstanding! You implemented an integrated environmental solution! Renewable energy + recycling + green transport = maximum impact. The city's ecosystem is restored!", true);
      completeMission('resources', 200);
    } else if (action === 'renewable') {
      showMissionResult("✅ Good choice! Renewable energy helps, but combining it with other solutions would be more effective.", false);
    } else if (action === 'recycle') {
      showMissionResult("✅ Recycling is important, but you need a more comprehensive approach for maximum environmental impact.", false);
    } else {
      showMissionResult("✅ Green transportation helps reduce emissions, but a multi-faceted approach works best!", false);
    }
  };

  const handleCropMethod = (method: string) => {
    if (method === 'integrated') {
      showMissionResult("🎉 Brilliant agricultural science! Your integrated approach combining organic fertilizers, efficient irrigation, and crop rotation maximized yield while maintaining soil health!", true);
      completeMission('food', 200);
    } else if (method === 'fertilizer') {
      showMissionResult("✅ Organic fertilizers improve soil nutrients, but combining with other methods would yield better results.", false);
    } else if (method === 'irrigation') {
      showMissionResult("✅ Drip irrigation conserves water effectively, but a comprehensive approach would be more beneficial.", false);
    } else {
      showMissionResult("✅ Crop rotation prevents soil depletion, but integrating all methods would maximize productivity!", false);
    }
  };

  const getMissionIcon = (missionId: string) => {
    switch (missionId) {
      case 'matter': return <Zap className="w-6 h-6" />;
      case 'cells': return <Microscope className="w-6 h-6" />;
      case 'motion': return <Car className="w-6 h-6" />;
      case 'gravity': return <Globe className="w-6 h-6" />;
      case 'sound': return <Volume2 className="w-6 h-6" />;
      case 'resources': return <Recycle className="w-6 h-6" />;
      case 'food': return <Wheat className="w-6 h-6" />;
      default: return <Lightbulb className="w-6 h-6" />;
    }
  };

  if (gamePhase === 'intro') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">🌍 STEM Adventure Quest 🚀</h1>
          <p className="text-lg text-gray-600 mb-6">Save the Planet with Science!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome, Young Scientist!</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>Earth is in danger and needs your help. Use your STEM knowledge to solve puzzles, overcome challenges, and save our planet!</p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Your Mission:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>States of Matter:</strong> Change water's state to cross rivers</li>
                <li>• <strong>Cell Biology:</strong> Identify pathogens to cure diseases</li>
                <li>• <strong>Physics:</strong> Apply Newton's laws to overcome obstacles</li>
                <li>• <strong>Gravity:</strong> Calculate energy for interplanetary jumps</li>
                <li>• <strong>Sound Waves:</strong> Match frequencies to unlock doors</li>
                <li>• <strong>Environment:</strong> Choose actions to reduce pollution</li>
                <li>• <strong>Agriculture:</strong> Help farmers improve crop yields</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Complete all 7 missions to save the planet!</h3>
              <p className="text-sm">Each mission tests different scientific concepts while you embark on this epic adventure!</p>
            </div>
          </div>

          <button
            onClick={() => setGamePhase('playing')}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            Start Your Adventure
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <div className="text-center py-12">
          <div className="text-9xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CONGRATULATIONS!</h1>
          <h2 className="text-3xl font-bold text-green-600 mb-6">PLANET SAVER!</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-semibold mb-4">🏆 Final Stats:</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-bold text-green-600">{score}</span>
              </div>
              <div className="flex justify-between">
                <span>Missions Completed:</span>
                <span className="font-bold text-blue-600">{completedMissions}/7</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-bold text-purple-600">100%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🧠 What You Learned:</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold">🧊 States of Matter</h4>
                <p className="text-sm">Molecular changes create solid bridges!</p>
              </div>
              <div>
                <h4 className="font-semibold">🔬 Cell Biology</h4>
                <p className="text-sm">Identify pathogens to cure diseases!</p>
              </div>
              <div>
                <h4 className="font-semibold">🚴 Physics</h4>
                <p className="text-sm">Newton's laws overcome obstacles!</p>
              </div>
              <div>
                <h4 className="font-semibold">🪐 Gravity</h4>
                <p className="text-sm">Calculate energy for space jumps!</p>
              </div>
              <div>
                <h4 className="font-semibold">🔊 Sound Waves</h4>
                <p className="text-sm">Frequency matching unlocks doors!</p>
              </div>
              <div>
                <h4 className="font-semibold">♻ Environment</h4>
                <p className="text-sm">Integrated solutions restore ecosystems!</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onExit ? onExit() : window.location.reload()}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            {onExit ? "🏠 Back to Dashboard" : "🔄 Play Again"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">🌍 STEM Adventure Quest 🚀</h1>
        <div className="flex justify-center gap-6 text-sm">
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-bold text-green-600">Score: {score}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <Trophy className="w-4 h-4 inline mr-1" />
            <span className="font-bold text-blue-600">Missions: {completedMissions}/7</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-bold text-purple-600">{Math.round((completedMissions / 7) * 100)}% Complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mission Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Mission Board</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map(mission => (
                <div
                  key={mission.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    missionStates[mission.id]
                      ? 'border-green-300 bg-green-50'
                      : currentMission === mission.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => !missionStates[mission.id] && startMission(mission.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {getMissionIcon(mission.id)}
                    <h4 className="font-bold text-sm">{mission.title}</h4>
                    {missionStates[mission.id] && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{mission.description}</p>
                  <div className="text-xs text-gray-500">
                    Reward: {mission.points} points
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Mission */}
        <div className="space-y-4">
          {currentMission && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold mb-3">Current Mission</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{getStoryText(currentMission)}</p>
                </div>

                {/* Mission-specific content */}
                {currentMission === 'matter' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Change the water's state to create a safe path:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMatterState('ice')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        🧊 Freeze to Ice
                      </button>
                      <button
                        onClick={() => handleMatterState('water')}
                        className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        💧 Keep as Water
                      </button>
                      <button
                        onClick={() => handleMatterState('steam')}
                        className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                      >
                        💨 Heat to Steam
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'cells' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Identify the disease-causing cell:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCellSelection('plant')}
                        className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                      >
                        🌿 Plant Cell
                      </button>
                      <button
                        onClick={() => handleCellSelection('animal')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        🐾 Animal Cell
                      </button>
                      <button
                        onClick={() => handleCellSelection('bacteria')}
                        className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                      >
                        🦠 Bacterial Cell
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'motion' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Apply the correct law of motion:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMotionLaw('first')}
                        className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        🛑 Use Inertia (1st Law)
                      </button>
                      <button
                        onClick={() => handleMotionLaw('second')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        ⚡ Apply Force (2nd Law)
                      </button>
                      <button
                        onClick={() => handleMotionLaw('third')}
                        className="w-full p-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
                      >
                        ↔ Action-Reaction (3rd Law)
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'gravity' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Choose the planet with optimal gravity:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handlePlanetSelection('earth')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        🌍 Earth (g = 9.8 m/s²)
                      </button>
                      <button
                        onClick={() => handlePlanetSelection('moon')}
                        className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        🌙 Moon (g = 1.6 m/s²)
                      </button>
                      <button
                        onClick={() => handlePlanetSelection('mars')}
                        className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                      >
                        🔴 Mars (g = 3.7 m/s²)
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'sound' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Match the correct frequency:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleSoundFrequency(220)}
                        className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        🎼 220 Hz (Low A)
                      </button>
                      <button
                        onClick={() => handleSoundFrequency(440)}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        🎵 440 Hz (A note)
                      </button>
                      <button
                        onClick={() => handleSoundFrequency(880)}
                        className="w-full p-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
                      >
                        🎶 880 Hz (High A)
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'resources' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Choose the best environmental action:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleResourceAction('renewable')}
                        className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                      >
                        🌞 Switch to Renewable Energy
                      </button>
                      <button
                        onClick={() => handleResourceAction('recycle')}
                        className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                      >
                        ♻ Increase Recycling Programs
                      </button>
                      <button
                        onClick={() => handleResourceAction('transport')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        🚲 Promote Green Transportation
                      </button>
                      <button
                        onClick={() => handleResourceAction('all')}
                        className="w-full p-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
                      >
                        ✅ Implement All Solutions
                      </button>
                    </div>
                  </div>
                )}

                {currentMission === 'food' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Choose the best farming method:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCropMethod('fertilizer')}
                        className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                      >
                        🧪 Use Organic Fertilizers
                      </button>
                      <button
                        onClick={() => handleCropMethod('irrigation')}
                        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                      >
                        💧 Implement Drip Irrigation
                      </button>
                      <button
                        onClick={() => handleCropMethod('rotation')}
                        className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                      >
                        🔄 Practice Crop Rotation
                      </button>
                      <button
                        onClick={() => handleCropMethod('integrated')}
                        className="w-full p-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
                      >
                        🌟 Integrated Approach
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setCurrentMission(null)}
                  className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                >
                  Back to Missions
                </button>
              </div>
            </div>
          )}

          {/* Result Display */}
          {showResult && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className={`p-4 rounded-lg border-2 ${
                isSuccess 
                  ? 'border-green-500 bg-green-50 text-green-800' 
                  : 'border-red-500 bg-red-50 text-red-800'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isSuccess ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  <span className="font-bold">
                    {isSuccess ? 'Success!' : 'Try Again!'}
                  </span>
                </div>
                <p className="text-sm">{resultMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default STEMAdventureGame;
