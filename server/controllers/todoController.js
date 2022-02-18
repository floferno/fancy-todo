const { Todo } = require('../models/')


class TodoController {
    static getTodos(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title, description, status, due_date
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTodoById(req, res) {
        Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then((data)=> {    
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json(err)
        })  
    }

    static updateTodo(req, res) {
        console.log("masuk")
        const {title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date },{
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateStatus(req, res) {
        const { status } = req.body
        Todo.update({ status }, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(() => {
            res.status(200).json("Todo successfully deleted")
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController