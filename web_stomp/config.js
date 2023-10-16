import { WebSocket } from 'ws'
import dotenv from 'dotenv'
Object.assign(global, { WebSocket })
dotenv.config()

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
  brokerURL: process.env.STOMP_BROKER,
  connectHeaders: {
    login: process.env.BROKER_USERNAME,
    passcode: process.env.BROKER_PASSWORD,
    host: process.env.VHOST,
  },
  reconnectDelay: 100,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
}

export { nodeEnv, clientSettings }
