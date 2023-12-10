import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)

    res.status(StatusCodes.OK).json({
      message: 'POST board request succeeded'
    })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: error.message })
  }
}

export const boardController = {
  createNew
}
