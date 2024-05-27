import { createClient } from 'redis'

const redis = createClient() // {connectTimeout: 3000}
redis.on('error', err => console.log('Redis Client Error', err))

const connect = async() => {
  await redis.connect()
}

const disconnect = async() => {
  await redis.disconnect()
}



export default {
  redis,
  connect,
  disconnect,
}
