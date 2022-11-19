const { Order } = require('../models/orderModel')
const { orderSchema } = require('../common/orders/orders_schema');
const { ObjectId } = require('mongodb');
// Hacer un middleware para todas las rutas para verificar q el usuario esté autenticado

const ordersGet = async (req, res) => {

  const orders = await Order.find({})

  if (!orders) return res.status(404).json({ message: 'Ninguna orden creada' })
  // verificar q la order pertenezca al usuario

  res.status(200).json(orders)
}

const orderGetById = async (req, res) => {
  const { id } = req.params

  if(!id) return res.status(400).json({ message: 'ID es requerido' })
  if(!ObjectId.isValid(id)) return res.status(400).json({ message: `ID --> ${id}, no es un id valido de mongodb ` })

  const order = await Order.findById(id);

  if (!order) return res.status(404).json({ message: `Orden con id _${id}_ no existe` });

  res.status(200).json(order)
}

const orderPost = async (req, res) => {
  const order = req.body

  const check = orderSchema.safeParse(order);
  if(!check.success) return res.status(400).json({ message: check.error.issues[0].message });


  const newOrder = new Order(order);

  const data = await newOrder.save()

  res.status(201).json(data)
}

const orderDelete = async (req, res) => {
  const { id } = req.params

  if(!id) return res.status(400).json({ message: 'ID es requerido' })
  if(!ObjectId.isValid(id)) return res.status(400).json({ message: `ID --> ${id}, no es un id valido de mongodb ` })

  const order = await Order.findByIdAndDelete({ _id: id })

  res.status(200).json(order)
}

module.exports = {
  ordersGet,
  orderGetById,
  orderPost,
  orderDelete
}
