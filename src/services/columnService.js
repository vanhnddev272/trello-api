import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { formatters } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    const findNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (findNewColumn) {
      findNewColumn.cards = []
    }

    await boardModel.pushColumnOrderIds(findNewColumn)

    return findNewColumn
  } catch (error) {
    throw error
  }
}

const updateColumn = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: formatters.formatted_date()
    }

    return await columnModel.updateColumn(columnId, updateData)
  } catch (error) {
    throw error
  }
}

const deleteColumn = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }

    await columnModel.deleteColumn(columnId)

    await cardModel.deleteAllCards(columnId)

    await boardModel.deleteColumnOrderIds(targetColumn)

    return { deletedResult: 'Column and its cards deleted successfully!' }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  updateColumn,
  deleteColumn
}
