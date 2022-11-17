const loginR = require('express').Router()
// const { loginPost } = require('../controllers/loginControllers')
const cors = require('cors');
const { loginPost } = require('../controllers/loginControllers')

// CORS - Options
var corsOptions = {
  origin: 'http://localhost:3000', // dandole acceso al front end
  credentials: true, // estableciendo credentials en true para el header de Access-Control-Allow-Credentials CORS header
  optionsSuccessStatus: 200
}

loginR.post('/', cors(corsOptions), loginPost)

module.exports = loginR
