import { Schema, model } from 'mongoose'

export interface WorkoutDocument {
  title: string
  category: string
  difficulty: string
  durationMinutes: number
  targetMuscles: string[]
  description: string
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    targetMuscles: [{ type: String, required: true }],
    description: { type: String, required: true },
  },
  { timestamps: true },
)

export const Workout = model<WorkoutDocument>('Workout', workoutSchema)
