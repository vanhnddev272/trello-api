import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)

    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.OK).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}
