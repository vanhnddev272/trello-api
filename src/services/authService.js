import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { authModel } from '~/models/authModel'
import ApiError from '~/utils/ApiError'
import { generateToken } from '~/utils/jwt_helpers'

const login = async (reqBody) => {
  try {
    const loginUser = await authModel.findUserByUsername(reqBody.username)
    if (!loginUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Account does not exist!')
    }

    const isPasswordValid = await bcrypt.compare(
      reqBody.password,
      loginUser.password
    )

    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid email or password. Please try again with the correct credentials!')
    }

    const { accessToken } = await generateToken(reqBody)

    return {
      loginUser,
      accessToken
    }
  } catch (error) {
    throw error
  }
}

const register = async (reqBody) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(reqBody.password, salt)
    const newUser = {
      ...reqBody,
      password: hashPassword
    }

    const registeredUser = await authModel.register(newUser)
    return await authModel.findUserById(registeredUser.insertedId)
  } catch (error) {
    throw error
  }
}

const generateRefreshToken = async (reqBody) => {
  try {
    return (await generateToken(reqBody)).refreshToken
  } catch (error) {
    throw error
  }
}

export const authService = {
  login,
  register,
  generateRefreshToken
}
