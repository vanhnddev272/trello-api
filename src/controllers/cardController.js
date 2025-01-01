import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await cardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const deleteCard = async (req, res, next) => {
  try {
    const deleteCard = await cardService.deleteCard(req.params.id)

    res.status(StatusCodes.OK).json(deleteCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew,
  deleteCard
}
