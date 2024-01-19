import express from 'express'
import { authController } from '~/controllers/authController'
import jwtMiddleware from '~/middlewares/authMiddleware'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router.route('/login')
  .post(authValidation.login, authController.login)

router.route('/register')
  .post(authValidation.register, authController.register)

router.route('/refresh')
  .post(authController.requestRefreshToken)

router.route('/logout')
  .post(jwtMiddleware.verifyToken, authController.logout)


export const authRoutes = router