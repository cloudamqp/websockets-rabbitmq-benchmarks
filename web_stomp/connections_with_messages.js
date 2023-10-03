import { Client } from '@stomp/stompjs'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'
Object.assign(global, { WebSocket })

function connectionsWithMessages (connections) {
  for (let index = 0; index < connections; index++) {
    const client = new Client(clientSettings)
    client.onConnect = () => {
      console.log(`Connection ${index} established`)
      client.subscribe('/queue/test', message => {
        console.log(`${message.body}`)
      })
      setInterval(() => {
        client.publish({ destination: '/queue/test', body: `Message from connection ${index}` })
      }, randomInterval())
    }
    client.activate()
  }
}

export default connectionsWithMessages
