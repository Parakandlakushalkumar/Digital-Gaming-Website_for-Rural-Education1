// questionBank.ts

export type Question = {
  id: string;
  stem: string;
  choices?: string[];       // present for MCQ
  correctIndex?: number;    // index into choices if MCQ
  answer?: string | boolean; // for Fill/TF
  explanation?: string;
  type?: 'mcq' | 'tf' | 'fill';
};

// small helper to produce stable ids
const makeId = (prefix: string, grade: number, subject: string, topicId: string, n: number) =>
  `${prefix}_${grade}_${subject}_${topicId}_${n}`.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 60);

const mcq = (id: string, stem: string, choices: string[], correctIndex: number, explanation?: string): Question => ({
  id, stem, choices, correctIndex, explanation, type: 'mcq'
});
const tf = (id: string, stem: string, answer: boolean, explanation?: string): Question => ({
  id, stem, answer, explanation, type: 'tf'
});
const fill = (id: string, stem: string, answer: string, explanation?: string): Question => ({
  id, stem, answer, explanation, type: 'fill'
});

// Grade-specific topic mappings
const mathTopics = {
  6: ['number-systems', 'fractions-decimals', 'ratios-proportions', 'percentages', 'basic-algebra', 'integers', 'geometry-basics', 'data-handling', 'mensuration'],
  7: ['integers-rational-numbers', 'algebraic-expressions', 'linear-equations', 'ratio-proportion-percent', 'profit-loss', 'simple-interest', 'triangles-properties', 'perimeter-area', 'data-handling'],
  8: ['exponents-powers', 'algebraic-identities', 'factorization', 'linear-equations-one-variable', 'direct-inverse-proportion', 'mensuration-surface-area-volume', 'quadrilaterals-polygons', 'statistics', 'graphs'],
  9: ['real-numbers', 'polynomials', 'coordinate-geometry', 'linear-equations-two-variables', 'triangles-congruence-similarity', 'quadrilaterals-circles', 'mensuration-sa-v', 'probability', 'statistics'],
  10: ['real-numbers-euclid', 'polynomials', 'pair-of-linear-equations', 'quadratic-equations', 'arithmetic-progressions', 'triangles', 'circles-tangents', 'trigonometry', 'mensuration', 'probability-statistics'],
  11: ['sets-relations-functions', 'trigonometric-functions', 'complex-numbers', 'quadratic-equations-sequences', 'straight-lines-conic-sections', 'limits-derivatives-intro', 'permutations-combinations', 'probability'],
  12: ['relations-functions-inverse-trig', 'matrices-determinants', 'continuity-differentiability', 'applications-of-derivatives', 'integrals-differential-equations', 'vectors-3d-geometry', 'probability-stats']
};

const scienceTopics = {
  6: ['food-components', 'separation-of-substances', 'changes-around-us', 'sorting-materials', 'motion-measurement', 'light-shadow', 'electricity-circuits', 'living-organisms-habitat', 'water-air'],
  7: ['nutrition-respiration', 'heat-temperature', 'acids-bases-salts', 'physical-chemical-changes', 'weather-climate', 'winds-storms', 'electric-current-effects', 'light', 'soil-forests-waste'],
  8: ['crop-production', 'materials-metals-non-metals', 'coal-petroleum', 'combustion-flame', 'force-pressure', 'friction-sound', 'cell-microorganisms', 'reproduction-adolescence', 'pollution'],
  9: ['cell-biomolecules', 'tissues', 'diversity-of-living', 'motion-laws-of-motion', 'gravitation-work-energy', 'sound', 'atoms-molecules', 'structure-of-atom', 'natural-resources'],
  10: ['life-processes', 'control-coordination', 'reproduction-heredity', 'light-reflection-refraction', 'electricity-magnetism', 'chemical-reactions-acids-bases-metals', 'periodic-classification', 'environment'],
  11: ['diversity-plant-human-physiology', 'cell-structure', 'biomolecules', 'thermodynamics', 'equilibrium-redox', 'kinematics-laws-of-motion', 'work-energy-power', 'gravitation', 'waves'],
  12: ['genetics-evolution', 'human-health-ecology', 'coordination-chemical-control', 'electrochemistry-solutions', 'p-block-d-block-organic', 'em-waves-optics', 'current-electricity', 'atoms-nuclei-communication']
};

