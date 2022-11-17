require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { conexionDB } = require('./mongo')
const notFound = require('./middleware/notFound')
const cors = require('cors')
const userR = require('./routes/usersRutas')
const loginR = require('./routes/loginRutas')
const ProductR = require('./routes/productsRutas')
const app = express()
const cookieParser = require('cookie-parser')

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}

//config
app.set('nameServer', 'SERVER WILL')
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

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
app.use('/api/products', ProductR)

//middlewares
app.use(notFound)

//puerto
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`${app.get('nameServer')} on port ${port}`)
})
