import { Client } from '@stomp/stompjs'
Object.assign(global, { WebSocket })

function idleConnections (clientSettings, connections) {
  for (let i = 0; i < connections; i++) {
    const client = new Client(clientSettings)
    client.onConnect = () => {
      console.log(`Connected to broker ${clientSettings.brokerURL}`)
    }
    client.activate()
  }
}

export default idleConnections
