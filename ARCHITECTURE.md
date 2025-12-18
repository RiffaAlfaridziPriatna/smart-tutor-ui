# Clean Architecture Implementation

This project follows **Clean Architecture** principles with clear separation of concerns across multiple layers.

## Architecture Layers

### 1. Domain Layer (`domain/`)
**Purpose**: Contains business logic, entities, and domain rules. This layer has no dependencies on other layers.

#### Entities
- `Question.ts`: Core business entity representing a question
- `Message.ts`: Core business entity representing a chat message

#### Value Objects
- `Difficulty.ts`: Immutable value object for question difficulty with business logic (color mapping)
- `AnswerType.ts`: Immutable value object for answer types

#### Domain Services
- `MathParserService.ts`: Business logic for converting raw text to LaTeX

### 2. Application Layer (`src/application/`)
**Purpose**: Contains use cases and application-specific business rules. Depends only on the Domain layer.

#### Interfaces (Ports)
- `IQuestionRepository.ts`: Contract for question data access
- `IAIService.ts`: Contract for AI assistance services

#### Use Cases
- `GetQuestionUseCase.ts`: Retrieves a question by ID or current question
- `SendMessageUseCase.ts`: Handles sending user messages and getting AI responses
- `GetAIResponseUseCase.ts`: Handles quick actions (hint, steps)

### 3. Infrastructure Layer (`src/infrastructure/`)
**Purpose**: Implements external concerns and adapters. Implements interfaces from the Use Cases layer.

#### Repositories
- `QuestionRepository.ts`: Implements `IQuestionRepository` using mock data

#### Services
- `MockAIService.ts`: Implements `IAIService` with mock responses
- `MathParserAdapter.ts`: Adapter for the domain MathParserService

### 4. Presentation Layer (`src/presentation/`)
**Purpose**: UI hooks and dependency injection. Depends on Application and Domain layers.

#### Dependency Injection
- `di/container.ts`: Centralizes dependency creation and provides singleton instances

#### Hooks
- `hooks/useQuestion.ts`: React hook for loading questions using use cases
- `hooks/useChat.ts`: React hook for chat functionality using use cases

### 5. Store Layer (`src/store/`)
**Purpose**: Zustand state management stores for UI and chat state.

- `useUIStore.ts`: UI state management (chat open/close, mobile detection, answer input)
- `useChatStore.ts`: Chat state management (messages, thinking state, input)

### 6. Shared Layer (`shared/`)
**Purpose**: Shared utilities, constants, and data that can be used across layers.

- `data/mockData.ts`: Mock data for development

### 7. Components (`components/`)
**Purpose**: Reusable UI components following Atomic Design pattern.

#### Atoms
- `Badge.tsx`: Small UI badge component
- `Button.tsx`: Reusable button component
- `Icon.tsx`: Icon component
- `Input.tsx`: Input field component
- `Spinner.tsx`: Loading spinner

#### Molecules
- `ChatInput.tsx`: Chat input with send button
- `FormField.tsx`: Form field with label
- `MathRenderer.tsx`: LaTeX math renderer
- `MessageBubble.tsx`: Individual chat message bubble
- `QuickActionButton.tsx`: Quick action button (hint/steps)

#### Organisms
- `ChatDrawer.tsx`: Complete chat interface
- `FloatingButton.tsx`: Mobile FAB button
- `QuestionArea.tsx`: Complete question display area

## Dependency Flow

```
Presentation → Use Cases → Domain
     ↓              ↓
Infrastructure → Use Cases → Domain
     ↓
   Shared
```

**Key Principle**: Dependencies point inward. Outer layers depend on inner layers, never the reverse.

## Data Flow Example

1. **User Action**: User clicks "Give me a hint"
2. **Presentation**: `ChatDrawer` calls `useChat` hook
3. **Hook**: `useChat` calls `GetAIResponseUseCase.getHint()`
4. **Use Case**: Executes business logic and calls `IAIService.getHint()`
5. **Infrastructure**: `MockAIService` implements the service and returns response
6. **Use Case**: Creates `Message` entity and returns it
7. **Hook**: Updates Zustand store with new message
8. **Presentation**: Component re-renders with new message

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation makes code easier to understand and modify
3. **Flexibility**: Easy to swap implementations (e.g., replace MockAIService with real API)
4. **Scalability**: New features can be added without affecting existing code
5. **Independence**: Business logic is independent of frameworks and UI

## Adding a New Feature

1. **Domain**: Define entities/value objects if needed
2. **Use Cases**: Create use case and define interfaces
3. **Infrastructure**: Implement the interfaces
4. **Presentation**: Create hooks/components to use the use case
5. **Update DI Container**: Wire dependencies in `container.ts`

## Example: Adding Real AI Service

1. Create `OpenAIService.ts` in `src/infrastructure/services/`
2. Implement `IAIService` interface (from `src/application/interfaces/`)
3. Update `src/presentation/di/container.ts` to use `OpenAIService` instead of `MockAIService`
4. No changes needed in Presentation or Application layers!

