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
   * This is a placeholder implementation - actual rendering depends on game type
   */
  const renderFrame = (ctx, frame, canvasWidth, canvasHeight) => {
    if (!frame || !frame.state) {
      // No frame data - show placeholder
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('No frame data', canvasWidth / 2, canvasHeight / 2)
      return
    }

    // TODO: Implement game-specific rendering
    // Example for Pong:
    // const { ball, paddle1, paddle2 } = frame.state
    // 
    // // Draw ball
    // ctx.fillStyle = '#fff'
    // ctx.beginPath()
    // ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    // ctx.fill()
    // 
    // // Draw paddles
    // ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    // ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)

    // Placeholder rendering
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw border
    ctx.strokeStyle = '#14b8a6'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight)
    
    // Show frame info
    ctx.fillStyle = '#14b8a6'
    ctx.font = '16px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(
      'Game replay will render here',
      canvasWidth / 2,
      canvasHeight / 2 - 10
    )
    ctx.fillText(
      `Frame: ${JSON.stringify(frame.state).substring(0, 50)}...`,
      canvasWidth / 2,
      canvasHeight / 2 + 20
    )
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
