import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.status(200).json({
      data: await GET_DB().listCollections().toArray()
    })
  })

  app.listen(() => {
    // eslint-disable-next-line no-console
    console.log(`Hello guys, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('Disconnecting from MongoDB Cloud Atlas ...')
    CLOSE_DB()
    console.log('Disconnected from MongoDB Cloud Atlas')
  })
}

(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
