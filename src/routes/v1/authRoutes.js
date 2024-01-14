import express from 'express'
import { authController } from '~/controllers/authController'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router.route('/login')
  .post(authValidation.login, authController.login)

router.route('/register')
  .post(authValidation.register, authController.register)

export const authRoutes = router