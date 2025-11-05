# RL Arena Web

A minimalist React-based frontend for competitive reinforcement learning platform.

## 🎯 Features

- **Pong Competition**: Classic 2-player Pong game competition
- **Agent Submission**: Upload trained agents
- **Leaderboard**: ELO-based ranking system
- **Match Replay**: Watch recorded matches
- **User Profile**: Track submissions and history

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 🛠️ Tech Stack

- React 18 + Vite
- React Router v6
- Zustand (state management)
- Tailwind CSS
- Axios + WebSocket

## 📁 Structure

```
src/
├── components/      # UI components
│   ├── common/      # Button, LoadingSpinner, ErrorBoundary
│   ├── competition/ # CompetitionCard, CompetitionInfo, EnvironmentSpec
│   ├── layout/      # Navbar, Footer, Layout
│   ├── leaderboard/ # LeaderboardTable, LeaderboardRow
│   ├── replay/      # ReplayModal, ReplayCanvas, ReplayControls
│   └── submission/  # AgentUploadForm, FileDropzone, SubmissionHistory
├── hooks/           # Custom React hooks
├── pages/           # Home, CompetitionDetail, Profile
├── services/        # API, WebSocket, Storage
├── store/           # Zustand stores
├── mocks/           # Mock data (active for development)
└── utils/           # Helpers and constants
```

## 🎮 Current Status

- ✅ Using mock data (Pong competition only)
- ✅ Simplified minimal design
- ⏳ Backend integration pending

## 📜 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 🔗 Backend Integration

When backend is ready:
1. Set environment variables in `.env`:
   ```
   VITE_API_URL=http://localhost:8080/api
   VITE_WS_URL=ws://localhost:8080/ws
   ```
2. Uncomment API calls in page components
3. Comment out mock data imports

# Run container
docker run -p 8080:80 rl-arena-web
```

## 🌐 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages on pushes to `main` branch.

### Other Platforms

Compatible with:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

## 📝 API Integration

The frontend expects the following backend endpoints:

- `GET /api/competitions` - List all competitions
- `GET /api/competitions/:id` - Get competition details
- `GET /api/competitions/:id/leaderboard` - Get leaderboard
- `POST /api/competitions/:id/submit` - Submit agent
- `GET /api/matches/:id/replay` - Get match replay data
- `GET /api/profile` - Get user profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by Kaggle's competition platform
- Built for the RL research and education community

## 📧 Contact

For questions or support, please open an issue on GitHub.