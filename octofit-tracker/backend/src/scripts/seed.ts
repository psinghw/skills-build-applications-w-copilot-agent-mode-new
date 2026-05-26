import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'

const users = [
  {
    username: 'mona-kane',
    email: 'mona.kane@example.com',
    firstName: 'Mona',
    lastName: 'Kane',
    teamName: 'OctoFit Originals',
    profile: { age: 31, heightCm: 168, fitnessGoal: 'Improve endurance for a spring 10K' },
  },
  {
    username: 'alex-lee',
    email: 'alex.lee@example.com',
    firstName: 'Alex',
    lastName: 'Lee',
    teamName: 'Cardio Crew',
    profile: { age: 27, heightCm: 176, fitnessGoal: 'Build consistent weekly training habits' },
  },
  {
    username: 'sam-rivera',
    email: 'sam.rivera@example.com',
    firstName: 'Sam',
    lastName: 'Rivera',
    teamName: 'Strength Squad',
    profile: { age: 35, heightCm: 181, fitnessGoal: 'Increase full-body strength' },
  },
]

const teams = [
  {
    name: 'OctoFit Originals',
    mascot: 'Octopus',
    memberNames: ['Mona Kane', 'Priya Shah', 'Jordan Mills'],
    city: 'Seattle',
    weeklyGoalMinutes: 900,
  },
  {
    name: 'Cardio Crew',
    mascot: 'Lightning Bolt',
    memberNames: ['Alex Lee', 'Taylor Brooks', 'Casey Morgan'],
    city: 'Austin',
    weeklyGoalMinutes: 840,
  },
  {
    name: 'Strength Squad',
    mascot: 'Barbell',
    memberNames: ['Sam Rivera', 'Riley Chen', 'Morgan Patel'],
    city: 'Chicago',
    weeklyGoalMinutes: 780,
  },
]

const activities = [
  {
    userName: 'Mona Kane',
    type: 'Run',
    durationMinutes: 42,
    caloriesBurned: 410,
    activityDate: new Date('2026-05-18T07:30:00Z'),
  },
  {
    userName: 'Alex Lee',
    type: 'Cycling',
    durationMinutes: 55,
    caloriesBurned: 520,
    activityDate: new Date('2026-05-19T12:15:00Z'),
  },
  {
    userName: 'Sam Rivera',
    type: 'Strength Training',
    durationMinutes: 48,
    caloriesBurned: 360,
    activityDate: new Date('2026-05-20T18:00:00Z'),
  },
  {
    userName: 'Mona Kane',
    type: 'Yoga',
    durationMinutes: 30,
    caloriesBurned: 140,
    activityDate: new Date('2026-05-21T06:45:00Z'),
  },
]

const leaderboard = [
  { rank: 1, userName: 'Mona Kane', teamName: 'OctoFit Originals', points: 1420, totalActivityMinutes: 310 },
  { rank: 2, userName: 'Alex Lee', teamName: 'Cardio Crew', points: 1350, totalActivityMinutes: 295 },
  { rank: 3, userName: 'Sam Rivera', teamName: 'Strength Squad', points: 1285, totalActivityMinutes: 275 },
]

const workouts = [
  {
    title: 'Morning Mobility Reset',
    category: 'Mobility',
    difficulty: 'Beginner',
    durationMinutes: 20,
    targetMuscles: ['hips', 'hamstrings', 'shoulders'],
    description: 'A gentle routine for improving range of motion before the workday.',
  },
  {
    title: 'Endurance Builder Run',
    category: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 35,
    targetMuscles: ['glutes', 'quadriceps', 'calves'],
    description: 'Intervals designed to improve pace control and aerobic capacity.',
  },
  {
    title: 'Full-Body Strength Circuit',
    category: 'Strength',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    targetMuscles: ['chest', 'back', 'legs', 'core'],
    description: 'A balanced circuit using compound movements for efficient strength gains.',
  },
]

const seed = async () => {
  try {
    console.log('Seed the octofit_db database with test data')
    await connectDatabase()

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ])

    console.log(`Seeded ${users.length} users`)
    console.log(`Seeded ${teams.length} teams`)
    console.log(`Seeded ${activities.length} activities`)
    console.log(`Seeded ${leaderboard.length} leaderboard entries`)
    console.log(`Seeded ${workouts.length} workouts`)
  } catch (error) {
    console.error('Failed to seed octofit_db', error)
    process.exitCode = 1
  } finally {
    await disconnectDatabase()
  }
}

void seed()