const techTopics = {
  6: ['computer-basics', 'input-output-devices', 'typing-files', 'internet-safety', 'scratch-block-coding-intro', 'algorithms-flowcharts', 'spreadsheets-basics'],
  7: ['networks-internet', 'web-basics-urls-browsers', 'scratch-advanced', 'intro-html', 'problem-solving-algorithms', 'spreadsheet-formulas-charts', 'digital-citizenship'],
  8: ['html-css-basics', 'intro-js-events-variables', 'app-lab-thunkable-intro', 'data-representation-binary', 'versioning-concept', 'databases-tables-records', 'research-skills'],
  9: ['web-dev-html-css-js-fundamentals', 'python-basics', 'logic-loops-functions', 'data-structures-lists-dicts', 'apis-concept', 'spreadsheets-advanced', 'ui-ux-basics'],
  10: ['python-projects', 'web-forms-validation', 'databases-basics-crud', 'git-github-intro', 'cybersecurity-basics', 'cloud-hosting-concept', 'data-visualization'],
  11: ['oop-basics', 'sql-nosql', 'rest-apis', 'frontend-frameworks-concept', 'automation-scripts', 'data-analysis-pandas-intro', 'software-lifecycle'],
  12: ['full-stack-overview', 'authentication-authorization', 'deployment-ci-basics', 'performance-testing', 'ai-ml-intro', 'iot-concept', 'capstone-project-planning']
};

const enggTopics = {
  6: ['simple-machines', 'measurement-units', 'materials-strength', 'drawing-design-basics', 'energy-forms', 'recycling-upcycling', 'safety'],
  7: ['levers-gears-pulleys', 'bridges-structures', 'basic-circuits', 'renewable-energy-models', 'design-thinking', 'prototyping-paper-cardboard', 'tools-handling'],
  8: ['mechanisms-cams-ratchets', 'hydraulics-pneumatics-concept', 'sensors-actuators-intro', 'arduino-block-coding-concept', 'cad-basics-2d', 'project-documentation'],
  9: ['structural-engineering-trusses', 'dc-circuits-ohms-law', 'motors-generators-concept', 'electronics-components', 'cad-3d-basics', 'engineering-ethics', 'project-management'],
  10: ['control-systems-basics', 'robotics-intro', 'renewable-micro-projects', 'pcb-concept', 'materials-science-basics', 'failure-analysis', 'safety-standards'],
  11: ['circuit-design-simulation', 'microcontrollers-arduino-coding', 'cad-3d-printing', 'mechanics-forces-moments', 'thermodynamics-concept', 'project-planning-costing'],
  12: ['embedded-systems', 'iot-stacks', 'power-systems-basics', 'sustainable-design', 'manufacturing-methods', 'testing-validation']
};

