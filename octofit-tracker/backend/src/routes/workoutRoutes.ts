import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createWorkout, getWorkoutById, listWorkouts } from '../controllers/workoutController.js'

const router = Router()

const workoutsRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
})

router.use(workoutsRateLimit)

router.get('/', listWorkouts)
router.get('/:workoutId', getWorkoutById)
router.post('/', createWorkout)

export default router
