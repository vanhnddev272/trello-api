import { Redis } from 'ioredis'
import { env } from './environment.config'

export const connectToRedis = () => {
  try {
    return new Redis(env.REDIS_URL)

  } catch (error) {
    console.error(error)
  }
}