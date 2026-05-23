import express, { type NextFunction, type Request, type Response } from 'express'
import healthRoutes from './routes/healthRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

const app = express()

app.use(express.json())
app.use('/api/health', healthRoutes)
app.use('/api/workouts', workoutRoutes)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ message: 'Invalid JSON payload' })
    return
  }

  console.error('Unhandled API error', error)
  res.status(500).json({ message: 'Internal server error' })
})

export default app
