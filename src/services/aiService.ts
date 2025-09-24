interface AIResponse {
  content: string;
  subject: string;
  topic?: string;
  examples?: string[];
  relatedConcepts?: string[];
}

interface QuestionContext {
  grade: number;
  language: string;
  subject?: string;
  previousMessages?: string[];
}

export class AIService {
  private static instance: AIService;
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private getGradeAppropriateContent(grade: number, concept: string): string {
    const gradeLevels = {
      'elementary': [6, 7, 8],
      'middle': [9, 10],
      'high': [11, 12]
    };

    const level = Object.entries(gradeLevels).find(([_, grades]) => 
      grades.includes(grade)
    )?.[0] || 'elementary';

    return this.getContentByLevel(level, concept);
  }

  private getContentByLevel(level: string, concept: string): string {
    const contentMap: Record<string, Record<string, string>> = {
      'elementary': {
        'algebra': 'Algebra is like solving puzzles with letters instead of numbers. For example, if x + 3 = 7, then x = 4.',
        'geometry': 'Geometry is about shapes and spaces. We learn about triangles, circles, squares and how to measure them.',
        'fractions': 'Fractions are parts of a whole. If you have a pizza cut into 4 pieces and eat 1 piece, you ate 1/4 of the pizza.',
        'photosynthesis': 'Photosynthesis is how plants make their food using sunlight, water, and air. It\'s like a kitchen for plants!',
        'gravity': 'Gravity is the invisible force that pulls things down. That\'s why when you drop something, it falls to the ground.',
        'food': 'Food gives us energy and helps our body grow. There are different types of food groups: carbohydrates, proteins, fats, and vitamins & minerals.',
        'nutrition': 'Nutrition is about eating the right foods to keep our body healthy and strong. Different foods give us different nutrients.',
        'programming': 'Programming is like giving instructions to a computer. It\'s like teaching a robot how to do tasks step by step.',
        'engineering': 'Engineering is about solving problems and building things. Engineers design bridges, cars, and even video games!'
      },
      'middle': {
        'algebra': 'Algebra involves working with variables and equations. We solve for unknown values using mathematical operations and properties.',
        'geometry': 'Geometry covers angles, triangles, circles, and spatial relationships. We use theorems and proofs to understand shapes.',
        'chemistry': 'Chemistry studies matter and its changes. We learn about atoms, molecules, chemical reactions, and the periodic table.',
        'physics': 'Physics explains motion, forces, energy, and matter. We study Newton\'s laws, electricity, magnetism, and waves.',
        'programming': 'Programming involves writing code in languages like Python or JavaScript to create software, websites, and applications.',
        'engineering': 'Engineering applies science and math to design solutions. Different branches include mechanical, electrical, and civil engineering.'
      },
      'high': {
        'calculus': 'Calculus studies rates of change and accumulation. It includes derivatives, integrals, and their applications in real-world problems.',
        'trigonometry': 'Trigonometry deals with angles and triangles. We use sine, cosine, tangent functions to solve complex geometric problems.',
        'organic_chemistry': 'Organic chemistry focuses on carbon-based compounds. We study molecular structures, reactions, and synthesis of organic molecules.',
        'quantum_physics': 'Quantum physics explores the behavior of matter and energy at atomic and subatomic levels, including wave-particle duality.',
        'algorithms': 'Algorithms are step-by-step procedures for solving problems. We analyze their efficiency using Big O notation and complexity theory.',
        'engineering_design': 'Engineering design involves systematic problem-solving, prototyping, testing, and optimization of technical solutions.'
      }
    };

    return contentMap[level]?.[concept] || `Let me explain ${concept} in a way that's appropriate for your grade level.`;
  }

