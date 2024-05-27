import 'dotenv/config'
import TGbot from '../tgbot/index.js'



const webhook = async(req, reply) => {
  // is verified connection?
  if ( process.env.TGBOT_SECRET !== req.params.secret ) {
    reply.code(403).send()
    return 1
  }
  TGbot.webhookParser(req)
  reply.code(200).send({ok: true})
}

const getUpdates = async(req, reply) => {
  const data = await TGbot.getUpdates()
  reply.code(200).send({method: 'updates', data})
}

const setMyCommands = async(req, reply) => {
  const data = await TGbot.setMyCommands()
  reply.code(200).send({method: 'set commands', data})
}



export default {
  webhook,
  getUpdates,
  setMyCommands,
}
