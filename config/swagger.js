exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'franklin',
      description: 'Project Franklin Software Challenge',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}
