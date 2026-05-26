# OctoFit Tracker Technical Specifications

## 1. Overview

OctoFit Tracker is a multi-tier application with:

- Presentation tier: React + Vite frontend
- Logic tier: Express + TypeScript backend
- Data tier: MongoDB (Mongoose models)

The current implementation is read-only in UI and API for domain entities (GET endpoints).

## 2. Repository Structure

```text
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── scripts/
│   │   ├── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.ts
```

## 3. Technology Stack

### Frontend

- React 19
- Vite 6
- React Router DOM 7
- Bootstrap 5
- JavaScript + JSX (TypeScript config remains for tooling/build)

### Backend

- Node.js (ES modules)
- Express 4
- TypeScript
- tsx (watch/dev runtime)

### Database

- MongoDB
- Mongoose 8 ODM

## 4. Runtime Ports

- Frontend dev server: 5173
- Backend API server: 8000
- MongoDB: 27017

## 5. Environment Variables

### Frontend

- `VITE_CODESPACE_NAME`
  - If set: frontend calls `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`
  - If empty/unset: frontend falls back to `http://localhost:8000/api/...`

### Backend

- `MONGODB_URI`
  - Default: `mongodb://127.0.0.1:27017/octofit_db`
- `CODESPACE_NAME`
  - Used to compute backend `apiBaseUrl` logging/health metadata

## 6. Backend API Endpoints

Base URL (local): `http://localhost:8000`

- `GET /api/health`
- `GET /api/users/`
- `GET /api/teams/`
- `GET /api/activities/`
- `GET /api/leaderboard/`
- `GET /api/workouts/`

### Response Style

- Endpoints currently return arrays of documents.
- Frontend normalization supports either:
  - raw array, or
  - paginated-like payload (`results`, `items`, or `data`).

## 7. CORS Behavior

Backend sets these headers for all requests:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

`OPTIONS` preflight returns HTTP 204.

## 8. Data Model (MongoDB)

### User

- `username` (string, required, unique)
- `email` (string, required, unique)
- `firstName` (string, required)
- `lastName` (string, required)
- `teamName` (string, required)
- `profile.age` (number, required)
- `profile.heightCm` (number, required)
- `profile.fitnessGoal` (string, required)
- timestamps enabled

### Team

- `name` (string, required, unique)
- `mascot` (string, required)
- `memberNames` (string[], required)
- `city` (string, required)
- `weeklyGoalMinutes` (number, required)
- timestamps enabled

### Activity

- `userName` (string, required)
- `type` (string, required)
- `durationMinutes` (number, required)
- `caloriesBurned` (number, required)
- `activityDate` (date, required)
- timestamps enabled

### LeaderboardEntry

- `rank` (number, required, unique)
- `userName` (string, required)
- `teamName` (string, required)
- `points` (number, required)
- `totalActivityMinutes` (number, required)
- timestamps enabled

### Workout

- `title` (string, required, unique)
- `category` (string, required)
- `difficulty` (string, required)
- `durationMinutes` (number, required)
- `targetMuscles` (string[], required)
- `description` (string, required)
- timestamps enabled

## 9. Seed Data

Seed command:

```bash
npm --prefix ./octofit-tracker/backend run seed
```

The seed process:

1. Connects to `octofit_db`
2. Clears all 5 collections
3. Inserts sample data for each collection

Default sample volumes:

- Users: 3
- Teams: 3
- Activities: 4
- Leaderboard entries: 3
- Workouts: 3

## 10. Frontend Application Behavior

- Uses route-based pages:
  - `/users`
  - `/teams`
  - `/activities`
  - `/leaderboard`
  - `/workouts`
- Fetches data on page mount using `useEffect`.
- Maintains per-page status states:
  - `loading`
  - `ready`
  - `error`
- Displays lists/tables/cards based on endpoint response.

## 11. Build and Run Commands

### Backend

- Dev: `npm --prefix ./octofit-tracker/backend run dev`
- Build: `npm --prefix ./octofit-tracker/backend run build`
- Start built output: `npm --prefix ./octofit-tracker/backend run start`

### Frontend

- Dev: `npm --prefix ./octofit-tracker/frontend run dev`
- Build: `npm --prefix ./octofit-tracker/frontend run build`
- Preview build: `npm --prefix ./octofit-tracker/frontend run preview`

## 12. Current Functional Limitations

- No create/update/delete UI flows yet.
- No POST/PUT/PATCH/DELETE domain endpoints yet.
- No authentication or authorization implementation yet.
- No automated API integration test suite currently defined.
