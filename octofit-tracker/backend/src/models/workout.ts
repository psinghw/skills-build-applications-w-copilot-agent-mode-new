import mongoose from 'mongoose'

export interface Workout {
  activityType: 'run' | 'cycle' | 'strength' | 'yoga' | 'other'
  durationMinutes: number
  caloriesBurned?: number
  performedAt: Date
  notes?: string
}

const workoutSchema = new mongoose.Schema<Workout>(
  {
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'other'],
      required: true,
      trim: true,
      lowercase: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    performedAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema)

export default WorkoutModel
