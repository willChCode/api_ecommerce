const { Order } = require('../models/orderModel')
const { orderSchema } = require('../common/orders/orders_schema')
// Hacer un middleware para todas las rutas para verificar q el usuario esté autenticado
const { User } = require('../models/usersModel')

const ordersGet = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', { name: 1, email: 1 })

    if (orders.length === 0)
      return res.status(404).json({ message: 'Ninguna orden creada' })

    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
}

const orderGetById = async (req, res, next) => {
  try {
    const { id } = req.params

    const order = await Order.findById(id)
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
}

const orderPost = async (req, res, next) => {
  try {
    const order = req.body

    const userId = order.user
    const dataUser = await User.findById({ _id: userId })

    const check = orderSchema.safeParse(order)
    if (!check.success)
      return res.status(400).json({ message: check.error.issues[0].message })

    const newOrder = new Order(order)

    const data = await newOrder.save()
    dataUser.order = dataUser.order.concat(data._id)
    await dataUser.save()

    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

const orderDelete = async (req, res, next) => {
  try {
    const { id } = req.params

    const order = await Order.findByIdAndDelete({ _id: id })

    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  ordersGet,
  orderGetById,
  orderPost,
  orderDelete
}
