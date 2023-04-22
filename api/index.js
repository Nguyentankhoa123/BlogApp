const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const path = require('path')

const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const authUser = require('./routes/user')
const authPost = require('./routes/posts')
const authCat = require('./routes/categories')
const authenToken = require('./routes/authentoken')

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
mongoose
  .connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDb'))
  .catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, 'images')
  },
  filename: (req, file, callb) => {
    callb(null, Date.now() + path.extname(file.originalname))
  },
})

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.VUE_URL)

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

const upload = multer({ storage: storage }).single('photo')
const ImageUser = multer({ storage: storage }).single('profilePic')

// app.post('/upload', (req, res) => {
//   res.status(200).json('File has been uploaded')
// })

app.use(express.static('public'))
app.get('/images', (req, res) => {
  const imagePath = path.join(__dirname, '/images')
  res.sendFile(imagePath)
})

// Delete all image

// const fs = require('fs')

// const folder = './images/'

// fs.readdir(folder, (err, files) => {
//   if (err) throw err

//   for (const file of files) {
//     console.log(file + ' : File Deleted Successfully.')
//     fs.unlinkSync(folder + file)
//   }
// })

app.use('/auth', ImageUser, authRoute)
app.use('/users', ImageUser, authUser)
app.use('/posts', upload, authPost)
app.use('/category', authCat)

app.use(cors())
app.listen('5000', () => {
  console.log('backend running')
})
