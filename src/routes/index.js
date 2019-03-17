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
    handler: userController.updateUser,
    schema: {
      tags: ['user'],
      'type': 'object',
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'user id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      'response': {
        '200': {
          'description': 'Successful response',
          'type': 'object',
          additionalProperties: true
        },
        '404': {
          'description': 'Failed response',
          'type': 'object',
          'properties': {
            'status': { 'type': 'string' }
          }
        }
      }
    }
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
      'response': {
        '200': {
          'description': 'Successful response',
          'type': 'object',
          'properties': {
            'status': { 'type': 'string' }
          }
        },
        '404': {
          'description': 'Failed response',
          'type': 'object',
          'properties': {
            'status': { 'type': 'string' }
          }
        }
      }
    }
  }
]

module.exports = routes
