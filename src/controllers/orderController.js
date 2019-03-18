const boom = require('boom')

const Order = require('../models/Order')

exports.getOrders = (req, reply) => {
  try {
    const orders = Order.findAll()
    reply.send(orders)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getSingleOrder = (req, reply) => {
  try {
    const id = req.params.id
    const item = Order.findById(id)
    if (item) {
      reply.code(200).send(item)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.addOrder = (req, reply) => {
  try {
    const u = Order.save(req.body.user_id, req.body.items)
    if (u == null) {
      reply.code(500).send({ status: 'failure' })
    } else {
      reply.code(200).send(u)
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateOrder = (req, reply) => {
  try {
    const id = req.params.id
    const u = Order.updateItems(id, req.body.items)
    if (u) {
      reply.code(200).send(u)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.deleteOrder = (req, reply) => {
  try {
    const id = req.params.id
    const d = Order.delete(id)
    if (d && d === 1) {
      reply.code(200).send({ status: 'success' })
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}
