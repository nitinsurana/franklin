const boom = require('boom')

const Item = require('../models/Item')

exports.getItems = (req, reply) => {
  try {
    const items = Item.findAll()
    reply.send(items)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getSingleItem = (req, reply) => {
  try {
    const id = req.params.id
    const item = Item.findById(id)
    if (item) {
      reply.code(200).send(item)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.addItem = (req, reply) => {
  try {
    const u = Item.save(req.body)
    if (u == null) {
      reply.code(500).send({ status: 'failure' })
    } else {
      reply.code(200).send(u)
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateItem = (req, reply) => {
  try {
    const id = req.params.id
    const u = Item.update({ id, name: req.body.name })
    if (u) {
      reply.code(200).send(u)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.deleteItem = (req, reply) => {
  try {
    const id = req.params.id
    const d = Item.delete(id)
    if (d && d === 1) {
      reply.code(200).send({ status: 'success' })
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}
