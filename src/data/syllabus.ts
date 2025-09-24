export interface Topic {
  id: string;
  name: string;
  description?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Record<number, Topic[]>; // grade -> topics
}

export const SYLLABUS: Record<string, Subject> = {
  mathematics: {
    id: "mathematics",
    name: "Mathematics",
    icon: "Calculator",
    color: "from-blue-500 to-cyan-500",
    topics: {
      6: [
        { id: "numbers-operations", name: "Numbers & Operations", description: "fractions, decimals, integers" },
        { id: "factors-multiples", name: "Factors & Multiples" },
        { id: "ratio-proportion", name: "Ratio & Proportion" },
        { id: "geometry-basics", name: "Geometry Basics", description: "lines, angles, shapes" },
        { id: "mensuration", name: "Mensuration", description: "area, perimeter, volume" },
        { id: "data-handling", name: "Data Handling", description: "charts, graphs" }
      ],
      7: [
        { id: "integers-rational", name: "Integers, Rational Numbers" },
        { id: "algebraic-expressions", name: "Algebraic Expressions" },
        { id: "simple-equations", name: "Simple Equations" },
        { id: "geometry-triangles", name: "Geometry", description: "triangles, congruence" },
        { id: "perimeter-area-volume", name: "Perimeter, Area, Surface Area, Volume" },
        { id: "statistics-basic", name: "Statistics", description: "mean, median, mode" }
      ],
      8: [
        { id: "exponents-powers", name: "Exponents & Powers" },
        { id: "linear-equations-one", name: "Algebra", description: "linear equations in one variable" },
        { id: "quadrilaterals-polygons", name: "Quadrilaterals, Polygons" },
        { id: "practical-geometry", name: "Practical Geometry" },
        { id: "mensuration-advanced", name: "Mensuration", description: "surface area, volume" },
        { id: "probability-basics", name: "Probability Basics" }
      ],
      9: [
        { id: "polynomials", name: "Polynomials" },
        { id: "linear-equations-two", name: "Linear Equations in Two Variables" },
        { id: "coordinate-geometry", name: "Coordinate Geometry" },
        { id: "geometry-circles", name: "Geometry", description: "circles, constructions" },
        { id: "surface-areas-volumes-9", name: "Surface Areas & Volumes" },
        { id: "statistics-probability-9", name: "Statistics & Probability" }
      ],
      10: [
        { id: "real-numbers", name: "Real Numbers" },
        { id: "quadratic-equations", name: "Quadratic Equations" },
        { id: "arithmetic-progressions", name: "Arithmetic Progressions" },
        { id: "trigonometry", name: "Trigonometry & Applications" },
        { id: "probability-10", name: "Probability" },
        { id: "surface-areas-volumes-10", name: "Surface Areas & Volumes" }
      ],
      11: [
        { id: "sets-relations-functions", name: "Sets, Relations & Functions" },
        { id: "complex-numbers", name: "Complex Numbers" },
        { id: "sequences-series", name: "Sequences & Series" },
        { id: "binomial-theorem", name: "Binomial Theorem" },
        { id: "straight-lines-conics", name: "Straight Lines & Conic Sections" },
        { id: "probability-statistics-11", name: "Probability & Statistics" }
      ],
      12: [
        { id: "relations-functions-12", name: "Relations & Functions" },
        { id: "inverse-trigonometry", name: "Inverse Trigonometry" },
        { id: "calculus", name: "Calculus", description: "Limits, Derivatives, Integrals, Applications" },
        { id: "vectors-3d", name: "Vectors & 3D Geometry" },
        { id: "probability-statistics-12", name: "Probability & Statistics" }
      ]
    }
  },
  science: {
    id: "science",
    name: "Science",
    icon: "Atom",
    color: "from-green-500 to-emerald-500",
    topics: {
      6: [
        { id: "food", name: "Food", description: "sources, components, balance" },
        { id: "materials", name: "Materials", description: "properties, grouping, changes" },
        { id: "living-things", name: "Living Things", description: "plants, animals, habitat" },
        { id: "motion-measurement", name: "Motion & Measurement" },
        { id: "light-shadows-electricity", name: "Light, Shadows, Electricity" },
        { id: "water-air-waste", name: "Water, Air, Garbage & Waste" }
      ],
      7: [
        { id: "nutrition", name: "Nutrition in Plants & Animals" },
        { id: "heat-light-acids", name: "Heat, Light, Acids & Bases" },
        { id: "physical-chemical-changes", name: "Physical & Chemical Changes" },
        { id: "respiration-transportation", name: "Respiration, Transportation in Living Beings" },
        { id: "reproduction-plants", name: "Reproduction in Plants" },
        { id: "weather-climate-soil", name: "Weather, Climate, Soil" },
        { id: "motion-time-current", name: "Motion, Time, Electric Current" }
      ],
      8: [
        { id: "crop-production", name: "Crop Production" },
        { id: "microorganisms", name: "Microorganisms" },
        { id: "materials-metals", name: "Materials", description: "metals, non-metals, coal, petroleum" },
        { id: "conservation", name: "Conservation of Plants & Animals" },
        { id: "reproduction-adolescence", name: "Reproduction, Adolescence" },
        { id: "light-sound-force", name: "Light, Sound, Force, Friction" },
        { id: "pollution", name: "Pollution of Air & Water" }
      ],
      9: [
        { id: "matter", name: "Matter", description: "atoms, molecules, states" },
        { id: "cell-structure", name: "Cell Structure & Tissues" },
        { id: "motion-force-laws", name: "Motion, Force, Laws of Motion" },
        { id: "gravitation-work-energy", name: "Gravitation, Work, Energy" },
        { id: "sound", name: "Sound" },
        { id: "natural-resources", name: "Natural Resources" },
        { id: "food-resources", name: "Improvement in Food Resources" }
      ],
      10: [
        { id: "chemical-reactions", name: "Chemical Reactions" },
        { id: "acids-bases-salts", name: "Acids, Bases, Salts" },
        { id: "metals-non-metals", name: "Metals & Non-Metals" },
        { id: "carbon-compounds", name: "Carbon Compounds" },
        { id: "life-processes", name: "Life Processes" },
        { id: "control-coordination", name: "Control & Coordination", description: "Nervous system, Hormones" },
        { id: "heredity-evolution", name: "Heredity & Evolution" },
        { id: "light-reflection", name: "Light", description: "reflection, refraction, human eye" },
        { id: "electricity-magnetism", name: "Electricity & Magnetism" },
        { id: "environment-sustainability", name: "Environment & Sustainability" }
      ],
      11: [
        { id: "physical-world", name: "Physical World, Units & Measurement" },
        { id: "motion-line-plane", name: "Motion in a Straight Line & Plane" },
        { id: "laws-motion-11", name: "Laws of Motion" },
        { id: "gravitation-11", name: "Gravitation" },
        { id: "oscillations-waves", name: "Oscillations & Waves" },
        { id: "thermodynamics", name: "Thermodynamics" },
        { id: "organic-chemistry", name: "Organic Chemistry Basics" },
        { id: "plant-physiology", name: "Plant Physiology", description: "photosynthesis, respiration" },
        { id: "human-physiology", name: "Human Physiology", description: "digestive, circulatory, nervous" }
      ],
      12: [
        { id: "electric-charges", name: "Electric Charges & Fields, Electrostatics" },
        { id: "current-electricity", name: "Current Electricity, Magnetism" },
        { id: "electromagnetic-induction", name: "Electromagnetic Induction, Alternating Current" },
        { id: "optics", name: "Optics, Wave Optics" },
        { id: "atoms-nuclei", name: "Atoms & Nuclei" },
        { id: "semiconductors", name: "Semiconductors & Communication" },
        { id: "solid-state", name: "Solid State, Solutions, Chemical Kinetics" },
        { id: "reproduction-genetics", name: "Reproduction, Genetics, Evolution" },
        { id: "ecology-biotechnology", name: "Ecology, Biotechnology, Human Health" }
      ]
    }
  },
  engineering: {
    id: "engineering",
    name: "Engineering & Technology",
    icon: "Cog",
    color: "from-orange-500 to-red-500",
    topics: {
      6: [
        { id: "simple-machines", name: "Simple Machines" },
        { id: "energy-sources", name: "Energy Sources" },
        { id: "basic-circuits", name: "Basic Circuits" },
        { id: "engineering-daily-life", name: "Engineering in Daily Life" }
      ],
      7: [
        { id: "simple-machines", name: "Simple Machines" },
        { id: "energy-sources", name: "Energy Sources" },
        { id: "basic-circuits", name: "Basic Circuits" },
        { id: "engineering-daily-life", name: "Engineering in Daily Life" }
      ],
      8: [
        { id: "introduction-engineering-design", name: "Introduction to Engineering & Design" },
        { id: "materials-structures", name: "Materials & Structures" },
        { id: "mechanics-forces-motion", name: "Mechanics (Forces & Motion)" },
        { id: "energy-electricity", name: "Energy and Electricity" },
        { id: "electronics-sensors", name: "Electronics & Sensors" }
      ],
      9: [
        { id: "robotics-basics", name: "Robotics Basics" },
        { id: "sustainable-energy", name: "Sustainable Energy" },
        { id: "transport-systems", name: "Transport Systems" },
        { id: "design-thinking", name: "Design Thinking" }
      ],
      10: [
        { id: "robotics-basics", name: "Robotics Basics" },
        { id: "sustainable-energy", name: "Sustainable Energy" },
        { id: "transport-systems", name: "Transport Systems" },
        { id: "design-thinking", name: "Design Thinking" }
      ],
      11: [
        { id: "iot-basics", name: "IoT Basics" },
        { id: "ai-ml-applications", name: "AI & ML Applications" },
        { id: "renewable-tech", name: "Renewable Technologies" },
        { id: "electronics-communication", name: "Electronics & Communication Basics" }
      ],
      12: [
        { id: "electrical-technology", name: "Electrical Technology", description: "Power systems, circuits, and electrical engineering principles" },
        { id: "electronics-technology", name: "Electronics Technology", description: "Electronic components, circuits, and digital systems" },
        { id: "engineering-graphics", name: "Engineering Graphics / Drawing", description: "Technical drawing, CAD, and engineering visualization" },
        { id: "information-technology", name: "Information Technology", description: "Computer systems, programming, and IT applications" }
      ]
    }
  }
};

export const getSubjectsForGrade = (grade: number): Subject[] => {
  return Object.values(SYLLABUS).filter(subject => 
    subject.topics[grade] && subject.topics[grade].length > 0
  );
};

export const getTopicsForSubjectAndGrade = (subjectId: string, grade: number): Topic[] => {
  const subject = SYLLABUS[subjectId];
  return subject?.topics[grade] || [];
};