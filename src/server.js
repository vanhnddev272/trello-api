import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb.config'
import { env } from '~/config/environment.config'
import { API_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { formatters } from './utils/formatters'
import { corsOptions } from './config/cors.config'
import { job } from './cron'
// import session from 'express-session'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(cookieParser())
  // app.set('trust proxy', 1) // trust first proxy
  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: {
  //     secure: false
  //   }
  // }))
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
    if (env.BUILD_MODE === 'production') {
      console.log('Starting cron job ...')
      job.start()
    }
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
