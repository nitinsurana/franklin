const userController = require('../controllers/userController')

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.getUsers
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.addUser
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
      'summary': 'qwerty',
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'string',
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
        '201': {
          'description': 'Successful response',
          'type': 'object',
          'properties': {
            'hello': { 'type': 'string' }
          }
        }
      },
      'security': [
        {
          'apiKey': []
        }
      ]
    }
  }
]

module.exports = routes
