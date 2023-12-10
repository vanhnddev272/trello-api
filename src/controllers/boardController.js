import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)

    res.status(StatusCodes.OK).json({
      message: 'POST board request succeeded'
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
