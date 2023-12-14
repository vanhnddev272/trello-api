import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPE } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string()
      .required()
      .max(50)
      .trim()
      .strict(),
    description: Joi.string()
      .required()
      .max(256)
      .trim()
      .strict(),
    type: Joi.string()
      .valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE)
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

export const boardValidation = {
  createNew
}
