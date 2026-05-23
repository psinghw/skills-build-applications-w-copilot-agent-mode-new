import { Schema, model } from 'mongoose'

export interface LeaderboardEntryDocument {
  rank: number
  userName: string
  teamName: string
  points: number
  totalActivityMinutes: number
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    rank: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    totalActivityMinutes: { type: Number, required: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema)
