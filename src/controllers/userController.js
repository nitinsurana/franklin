const boom = require('boom')

const User = require('../models/User')

exports.getUsers = (req, reply) => {
  try {
    const users = User.findAll()
    reply.send(users)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getSingleUser = (req, reply) => {
  try {
    const id = req.params.id
    const user = User.findById(id)
    if (user) {
      reply.code(200).send(user)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.addUser = (req, reply) => {
  try {
    const u = User.save(req.body)
    if (u == null) {
      reply.code(500).send({ status: 'failure' })
    } else {
      reply.code(200).send(u)
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateUser = (req, reply) => {
  try {
    const id = req.params.id
    const u = User.update({ id, name: req.body.name })
    if (u) {
      reply.code(200).send(u)
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.deleteUser = (req, reply) => {
  try {
    const id = req.params.id
    const d = User.delete(id)
    if (d && d === 1) {
      reply.code(200).send({ status: 'success' })
    } else {
      reply.code(404).send({ status: 'failure' })
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}
