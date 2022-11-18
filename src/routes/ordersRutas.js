const OrderR = require('express').Router()
const controller = require('../controllers/ordersControllers')

OrderR.get('/', controller.orderGet)

OrderR.get('/:id', controller.orderGetById)

OrderR.post('/', controller.orderPost)

OrderR.delete('/:id', controller.orderDelete)

module.exports = OrderR