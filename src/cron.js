import https from 'https'
import { CronJob } from 'cron'

const backendUrl = 'https://trello-api-3u3x.onrender.com'
export const job = new CronJob('*/14 * * * *', function () {
  console.log('Restarting server')

  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log('Server restarted')
      } else {
        console.error(`Failed to restart server with status code: ${res.statusCode}`)
      }
    })
    .on('error', (err) => {
      console.error('Error during restart: ', err.message)
    })
}, null, true, 'Asia/Ho_Chi_Minh')
