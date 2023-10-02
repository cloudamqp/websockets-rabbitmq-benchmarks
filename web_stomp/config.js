import { WebSocket } from 'ws'
import dotenv from 'dotenv'
Object.assign(global, { WebSocket })
dotenv.config()

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
  brokerURL: `wss://${process.env.BROKER}/ws`,
  connectHeaders: {
    login: process.env.USERNAME,
    passcode: process.env.PASSWORD,
    host: process.env.VHOST,
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
  onStompError: (frame) => {
    console.error(`Broker reported error: ${frame.headers['message']}`)
    console.error(`Additional details: ${frame.body}`)
  }
}

export { nodeEnv, clientSettings }
