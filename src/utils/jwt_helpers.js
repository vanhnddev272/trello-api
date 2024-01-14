import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

export const generateToken = async (user) => {
  try {
    const payload = {
      id: user._id
    }
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: '1d'
    })

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    })
    return Promise.resolve({ accessToken, refreshToken })
  } catch (error) {
    return Promise.reject(error)
  }
}
