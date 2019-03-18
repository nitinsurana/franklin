const boom = require('boom')
const request = require('request')
const User = require('../models/user')

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

exports.addUser = async (req, reply) => {
  try {
    const avatar = await generateAvatar(req.body.name)
    const u = User.save({ ...req.body, avatar })
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

function generateAvatar (name) {
  return new Promise((resolve, reject) => {
    request('http://www.colr.org/json/color/random', (err, resp, body) => {
      if (err) {
        return reject(err)
      }
      body = JSON.parse(body)
      const color = body.new_color || '0D8ABC'
      const avatar = `https://ui-avatars.com/api/?name=${name}&background=${color}&color=fff&rounded=true`
      resolve(avatar)
    })
  })
}
