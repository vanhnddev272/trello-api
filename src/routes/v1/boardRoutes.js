import express from 'express'
import { fileUploader } from '~/config/multer.config'
import { boardController } from '~/controllers/boardController'
import jwtMiddleware from '~/middlewares/authMiddleware'
import { boardValidation } from '~/validations/boardValidation'

const router = express.Router()

router.route('/')
  .get(boardController.getBoards)
  .post(boardValidation.createNew, boardController.createNew)

router.route('/:id')
  .get(jwtMiddleware.verifyToken, boardController.getDetails)
  .put(boardValidation.update, boardController.updateBoard)

router.route('/:id/upload-bg')
  .post(fileUploader.single('file'), boardController.uploadBackground)

router.route('/supports/move_card')
  .put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)


export const boardRoutes = router
