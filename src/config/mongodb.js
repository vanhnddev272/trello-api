import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  try {
    await mongoClientInstance.connect()
    console.log('Connected to MongoDB')

    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
  } catch (err) {
    throw new Error(err)
  }
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  console.log('close')
  await mongoClientInstance.close()
}


