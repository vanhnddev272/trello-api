import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API v1 routes'
  })
})

router.use('/boards', boardRoutes)

export const API_V1 = router
