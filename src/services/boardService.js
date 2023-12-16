import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { formatters } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: formatters.slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)
    const findNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return findNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const detailBoard = await boardModel.getDetailsBoard(boardId)
    if (!detailBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    const resBoard = cloneDeep(detailBoard)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}
