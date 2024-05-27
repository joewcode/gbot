import tgAPI from '../tgapi/index.js'
import commands from './commands.js'

import User from '../models/user.js'

// set commands list
let commandsList = []
commands.defaultCommands.commands.map(e => { commandsList.push(e.command) })


const ReadMessage = async(message) => {
  console.log('NEW', message)
  const datetime = message.date
  const chatId = message.chat.id
  const chatType = message.chat.type
  const fromId = message.from.id
  const fromName = message.from.first_name

  // is supergroup? exit
  if ( chatType === 'supergroup' ) {
    console.log('SuperGroup, abort working...')
    return false
  }

  // sticker
  if ( message.sticker ) {
    console.log('sticker')
    return true
  }

  // animation
  if ( message.animation ) {
    console.log('animation')
    return true
  }

  // voice
  if ( message.voice ) {
    console.log('voice')
    return true
  }

  // video
  if ( message.video ) {
    console.log('video')
    return true
  }
  
  // text message
  if ( message.text && chatType === 'private' ) {
    // is bot command?
    if ( message.entities && message.entities[0].type === 'bot_command' ) {
      commandSwitcher(message)
      return true
    }
    // ???
    const user = await User.getUserOrCreate(message.from)
    console.log("User:", user)
    tgAPI.sendMessage(chatId, message.text)
  }
}

function commandSwitcher(mess) {
  const command = mess.text.split(" ")[0].substr(1)
  if ( !commandsList.includes(command) ) {
    console.log('Bot error command:', command)
    tgAPI.sendMessage(mess.chat.id, 'Команда не найдена! Воспользуйтесь подсказкой /help')
    return false
  }
  console.log('Execute command:', command)
  switch (command) {
    case 'start':
        tgAPI.sendMessage(mess.chat.id, `Здравствуй ${mess.from.first_name}! ...`)
      break;
    case 'help':
        tgAPI.sendMessage(mess.chat.id, `Сейчас я расскажу, что я умею и как управлять моими функциями. Для начала работы вам нужно...`)
      break;
    default: // Команда не определена?
        tgAPI.sendMessage(mess.chat.id, `Послущай ${mess.from.first_name}, Я те шо Раб команды выполнять? иди гуляй...`)
      break;
  }
}


export default {
  ReadMessage,
}