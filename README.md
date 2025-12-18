# Smart Tutor UI - Exam Mode

A responsive Exam Mode interface with an integrated AI helper (Jojo) for students. Built with Next.js, React, and Tailwind CSS.

## Features

- **Question Display**: Clean rendering of mathematical expressions using LaTeX (react-katex)
- **Responsive Layout**: 
  - Desktop: Split-screen (60% question, 40% chat)
  - Mobile: Question by default with floating action button to open chat drawer
- **Smooth Animations**: Slide-up and slide-down animations for mobile chat drawer with backdrop fade
- **AI Chat Helper**: Mock AI assistant with animated "Thinking..." states and auto-scrolling chat
- **Quick Actions**: One-click buttons for hints and step-by-step solutions

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-tutor-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

   **Note**: The dev script uses Turbopack (Next.js 16's default bundler) for faster builds and hot reloading.

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
smart-tutor-ui/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main ExamMode page
│   └── globals.css         # Global styles (Tailwind v4)
├── components/             # Atomic Design components
│   ├── atoms/              # Basic UI elements
│   ├── molecules/          # Composite components
│   └── organisms/          # Complex components
├── domain/                 # Domain layer (business logic)
│   ├── entities/           # Core business entities
│   ├── value-objects/      # Immutable value objects
│   └── services/          # Domain services
├── src/                    # Implementation layers
│   ├── application/        # Use cases & interfaces
│   ├── infrastructure/     # External implementations
│   ├── presentation/       # UI hooks & DI container
│   └── store/              # Zustand state management
├── shared/                 # Shared utilities
│   └── data/               # Mock data
└── README.md
```

## Assumptions

1. **Math Parsing**: The current implementation uses basic string replacements for the specific question format. For production, a more robust parser or NLP service would be needed.

2. **Responsive Breakpoint**: Mobile layout is triggered at 768px (md breakpoint in Tailwind).

3. **Chat State**: On desktop, the chat is open by default. On mobile, it's hidden until the user taps the FAB.

4. **Mock AI Responses**: The AI responses are hardcoded. Custom user messages receive a generic response based on the hint.

5. **No Persistence**: Chat history and answers are not persisted between sessions.

## Connecting to a Real LLM API

To integrate with a real LLM API (e.g., OpenAI, Anthropic, or a custom backend), you would:

### 1. API Endpoint Structure

Create an API route in Next.js (`app/api/chat/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, questionContext, chatHistory } = await request.json();
  
  // Call your LLM API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are Jojo, a helpful math tutor. Help students understand ${questionContext.topic} problems.`
        },
        ...chatHistory.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    }),
  });
  
  const data = await response.json();
  return NextResponse.json({ message: data.choices[0].message.content });
}
```

### 2. Payload Structure

The payload sent to the LLM would include:

```typescript
{
  message: string;              // User's current message
  questionContext: {
    id: string;
    topic: string;
    difficulty: string;
    raw_text: string;
  };
  chatHistory: Array<{
    text: string;
    isUser: boolean;
    timestamp: number;
  }>;
  action?: 'hint' | 'steps';    // For quick actions
}
```

### 3. Update Infrastructure Service

Replace `MockAIService` with a real implementation in `src/infrastructure/services/`:

```typescript
export class OpenAIService implements IAIService {
  constructor(private apiKey: string) {}

  async getResponse(
    message: string,
    questionContext: QuestionContext,
    chatHistory: ChatMessage[]
  ): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Jojo, a helpful math tutor. Help students understand ${questionContext.topic} problems.`
          },
          ...chatHistory.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  // Implement getHint and getSteps similarly
}
```

Then update `src/presentation/di/container.ts`:
```typescript
this.aiService = new OpenAIService(process.env.OPENAI_API_KEY!);
```

### 4. Environment Variables

Add to `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

### 5. Additional Considerations

- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Error Handling**: Graceful degradation if API fails
- **Streaming**: For better UX, consider streaming responses using Server-Sent Events (SSE)
- **Context Window**: Manage chat history length to stay within token limits
- **Cost Optimization**: Cache common responses, use cheaper models for simple queries

## Technologies Used

- **Next.js 16.0.10**: Latest React framework with App Router and Turbopack
- **React 19.2.1**: Latest UI library with improved performance
- **TypeScript 5**: Type safety
- **Tailwind CSS 4**: Latest utility-first styling with CSS-based configuration
- **Zustand 5**: Lightweight state management
- **react-katex**: LaTeX math rendering
- **KaTeX**: Fast math typesetting library

## Architecture

This project follows **Clean Architecture** principles with clear layer separation:

- **Domain Layer**: Core business logic (entities, value objects, services)
- **Application Layer**: Use cases and interfaces (ports)
- **Infrastructure Layer**: External implementations (repositories, services)
- **Presentation Layer**: UI hooks and dependency injection
- **Store Layer**: Zustand state management

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## License

MIT

