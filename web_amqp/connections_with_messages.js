import { clientSettings } from './config.js';
import { AMQPWebSocketClient } from './amqp-websocket-client.mjs'
import randomInterval from '../random_interval.js'

function onMessage (msg) {
    console.log(msg.bodyToString())
}

async function connectionsWithMessages (connections) {
    for (let i = 0; i < connections; i++) {
        const amqp = new AMQPWebSocketClient(clientSettings.host, clientSettings.username, clientSettings.username, clientSettings.password)
        const clientId = Math.random()
        const conn = await amqp.connect()
        console.log(`Connection number ${i} established`)
        const ch = await conn.channel()
        const q = await ch.queue(`queue_${clientId}`)
        await q.subscribe({noAck: true}, onMessage)

        setInterval(() => {
            q.publish(`Message from connection ${i}`, {deliveryMode: 2})
        }, randomInterval())
    }
}

export default connectionsWithMessages