// Enhanced Math Generator with grade-specific topics
const mathGenerator = (grade: number, topicId: string, topicName: string): Question[] => {
  const g = grade;
  
  // Grade 6 specific topics
  if (g === 6) {
    switch (topicId) {
      case 'number-systems':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `What type of number is 0?`, ['Natural', 'Whole', 'Negative', 'Fraction'], 1, 'Zero is a whole number'),
          fill(makeId('q', g, 'math', topicId, 2), `The smallest natural number is ___`, '1', 'Natural numbers start from 1'),
          mcq(makeId('q', g, 'math', topicId, 3), `Which set contains all natural numbers and zero?`, ['Natural', 'Whole', 'Integer', 'Rational'], 1),
          tf(makeId('q', g, 'math', topicId, 4), `Every natural number is a whole number.`, true, 'Natural numbers are part of whole numbers'),
          mcq(makeId('q', g, 'math', topicId, 5), `How many whole numbers are there between 5 and 8?`, ['1', '2', '3', '4'], 1, 'Only 6 and 7')
        ];
      case 'fractions-decimals':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `What is 3/4 as a decimal?`, ['0.25', '0.5', '0.75', '1.25'], 2),
          fill(makeId('q', g, 'math', topicId, 2), `0.5 as a fraction in lowest terms is ___`, '1/2'),
          mcq(makeId('q', g, 'math', topicId, 3), `Which is the largest: 0.8, 3/4, 0.75, 4/5?`, ['0.8', '3/4', '0.75', '4/5'], 0, '0.8 = 4/5 = 0.8'),
          tf(makeId('q', g, 'math', topicId, 4), `2.5 = 5/2`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `What is 1/4 + 1/2?`, ['1/6', '2/6', '3/4', '1/3'], 2, '1/4 + 2/4 = 3/4')
        ];
      case 'ratios-proportions':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `The ratio 6:9 in simplest form is:`, ['2:3', '3:2', '6:9', '1:2'], 0),
          fill(makeId('q', g, 'math', topicId, 2), `If 2:3 = 4:x, then x = ___`, '6'),
          mcq(makeId('q', g, 'math', topicId, 3), `In a class of 40 students, boys:girls = 3:2. Number of boys = ?`, ['16', '20', '24', '30'], 2, '3/(3+2) × 40 = 24'),
          tf(makeId('q', g, 'math', topicId, 4), `Ratios can be written as fractions.`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `If a:b = 2:5, what is b:a?`, ['2:5', '5:2', '3:7', '7:3'], 1)
        ];
      case 'percentages':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `50% of 200 is:`, ['50', '100', '150', '200'], 1),
          fill(makeId('q', g, 'math', topicId, 2), `25% as a fraction is ___`, '1/4'),
          mcq(makeId('q', g, 'math', topicId, 3), `What is 0.75 as a percentage?`, ['7.5%', '75%', '750%', '0.75%'], 1),
          tf(makeId('q', g, 'math', topicId, 4), `10% = 1/10`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `If 20% of a number is 40, the number is:`, ['8', '60', '200', '800'], 2, '40 ÷ 0.20 = 200')
        ];
      case 'basic-algebra':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `If x = 5, what is 2x + 3?`, ['8', '10', '13', '15'], 2),
          fill(makeId('q', g, 'math', topicId, 2), `Solve: x + 7 = 12, x = ___`, '5'),
          mcq(makeId('q', g, 'math', topicId, 3), `Which is a variable in the expression 3a + 5?`, ['3', 'a', '5', '+'], 1),
          tf(makeId('q', g, 'math', topicId, 4), `2x and 3x are like terms.`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `Simplify: 4y - 2y`, ['2y', '6y', '2', 'y'], 0)
        ];
      default:
        return generateGenericMathQuestions(g, topicId, topicName);
    }
  }
  
  // Grade 7 specific topics
  if (g === 7) {
    switch (topicId) {
      case 'integers-rational-numbers':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `(-5) × (-3) = ?`, ['-15', '15', '-8', '8'], 1, 'Negative × Negative = Positive'),
          fill(makeId('q', g, 'math', topicId, 2), `The additive inverse of -7 is ___`, '7'),
          mcq(makeId('q', g, 'math', topicId, 3), `Which is a rational number?`, ['π', '√2', '3/7', '√3'], 2, 'Can be expressed as p/q'),
          tf(makeId('q', g, 'math', topicId, 4), `Every integer is a rational number.`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `(-8) ÷ (-2) = ?`, ['4', '-4', '6', '-6'], 0)
        ];
      case 'simple-interest':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `SI = (P × R × T) ÷ ?`, ['10', '50', '100', '1000'], 2, 'Simple Interest formula'),
          fill(makeId('q', g, 'math', topicId, 2), `SI on ₹1000 at 5% for 2 years = ₹___`, '100', 'SI = 1000×5×2/100'),
          mcq(makeId('q', g, 'math', topicId, 3), `Amount = Principal + ?`, ['Rate', 'Time', 'Interest', 'Percentage'], 2),
          tf(makeId('q', g, 'math', topicId, 4), `Higher rate of interest gives more simple interest.`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `If P=₹500, R=10%, T=3 years, SI=?`, ['₹50', '₹150', '₹500', '₹1500'], 1)
        ];
      default:
        return generateGenericMathQuestions(g, topicId, topicName);
    }
  }
  
  // Grade 8 specific topics
  if (g === 8) {
    switch (topicId) {
      case 'exponents-powers':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `2³ × 2² = ?`, ['2⁵', '2⁶', '4⁵', '4⁶'], 0, 'Add exponents when multiplying same base'),
          fill(makeId('q', g, 'math', topicId, 2), `(3²)³ = 3___`, '6', 'Multiply exponents'),
          mcq(makeId('q', g, 'math', topicId, 3), `Any number to the power 0 equals:`, ['0', '1', 'The number itself', 'Undefined'], 1),
          tf(makeId('q', g, 'math', topicId, 4), `(-2)² = 4`, true, 'Negative squared is positive'),
          mcq(makeId('q', g, 'math', topicId, 5), `5⁴ ÷ 5² = ?`, ['5²', '5⁶', '5⁸', '5¹'], 0, 'Subtract exponents when dividing')
        ];
      case 'algebraic-identities':
        return [
          mcq(makeId('q', g, 'math', topicId, 1), `(a + b)² = ?`, ['a² + b²', 'a² + 2ab + b²', 'a² - b²', '2ab'], 1),
          fill(makeId('q', g, 'math', topicId, 2), `(a - b)² = a² - 2ab + ___`, 'b²'),
          mcq(makeId('q', g, 'math', topicId, 3), `a² - b² = ?`, ['(a+b)(a-b)', '(a-b)²', '(a+b)²', 'a²b²'], 0, 'Difference of squares'),
          tf(makeId('q', g, 'math', topicId, 4), `(x + 3)² = x² + 6x + 9`, true),
          mcq(makeId('q', g, 'math', topicId, 5), `Using (a+b)², expand (2x+1)²`, ['4x²+4x+1', '4x²+1', '2x²+2x+1', '4x²+2x+1'], 0)
        ];
      default:
        return generateGenericMathQuestions(g, topicId, topicName);
    }
  }
  
  // Grade 9-12 follow similar pattern...
  return generateAdvancedMathQuestions(g, topicId, topicName);
};

