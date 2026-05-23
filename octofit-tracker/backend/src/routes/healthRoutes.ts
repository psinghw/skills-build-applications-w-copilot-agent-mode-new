import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
  })
})

export default router
