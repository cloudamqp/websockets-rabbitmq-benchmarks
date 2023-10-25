import {} from 'dotenv/config'
import WebSocket from 'ws';

Object.assign(global, { WebSocket });

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
  host: process.env.AMQP_BROKER,
  username: process.env.BROKER_USERNAME,
  password: process.env.BROKER_PASSWORD
}

export { nodeEnv, clientSettings }