// Enhanced Science Generator
const scienceGenerator = (grade: number, topicId: string, topicName: string): Question[] => {
  const g = grade;
  
  if (g === 6) {
    switch (topicId) {
      case 'food-components':
        return [
          mcq(makeId('q', g, 'science', topicId, 1), `Which nutrient provides energy?`, ['Vitamins', 'Minerals', 'Carbohydrates', 'Water'], 2),
          fill(makeId('q', g, 'science', topicId, 2), `Proteins help in _____ and repair of body`, 'growth'),
          mcq(makeId('q', g, 'science', topicId, 3), `Scurvy is caused by deficiency of vitamin:`, ['A', 'B', 'C', 'D'], 2),
          tf(makeId('q', g, 'science', topicId, 4), `Water is essential for all life processes.`, true),
          mcq(makeId('q', g, 'science', topicId, 5), `Which food is rich in Vitamin D?`, ['Carrot', 'Fish', 'Rice', 'Apple'], 1)
        ];
      case 'light-shadow':
        return [
          mcq(makeId('q', g, 'science', topicId, 1), `Light travels in:`, ['Curved lines', 'Straight lines', 'Zigzag', 'Circles'], 1),
          fill(makeId('q', g, 'science', topicId, 2), `A dark area behind an opaque object is called a _____`, 'shadow'),
          mcq(makeId('q', g, 'science', topicId, 3), `Which material is transparent?`, ['Wood', 'Metal', 'Glass', 'Cloth'], 2),
          tf(makeId('q', g, 'science', topicId, 4), `We can see objects because they emit light.`, false, 'We see objects because they reflect light'),
          mcq(makeId('q', g, 'science', topicId, 5), `A pinhole camera forms an image which is:`, ['Erect', 'Inverted', 'Magnified', 'Colored'], 1)
        ];
      default:
        return generateGenericScienceQuestions(g, topicId, topicName);
    }
  }
  
  if (g === 7) {
    switch (topicId) {
      case 'acids-bases-salts':
        return [
          mcq(makeId('q', g, 'science', topicId, 1), `Acids taste:`, ['Sweet', 'Sour', 'Bitter', 'Salty'], 1),
          fill(makeId('q', g, 'science', topicId, 2), `Red litmus paper turns _____ in basic solution`, 'blue'),
          mcq(makeId('q', g, 'science', topicId, 3), `Common salt is:`, ['Acid', 'Base', 'Salt', 'Neutral'], 2),
          tf(makeId('q', g, 'science', topicId, 4), `Lemon juice is acidic in nature.`, true),
          mcq(makeId('q', g, 'science', topicId, 5), `Which is a natural indicator?`, ['Litmus', 'Turmeric', 'Phenolphthalein', 'Universal indicator'], 1)
        ];
      default:
        return generateGenericScienceQuestions(g, topicId, topicName);
    }
  }
  
  // Continue pattern for other grades...
  return generateGenericScienceQuestions(g, topicId, topicName);
};

// Enhanced Technology Generator
const techGenerator = (grade: number, topicId: string, topicName: string): Question[] => {
  const g = grade;
  
  if (g === 6) {
    switch (topicId) {
      case 'computer-basics':
        return [
          mcq(makeId('q', g, 'tech', topicId, 1), `Which is the brain of the computer?`, ['Monitor', 'CPU', 'Keyboard', 'Mouse'], 1),
          fill(makeId('q', g, 'tech', topicId, 2), `RAM stands for Random Access _____`, 'Memory'),
          mcq(makeId('q', g, 'tech', topicId, 3), `Which is an output device?`, ['Mouse', 'Keyboard', 'Monitor', 'Microphone'], 2),
          tf(makeId('q', g, 'tech', topicId, 4), `Software refers to physical parts of computer.`, false, 'Software refers to programs'),
          mcq(makeId('q', g, 'tech', topicId, 5), `Which stores data permanently?`, ['RAM', 'Hard Disk', 'Cache', 'Register'], 1)
        ];
      case 'scratch-block-coding-intro':
        return [
          mcq(makeId('q', g, 'tech', topicId, 1), `Scratch uses which type of programming?`, ['Text-based', 'Visual blocks', 'Voice commands', 'Gestures'], 1),
          fill(makeId('q', g, 'tech', topicId, 2), `The main character in Scratch is called a _____`, 'sprite'),
          mcq(makeId('q', g, 'tech', topicId, 3), `To repeat actions in Scratch, we use:`, ['If block', 'Loop block', 'Move block', 'Say block'], 1),
          tf(makeId('q', g, 'tech', topicId, 4), `Scripts in Scratch run from top to bottom.`, true),
          mcq(makeId('q', g, 'tech', topicId, 5), `The area where sprites perform is called:`, ['Script area', 'Stage', 'Palette', 'Backpack'], 1)
        ];
      default:
        return generateGenericTechQuestions(g, topicId, topicName);
    }
  }
  
  if (g === 9) {
    switch (topicId) {
      case 'python-basics':
        return [
          mcq(makeId('q', g, 'tech', topicId, 1), `Which symbol is used for comments in Python?`, ['#', '//', '/*', '--'], 0),
          fill(makeId('q', g, 'tech', topicId, 2), `To display output in Python, we use _____ function`, 'print'),
          mcq(makeId('q', g, 'tech', topicId, 3), `Python is case-sensitive. True or false?`, ['True', 'False'], 0),
          tf(makeId('q', g, 'tech', topicId, 4), `Variables in Python must be declared before use.`, false, 'Python variables are created when assigned'),
          mcq(makeId('q', g, 'tech', topicId, 5), `Which data type is used for whole numbers?`, ['float', 'int', 'str', 'bool'], 1)
        ];
      default:
        return generateGenericTechQuestions(g, topicId, topicName);
    }
  }
  
  return generateGenericTechQuestions(g, topicId, topicName);
};

