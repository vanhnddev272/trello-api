import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const login = async (req, res, next) => {
  try {
    const loginUser = await authService.login(req.body)
    const refreshToken = await authService.generateRefreshToken(req.body)

    let options = {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    }
    res.cookie('refreshToken', refreshToken, options)
    res.status(StatusCodes.OK).json({
      message: 'Logged successfully',
      loginUser
    })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const registeredUser = await authService.register(req.body)

    res.status(StatusCodes.CREATED).json({
      message: 'Registered successfully',
      registeredUser
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  login,
  register
}
