# STEM AI Chatbot

## Overview

The STEM AI Chatbot is an intelligent assistant integrated into the Learn Spark Rural educational platform. It helps students with questions about Science, Technology, Engineering, and Mathematics (STEM) subjects.

## Features

### 🤖 Intelligent Responses
- **Subject Detection**: Automatically detects the subject area (Mathematics, Science, Computer Science, Engineering) from student questions
- **Grade-Appropriate Content**: Provides explanations tailored to the student's grade level (6-12)
- **Multilingual Support**: Supports both English and Hindi languages
- **Contextual Examples**: Includes relevant examples and related concepts

### 💬 Interactive Chat Interface
- **Real-time Messaging**: Instant responses with typing indicators
- **Message History**: Maintains conversation context
- **Subject Icons**: Visual indicators for different STEM subjects
- **Minimizable**: Can be minimized to a floating button when not in use

### 🎯 Educational Focus
- **STEM Topics Covered**:
  - **Mathematics**: Algebra, Geometry, Calculus, Trigonometry, Fractions
  - **Science**: Physics, Chemistry, Biology, Photosynthesis, Gravity
  - **Computer Science**: Programming, Algorithms, Databases
  - **Engineering**: Design, Robotics, Problem-solving

## Usage

### For Students

1. **Access the Chatbot**: The chatbot appears as a floating button in the bottom-right corner of the student portal
2. **Ask Questions**: Type your STEM-related questions in natural language
3. **Get Help**: Receive detailed explanations with examples and related concepts
4. **Minimize/Expand**: Click the minimize button to collapse the chat, or the floating button to reopen

### Example Questions

**Mathematics:**
- "What is algebra?"
- "How do I solve quadratic equations?"
- "Explain fractions to me"

**Science:**
- "How does photosynthesis work?"
- "What is gravity?"
- "Explain chemical reactions"

**Computer Science:**
- "How do I learn programming?"
- "What are algorithms?"
- "Explain data structures"

**Engineering:**
- "What is engineering?"
- "How do engineers solve problems?"
- "What is robotics?"

## Technical Implementation

### Components

1. **STEMChatbot** (`src/components/chatbot/STEMChatbot.tsx`)
   - Main chat interface component
   - Handles message display and user input
   - Manages chat state and UI interactions

2. **AIService** (`src/services/aiService.ts`)
   - Core AI logic for generating responses
   - Subject and topic detection
   - Grade-appropriate content generation
   - Example and related concept suggestions

3. **ChatbotToggle** (`src/components/chatbot/ChatbotToggle.tsx`)
   - Reusable toggle button component
   - Can be integrated into any view

### Integration Points

The chatbot is integrated into:
- **Student Dashboard**: Available on the main dashboard
- **Assignments View**: Accessible while viewing assignments
- **Game Views**: Available during all educational games
- **All Learning Activities**: Consistently available across the platform

### Customization

The chatbot can be customized by:
- **Grade Level**: Automatically adapts to student's grade
- **Language**: Supports multiple languages (currently English and Hindi)
- **Subject Focus**: Can be configured for specific subject areas
- **Response Style**: Adjustable explanation complexity

## Future Enhancements

### Planned Features
- **Voice Input**: Speech-to-text for questions
- **Voice Output**: Text-to-speech for responses
- **Image Recognition**: Ability to analyze and explain images
- **Step-by-Step Solutions**: Detailed problem-solving workflows
- **Progress Tracking**: Monitor student learning patterns
- **Teacher Integration**: Allow teachers to customize responses

### Advanced AI Features
- **Real AI Integration**: Connect to external AI services (OpenAI, etc.)
- **Personalized Learning**: Adapt responses based on student performance
- **Multimedia Responses**: Include diagrams, videos, and interactive content
- **Collaborative Learning**: Enable peer-to-peer question sharing

## Configuration

### Environment Variables
```env
# Optional: External AI service configuration
AI_SERVICE_URL=your_ai_service_url
AI_API_KEY=your_api_key
```

### Customization Options
```typescript
// In STEMChatbot component
interface STEMChatbotProps {
  studentGrade?: number;        // Grade level (6-12)
  currentLanguage?: string;     // Language preference
  onClose?: () => void;        // Close handler
  isMinimized?: boolean;       // Minimized state
  onToggleMinimize?: () => void; // Minimize toggle
}
```

## Support

For technical support or feature requests related to the STEM Chatbot, please refer to the main project documentation or contact the development team.

## License

This chatbot feature is part of the Learn Spark Rural project and follows the same licensing terms.