// Enhanced Engineering Generator
const enggGenerator = (grade: number, topicId: string, topicName: string): Question[] => {
  const g = grade;
  
  if (g === 6) {
    switch (topicId) {
      case 'simple-machines':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `A bottle opener is an example of which simple machine?`, ['Lever', 'Pulley', 'Wedge', 'Screw'], 0),
          fill(makeId('q', g, 'engg', topicId, 2), `A machine that helps lift heavy objects using a rope is a _____`, 'pulley'),
          mcq(makeId('q', g, 'engg', topicId, 3), `An inclined plane makes work:`, ['Harder', 'Easier', 'Impossible', 'Same'], 1),
          tf(makeId('q', g, 'engg', topicId, 4), `Simple machines reduce the effort needed to do work.`, true),
          mcq(makeId('q', g, 'engg', topicId, 5), `A doorknob uses which simple machine principle?`, ['Lever', 'Wheel and axle', 'Pulley', 'Wedge'], 1)
        ];
      case 'energy-forms':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `Solar energy comes from:`, ['Moon', 'Sun', 'Stars', 'Wind'], 1),
          fill(makeId('q', g, 'engg', topicId, 2), `Energy stored in a battery is _____ energy`, 'chemical'),
          mcq(makeId('q', g, 'engg', topicId, 3), `A moving car has:`, ['Potential energy', 'Kinetic energy', 'Both', 'Neither'], 1),
          tf(makeId('q', g, 'engg', topicId, 4), `Energy can be created and destroyed.`, false, 'Energy can only be converted'),
          mcq(makeId('q', g, 'engg', topicId, 5), `Which is a renewable energy source?`, ['Coal', 'Oil', 'Wind', 'Natural gas'], 2)
        ];
      default:
        return generateGenericEnggQuestions(g, topicId, topicName);
    }
  }
  
  if (g === 9) {
    switch (topicId) {
      case 'dc-circuits-ohms-law':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `Ohm\'s law states V = I × ?`, ['P', 'R', 'W', 'C'], 1, 'Voltage = Current × Resistance'),
          fill(makeId('q', g, 'engg', topicId, 2), `If V = 12V and I = 2A, then R = ___Ω`, '6'),
          mcq(makeId('q', g, 'engg', topicId, 3), `Current flows from:`, ['Negative to positive', 'Positive to negative', 'Both directions', 'Neither'], 1),
          tf(makeId('q', g, 'engg', topicId, 4), `Higher resistance allows more current to flow.`, false, 'Higher resistance reduces current'),
          mcq(makeId('q', g, 'engg', topicId, 5), `Unit of current is:`, ['Volt', 'Ampere', 'Ohm', 'Watt'], 1)
        ];
      default:
        return generateGenericEnggQuestions(g, topicId, topicName);
    }
  }
  
  if (g === 12) {
    switch (topicId) {
      case 'electrical-technology':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `In a three-phase system, the phase difference between phases is:`, ['60°', '90°', '120°', '180°'], 2),
          fill(makeId('q', g, 'engg', topicId, 2), `The unit of electrical power is _____`, 'Watt'),
          mcq(makeId('q', g, 'engg', topicId, 3), `A transformer works on the principle of:`, ['Ohm\'s law', 'Faraday\'s law', 'Kirchhoff\'s law', 'Coulomb\'s law'], 1),
          tf(makeId('q', g, 'engg', topicId, 4), `AC current changes direction periodically.`, true),
          mcq(makeId('q', g, 'engg', topicId, 5), `Which device converts AC to DC?`, ['Transformer', 'Rectifier', 'Amplifier', 'Oscillator'], 1)
        ];
      case 'electronics-technology':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `A diode allows current to flow in:`, ['One direction only', 'Both directions', 'No direction', 'Random direction'], 0),
          fill(makeId('q', g, 'engg', topicId, 2), `A transistor has _____ terminals`, 'three'),
          mcq(makeId('q', g, 'engg', topicId, 3), `Which is a digital logic gate?`, ['AND', 'OR', 'NOT', 'All of the above'], 3),
          tf(makeId('q', g, 'engg', topicId, 4), `An amplifier increases signal strength.`, true),
          mcq(makeId('q', g, 'engg', topicId, 5), `In binary, 1010 represents:`, ['8', '10', '12', '14'], 1)
        ];
      case 'engineering-graphics':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `In orthographic projection, how many views are typically shown?`, ['1', '2', '3', '4'], 2),
          fill(makeId('q', g, 'engg', topicId, 2), `The symbol for diameter is _____`, 'Ø'),
          mcq(makeId('q', g, 'engg', topicId, 3), `Which line type represents hidden features?`, ['Continuous thick', 'Dashed', 'Dotted', 'Chain'], 1),
          tf(makeId('q', g, 'engg', topicId, 4), `Isometric projection shows 3D objects in 2D.`, true),
          mcq(makeId('q', g, 'engg', topicId, 5), `CAD stands for:`, ['Computer Aided Design', 'Computer Assisted Drawing', 'Computer Aided Drafting', 'All of the above'], 3)
        ];
      case 'information-technology':
        return [
          mcq(makeId('q', g, 'engg', topicId, 1), `Which is a programming language?`, ['HTML', 'CSS', 'Python', 'All of the above'], 2),
          fill(makeId('q', g, 'engg', topicId, 2), `RAM stands for Random Access _____`, 'Memory'),
          mcq(makeId('q', g, 'engg', topicId, 3), `Which is a database management system?`, ['MySQL', 'Oracle', 'PostgreSQL', 'All of the above'], 3),
          tf(makeId('q', g, 'engg', topicId, 4), `Cloud computing allows access to resources over the internet.`, true),
          mcq(makeId('q', g, 'engg', topicId, 5), `Which protocol is used for web browsing?`, ['FTP', 'HTTP', 'SMTP', 'TCP'], 1)
        ];
      default:
        return generateGenericEnggQuestions(g, topicId, topicName);
    }
  }
  
  return generateGenericEnggQuestions(g, topicId, topicName);
};

