const OrderR = require('express').Router()
const controller = require('../controllers/ordersControllers')
const handleErrors = require('../middleware/handleErrors')

OrderR.get('/', controller.ordersGet)

OrderR.get('/:id', controller.orderGetById)

OrderR.post('/', controller.orderPost)

OrderR.delete('/:id', controller.orderDelete)

OrderR.use(handleErrors)

module.exports = OrderR
