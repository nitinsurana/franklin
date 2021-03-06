const orderController = require('../controllers/orderController')

const routes = [
  {
    method: 'GET',
    url: '/api/orders',
    handler: orderController.getOrders,
    schema: {
      tags: ['order'],
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
    url: '/api/orders/:id',
    handler: orderController.getSingleOrder,
    schema: {
      tags: ['order'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'order id'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' }
          },
          additionalProperties: true
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
    url: '/api/orders',
    handler: orderController.addOrder,
    schema: {
      tags: ['order'],
      body: {
        type: 'object',
        properties: {
          userId: {
            type: 'integer'
          },
          items: {
            type: 'array',
            items: { type: 'integer' }
          }
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
          additionalProperties: true,
          properties: {
            'id': { type: 'integer' }
          }
        }
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/orders/:id',
    handler: orderController.updateOrder,
    schema: {
      tags: ['order'],
      'type': 'object',
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'order id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { type: 'integer' }
          }
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
    url: '/api/orders/:id',
    handler: orderController.deleteOrder,
    'schema': {
      'tags': ['order'],
      'params': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'integer',
            'description': 'order id'
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