  private detectSubjectAndTopic(message: string): { subject: string; topic: string } {
    const lowerMessage = message.toLowerCase();
    
    // Mathematics topics
    if (lowerMessage.includes('algebra') || lowerMessage.includes('equation') || lowerMessage.includes('variable')) {
      return { subject: 'mathematics', topic: 'algebra' };
    }
    if (lowerMessage.includes('geometry') || lowerMessage.includes('triangle') || lowerMessage.includes('circle') || lowerMessage.includes('angle')) {
      return { subject: 'mathematics', topic: 'geometry' };
    }
    if (lowerMessage.includes('calculus') || lowerMessage.includes('derivative') || lowerMessage.includes('integral')) {
      return { subject: 'mathematics', topic: 'calculus' };
    }
    if (lowerMessage.includes('trigonometry') || lowerMessage.includes('sin') || lowerMessage.includes('cos') || lowerMessage.includes('tan')) {
      return { subject: 'mathematics', topic: 'trigonometry' };
    }
    if (lowerMessage.includes('fraction') || lowerMessage.includes('decimal') || lowerMessage.includes('percentage')) {
      return { subject: 'mathematics', topic: 'fractions' };
    }
    
    // Science topics
    if (lowerMessage.includes('photosynthesis') || lowerMessage.includes('plant') || lowerMessage.includes('chlorophyll')) {
      return { subject: 'science', topic: 'photosynthesis' };
    }
    if (lowerMessage.includes('gravity') || lowerMessage.includes('force') || lowerMessage.includes('newton')) {
      return { subject: 'science', topic: 'gravity' };
    }
    if (lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('carbohydrate') || lowerMessage.includes('protein') || lowerMessage.includes('vitamin')) {
      return { subject: 'science', topic: 'food' };
    }
    if (lowerMessage.includes('atom') || lowerMessage.includes('molecule') || lowerMessage.includes('element')) {
      return { subject: 'science', topic: 'chemistry' };
    }
    if (lowerMessage.includes('energy') || lowerMessage.includes('motion') || lowerMessage.includes('wave')) {
      return { subject: 'science', topic: 'physics' };
    }
    if (lowerMessage.includes('cell') || lowerMessage.includes('dna') || lowerMessage.includes('biology')) {
      return { subject: 'science', topic: 'biology' };
    }
    
    // Technology topics (redirected to Engineering)
    if (lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('python') || lowerMessage.includes('javascript')) {
      return { subject: 'engineering', topic: 'technology' };
    }
    if (lowerMessage.includes('algorithm') || lowerMessage.includes('sorting') || lowerMessage.includes('search')) {
      return { subject: 'engineering', topic: 'technology' };
    }
    if (lowerMessage.includes('database') || lowerMessage.includes('sql') || lowerMessage.includes('data')) {
      return { subject: 'engineering', topic: 'technology' };
    }
    
    // Engineering topics
    if (lowerMessage.includes('engineering') || lowerMessage.includes('design') || lowerMessage.includes('build')) {
      return { subject: 'engineering', topic: 'engineering_design' };
    }
    if (lowerMessage.includes('robot') || lowerMessage.includes('automation') || lowerMessage.includes('machine')) {
      return { subject: 'engineering', topic: 'robotics' };
    }
    
    // Default subject detection
    if (lowerMessage.includes('math') || lowerMessage.includes('गणित')) {
      return { subject: 'mathematics', topic: 'general' };
    }
    if (lowerMessage.includes('science') || lowerMessage.includes('विज्ञान')) {
      return { subject: 'science', topic: 'general' };
    }
    if (lowerMessage.includes('computer') || lowerMessage.includes('कंप्यूटर')) {
      return { subject: 'computer_science', topic: 'general' };
    }
    if (lowerMessage.includes('engineering') || lowerMessage.includes('इंजीनियरिंग')) {
      return { subject: 'engineering', topic: 'general' };
    }
    
    return { subject: 'general', topic: 'general' };
  }

  private getExamples(topic: string, language: string): string[] {
    const examples: Record<string, Record<string, string[]>> = {
      'algebra': {
        'en': [
          'If x + 5 = 12, then x = 7',
          'If 2y = 10, then y = 5',
          'If 3z - 4 = 8, then z = 4'
        ],
        'hi': [
          'यदि x + 5 = 12, तो x = 7',
          'यदि 2y = 10, तो y = 5',
          'यदि 3z - 4 = 8, तो z = 4'
        ]
      },
      'geometry': {
        'en': [
          'Area of rectangle = length × width',
          'Area of triangle = ½ × base × height',
          'Circumference of circle = 2πr'
        ],
        'hi': [
          'आयत का क्षेत्रफल = लंबाई × चौड़ाई',
          'त्रिभुज का क्षेत्रफल = ½ × आधार × ऊंचाई',
          'वृत्त की परिधि = 2πr'
        ]
      },
      'programming': {
        'en': [
          'print("Hello, World!")',
          'for i in range(5): print(i)',
          'if age >= 18: print("Adult")'
        ],
        'hi': [
          'print("नमस्ते, दुनिया!")',
          'for i in range(5): print(i)',
          'if age >= 18: print("वयस्क")'
        ]
      },
      'food': {
        'en': [
          'Carbohydrates: Rice, Bread, Pasta (give us energy)',
          'Proteins: Fish, Chicken, Eggs (help us grow)',
          'Fats: Nuts, Avocado, Olive Oil (store energy)',
          'Vitamins & Minerals: Fruits, Vegetables (keep us healthy)'
        ],
        'hi': [
          'कार्बोहाइड्रेट: चावल, रोटी, पास्ता (हमें ऊर्जा देते हैं)',
          'प्रोटीन: मछली, चिकन, अंडे (हमें बढ़ने में मदद करते हैं)',
          'वसा: नट्स, एवोकाडो, जैतून का तेल (ऊर्जा संग्रहीत करते हैं)',
          'विटामिन और खनिज: फल, सब्जियां (हमें स्वस्थ रखते हैं)'
        ]
      }
    };

    return examples[topic]?.[language] || [];
  }

