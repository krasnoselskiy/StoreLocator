const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String
  },
  lat: {
    type: Number,
    default: null
  },
  lon: {
    type: Number,
    default: null
  }
})

module.exports = model('Store', schema)
