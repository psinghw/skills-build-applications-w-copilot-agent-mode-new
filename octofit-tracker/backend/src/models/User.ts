import { Schema, model } from 'mongoose'

export interface UserProfile {
  age: number
  heightCm: number
  fitnessGoal: string
}

export interface UserDocument {
  username: string
  email: string
  firstName: string
  lastName: string
  teamName: string
  profile: UserProfile
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    teamName: { type: String, required: true },
    profile: {
      age: { type: Number, required: true },
      heightCm: { type: Number, required: true },
      fitnessGoal: { type: String, required: true },
    },
  },
  { timestamps: true },
)

export const User = model<UserDocument>('User', userSchema)
