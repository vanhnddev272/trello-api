import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

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
      .strict()
  })

  try {
    console.log(req.body)

    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.OK).json({
      message: 'POST board request succeeded'
    })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: new Error(error).message })
  }
}

export const boardValidation = {
  createNew
}
