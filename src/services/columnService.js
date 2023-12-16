import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

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

export const columnService = {
  createNew
}