// Helper functions for generic questions
function generateGenericMathQuestions(grade: number, topicId: string, topicName: string): Question[] {
  return [
    mcq(makeId('q', grade, 'math', topicId, 1), `${topicName}: What is ${grade} + ${grade}?`, [`${grade}`, `${grade*2}`, `${grade+1}`, `${grade*3}`], 1),
    fill(makeId('q', grade, 'math', topicId, 2), `${topicName}: 10 × ${grade} = ___`, `${10*grade}`),
    mcq(makeId('q', grade, 'math', topicId, 3), `${topicName}: Which is larger?`, [`${grade}`, `${grade+1}`, `${grade-1}`, 'All equal'], 1),
    tf(makeId('q', grade, 'math', topicId, 4), `${topicName}: ${grade} is a positive number.`, grade > 0),
    mcq(makeId('q', grade, 'math', topicId, 5), `${topicName}: Half of ${grade*2} is:`, [`${grade}`, `${grade+1}`, `${grade-1}`, `${grade*2}`], 0)
  ];
}

function generateAdvancedMathQuestions(grade: number, topicId: string, topicName: string): Question[] {
  // Handle grades 9-12 with more advanced topics
  if (grade >= 9 && topicId.includes('polynomial')) {
    return [
      mcq(makeId('q', grade, 'math', topicId, 1), `${topicName}: Degree of polynomial 3x³ + 2x - 1 is:`, ['1', '2', '3', '4'], 2),
      fill(makeId('q', grade, 'math', topicId, 2), `${topicName}: A polynomial of degree 2 is called _____`, 'quadratic'),
      mcq(makeId('q', grade, 'math', topicId, 3), `${topicName}: Zero of polynomial p(x) = x - 5 is:`, ['0', '5', '-5', '1'], 1),
      tf(makeId('q', grade, 'math', topicId, 4), `${topicName}: x² + 1 has real zeros.`, false, 'No real solutions for x² = -1'),
      mcq(makeId('q', grade, 'math', topicId, 5), `${topicName}: If p(x) = x² - 4, then p(2) = ?`, ['0', '4', '-4', '8'], 0)
    ];
  }
  
  if (grade >= 10 && topicId.includes('trigonometry')) {
    return [
      mcq(makeId('q', grade, 'math', topicId, 1), `${topicName}: sin²θ + cos²θ = ?`, ['0', '1', 'sin θ', 'cos θ'], 1),
      fill(makeId('q', grade, 'math', topicId, 2), `${topicName}: sin 90° = ___`, '1'),
      mcq(makeId('q', grade, 'math', topicId, 3), `${topicName}: tan θ = sin θ ÷ ?`, ['sin θ', 'cos θ', 'tan θ', '1'], 1),
      tf(makeId('q', grade, 'math', topicId, 4), `${topicName}: cos 0° = 1`, true),
      mcq(makeId('q', grade, 'math', topicId, 5), `${topicName}: Value of sin 30° is:`, ['1/2', '√3/2', '1', '√2/2'], 0)
    ];
  }
  
  return generateGenericMathQuestions(grade, topicId, topicName);
}

function generateGenericScienceQuestions(grade: number, topicId: string, topicName: string): Question[] {
  return [
    mcq(makeId('q', grade, 'science', topicId, 1), `${topicName}: Which is a science process?`, ['Observation', 'Guessing', 'Believing', 'Ignoring'], 0),
    tf(makeId('q', grade, 'science', topicId, 2), `${topicName}: Hypotheses can be tested through experiments.`, true),
    fill(makeId('q', grade, 'science', topicId, 3), `${topicName}: The study of living things is called _____`, 'biology'),
    mcq(makeId('q', grade, 'science', topicId, 4), `${topicName}: Which state of matter has fixed shape?`, ['Solid', 'Liquid', 'Gas', 'Plasma'], 0),
    tf(makeId('q', grade, 'science', topicId, 5), `${topicName}: Water boils at 100°C at sea level.`, true)
  ];
}

