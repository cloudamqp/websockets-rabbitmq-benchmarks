import { amqp } from './config.js'


async function connectionChannel(clientId) {
    const conn = await amqp.connect()
    const ch = await conn.channel()
    console.log(`CLIENT CONNECTED: ${clientId}`)
    return ch 
}

async function producer(index) {
    try {
        let clientId = `producer_${index.toString()}`
        const ch = await connectionChannel(clientId)

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
async function consumer(index) {
  try {
      let clientId = `consumer_${index.toString()}`
      const ch = await connectionChannel(clientId)

      const q = await ch.queue(`queue_${index.toString()}`)
      await q.subscribe({noAck: true}, async (msg) => {
        console.log(msg.bodyToString())
      })
  } catch (err) {
      console.error("CONNECTION ERROR", err)
  }
}

async function connectionsWithMessages(connections) {
    for(let i = 0; i < connections; i++) {
        await consumer(i)
        await producer(i)
    }
}

export default connectionsWithMessages
