const express = require('express')
const router = express.Router()
const {
  getHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse
} = require('../controllers/propertyController')
const { protect } = require('../middleware/authMiddleware')

router
  .route('/')
  .get(getHouses)
  .post(createHouse)
  .put(updateHouse)
  .delete(deleteHouse)
router.route('/:id').get(getHouseById)

module.exports = router
