const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

// router.use(authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router;