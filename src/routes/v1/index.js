import express from 'express'
import { boardRoutes } from './boardRoutes'
import { columnRoutes } from './columnRoutes'
import { cardRoutes } from './cardRoutes'
import { authRoutes } from './authRoutes'
import { StatusCodes } from 'http-status-codes'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Trello API v1 routes'
  })
})

router.use('/', authRoutes)

router.use('/boards', boardRoutes)

router.use('/columns', columnRoutes)

router.use('/cards', cardRoutes)

export const API_V1 = router
