//
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API v1 get route.'
    })
  })
  .post(boardValidation.createNew)

export const boardRoutes = router
