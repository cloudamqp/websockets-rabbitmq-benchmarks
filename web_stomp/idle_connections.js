import { Client } from '@stomp/stompjs'
import { clientSettings } from './config.js';
Object.assign(global, { WebSocket })

function idleConnections (connections) {
  for (let index = 0; index < connections; index++) {
    const client = new Client(clientSettings)
    client.onConnect = () => {
      console.log(`Connection ${index} established`)
    }
    client.activate()
  }
}

export default idleConnections
