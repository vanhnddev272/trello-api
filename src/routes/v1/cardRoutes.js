import express from 'express'
import { cardController } from '~/controllers/cardController'
import { cardValidation } from '~/validations/cardValidation'

const router = express.Router()

router.route('/')
  .post(cardValidation.createNew, cardController.createNew)

export const cardRoutes = router
