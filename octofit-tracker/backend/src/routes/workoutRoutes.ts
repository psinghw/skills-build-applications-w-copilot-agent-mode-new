import { Router } from 'express'
import { createWorkout, getWorkoutById, listWorkouts } from '../controllers/workoutController.js'

const router = Router()

router.get('/', listWorkouts)
router.get('/:workoutId', getWorkoutById)
router.post('/', createWorkout)

export default router
