import express from 'express'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { API_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { formatters } from './utils/formatters'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })
  app.use('/v1', API_V1)
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: Backend is running successfully at Port: ${ process.env.PORT } at ${ formatters.formatted_date() }`)
    })
  } else {
    app.listen(env.APP_PORT, () => {
      console.log(`Local dev: Backend is running successfully at Port: ${ env.APP_PORT }/ at ${ formatters.formatted_date() }`)
    })
  }


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
