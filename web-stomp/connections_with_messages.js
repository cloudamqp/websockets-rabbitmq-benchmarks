import { Client } from '@stomp/stompjs'
Object.assign(global, { WebSocket })

function connectionsWithMessages (clientSettings, connections) {
  for (let i = 0; i < connections; i++) {
    const client = new Client(clientSettings)
    client.activate()
    client.onConnect = () => {
      client.subscribe('/queue/test', message => {
        console.log(`Incoming message: ${message.body}`)
      })
      client.publish({ destination: '/queue/test', body: 'test message' })
    }
  }
}

export default connectionsWithMessages
