import { type NextFunction, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import WorkoutModel from '../models/workout.js'

const isInvalidId = (id: string) => !mongoose.Types.ObjectId.isValid(id)

export const listWorkouts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await WorkoutModel.find().sort({ performedAt: -1 }).lean()
    res.json({ data: workouts })
  } catch (error) {
    next(error)
  }
}

export const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawWorkoutId = req.params.workoutId
    const workoutId = Array.isArray(rawWorkoutId) ? rawWorkoutId[0] : rawWorkoutId
    if (!workoutId || isInvalidId(workoutId)) {
      res.status(400).json({ message: 'Invalid workout id' })
      return
    }

    const workout = await WorkoutModel.findById(workoutId).lean()
    if (!workout) {
      res.status(404).json({ message: 'Workout not found' })
      return
    }

    res.json({ data: workout })
  } catch (error) {
    next(error)
  }
}

export const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await WorkoutModel.create(req.body)
    res.status(201).json({ data: workout })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: 'Invalid workout payload', details: error.message })
      return
    }

    next(error)
  }
}
