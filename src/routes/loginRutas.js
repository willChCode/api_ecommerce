const loginR = require('express').Router()
// const { loginPost } = require('../controllers/loginControllers')
const cors = require('cors');
const { loginPost } = require('../controllers/loginControllers')
const corsOptions = require('../index');

loginR.post('/', cors(corsOptions), loginPost)

module.exports = loginR
