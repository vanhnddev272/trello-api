import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { formatters } from '~/utils/formatters'
import { PASSWORD_RULE } from '~/utils/validators'

const AUTH_COLLECTION_NAME = 'users'
const AUTH_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    // .pattern(PASSWORD_RULE)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  createdAt: Joi.date().timestamp('javascript').default(formatters.formatted_date()),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeRegister = async (data) => {
  return await AUTH_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const register = async (data) => {
  const validData = await validateBeforeRegister(data)

  try {
    return await GET_DB().collection(AUTH_COLLECTION_NAME).insertOne({
      ...validData
    })
  } catch (error) { throw new Error(error) }
}

const findUserByUsername = async (username) => {
  try {
    return await GET_DB().collection(AUTH_COLLECTION_NAME).findOne({ username })
  } catch (error) { throw new Error(error) }
}

const findUserById = async (userId) => {
  try {
    return await GET_DB().collection(AUTH_COLLECTION_NAME).findOne({
      _id: new ObjectId(userId)
    })
  } catch (error) { throw new Error(error) }
}


export const authModel = {
  AUTH_COLLECTION_NAME,
  AUTH_COLLECTION_SCHEMA,
  register,
  findUserByUsername,
  findUserById
}
