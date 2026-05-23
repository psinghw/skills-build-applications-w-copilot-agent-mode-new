import mongoose from 'mongoose'
import app from './app.js'

const PORT = 8000
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker'

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log(`Connected to MongoDB at ${MONGODB_URI}`)

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

void start()
