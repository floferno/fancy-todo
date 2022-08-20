const router = require('express').Router()
const TodoRouter = require('./todoRouter')
const UserRouter = require('./userRouter')
const APIRouter = require('./APIRouter')

router.get('/', (req, res) => {
    res.send('Welcome!')
})
router.use('/users', UserRouter)
router.use('/todos', TodoRouter)
router.use('/api', APIRouter)

module.exports = router;