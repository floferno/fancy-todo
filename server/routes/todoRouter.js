const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.getTodoById)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router;