import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardController } from '~/controllers/boardController'
import { boardValidation } from '~/validations/boardValidation'

const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API v1 get board route.'
    })
  })
  .post(boardValidation.createNew, boardController.createNew)

router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.updateBoard)

router.route('/supports/move_card')
  .put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)

export const boardRoutes = router
