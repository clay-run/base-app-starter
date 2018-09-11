const Base = require('clay-base-sdk')

const userAPI = {
    get: (req, res, next) => {
        next(req.user)
    }
}

module.exports = userAPI