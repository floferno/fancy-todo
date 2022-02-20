const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    try {
        const token = req.headers.access_token
        const decoded = jwt.verify(token, process.env.SECRET)
        req.decoded = decoded
        next()
    } catch(err) {
        next(err)
    }
} 

module.exports = authentication