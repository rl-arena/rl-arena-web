# RL-Arena Web

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**RL-Arena Web** is the React-based frontend for the RL-Arena platform - a competitive reinforcement learning environment where AI agents battle with ELO-based rankings.

## 🎯 Features

- **Competition View**: Browse and join AI competitions
- **Agent Submission**: Upload trained Python agents with drag & drop
- **Real-time Leaderboard**: ELO-based ranking system with live updates
- **Match Replay System**: 
  - **HTML Format** (default): rl-arena-env's interactive visualization
  - **JSON Format**: Frame-by-frame playback with speed control
  - Toggle between formats with one click
  - Download replays for offline viewing
- **User Profile**: Track submissions, matches, and agent performance
- **WebSocket Notifications**: Real-time build status and match updates

## 🚀 Quick Start

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
# Edit .env with your backend API URL

# Start development server
npm run dev
```

Visit `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **WebSocket** - Real-time communication

## 📁 Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorBoundary.jsx
│   ├── competition/  # Competition-related components
│   │   ├── CompetitionCard.jsx
│   │   ├── CompetitionInfo.jsx
│   │   └── EnvironmentSpec.jsx
│   ├── layout/       # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── leaderboard/  # Leaderboard components
│   │   ├── LeaderboardTable.jsx
│   │   └── LeaderboardRow.jsx
│   ├── replay/       # Replay system (HTML + JSON formats)
│   │   ├── ReplayModal.jsx      # Main modal with format toggle
│   │   ├── ReplayCanvas.jsx     # JSON format renderer
│   │   ├── ReplayControls.jsx   # Playback controls
│   │   └── FrameSlider.jsx
│   └── submission/   # Agent submission components
│       ├── AgentUploadForm.jsx
│       ├── FileDropzone.jsx
│       └── SubmissionHistory.jsx
├── hooks/
│   ├── useAuth.js              # Authentication hook
│   ├── useAgentSubmission.js   # Agent upload hook
│   ├── useCompetitions.js      # Competition data hook
│   ├── useLeaderboard.js       # Leaderboard hook
│   ├── useReplay.js            # Replay control hook (HTML/JSON)
│   └── useWebSocket.js         # WebSocket connection hook
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── CompetitionDetail.jsx   # Competition page with replay
│   ├── Profile.jsx             # User profile
│   ├── Login.jsx
│   └── Signup.jsx
├── services/
│   ├── api.js                  # REST API client
│   ├── websocket.js            # WebSocket client
│   └── storage.js              # LocalStorage helper
├── store/
│   ├── authStore.js            # Auth state (Zustand)
│   ├── competitionStore.js     # Competition state
│   └── replayStore.js          # Replay state (HTML/JSON support)
├── utils/
│   ├── constants.js            # App constants
│   ├── formatters.js           # Date/number formatters
│   └── validators.js           # Input validators
└── mocks/
    └── competitions.js         # Mock data for development
```

## � Replay System

The replay system supports two formats:

### HTML Format (Default)
- Interactive HTML5 animation from rl-arena-env
- Same visualization as training environment
- Auto-playing with built-in controls
- Downloadable for offline viewing
- **No additional dependencies required**

### JSON Format (Developer Mode)
- Frame-by-frame playback
- Speed control (0.5x, 1x, 2x)
- Manual frame navigation
- Metadata display (score, duration, timestamp)

Users can toggle between formats using the UI switch in the ReplayModal.

## 🔧 Environment Variables

Create a `.env` file:

```env
# Backend API
VITE_API_URL=http://localhost:8080/api/v1

# WebSocket
VITE_WS_URL=ws://localhost:8080/api/v1/ws

# Feature Flags (optional)
VITE_ENABLE_MOCKS=false
```

## � Scripts

```bash
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🌐 API Integration

The frontend integrates with these backend endpoints:

**Authentication**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

**Competitions**
- `GET /api/v1/competitions` - List competitions
- `GET /api/v1/competitions/:id` - Get competition details

**Agents**
- `POST /api/v1/agents` - Create agent
- `GET /api/v1/agents/:id` - Get agent details

**Submissions**
- `POST /api/v1/submissions` - Submit agent code
- `GET /api/v1/submissions/:id` - Get submission status

**Matches & Replays**
- `GET /api/v1/matches/:id/replay?format=json|html` - Get replay (Kaggle-style)
- `GET /api/v1/matches/replays?agentId=X` - List agent replays

**Leaderboard**
- `GET /api/v1/leaderboard?envId=X` - Get rankings

**WebSocket**
- `GET /api/v1/ws` - Real-time notifications

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t rl-arena-web .

# Run container
docker run -p 80:80 rl-arena-web
```

### Static Hosting

Compatible with:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: See `.github/workflows/deploy.yml`
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use ESLint configuration
- Follow React best practices
- Keep components small and focused
- Add PropTypes or TypeScript types

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Replay System Integration](../FRONTEND_REPLAY_INTEGRATION.md)
- [API Documentation](../rl-arena-backend/API_DOCUMENTATION.md)

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **RL-Arena Backend**: Go REST API server
- **RL-Arena Executor**: Python gRPC service for running matches
- **RL-Arena Env**: Python package for RL environments

## � Support

For issues and questions:
- **GitHub Issues**: [rl-arena/rl-arena-web/issues](https://github.com/rl-arena/rl-arena-web/issues)