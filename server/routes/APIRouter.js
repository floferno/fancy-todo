const APIController = require('../controllers/APIController')
const router = require('express').Router()

router.get('/', APIController.getRandomActivity)

module.exports = router