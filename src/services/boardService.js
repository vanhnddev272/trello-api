/* eslint-disable no-useless-catch */
import { formatters } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: formatters.slugify(reqBody.title)
    }

    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