function generateGenericTechQuestions(grade: number, topicId: string, topicName: string): Question[] {
  return [
    mcq(makeId('q', grade, 'tech', topicId, 1), `${topicName}: Which is an input device?`, ['Printer', 'Monitor', 'Mouse', 'Speaker'], 2),
    tf(makeId('q', grade, 'tech', topicId, 2), `${topicName}: Internet connects computers worldwide.`, true),
    fill(makeId('q', grade, 'tech', topicId, 3), `${topicName}: WWW stands for World Wide _____`, 'Web'),
    mcq(makeId('q', grade, 'tech', topicId, 4), `${topicName}: HTML is used for creating:`, ['Databases', 'Web pages', 'Music', 'Games'], 1),
    tf(makeId('q', grade, 'tech', topicId, 5), `${topicName}: Programming requires logical thinking.`, true)
  ];
}

function generateGenericEnggQuestions(grade: number, topicId: string, topicName: string): Question[] {
  return [
    mcq(makeId('q', grade, 'engg', topicId, 1), `${topicName}: Engineering primarily involves:`, ['Art', 'Design and problem solving', 'Sports', 'Music'], 1),
    tf(makeId('q', grade, 'engg', topicId, 2), `${topicName}: Safety is important in engineering projects.`, true),
    fill(makeId('q', grade, 'engg', topicId, 3), `${topicName}: The SI unit of force is _____`, 'Newton'),
    mcq(makeId('q', grade, 'engg', topicId, 4), `${topicName}: Which is a renewable energy source?`, ['Coal', 'Solar', 'Oil', 'Gas'], 1),
    tf(makeId('q', grade, 'engg', topicId, 5), `${topicName}: Engineers must consider environmental impact.`, true)
  ];
}

