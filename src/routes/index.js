const userController = require('../controllers/userController')

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.getUsers,
    schema: {
      tags: ['user'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true
          }
        }
      }
    }
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: userController.getSingleUser,
    schema: {
      tags: ['user'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'user id'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            status: { type: 'string' }
          }
        }
      }
    }
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.addUser,
    schema: {
      tags: ['user'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        500: {
          'type': 'object',
          'properties': {
            'status': { 'type': 'string' }
          }
        },
        200: {
          type: 'object',
          properties: {
            'id': { type: 'integer' },
            name: { type: 'string' }
          }
        }
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/users/:id',
    handler: userController.updateUser
  },
  {
    method: 'DELETE',
    url: '/api/users/:id',
    handler: userController.deleteUser,
    'schema': {
      'tags': ['user'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'user id'
          }
        }
      },
      'body': {
        'type': 'object',
        'properties': {
          'hello': { 'type': 'string' },
          'obj': {
            'type': 'object',
            'properties': {
              'some': { 'type': 'string' }
            }
          }
        }
      },
      'response': {
        '200': {
          'description': 'Successful response',
          'type': 'object',
          'properties': {
            'status': { 'type': 'string' }
          }
        }
      },
      '4xx': {
        'description': 'Failed response',
        'type': 'object',
        'properties': {
          'status': { 'type': 'string' },
          'message': { 'type': 'string' },
        }
      }
    }
  }
]

module.exports = routes
