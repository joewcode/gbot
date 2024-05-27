import tgAPI from '../tgapi/index.js'
import Redis from '../redis.js'
import commands from './commands.js'
import Parser from './parser.js'



const webhookParser = (req) => {
  const lastId = +req.body.update_id
  if ( lastId < 1) return false
  Redis.redis.set('last_update_id', lastId)
  //console.log("ReqBody", req.body)
  if ( req.body.message !== undefined ) {
    Parser.ReadMessage(req.body.message)
  } else return console.log('Read WebHook error message', req.body)
}

const getUpdates = async() => {
  const lastId = await Redis.redis.get('last_update_id')
  let lastUp = (+lastId ?? 0)
  const data = await tgAPI.Request('getUpdates', {offset: lastUp+1})
  if ( !data ) return false
  data.forEach(async(e) => {
    lastUp = e.update_id
    if ( e.message !== undefined ) {
      Parser.ReadMessage(e.message)
    }
  })
  await Redis.redis.set('last_update_id', lastUp)
  console.log('Update process successfully')
  return data
}

const setMyCommands = async() => {
  console.log("commands", commands)
  const _default = await tgAPI.Request('setMyCommands', commands.defaultCommands)
  const all_private_chats = await tgAPI.Request('setMyCommands', commands.AllPrivateChatCommands)
  const all_group_chats = await tgAPI.Request('setMyCommands', commands.AllGroupChatCommands)
  
  return {_default, all_private_chats, all_group_chats}
}

// InlineKeyboardButton

export default {
  webhookParser,
  getUpdates,
  setMyCommands,
}


/* const commands = [
  'getMe', // 
  'getUpdates', // 
  'deleteWebhook', // 
  'WebhookInfo', // 
  'sendMessage', // 
  'setMyCommands', // 
  'deleteMyCommands', // 
  'getMyCommands', // 
]
 */