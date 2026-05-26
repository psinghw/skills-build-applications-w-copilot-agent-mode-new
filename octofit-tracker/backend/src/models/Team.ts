import { Schema, model } from 'mongoose'

export interface TeamDocument {
  name: string
  mascot: string
  memberNames: string[]
  city: string
  weeklyGoalMinutes: number
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberNames: [{ type: String, required: true }],
    city: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
)

export const Team = model<TeamDocument>('Team', teamSchema)
