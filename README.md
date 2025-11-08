# RL-Arena Web

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**RL-Arena Web** is the React-based frontend for the RL-Arena platform - a competitive reinforcement learning environment where AI agents battle with ELO-based rankings.

##  Features

- **Competition View**: Browse and join AI competitions
- **Agent Submission**: Upload Python agents with drag & drop
- **Real-time Leaderboard**: ELO-based rankings with live updates
- **Match Replay System**: 
  - Interactive HTML visualization (default)
  - JSON format with frame-by-frame playback
  - Speed control and manual frame navigation
  - Download replays for offline viewing
- **User Profile**: Track submissions, matches, and performance
- **WebSocket Notifications**: Real-time build status and match updates
- **Responsive Design**: Mobile-friendly interface

##  Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/rl-arena/rl-arena-web.git
cd rl-arena-web

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173`

##  Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **WebSocket** - Real-time communication

##  Project Structure

```
src/
 components/
    common/           # Reusable UI components
    competition/      # Competition-related components
    layout/           # Layout components (Navbar, Footer)
    leaderboard/      # Leaderboard table and rows
    replay/           # Replay system (HTML + JSON formats)
    submission/       # Agent submission components
 hooks/
    useAuth.js        # Authentication hook
    useAgentSubmission.js
    useCompetitions.js
    useLeaderboard.js
    useReplay.js      # Replay control hook
    useWebSocket.js   # WebSocket connection
 pages/
    Home.jsx          # Landing page
    CompetitionDetail.jsx
    Profile.jsx
    Login.jsx
    Signup.jsx
 services/
    api.js            # REST API client
    websocket.js      # WebSocket client
    storage.js        # LocalStorage helper
 store/
    authStore.js      # Auth state (Zustand)
    competitionStore.js
    replayStore.js    # Replay state
 utils/
     constants.js      # App constants
     formatters.js     # Date/number formatters
     validators.js     # Input validators
```

##  Replay System

The application supports two replay formats:

### HTML Format (Default)
- Interactive HTML5 animation from rl-arena-env
- Auto-playing with built-in controls
- Same visualization as training environment
- Downloadable for offline viewing

### JSON Format (Developer Mode)
- Frame-by-frame playback control
- Speed control (0.5x, 1x, 2x)
- Manual frame navigation with slider
- Metadata display (score, duration)

Toggle between formats using the UI switch in the ReplayModal component.

##  Environment Variables

Create a `.env` file:

```env
# Backend API
VITE_API_URL=http://localhost:8080/api/v1

# WebSocket
VITE_WS_URL=ws://localhost:8080/api/v1/ws

# Feature Flags
VITE_ENABLE_MOCKS=false
```

##  Scripts

```bash
npm run dev         # Start development server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

##  API Integration

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Agents
- `POST /api/v1/agents` - Create agent
- `GET /api/v1/agents/:id` - Get agent details

### Submissions
- `POST /api/v1/submissions` - Submit agent code
- `GET /api/v1/submissions/:id` - Get submission status

### Matches & Replays
- `GET /api/v1/matches/:id/replay?format=json|html` - Get replay
- `GET /api/v1/matches/replays?agentId=X` - List agent replays

### Leaderboard
- `GET /api/v1/leaderboard?envId=X` - Get rankings

### WebSocket
- `GET /api/v1/ws` - Real-time notifications

##  Deployment

### Docker

```bash
# Build image
docker build -t rl-arena-web .

# Run container
docker run -p 80:80 rl-arena-web
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output in dist/ directory
# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - Azure Static Web Apps
```

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use React best practices
- Keep components small and focused
- Add PropTypes for type safety

##  License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

##  Related Projects

- [rl-arena-backend](https://github.com/rl-arena/rl-arena-backend) - Go REST API server
- [rl-arena-executor](https://github.com/rl-arena/rl-arena-executor) - Python gRPC match executor
- [rl-arena-env](https://github.com/rl-arena/rl-arena-env) - RL environment library
