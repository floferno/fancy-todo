const { Todo } = require('../models/index')

function authorization(req, res, next) {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((data)=> { 
    if(!data) throw { name: 'ClientError', msg: 'Data Not Found', status: 404 }
    else if (data.UserId !== req.decoded.id) throw { name: 'ClientError', msg: 'Not authorized', status: 401 }
    else next()
  })
  .catch((err)=> {
    next(err)
  })
}

module.exports = {
  authorization
}