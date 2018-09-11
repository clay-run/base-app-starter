const express = require('express')
const router = express.Router()
const cors = require('cors')

const authAPI = require('./auth.js')
router.post('/auth/login', authAPI.login)
router.post('/auth/register', authAPI.register)

const userAPI = require('./user.js')
router.get('/me', userAPI.get)

export default router;