import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { formatters } from '~/utils/formatters'

const getBoards = async () => {
  try {
    return await boardModel.getBoards()
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: formatters.slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)
    return await boardModel.findOneById(createdBoard.insertedId)
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

const updateBoard = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: formatters.formatted_date()
    }
    return await boardModel.updateBoard(boardId, updateData)
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    await columnModel.updateColumn(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: formatters.formatted_date()
    })

    await columnModel.updateColumn(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: formatters.formatted_date()
    })

    await cardModel.updateCard(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updatedResult: 'Successfully' }
  } catch (error) {
    throw error
  }
}

const updateBackground = async (boardId, updateBg) => {
  try {
    const updateData = {
      updateBg,
      updatedAt: formatters.formatted_date()
    }
    return await boardModel.updateBackground(boardId, updateData)
  } catch (error) {
    throw error
  }
}

export const boardService = {
  getBoards,
  createNew,
  getDetails,
  updateBoard,
  moveCardToDifferentColumn,
  updateBackground
}
