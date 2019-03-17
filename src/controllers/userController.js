// External Dependancies
const boom = require('boom')

const User = require('../models/User')

exports.getUsers = async (req, reply) => {
    try {
        const users = await User.find()
        return users
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getSingleUser = async (req, reply) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        return user
    } catch (err) {
        throw boom.boomify(err)
    }
}
//todo add eslint
//todo supress warnings for missing semicolons

exports.addUser = async (req, reply) => {
    try {
        return User.save(req.body)
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing user
exports.updateUser = async (req, reply) => {
    try {
        const id = req.params.id
        const user = req.body
        const { ...updateData } = user
        const update = await User.findByIdAndUpdate(id, updateData)
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a user
exports.deleteUser = async (req, reply) => {
    try {
        const id = req.params.id
        const user = await User.delete(id)
        return user
    } catch (err) {
        throw boom.boomify(err)
    }
}