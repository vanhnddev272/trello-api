import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

const updateColumn = async (req, res, next) => {
  try {
    const updateBoard = await columnService.updateColumn(req.params.id, req.body)

    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  updateColumn
}
