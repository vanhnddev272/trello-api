import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PASSWORD_RULE } from '~/utils/validators'

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(PASSWORD_RULE)
      .min(6)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: new Error(error).message })
  }
}

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(PASSWORD_RULE)
      .min(6)
      .required(),
    email: Joi.string()
      .email()
      .required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: new Error(error).message })
  }
}

export const authValidation = {
  login,
  register
}
