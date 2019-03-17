const itemController = require('../controllers/itemController')

const routes = [
  {
    method: 'GET',
    url: '/api/items',
    handler: itemController.getItems,
    schema: {
      tags: ['item'],
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
    url: '/api/items/:id',
    handler: itemController.getSingleItem,
    schema: {
      tags: ['item'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'item id'
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
    url: '/api/items',
    handler: itemController.addItem,
    schema: {
      tags: ['item'],
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
    url: '/api/items/:id',
    handler: itemController.updateItem,
    schema: {
      tags: ['item'],
      'type': 'object',
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'item id'
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
    url: '/api/items/:id',
    handler: itemController.deleteItem,
    'schema': {
      'tags': ['item'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'item id'
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
