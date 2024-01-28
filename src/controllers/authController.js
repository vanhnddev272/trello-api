import { StatusCodes } from 'http-status-codes'
import { connectToRedis } from '~/config/redis.config'
import { authService } from '~/services/authService'

const login = async (req, res, next) => {
  try {
    const loginUser = await authService.login(req.body)
    // const refreshToken = (await generateToken(req.body)).refreshToken

    // let options = {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'none'
    // }
    const client = connectToRedis()
    const { refreshToken, ...user } = loginUser
    client.set(user.loginUser._id.toString(), refreshToken, 'EX', 365 * 24 * 60 * 60)

    res
      // .cookie('refreshToken', refreshToken, options)
      .status(StatusCodes.OK).json({
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
    const userLogged = await authService.findUserLogged(req.body.username)
    const client = connectToRedis()
    client.get(userLogged._id.toString(), async (err, result) => {
      if (err) {
        next(err)
      }
      const oldRefreshToken = result
      if (!oldRefreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json('You are not authenticated!')
      }

      const token = await authService.requestRefreshToken(oldRefreshToken, req.body)
      const { accessToken, refreshToken } = token
      // let options = {
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: 'none'
      // }
      client.set(userLogged._id.toString(), refreshToken, 'EX', 365 * 24 * 60 * 60)
      res
        // .cookie('refreshToken', refreshToken, options)
        .status(StatusCodes.OK).json({ accessToken: accessToken })
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    // res.clearCookie('refreshToken')
    const userLogged = await authService.findUserLogged(req.body.username)
    const client = connectToRedis()
    client.del(userLogged._id.toString(), (err, reply) => {
      if (err) {
        next(err)
      }
      res.status(StatusCodes.CREATED).json({
        message: 'Logout successfully'
      })
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
