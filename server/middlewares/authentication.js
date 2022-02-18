const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    try {
        console.log('tezzz auth')
        const token = req.headers.access_token
        const decoded = jwt.verify(token, process.env.SECRET)
        req.decoded = decoded
        next()
    } catch(err) {
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
} 

module.exports = {
    authentication
}