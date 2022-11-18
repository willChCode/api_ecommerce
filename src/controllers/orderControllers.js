const { Order } = require('../models/orderModel')

const orderGet = async (req, res) => {
  const orders = await Order.find({}) // buscar order por id y por el id del usuario
  
  // verificar q la order exista
  // verificar q la order pertenezca al usuario

  res.status(200).json(orders)
}

const orderPost = async (req, res) => {
  const order = req.body

  const newOrder = new Order({
    user: order.user,
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
  orderPost,
  orderDelete
}
