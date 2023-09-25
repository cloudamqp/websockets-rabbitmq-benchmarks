import { amqp } from './config.js'


async function connection(index) {
    try {
        let clientId = `publisher_${index.toString()}`
        await amqp.connect()
        console.log(`CLIENT CONNECTED: ${clientId}`)
    } catch (err) {
        console.error("CONNECTION ERROR", err)
    }
}

async function idleConnections(connections) {
    for(let i = 0; i < connections; i++) {
        await connection(i)
    } 
}

export default idleConnections