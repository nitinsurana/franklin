const boom = require('boom')

const User = require('../models/User')

exports.getUsers = async (req, reply) => {
  try {
    const users = User.findAll()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}
// todo add eslint
// todo supress warnings for missing semicolons

exports.addUser = async (req, reply) => {
  try {
    return User.save(req.body)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id
    const update = User.update({ id, name: req.body.name })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = User.delete(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}
