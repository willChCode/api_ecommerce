const loginR = require('express').Router()
// const { loginPost } = require('../controllers/loginControllers')
const cookieParser = require('cookie-parser')
const { loginPost } = require('../controllers/loginControllers')

loginR.use(cookieParser())

loginR.post('/', loginPost)

module.exports = loginR
