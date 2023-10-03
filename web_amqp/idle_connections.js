import { clientSettings } from './config.js';
import { AMQPWebSocketClient } from './amqp-websocket-client.mjs'

async function idleConnections(connections) {
    for(let i = 0; i < connections; i++) {
        const amqp = new AMQPWebSocketClient(clientSettings.host, clientSettings.username, clientSettings.username, clientSettings.password)
        amqp.connect().then(() => {
            console.log(`Connection number ${i} established`)
        })
    }
}

export default idleConnections
