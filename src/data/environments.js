/**
 * Available RL environments/competitions
 * This should eventually come from the backend API
 */
export const ENVIRONMENTS = [
  {
    id: 'pong',
    name: 'Pong',
    description: 'A classic 2-player Pong game environment for competitive reinforcement learning. Control your paddle to bounce the ball and score points!',
    rules: 'Two players control paddles to bounce a ball back and forth. Score a point when the ball passes your opponent\'s paddle. First player to reach 11 points wins the game. Maximum 1000 steps per episode.',
    actionSpace: {
      type: 'Discrete',
      shape: [3],
      range: '[0: Move UP, 1: STAY, 2: Move DOWN]',
      description: 'Three discrete actions per player: move paddle up, stay in place, or move paddle down'
    },
    observationSpace: {
      type: 'Box',
      shape: [8],
      range: '[0, 1] for positions; continuous for velocities',
      description: 'Ball position (x, y), ball velocity (vx, vy), paddle positions (y1, y2), and scores (score1, score2)'
    },
    quickStartCode: `import numpy as np

class PongAgent:
    """Simple Pong agent that follows the ball."""
    
    def act(self, observation):
        """
        observation: [ball_x, ball_y, ball_vx, ball_vy, 
                      paddle1_y, paddle2_y, score1, score2]
        
        Actions:
        - 0: Move UP
        - 1: STAY
        - 2: Move DOWN
        """
        ball_y = observation[1]      # Ball Y position
        my_paddle_y = observation[4]  # My paddle Y position
        
        # Simple strategy: follow the ball
        threshold = 0.05
        if ball_y > my_paddle_y + threshold:
            return 2  # Move DOWN
        elif ball_y < my_paddle_y - threshold:
            return 0  # Move UP
        return 1  # STAY`,
    scoringSystem: 'Head-to-head matches with ELO rating system. +1 point for scoring, -1 for conceding. Win = reach 11 points first. Rankings updated after each match based on opponent strength.',
    configuration: {
      winning_score: 11,
      max_steps: 1000,
      paddle_height: 0.2,
      paddle_speed: 0.05,
      ball_speed: 0.02,
      ball_radius: 0.02
    }
  }
]

/**
 * Get environment by ID
 * @param {string} id - Environment ID
 * @returns {Object|null} Environment object or null
 */
export const getEnvironmentById = (id) => {
  return ENVIRONMENTS.find(env => env.id === id) || null
}

/**
 * Get all environment IDs
 * @returns {Array<string>} Array of environment IDs
 */
export const getEnvironmentIds = () => {
  return ENVIRONMENTS.map(env => env.id)
}
