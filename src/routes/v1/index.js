import express from 'express'
import { boardRoutes } from './boardRoutes'
import { columnRoutes } from './columnRoutes'
import { cardRoutes } from './cardRoutes'
import { authRoutes } from './authRoutes'
const router = express.Router()

router.use('/', authRoutes)

router.use('/boards', boardRoutes)

router.use('/columns', columnRoutes)

router.use('/cards', cardRoutes)

export const API_V1 = router
