//
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API v1 get route.'
    })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({
      message: 'API v1 post route.'
    })
  })

export const boardRoutes = router
