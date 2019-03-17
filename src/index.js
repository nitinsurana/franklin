const routes = require('./routes');
const swagger = require('../config/swagger')

const fastify = require('fastify')({
    logger: true
});

fastify.register(require('fastify-swagger'), swagger.options)

routes.forEach((route, index) => {
    fastify.route(route)
})

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`listening on ${fastify.server.address().port}`)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()