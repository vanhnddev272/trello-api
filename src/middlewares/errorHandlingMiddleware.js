import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment.config'

export const errorHandlingMiddleware = (err, req, res, next) => {

  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  // console.error(responseError)
  // console.log('env.BUILD_MODE: ', env.BUILD_MODE)
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  res.status(responseError.statusCode).json(responseError)
}
