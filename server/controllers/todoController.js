const { Todo } = require('../models/')


class TodoController {
    // static getTodos(req, res) {
    //     Todo.findAll()
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

    static async getTodos(req, res) {
        try {
            const data = await Todo.findAll()
            if(!data) {
				throw { msg: "No todo added yet"}
			} else { 
				res.status(200).json(data)
			}
		} catch(err) {
            const error = err.msg || 'Internal server error'
			res.status(500).json({ error })
		}
    }

    // static addTodo(req, res) {
    //     const { title, description, status, due_date } = req.body
    //     Todo.create({
    //         title, description, status, due_date
    //     })
    //     .then(data => {
    //         res.status(201).json(data)
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

    static async addTodo(req, res) {
        try {
            const { title, description, status, due_date } = req.body
            const data = await Todo.create({ title, description, status, due_date })
            if(data) res.status(201).json(data)
		} catch(err) {
			res.status(500).json(err)
		}
    }

    // static getTodoById(req, res) {
    //     Todo.findOne({
    //         where: {
    //             id: +req.params.id
    //         }
    //     })
    //     .then((data) => {    
    //         console.log(data)
    //         res.status(200).json(data)
    //     })
    //     .catch((err) => {
    //         res.status(500).json(err)
    //     })  
    // }


    static async getTodoById(req, res) {
		try {
			const data = await Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
			if(!data) {
				throw { msg: "Data not found"}
			} else { 
				res.status(200).json(data)
			}
		} catch(err) {
            const error = err.msg || 'Internal server error'
			res.status(500).json({ error })
		}
    }

	
    // static updateTodo(req, res) {
    //     console.log("masuk")
    //     const { title, description, status, due_date } = req.body
    //     Todo.update({ title, description, status, due_date },{
    //         where: {
    //             id: +req.params.id
    //         },
    //         returning: true
    //     })
    //     .then(data => {
    //         res.status(200).json(data[1][0])
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

	static async updateTodo(req, res) {
		try {
			const { title, description, status, due_date } = req.body
			const data = await Todo.update({ title, description, status, due_date }, {
				where: {
					id: +req.params.id
				},
				returning: true
			})
			if(!data) {
				throw { msg: "Data not found"}
			} else { 
				res.status(200).json(data[1][0])
			}
		} catch(err) {
            const error = err.msg || 'Internal server error'
			res.status(500).json({ error })
		}
	}

    // static updateStatus(req, res) {
    //     const { status } = req.body
    //     Todo.update({ status }, {
    //         where: {
    //             id: +req.params.id
    //         },
    //         returning: true
    //     })
    //     .then(data => {
    //         res.status(200).json(data[1][0])
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

	static async updateStatus(req, res) {
        try {
			const { status } = req.body
			const data =  await Todo.update({ status }, {
				where: {
					id: +req.params.id
				},
				returning: true
			})
			if(!data) {
					throw { msg: "Data not found"}
				} else { 
					res.status(200).json(data[1][0])
				}
		} catch(err) {
            const error = err.msg || 'Internal server error'
			res.status(500).json({ error })
		}
    }


    // static deleteTodo(req, res) {
    //     Todo.destroy({
    //         where: {
    //             id: +req.params.id
    //         }
    //     })
    //     .then(() => {
    //         res.status(200).json("Todo successfully deleted")
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

	static async deleteTodo(req, res) {
		try {
			const data = await Todo.destroy({
				where: {
					id: +req.params.id
				}
			})
			if(!data) {
				throw { msg: "Data not found"}
			} else { 
				res.status(200).json({ msg: "Todo successfully deleted"})
			}
		} catch(err) {
            const error = err.msg || 'Internal server error'
			res.status(500).json({ error })
		}
	}

}

module.exports = TodoController