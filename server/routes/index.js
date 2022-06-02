const router = require('express').Router()
const TodoRouter = require('./todoRouter')
const UserRouter = require('./userRouter')
const APIRouter = require('./APIRouter')

router.use('/users', UserRouter)
router.use('/todos', TodoRouter)
router.use('/api', APIRouter)

module.exports = router;