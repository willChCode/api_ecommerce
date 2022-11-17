require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const { conexionDB } = require('./mongo')
const notFound = require('./middleware/notFound')
const userR = require('./routes/usersRutas')
const loginR = require('./routes/loginRutas')
const ProductR = require('./routes/productsRutas')
const app = express()
const cookieParser = require('cookie-parser');
//config
// app.use(cors()) // solo usar cuando el origin es '*', o sea cuando cualquiera puede tener acceso

app.set('nameServer', 'SERVER WILL')
app.use(express.json())
app.use(cookieParser());

//conexion
conexionDB()

//middleware
app.use(morgan('dev'))

// CORS - Options
var corsOptions = {
  origin: 'http://localhost:3000', // dandole acceso al front end
  credentials: true, // estableciendo credentials en true para el header de Access-Control-Allow-Credentials CORS header
  optionsSuccessStatus: 200
}

//rutas
app.get('/', (req, res) => {
  res.send('holas')
})
app.use('/api/users', userR)
app.use('/api/login', loginR)
app.use('/api/products', ProductR)

//middlewares
app.use(notFound)

//puerto
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`${app.get('nameServer')} on port ${port}`)
})

module.exports = {
  corsOptions
}