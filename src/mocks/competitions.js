export const mockCompetitions = [
  {
    id: 'pong',
    name: 'Pong Battle',
    description: 'Classic 2-player pong game. Control your paddle and defeat opponents!',
    participantCount: 156,
    userRank: 23,
    rules: 'Control your paddle to bounce the ball. Each rally won scores a point. First to 11 points wins. The ball speeds up with each hit.',
    actionSpace: {
      type: 'Discrete',
      shape: [3],
      range: '[0: Stay, 1: Up, 2: Down]',
      description: 'Three discrete actions: stay in place, move up, or move down'
    },
    observationSpace: {
      type: 'Box',
      shape: [8],
      range: '[-1, 1]',
      description: 'Ball position (x, y), ball velocity (vx, vy), paddle positions (y1, y2), paddle velocities (vy1, vy2)'
    },
    quickStartCode: `import numpy as np

class PongAgent:
    def act(self, observation):
        # observation: [ball_x, ball_y, ball_vx, ball_vy, 
        #               paddle_y, opponent_y, paddle_vy, opponent_vy]
        ball_y = observation[1]
        paddle_y = observation[4]
        
        # Simple strategy: follow the ball
        if ball_y > paddle_y + 0.1:
            return 2  # Move down
        elif ball_y < paddle_y - 0.1:
            return 1  # Move up
        return 0  # Stay`,
    scoringSystem: 'Agents compete in round-robin matches. ELO rating system determines rankings. Win = +points, Loss = -points based on opponent rating.',
  }
]

// Leaderboard mock data
export const mockLeaderboard = [
  {
    rank: 1,
    userId: 'user1',
    username: 'ai_master',
    agentName: 'DeepPong Pro',
    eloRating: 2450,
    score: 2450,
    matchesPlayed: 245,
    wins: 198,
    losses: 42,
    draws: 5,
    winRate: 0.808,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    rank: 2,
    userId: 'user2',
    username: 'neural_ninja',
    agentName: 'NeuralPaddle V2',
    eloRating: 2380,
    score: 2380,
    matchesPlayed: 189,
    wins: 145,
    losses: 38,
    draws: 6,
    winRate: 0.767,
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    rank: 3,
    userId: 'user3',
    username: 'code_wizard',
    agentName: 'MagicPong',
    eloRating: 2290,
    score: 2290,
    matchesPlayed: 178,
    wins: 132,
    losses: 41,
    draws: 5,
    winRate: 0.742,
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    rank: 23,
    userId: 'current_user',
    username: 'you',
    agentName: 'MyPongAgent',
    eloRating: 1850,
    score: 1850,
    matchesPlayed: 45,
    wins: 23,
    losses: 20,
    draws: 2,
    winRate: 0.511,
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

// Submissions mock data
export const mockSubmissions = [
  {
    id: 'sub1',
    agentName: 'MyPongAgent',
    status: 'active',
    score: 1850,
    rank: 23,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    matchesPlayed: 45,
  },
  {
    id: 'sub2',
    agentName: 'MyPongAgent_v1',
    status: 'inactive',
    score: 1720,
    rank: 45,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    matchesPlayed: 32,
  },
  {
    id: 'sub3',
    agentName: 'FirstTry',
    status: 'inactive',
    score: 1450,
    rank: 89,
    submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    matchesPlayed: 18,
  },
]

// Replay mock data
export const mockReplayData = {
  matchId: 'match_123',
  player1: 'MyPongAgent',
  player2: 'OpponentAgent',
  winner: 'player2',
  score: '11-8',
  duration: 245,
  frames: [
    // Frame data would go here
    // Each frame contains positions of ball and paddles
  ],
}
