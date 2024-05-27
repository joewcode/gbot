import Request from './request.js'

const sendMessage = async(chat_id, text, options = {}) => {
  const body = {chat_id, text, ...options}
  const req = await Request('sendMessage', body)
  return req
}

/* const inline = {
  "reply_markup": {
    "keyboard": [
      ["44 text2", "Secoddmple"],
      ["Sample text3", "Second sample3"],
    ]
  }
}
 */

export default {
  Request,
  sendMessage
}
