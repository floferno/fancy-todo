const APIController = require('../controllers/APIController')
const router = require('express').Router()

router.get('/', APIController.getAPI)

module.exports = router