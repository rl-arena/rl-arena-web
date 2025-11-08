import React, { useRef, useEffect } from 'react'

/**
 * Replay canvas component for rendering game frames
 * @param {Object} props
 * @param {Object} props.frameData - Current frame data
 * @param {number} props.width - Canvas width
 * @param {number} props.height - Canvas height
 */
const ReplayCanvas = ({ frameData, width = 800, height = 450 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !frameData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)

    // Render frame based on game state
    renderFrame(ctx, frameData, width, height)
  }, [frameData, width, height])

  /**
   * Render a single frame
   * Supports Pong game replay visualization
   */
  const renderFrame = (ctx, frame, canvasWidth, canvasHeight) => {
    if (!frame || !frame.info) {
      // No frame data - show placeholder
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('No frame data', canvasWidth / 2, canvasHeight / 2)
      return
    }

    // Extract Pong game state from frame.info
    const { ball_pos, paddle_positions, score } = frame.info
    
    if (!ball_pos || !paddle_positions || !score) {
      // Invalid frame structure
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = '#fff'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Invalid frame structure', canvasWidth / 2, canvasHeight / 2)
      return
    }

    // Clear canvas with dark background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw center line
    ctx.strokeStyle = '#444466'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, 0)
    ctx.lineTo(canvasWidth / 2, canvasHeight)
    ctx.stroke()
    ctx.setLineDash([])
    
    // Draw border
    ctx.strokeStyle = '#444466'
    ctx.lineWidth = 3
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight)
    
    // Convert normalized coordinates (0-1) to canvas coordinates
    const ballX = ball_pos[0] * canvasWidth
    const ballY = ball_pos[1] * canvasHeight
    const paddle1Y = paddle_positions[0] * canvasHeight
    const paddle2Y = paddle_positions[1] * canvasHeight
    
    const paddleWidth = 10
    const paddleHeight = 60
    const ballRadius = 8
    
    // Draw left paddle (player 1) - green
    ctx.fillStyle = '#00ff88'
    ctx.fillRect(20, paddle1Y - paddleHeight / 2, paddleWidth, paddleHeight)
    
    // Draw right paddle (player 2) - magenta
    ctx.fillStyle = '#ff0088'
    ctx.fillRect(canvasWidth - 30, paddle2Y - paddleHeight / 2, paddleWidth, paddleHeight)
    
    // Draw ball - white
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw scores
    ctx.fillStyle = '#00ff88'
    ctx.font = 'bold 48px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(score[0], canvasWidth / 4, 60)
    
    ctx.fillStyle = '#ff0088'
    ctx.fillText(score[1], (canvasWidth / 4) * 3, 60)
  }

  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-t-lg p-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-700 rounded"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default ReplayCanvas
