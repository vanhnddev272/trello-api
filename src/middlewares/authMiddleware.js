import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

const jwtMiddleware = {
  verifyToken: async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.token || req.headers.authorization
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json('You are not allowed to access this!')
    }
    try {
      const accessToken = token.split(' ')[1]
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      next()
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json('Invalid token!')
    }
  }
}

export default jwtMiddleware
