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
  reconnectDelay: 100,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
}

export { nodeEnv, clientSettings }
