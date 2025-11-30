# Unmute1 Multi-Agent Accessibility Platform

## Overview

Your accessibility landing page has been transformed into a comprehensive, cognitive multi-agent platform with speech synthesis capabilities that learns and grows with users.

## Key Features Implemented

### 1. Database Architecture
- **Profiles**: User profiles with onboarding tracking
- **Accessibility Preferences**: Personalized accessibility settings per user
- **Speech Profiles**: Custom voice profiles with configurable parameters
- **Resources**: Curated accessibility resources with categories and tags
- **User Interactions**: Tracks all user activity for learning patterns
- **Learning Progress**: Monitors skill development across categories
- **Agent Conversations**: Persistent chat history with AI agents
- **Resource Bookmarks**: Save and organize favorite resources
- **Resource Ratings**: Community-driven resource evaluation

### 2. Authentication System
- Email/password authentication via Supabase Auth
- Protected routes for authenticated users
- Automatic profile creation on signup
- Session management with automatic routing

### 3. Multi-Agent Architecture

The platform features 5 specialized AI agents:

- **General Assistant**: Friendly companion for accessibility questions
- **Content Simplifier**: Simplifies complex text for easier understanding
- **Visual Describer**: Creates detailed image descriptions
- **Learning Coach**: Patient guide for learning accessibility concepts
- **Progress Advisor**: Analyzes behavior and suggests improvements

Each agent has:
- Custom system prompts optimized for their specialty
- Persistent conversation history
- Context-aware responses
- User interaction tracking

### 4. Speech Synthesis System
- Create unlimited custom voice profiles
- Configure speech rate, pitch, and volume
- Test voices with custom text
- Set default profiles
- Save and manage multiple profiles
- Real-time speech preview

### 5. Resource Hub
- 12+ sample accessibility resources pre-loaded
- Search and filter by category
- Bookmark favorite resources
- View tracking for analytics
- Multiple resource types (guides, tools, documentation)
- Difficulty levels (beginner, intermediate, advanced)
- Tag-based organization

### 6. Progress Tracking
- Tracks total interactions
- AI conversation metrics
- Resource view statistics
- Skill category progress
- Time spent learning
- Milestone achievements (coming soon)

### 7. Cognitive Learning System
The platform learns from user behavior:
- Tracks interaction patterns
- Records duration and frequency
- Monitors resource preferences
- Analyzes agent usage
- Builds user profiles over time

## Platform Routes

### Public Routes
- `/` - Landing page with platform overview
- `/signin` - User sign in
- `/signup` - New user registration

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard with quick actions and activity
- `/agents` - Multi-agent chat interface
- `/resources` - Accessibility resource library
- `/speech` - Speech synthesis profile management
- `/progress` - Learning progress and statistics

## User Journey

### New User Flow
1. Visit landing page
2. Sign up with email/password
3. Profile automatically created with default preferences
4. Access dashboard
5. Explore agents, resources, and customize speech profiles
6. Platform tracks activity and builds personalized recommendations

### Returning User Flow
1. Sign in
2. View personalized dashboard with recent activity
3. Continue conversations with AI agents
4. Access bookmarked resources
5. Track learning progress
6. Use custom speech profiles

## Data Privacy & Security

All tables use Row Level Security (RLS):
- Users can only access their own data
- Resources are publicly readable when published
- Secure authentication via Supabase
- No data shared between users without permission

## Next Steps for Enhancement

### Recommended Additions
1. **Onboarding Flow**: Guide new users through platform features
2. **Settings Page**: Centralized preference management
3. **Resource Submission**: Allow users to contribute resources
4. **Achievement System**: Gamification with badges and milestones
5. **Social Features**: User communities and peer support
6. **Mobile App**: Progressive Web App for mobile experience
7. **Analytics Dashboard**: Detailed usage insights
8. **API Integration**: Connect with external accessibility tools
9. **Advanced AI Features**: Image analysis, real-time transcription
10. **Collaborative Learning**: Group sessions and shared resources

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Services**: Existing edge functions (ai-chat, ai-summarize, ai-image-description)
- **Routing**: React Router
- **State Management**: React Query + Context API
- **Animations**: Framer Motion

## Database Schema Summary

```
profiles (user data)
  ↓
accessibility_preferences (UI settings)
speech_profiles (voice configurations)
agent_conversations (chat history)
learning_progress (skill tracking)
user_interactions (activity log)
resource_bookmarks (saved items)
  ↓
resources (content library)
  ↓
resource_ratings (community feedback)
```

## Getting Started for Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Already configured in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Support and Documentation

- Supabase Dashboard: Access your database tables and auth users
- Edge Functions: Located in `/supabase/functions/`
- Components: Reusable UI in `/src/components/`
- Pages: Route components in `/src/pages/`
- Contexts: Shared state in `/src/contexts/`

---

**Built with accessibility first. Every feature designed for everyone.**
