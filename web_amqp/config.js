import {} from 'dotenv/config'
import WebSocket from 'ws';

Object.assign(global, { WebSocket });

class ClientSettings {
  constructor() {
    this.host = process.env.AMQP_BROKER
    this.username = process.env.USERNAME
    this.password = process.env.PASSWORD
  }
}

const nodeEnv = process.env.NODE_ENV
const clientSettings = new ClientSettings()

export { nodeEnv, clientSettings }
