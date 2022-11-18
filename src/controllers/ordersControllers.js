const { Order } = require('../models/orderModel')

// Hacer un middleware para todas las rutas para verificar q el usuario esté autenticado

const orderGet = async (req, res) => {

  // 1- Verificar q el usuario esté autenticado
  // const token = req.cookies('nombre-de-la-cookie');
  // console.log(token)

  const orders = await Order.find({}) 
  
  // verificar q la order exista
  // verificar q la order pertenezca al usuario

  res.status(200).json(orders)
}

const orderGetById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id); // buscar order por id y por el id del usuario

  if(!order) return res.status(404).json({ message: `Orden con id _${id}_ no existe` })

  // verificar q la order exista
  // verificar q la order pertenezca al usuario

  res.status(200).json(order)
}

const orderPost = async (req, res) => {
  const order = req.body

  const newOrder = new Order({
    user: order.userId,
    orderItems: order.cart,
    shippingAddress: order.shippingAddress,
    numberOfItems: order.numberOfItems,
    subTotal: order.subTotal,
    tax: order.tax,
    total: order.total,
    isPaid: order.isPaid,
    paidAt: order.paidAt,
    transactionId: order.transactionId,
  })

  const data = await newOrder.save()
  
  res.status(201).json(data)
}

const orderDelete = (req, res) => {
  const { id } = req.params

  Order.findByIdAndDelete({ _id: id }).then(data =>
    res.status(200).json(data)
  )
}

module.exports = {
  orderGet,
  orderGetById,
  orderPost,
  orderDelete,
}
