const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const propertySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  seller: {
    id: String,
    name: String,
    email: String
  },
  neighbourhood: [Object],
  type: String,
  noOfRoom: Number,
  noOfWashroom: Number,
  picUrl: String,
  location: String
})

const PropertyModel = mongoose.model('Property', propertySchema)
module.exports = PropertyModel
