import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { env } from '~/config/environment.config'

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET
})

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   folder: 'Trello-app'
  // },
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

