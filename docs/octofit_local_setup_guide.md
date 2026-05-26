# OctoFit Tracker Local Setup Guide

This guide helps a new user clone the repository, run all services locally, and view the application pages.

## 1. Prerequisites

Install the following tools first:

- Git
- Node.js LTS (recommended: Node 20+)
- npm (comes with Node.js)
- Docker-compatible runtime
  - macOS option used in this project: Colima + Docker CLI

Optional (if not using Docker for MongoDB):

- Local MongoDB server (`mongod`) on port 27017

## 2. Clone the Repository

```bash
git clone https://github.com/psinghw/skills-build-applications-w-copilot-agent-mode-new.git
```

If you need the current working branch from this project snapshot:

```bash
git -C skills-build-applications-w-copilot-agent-mode-new checkout build-octofit-app
```

All commands below are expected to be run from the repository root:

- `skills-build-applications-w-copilot-agent-mode-new`

## 3. Install Dependencies

Install backend and frontend dependencies:

```bash
npm --prefix ./octofit-tracker/backend install
npm --prefix ./octofit-tracker/frontend install
```

## 4. Start MongoDB (Docker/Colima Path)

Start Colima:

```bash
colima start
```

Run MongoDB container on port 27017:

```bash
docker rm -f octofit-mongo >/dev/null 2>&1 || true
docker run -d --name octofit-mongo -p 27017:27017 mongo:7
```

Verify MongoDB is healthy:

```bash
docker exec octofit-mongo mongosh --quiet --eval 'db.runCommand({ ping: 1 })'
```

Expected output includes:

```text
{ ok: 1 }
```

## 5. Configure Frontend Environment

For local development, ensure this file exists:

- `octofit-tracker/frontend/.env.local`

Set:

```env
VITE_CODESPACE_NAME=
```

Leave it empty for local mode, so the frontend uses `http://localhost:8000` fallback.

## 6. Start Backend API

Run backend in watch mode:

```bash
npm --prefix ./octofit-tracker/backend run dev
```

Backend runs on:

- `http://localhost:8000`

Health check:

```bash
curl http://127.0.0.1:8000/api/health
```

## 7. Seed Demo Data

Seed MongoDB with sample users, teams, activities, leaderboard, and workouts:

```bash
npm --prefix ./octofit-tracker/backend run seed
```

## 8. Start Frontend

In a separate terminal:

```bash
npm --prefix ./octofit-tracker/frontend run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Frontend URL:

- `http://127.0.0.1:5173/users`

## 9. Verify Pages

Open and verify these routes:

- `/users`
- `/teams`
- `/activities`
- `/leaderboard`
- `/workouts`

Example:

- `http://127.0.0.1:5173/users`

## 10. Troubleshooting

### Issue: pages load but show no records

Cause:

- Database has no data.

Fix:

```bash
npm --prefix ./octofit-tracker/backend run seed
```

### Issue: fetch/CORS errors in browser console

Check:

- Backend is running on port 8000.
- Frontend uses local fallback (`VITE_CODESPACE_NAME=`).

Verify backend endpoint:

```bash
curl -i http://127.0.0.1:8000/api/users/
```

### Issue: frontend starts on 5174 instead of 5173

Cause:

- Port 5173 already in use.

Fix:

```bash
npm --prefix ./octofit-tracker/frontend run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

### Issue: Docker daemon not reachable

Check Colima:

```bash
colima status
```

If not running:

```bash
colima start
```

## 11. Stop Services

Stop frontend/backed with `Ctrl+C` in each terminal.

Stop MongoDB container:

```bash
docker stop octofit-mongo
```

Optional: stop Colima:

```bash
colima stop
```
