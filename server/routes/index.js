const router = require('express').Router()
const TodoRouter = require('./todoRouter')
const UserRouter = require('./userRouter')

router.use('/users', UserRouter)
router.use('/todos', TodoRouter)

module.exports = router;