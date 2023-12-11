/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
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

export const boardService = {
  createNew
}
