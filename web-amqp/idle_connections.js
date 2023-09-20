import { AMQPWebSocketClient } from './amqp-websocket-client.mjs'
import {} from 'dotenv/config'
import WebSocket from 'ws';

Object.assign(global, { WebSocket: WebSocket });

if (process.argv.length !== 3) {
    console.log("Usage: node idle_connections.js CONNECTIONS")
    process.exit()
}

const host = process.env.AMQP_BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const connections = parseInt(process.argv[2])

// url, vhost, username, password
const amqp = new AMQPWebSocketClient(host, username, username, password)

async function connectClient(index) {
    try {
        let clientId = `publisher_${index.toString()}`
        await amqp.connect()
        console.log(`CLIENT CONNECTED: ${clientId}`)
    } catch (err) {
        console.error("CONNECTION ERROR", err)
    }
}

for(let i = 0; i < connections; i++) {
    await connectClient(i)
}

