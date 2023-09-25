import { AMQPWebSocketClient } from './amqp-websocket-client.mjs'
import {} from 'dotenv/config'
import WebSocket from 'ws';

Object.assign(global, { WebSocket });


const host = process.env.AMQP_BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const nodeEnv = process.env.NODE_ENV

// url, vhost, username, password
const amqp = new AMQPWebSocketClient(host, username, username, password)

export { nodeEnv, amqp }