// import userController from '../app/controllers/user'

export default [
  {
    method: 'GET',
    url: '/user/fetch',
    handler: async(req, reply) => {
        reply.code(200).send({method: 'fetch'})
    }
  },
]
