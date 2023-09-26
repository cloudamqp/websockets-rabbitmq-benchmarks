import { Client } from '@stomp/stompjs'
import randomInterval from '../random_interval.js'
Object.assign(global, { WebSocket })

function connectionsWithMessages (clientSettings, connections) {
  for (let i = 0; i < connections; i++) {
    const client = new Client(clientSettings)
    client.onConnect = () => {
      console.log(`Connected to broker ${clientSettings.brokerURL}`)
      client.subscribe('/queue/test', message => {
        console.log(`Incoming message: ${message.body}`)
      })
      setInterval(() => {
        client.publish({ destination: '/queue/test', body: 'test message' })
        console.log('Message published')
      }, randomInterval())
    }
    client.activate()
  }
}

export default connectionsWithMessages