// Additional grade-specific implementations for completeness
function getGradeSpecificMathQuestions(grade: number, topicId: string, topicName: string): Question[] {
  // Grade 10 specific advanced topics
  if (grade === 10) {
    if (topicId === 'quadratic-equations') {
      return [
        mcq(makeId('q', grade, 'math', topicId, 1), `Standard form of quadratic equation is:`, ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ + b = 0', 'ax + by = c'], 1),
        fill(makeId('q', grade, 'math', topicId, 2), `Discriminant of ax² + bx + c = 0 is b² - ___`, '4ac'),
        mcq(makeId('q', grade, 'math', topicId, 3), `If discriminant > 0, quadratic equation has:`, ['No real roots', 'One real root', 'Two real roots', 'Complex roots'], 2),
        tf(makeId('q', grade, 'math', topicId, 4), `x² - 5x + 6 = 0 has roots x = 2, 3`, true),
        mcq(makeId('q', grade, 'math', topicId, 5), `Sum of roots of x² - 7x + 12 = 0 is:`, ['7', '-7', '12', '-12'], 0, 'Sum = -b/a = 7/1 = 7')
      ];
    }
    
    if (topicId === 'arithmetic-progressions') {
      return [
        mcq(makeId('q', grade, 'math', topicId, 1), `In AP, if a = 3, d = 4, then 5th term is:`, ['15', '19', '23', '27'], 1, 'a₅ = a + 4d = 3 + 16 = 19'),
        fill(makeId('q', grade, 'math', topicId, 2), `Common difference of AP: 2, 5, 8, 11... is ___`, '3'),
        mcq(makeId('q', grade, 'math', topicId, 3), `Sum of first n terms of AP is:`, ['n/2[a + l]', 'n[a + l]', 'n/2[2a + (n-1)d]', 'Both A and C'], 3),
        tf(makeId('q', grade, 'math', topicId, 4), `In AP, middle term is arithmetic mean of terms around it.`, true),
        mcq(makeId('q', grade, 'math', topicId, 5), `Which sequence is NOT an AP?`, ['1,3,5,7...', '2,4,6,8...', '1,4,9,16...', '10,7,4,1...'], 2, 'Squares are not in AP')
      ];
    }
  }
  
  // Grade 11-12 advanced topics
  if (grade >= 11) {
    if (topicId.includes('derivatives') || topicId.includes('calculus')) {
      return [
        mcq(makeId('q', grade, 'math', topicId, 1), `Derivative of x³ is:`, ['3x²', 'x²', '3x', 'x³/3'], 0),
        fill(makeId('q', grade, 'math', topicId, 2), `d/dx(sin x) = _____`, 'cos x'),
        mcq(makeId('q', grade, 'math', topicId, 3), `Derivative represents:`, ['Area', 'Volume', 'Rate of change', 'Distance'], 2),
        tf(makeId('q', grade, 'math', topicId, 4), `Derivative of constant is zero.`, true),
        mcq(makeId('q', grade, 'math', topicId, 5), `If f(x) = x², then f'(2) = ?`, ['2', '4', '8', '1'], 1, 'f\'(x) = 2x, so f\'(2) = 4')
      ];
    }
  }
  
  return generateAdvancedMathQuestions(grade, topicId, topicName);
}

function getGradeSpecificScienceQuestions(grade: number, topicId: string, topicName: string): Question[] {
  // Grade 8 specific
  if (grade === 8 && topicId === 'cell-microorganisms') {
    return [
      mcq(makeId('q', grade, 'science', topicId, 1), `Smallest unit of life is:`, ['Tissue', 'Cell', 'Organ', 'Organism'], 1),
      fill(makeId('q', grade, 'science', topicId, 2), `Cell wall is present in _____ cells`, 'plant'),
      mcq(makeId('q', grade, 'science', topicId, 3), `Which microorganism causes malaria?`, ['Bacteria', 'Virus', 'Protozoa', 'Fungi'], 2),
      tf(makeId('q', grade, 'science', topicId, 4), `All microorganisms are harmful.`, false, 'Many are beneficial'),
      mcq(makeId('q', grade, 'science', topicId, 5), `Prokaryotic cells lack:`, ['Cell membrane', 'Nucleus', 'Cytoplasm', 'DNA'], 1)
    ];
  }
  
  // Grade 10 specific
  if (grade === 10 && topicId === 'life-processes') {
    return [
      mcq(makeId('q', grade, 'science', topicId, 1), `Which is NOT a life process?`, ['Nutrition', 'Respiration', 'Reproduction', 'Crystallization'], 3),
      fill(makeId('q', grade, 'science', topicId, 2), `Process of breaking down glucose to release energy is _____`, 'respiration'),
      mcq(makeId('q', grade, 'science', topicId, 3), `Photosynthesis occurs in:`, ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Ribosomes'], 1),
      tf(makeId('q', grade, 'science', topicId, 4), `All living organisms need energy to survive.`, true),
      mcq(makeId('q', grade, 'science', topicId, 5), `Excretion helps in:`, ['Growth', 'Removing waste', 'Reproduction', 'Movement'], 1)
    ];
  }
  
  return generateGenericScienceQuestions(grade, topicId, topicName);
}

// The master function that chooses generator based on subjectId
export const getQuestions = (grade: number, subjectId: string, topicId: string, topicName?: string): Question[] => {
  const name = topicName || topicId.replace(/[-_]/g, ' ');
  const g = Math.max(6, Math.min(12, Math.floor(grade))); // clamp to 6..12

  // Always generate based on selected subject; do not block if internal lists differ
  switch (subjectId) {
    case 'mathematics':
      return mathGenerator(g, topicId, name);
    case 'science':
      return scienceGenerator(g, topicId, name);
    case 'computer_science': // Redirected to Engineering
      return enggGenerator(g, topicId, name);
    case 'engineering':
      return enggGenerator(g, topicId, name);
    default:
      return generateGenericQuestionsForSubject(g, subjectId, topicId, name);
  }
};

function generateGenericQuestionsForSubject(grade: number, subjectId: string, topicId: string, topicName: string): Question[] {
  switch (subjectId) {
    case 'mathematics':
      return generateGenericMathQuestions(grade, topicId, topicName);
    case 'science':
      return generateGenericScienceQuestions(grade, topicId, topicName);
    case 'computer_science':
      return generateGenericEnggQuestions(grade, topicId, topicName);
    case 'engineering':
      return generateGenericEnggQuestions(grade, topicId, topicName);
    default:
      return [
        mcq(makeId('q', grade, 'gen', topicId, 1), `${topicName}: General question 1`, ['A','B','C','D'], 0),
        tf(makeId('q', grade, 'gen', topicId, 2), `${topicName}: Is this statement correct?`, true),
        fill(makeId('q', grade, 'gen', topicId, 3), `${topicName}: Complete this: _____`, 'answer'),
        mcq(makeId('q', grade, 'gen', topicId, 4), `${topicName}: Select correct option`, ['1','2','3','4'], 1),
        tf(makeId('q', grade, 'gen', topicId, 5), `${topicName}: Final statement`, false)
      ];
  }
}

// Utility function to get available topics for a grade and subject
export const getAvailableTopics = (grade: number, subjectId: string): string[] => {
  const g = Math.max(6, Math.min(12, Math.floor(grade)));
  
  switch (subjectId) {
    case 'mathematics':
      return mathTopics[g] || [];
    case 'science':
      return scienceTopics[g] || [];
    case 'computer_science':
      return techTopics[g] || [];
    case 'engineering':
      return enggTopics[g] || [];
    default:
      return [];
  }
};

// Utility function to validate if a topic exists for a grade and subject
export const isValidTopic = (grade: number, subjectId: string, topicId: string): boolean => {
  const availableTopics = getAvailableTopics(grade, subjectId);
  return availableTopics.includes(topicId);
};