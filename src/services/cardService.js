import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

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

export const cardService = {
  createNew
}
