// default all_private_chats all_group_chats all_chat_administrators chat chat_administrators chat_member

const defaultCommands = {
  commands: [
    {
      "command": "start",
      "description": "Запустить бота."
    },
    {
      "command": "help",
      "description": "Нужна помощь."
    }
  ],
  scope: {"type": "default"},
  language_code: "ru"
}

const AllPrivateChatCommands = {
  commands: [
    {
      "command": "start",
      "description": "Запустить бота."
    },
    {
      "command": "help",
      "description": "Показать команды бота."
    }
  ],
  scope: {"type": "all_private_chats"},
  language_code: "ru"
}

const AllGroupChatCommands = {
  commands: [],
  scope: {"type": "all_group_chats"},
  language_code: "ru"
}


export default {
  defaultCommands,
  AllPrivateChatCommands,
  AllGroupChatCommands,
}
