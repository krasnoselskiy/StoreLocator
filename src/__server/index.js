const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv').config({ path: __dirname + '/./../../.env' })
const bodyParser = require('body-parser')
const storeRoutes = require('./routes/stores')


const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.options(['/create', '/delete/:id', '/upload'], function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.end()
})
app.use(storeRoutes)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.LOGIN}:${process.env.PASS}@cluster0-txram.mongodb.net/stores`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log(`Server listen port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
    console.log(`mongodb+srv://${process.env.LOGIN}:${process.env.PASS}@cluster0-txram.mongodb.net/stores`);
  }
}

start()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});