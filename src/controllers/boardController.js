import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getBoards()

    res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const detailsBoard = await boardService.getDetails(req.params.id)

    res.status(StatusCodes.OK).json(detailsBoard)
  } catch (error) {
    next(error)
  }
}

const updateBoard = async (req, res, next) => {
  try {
    const updateBoard = await boardService.updateBoard(req.params.id, req.body)

    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

const uploadBackground = async (req, res, next) => {
  try {
    if (!req.file) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' })
    await boardService.updateBackground(req.params.id, req.file.path )

    return res.status(StatusCodes.OK).json({
      secure_url: req.file.path
    })
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  getBoards,
  createNew,
  getDetails,
  updateBoard,
  moveCardToDifferentColumn,
  uploadBackground
}
