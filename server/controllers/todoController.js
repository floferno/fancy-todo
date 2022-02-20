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

    static async getTodos(req, res, next) {
        try {
            const data = await Todo.findAll({
                where: {
                    UserId: req.decoded.id
                }
            })
            if(!data) {
				throw { msg: "No todo added yet"}
			} else { 
				res.status(200).json(data)
			}
		} catch(err) {
            next(err)
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

    static async addTodo(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const data = await Todo.create({ title, description, status, due_date, UserId: req.decoded.id })
            if(data) res.status(201).json({ 
                title: data.title,
                description: data.description, 
                status: data.status,
                due_date: data.due_date
             })
		} catch(err) {
            next(err)
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


    static async getTodoById(req, res, next) {
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
            next(err)
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

	static async updateTodo(req, res, next) {
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
            next(err)
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

	static async updateStatus(req, res, next) {
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
            next(err)            
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

	static async deleteTodo(req, res, next) {
		try {
			const data = await Todo.destroy({
				where: {
					id: +req.params.id
				}
			})
			if(!data) {
				throw { msg: "Data not found" }
			} else { 
				res.status(200).json({ msg: "Todo successfully deleted"})
			}
		} catch(err) {
            next(err)
		}
	}

}

module.exports = TodoController