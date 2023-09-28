import { Client } from '@stomp/stompjs'
Object.assign(global, { WebSocket })

function idleConnections (clientSettings, connections) {
  for (let i = 0; i < connections; i++) {
    const client = new Client(clientSettings)
    client.onConnect = () => {
      console.log(`Connection ${i} established`)
    }
    client.activate()
  }
}

export default idleConnections
