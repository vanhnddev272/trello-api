import jwt from 'jsonwebtoken'
import { env } from '~/config/environment.config'

export const generateToken = async (user) => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      generateTime: Date()
    }
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: '1d'
    })

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: '1y'
    })
    return Promise.resolve({ accessToken, refreshToken })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const verifyRefreshToken = async (refreshToken) => {
  try {
    jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, (err, payload) => {
      if (err) {
        return Promise.reject(err)
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