  private getRelatedConcepts(topic: string, language: string): string[] {
    const related: Record<string, Record<string, string[]>> = {
      'algebra': {
        'en': ['Linear Equations', 'Quadratic Equations', 'Polynomials', 'Functions'],
        'hi': ['रैखिक समीकरण', 'द्विघात समीकरण', 'बहुपद', 'फलन']
      },
      'geometry': {
        'en': ['Angles', 'Triangles', 'Circles', 'Polygons', 'Coordinate Geometry'],
        'hi': ['कोण', 'त्रिभुज', 'वृत्त', 'बहुभुज', 'निर्देशांक ज्यामिति']
      },
      'programming': {
        'en': ['Variables', 'Loops', 'Conditionals', 'Functions', 'Data Structures'],
        'hi': ['चर', 'लूप', 'सशर्त', 'फलन', 'डेटा संरचना']
      },
      'food': {
        'en': ['Nutrition', 'Balanced Diet', 'Food Groups', 'Healthy Eating', 'Digestion'],
        'hi': ['पोषण', 'संतुलित आहार', 'भोजन समूह', 'स्वस्थ भोजन', 'पाचन']
      }
    };

    return related[topic]?.[language] || [];
  }

  public async generateResponse(message: string, context: QuestionContext): Promise<AIResponse> {
    const { subject, topic } = this.detectSubjectAndTopic(message);
    const gradeAppropriateContent = this.getGradeAppropriateContent(context.grade, topic);
    const examples = this.getExamples(topic, context.language);
    const relatedConcepts = this.getRelatedConcepts(topic, context.language);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      'en': {
        'mathematics': `Great question about mathematics! ${gradeAppropriateContent} This is a fundamental concept that builds the foundation for more advanced topics.`,
        'science': `That's an excellent science question! ${gradeAppropriateContent} Understanding this concept helps explain many phenomena in our daily lives.`,
        'engineering': `That's a great engineering question! ${gradeAppropriateContent} Engineers use these principles to solve real-world problems and create innovative solutions.`,
        'general': `I'd be happy to help you with that! ${gradeAppropriateContent} Feel free to ask more specific questions about any STEM topic.`
      },
      'hi': {
        'mathematics': `गणित के बारे में बेहतरीन सवाल! ${gradeAppropriateContent} यह एक मौलिक अवधारणा है जो अधिक उन्नत विषयों की नींव रखती है।`,
        'science': `यह विज्ञान का एक उत्कृष्ट सवाल है! ${gradeAppropriateContent} इस अवधारणा को समझना हमारे दैनिक जीवन में कई घटनाओं की व्याख्या करने में मदद करता है।`,
        'engineering': `यह इंजीनियरिंग का एक बेहतरीन सवाल है! ${gradeAppropriateContent} इंजीनियर वास्तविक दुनिया की समस्याओं को हल करने और नवीन समाधान बनाने के लिए इन सिद्धांतों का उपयोग करते हैं।`,
        'general': `मैं आपकी मदद करने में खुशी होगी! ${gradeAppropriateContent} किसी भी STEM विषय के बारे में अधिक विशिष्ट सवाल पूछने में संकोच न करें।`
      }
    };

    const content = responses[context.language as keyof typeof responses]?.[subject as keyof typeof responses.en] || 
                   responses['en']['general'];

    return {
      content,
      subject,
      topic,
      examples: examples.length > 0 ? examples : undefined,
      relatedConcepts: relatedConcepts.length > 0 ? relatedConcepts : undefined
    };
  }
}

export const aiService = AIService.getInstance();
