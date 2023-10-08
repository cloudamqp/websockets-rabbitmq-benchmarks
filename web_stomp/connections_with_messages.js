import { Client } from '@stomp/stompjs'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'
Object.assign(global, { WebSocket })

function connectionsWithMessages (connections) {
  for (let index = 0; index < connections; index++) {
    const client = new Client(clientSettings)
    let clientId = Math.floor(Date.now() * Math.random())
    client.onConnect = () => {
      console.log(`Connection ${index} established`)
      client.subscribe(`/queue/test_${clientId}`, message => {
        console.log(`${message.body}`)
      })
      setInterval(() => {
        client.publish({ destination: `/queue/test_${clientId}`, body: `Message from connection ${index}` })
      }, randomInterval())
    }
    client.activate()
  }
}

export default connectionsWithMessages
