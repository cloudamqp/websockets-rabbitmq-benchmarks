import {} from 'dotenv/config'
import WebSocket from 'ws';

Object.assign(global, { WebSocket });

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
  host: process.env.AMQP_BROKER,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
}

export { nodeEnv, clientSettings }
