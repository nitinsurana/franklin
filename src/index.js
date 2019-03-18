const path = require('path')
const userRoutes = require('./routes/user-routes')
const itemRoutes = require('./routes/item-routes')
const orderRoutes = require('./routes/order-routes')

const swagger = require('../config/swagger')

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-swagger'), swagger.options)
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'ui'),
  prefix: '/ui/' // optional: default '/'
});

[...userRoutes, ...itemRoutes, ...orderRoutes]
  .forEach((route, index) => {
    fastify.route(route)
  })

fastify.get('/', (req, reply) => {
  reply.redirect(302, '/ui/')
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.swagger()
    fastify.log.info(`listening on ${fastify.server.address().port}`)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
