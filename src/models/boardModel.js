import Joi from 'joi'
import { formatters } from '~/utils/formatters'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string()
    .required()
    .max(50)
    .trim()
    .strict(),
  slug: Joi.string()
    .required()
    .trim()
    .strict(),
  description: Joi.string()
    .required()
    .max(256)
    .trim()
    .strict(),
  columnOrderIds: Joi.array()
    .items(Joi.string())
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(formatters.formatted_date()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA
}
