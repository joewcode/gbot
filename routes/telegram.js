import tgController from '../app/controllers/telegram.js'

export default [
  {
    method: 'POST',
    url: '/tg/:secret/webhook',
    handler: tgController.webhook
  },
  {
    method: 'GET',
    url: '/tg/updates',
    handler: tgController.getUpdates
  },
  {
    method: 'GET',
    url: '/tg/setcommands',
    handler: tgController.setMyCommands
  },
]

