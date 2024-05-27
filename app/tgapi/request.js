import 'dotenv/config'

const URLbotAPI = `https://api.telegram.org/bot${process.env.TGBOT_TOKEN}/`
const URLfile = `https://api.telegram.org/file/bot${process.env.TGBOT_TOKEN}/`
const headers = {
  "Content-Type": "application/json",
}

const Request = async(command, data) => {
  try {
    const response = await fetch(URLbotAPI+command, {method: 'POST', headers, body: JSON.stringify(data)})
    const body = await response.json()
    if ( !body.ok ) return false
    return body.result
  } catch (e) {
    console.log(e)
    return false
  }
}

export default Request
