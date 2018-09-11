const Base = require('clay-base-sdk')
const jwt = require('jsonwebtoken')

const JWT_TOKEN = process.env.JSON_WEB_TOKEN_SECRET;

const authAPI = {
    login: (req, res, next) => {
        const {
            email,
            password
        } = req.body

        if(email == null) {
            throw new Error('Email is null')
        }

        if(password == null) {
            throw new Error('Password is null')
        }

        Base.User.login({
            email,
            password
        }).then(_user => {
            let user = _user.values()

            delete user.password

            user.token = jwt.sign(user, JWT_TOKEN)
            next(user)
        }).catch(err => { 
            if(err.response != null) {
                next(new Error(err.response.body.message))                 
            }

            next(err)
        })
    },

    register: (req, res, next) => {
        const { 
            email,
            password
        } = req.body

        Base.User.register({
            email,
            password
        }).then(_user => {
            let user = _user.values()

            delete user.password

            user.token = jwt.sign(user, JWT_TOKEN)
            next(user)
        }).catch(err => { 
            if(err.response != null) {
                next(new Error(err.response.body.message))                 
            }
            
            next(err)
        })
    }
}

module.exports = authAPI;