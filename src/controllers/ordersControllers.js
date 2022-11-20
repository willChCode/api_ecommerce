const { Order } = require('../models/orderModel')
const { orderSchema } = require('../common/orders/orders_schema')
const { ObjectId } = require('mongodb')
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
  const order = req.body
  //new
  const userId = order.user
  const dataUser = await User.findById({ _id: userId })

  const check = orderSchema.safeParse(order)
  // console.log(check)
  if (!check.success)
    return res.status(400).json({ message: check.error.issues[0].message })
  // cambios
  const newOrder = new Order(order)

  const data = await newOrder.save()
  dataUser.order = dataUser.order.concat(data._id)
  await dataUser.save()
  res.status(201).json(data)
}

const orderDelete = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400).json({ message: 'ID es requerido' })
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: `ID --> ${id}, no es un id valido de mongodb ` })

  const order = await Order.findByIdAndDelete({ _id: id })

  res.status(200).json(order)
}

module.exports = {
  ordersGet,
  orderGetById,
  orderPost,
  orderDelete
}
