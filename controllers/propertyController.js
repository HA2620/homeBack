const asyncHandler = require('express-async-handler')
const PropertyModel = require('../models/property')
const mongoose = require('mongoose')

// @desc    Fetch all houses
// @route   GET /api/houses
// @access  Public
const getHouses = asyncHandler(async (req, res) => {
  const { id, type, priceSort, loc, rooms, washrooms } = req.query
  const query = {}

  if (type) {
    query.type = type
  }
  if (loc) {
    query.location = loc
  }
  if (rooms) {
    query.noOfRoom = rooms
  }
  if (washrooms) {
    query.noOfWashroom = washrooms
  }
  if (id) {
    query['seller.id'] = id
  }
  console.log('query = ', query)

  if (priceSort) {
    if (priceSort == 'high-low') {
      const houses = await PropertyModel.find(query).sort({ price: -1 })
      res.json(houses)
    } else if (priceSort == 'low-high') {
      const houses = await PropertyModel.find(query).sort({ price: 1 })
      res.json(houses)
    }
  } else {
    const houses = await PropertyModel.find(query)
    res.json(houses)
  }
})

// @desc    Fetch single house
// @route   GET /api/houses/:id
// @access  Public
const getHouseById = asyncHandler(async (req, res) => {
  const house = await PropertyModel.findById(req.params.id)
  if (house) {
    res.json(house)
  } else {
    res.status(404)
    throw new Error('House not found')
  }
})

// @desc    Create a house
// @route   POST /api/houses
// @access  Private
const createHouse = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    seller,
    neighbourhood,
    type,
    noOfRoom,
    noOfWashroom,
    picUrl,
    location
  } = req.body

  const house = new PropertyModel({
    name,
    description,
    price,
    seller,
    neighbourhood,
    type,
    noOfRoom,
    noOfWashroom,
    picUrl,
    location
  })

  const createdHouse = await house.save()
  res.status(201).json(createdHouse)
})
// @desc    Edit a house
// @route   PUT /api/houses
// @access  Private
const updateHouse = asyncHandler(async (req, res) => {
  const { type, price, location, rooms, washrooms } = req.body

  const house = new PropertyModel({
    type,
    price,
    location,
    rooms,
    washrooms,
    owner: req.user._id
  })

  const createdHouse = await house.save()
  res.status(201).json(createdHouse)
})
// @desc    Delete a house
// @route   PUT /api/houses
// @access  Private
const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.body

  const house = await PropertyModel.deleteOne({
    _id: id
  })

  res.status(201).json(house)
})

module.exports = {
  getHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse
}
