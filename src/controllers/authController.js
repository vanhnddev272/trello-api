import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'
import { generateToken } from '~/utils/jwt_helpers'

let refreshTokens = [] //instead of REDIS

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)
    const refreshToken = (await generateToken(req.body)).refreshToken

    refreshTokens.push(refreshToken)
    let options = {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    }
    res.cookie('refreshToken', refreshToken, options)
    res.status(StatusCodes.OK).json({
      message: 'Logged successfully',
      user
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

const requestRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken
    if (!oldRefreshToken) return res.status(StatusCodes.UNAUTHORIZED).json('You are not authenticated')
    if (!refreshTokens.includes(oldRefreshToken)) {
      res.status(StatusCodes.FORBIDDEN).json('Refresh token is not valid')
    }

    const token = await authService.requestRefreshToken(oldRefreshToken, req.body)
    const { accessToken, refreshToken } = token
    refreshTokens = refreshTokens.filter((token) => token !== oldRefreshToken)
    refreshTokens.push(refreshToken)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })
    res.status(StatusCodes.OK).json({ accessToken: accessToken })
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)

    res.status(StatusCodes.CREATED).json({
      message: 'Logout successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  login,
  register,
  requestRefreshToken,
  logout
}
