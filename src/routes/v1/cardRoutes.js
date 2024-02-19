import express from 'express'
import { cardController } from '~/controllers/cardController'
import { cardValidation } from '~/validations/cardValidation'

const router = express.Router()

router.route('/')
  .post(cardValidation.createNew, cardController.createNew)

router.route('/:id')
  .delete(cardValidation.deleteCard, cardController.deleteCard)

export const cardRoutes = router
