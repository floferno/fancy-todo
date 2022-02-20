module.exports = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        let errMsg = []
        err.errors.forEach(el => {
            errMsg.push(el.message)
        })
        res.status(400).json({ error: errMsg })
    } else if (err.name === 'ClientError') {
        res.status(err.status).json({ error: err.msg })
    } else {
        res.status(500).json({ error: "Internal server error" })
    }
}