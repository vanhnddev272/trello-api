import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { API_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { formatters } from './utils/formatters'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())
  app.use('/v1', API_V1)
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello guys, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/ at ${ formatters.formatted_date() }`)
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
