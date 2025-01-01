import { StatusCodes } from 'http-status-codes'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)
    const findNewCard = await cardModel.findOneById(createdCard.insertedId)

    await columnModel.pushCardOrderIds(findNewCard)

    return findNewCard
  } catch (error) {
    throw error
  }
}

const deleteCard = async (cardId) => {
  try {
    const targetCard = await cardModel.findOneById(cardId)
    if (!targetCard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Card not found!')
    }

    await cardModel.deleteCard(cardId)

    await columnModel.deleteCardOrderIds(targetCard)


    return { deletedResult: 'Card deleted successfully!' }
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew,
  deleteCard
}
