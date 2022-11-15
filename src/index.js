require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { conexionDB } = require('./mongo')
const notFound = require('./middleware/notFound')
const userR = require('./routes/usersRutas')
// const adminR = require('./routes/adminRutas')
// const loginR = require('./routes/loginRutas')
const app = express()

//config
app.set('nameServer', 'SERVER WILL')
app.use(express.json())
app.use(cookieParser());

//conexion
conexionDB()

//middleware
app.use(morgan('dev'))

//rutas
app.get('/', (req, res) => {
  res.send('holas')
})
app.use('/api/users', userR)
app.use('/api/login', loginR)

//middlewares
app.use(notFound)

//puerto
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`${app.get('nameServer')} on port ${port}`)
})
