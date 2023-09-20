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

async function createProducer(index) {
    try {
        let clientId = `producer_${index.toString()}`
        const conn = await amqp.connect()
        const ch = await conn.channel()
        console.log(`CLIENT CONNECTED: ${clientId}`)

        const q = await ch.queue(`queue_${index.toString()}`)
        await q.publish(`Hello ${index}`, {deliveryMode: 2})
        // setInterval(
        //   function (){
        //     q.publish(`Hello ${index}`, {deliveryMode: 2})
        //   }, 
        //   10000
        // )
    } catch (err) {
        console.error("CONNECTION ERROR", err)
    }
}

async function createConsumer(index) {
  try {
      let clientId = `consumer_${index.toString()}`
      const conn = await amqp.connect()
      const ch = await conn.channel()
      console.log(`CLIENT CONNECTED: ${clientId}`)

      const q = await ch.queue(`queue_${index.toString()}`)
      await q.subscribe({noAck: true}, async (msg) => {
        console.log(msg.bodyToString())
      })
  } catch (err) {
      console.error("CONNECTION ERROR", err)
  }
}

for(let i = 0; i < connections; i++) {
    await createConsumer(i)
    await createProducer(i)
}
