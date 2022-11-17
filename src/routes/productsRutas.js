const ProductR = require('express').Router()
const controller = require('../controllers/productsControllers')

ProductR.get('/', controller.productGet)

ProductR.post('/', controller.productPost)

ProductR.delete('/:id', controller.productDelete)

module.exports = ProductR
