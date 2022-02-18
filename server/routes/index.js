const router = require('express').Router()
const TodoRouter = require('./todoRouter')
const UserRouter = require('./userRouter')

router.use('/todos', TodoRouter)
router.use('/users', UserRouter)

module.exports = router;