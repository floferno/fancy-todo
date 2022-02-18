const jwt = require('jsonwebtoken')

function generateToken(payload) { // payload = property apapun yg mau dicompare
    return jwt.sign(payload, process.env.SECRET)
}

module.exports = { 
    generateToken 
}