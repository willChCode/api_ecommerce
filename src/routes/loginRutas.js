const loginR = require('express').Router()
const { loginPost } = require('../controllers/loginControllers')
// CORS - Options

loginR.post('/', loginPost)

module.exports = loginR
