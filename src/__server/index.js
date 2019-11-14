const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const storeRoutes = require('./routes/stores')

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.options(['/create', '/delete/:id'], function (req, res) {
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
