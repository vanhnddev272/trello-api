import express from 'express'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const router = express.Router()

router.route('/')
  .post(columnValidation.createNew, columnController.createNew)

router.route('/:id')
  .put(columnValidation.update, columnController.updateColumn)
export const columnRoutes = router
