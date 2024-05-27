import 'dotenv/config'
import Fastify from 'fastify'
import sequelize from './app/sequelize.js'
import Redis from './app/redis.js'
import routes from './routes/index.js'

// import TGbot from './app/tgbot/index.js'

// DB connection MySQL and Redis
try {
  // get updates from api not webhook
  // setInterval(() => { TGbot.getUpdates() }, 1000 * 60 * 2) // 120 sec
  await sequelize.authenticate()
  // await sequelize.sync({ alter: true }) // add databasess { force: true }
  await Redis.connect()
  console.log('MySQL and Redis connection has been established successfully.')
} catch (e) {
  console.log('MySQL or Redis connection error...', e)
  process.exit(3)
}

// Init fastify instance
const fastify = Fastify({
  logger: false
})

// --- @@@ Registers
// fastify.register(Redis, { host: '127.0.0.1' })

// Hooks !!???
fastify.addHook('onRequest', async (req) => {
  req.fastify = fastify
})

// --- @@@ Routes
fastify.register((app, _, done) => {
  app.get('/', async(req, reply) => {
    reply.code(200).send({ info: 'Services API v1', time: new Date() })
  })
  routes.map(route => app.route(route))
  done()
}, { prefix: process.env.PREFIX_ROUTES })

// --- @@@ Listen server
fastify.listen({ port: process.env.SERVER_PORT, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  } else console.log('Server listening ', address)
})
