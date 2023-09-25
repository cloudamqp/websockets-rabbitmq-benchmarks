import { WebSocket } from 'ws'
import dotenv from 'dotenv'
Object.assign(global, { WebSocket })
dotenv.config()

const broker = process.env.BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const vhost = process.env.VHOST
const nodeEnv = process.env.NODE_ENV
const connections = process.env.CONNECTIONS || 1

const clientSettings = {
  brokerURL: `wss://${broker}/ws`,
  connectHeaders: {
    login: username,
    passcode: password,
    host: vhost,
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
  debug: (str) => {
    console.log(str)
  },
  onStompError: (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  }
}

export { nodeEnv, clientSettings, connections }
