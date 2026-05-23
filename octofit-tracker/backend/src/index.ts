import express from 'express'
import type { ErrorRequestHandler, RequestHandler } from 'express'
import { connectDatabase, MONGODB_URI } from './config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js'

const app = express()
const PORT = 8000
const HOST = '0.0.0.0'
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`

app.use(express.json())

const asyncHandler = (handler: RequestHandler): RequestHandler => async (req, res, next) => {
  try {
    await handler(req, res, next)
  } catch (error) {
    next(error)
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port: PORT,
    host: HOST,
    apiBaseUrl,
    mongodb: MONGODB_URI,
  })
})

app.get('/api/users/', asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ username: 1 })
  res.json(users)
}))

app.get('/api/teams/', asyncHandler(async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 })
  res.json(teams)
}))

app.get('/api/activities/', asyncHandler(async (_req, res) => {
  const activities = await Activity.find().sort({ activityDate: -1 })
  res.json(activities)
}))

app.get('/api/leaderboard/', asyncHandler(async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 })
  res.json(leaderboard)
}))

app.get('/api/workouts/', asyncHandler(async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 })
  res.json(workouts)
}))

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error('Request failed', error)
  res.status(500).json({ error: 'Internal server error' })
}

app.use(errorHandler)

const start = async () => {
  try {
    await connectDatabase()
    console.log(`Connected to MongoDB at ${MONGODB_URI}`)

    app.listen(PORT, HOST, () => {
      console.log(`OctoFit backend listening on ${apiBaseUrl}`)
    })
  } catch (error) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

void start()
