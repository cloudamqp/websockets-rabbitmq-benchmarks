import { Client } from '@stomp/stompjs'
import { clientSettings } from './config.js';
Object.assign(global, { WebSocket })

function idleConnections (connections) {
  for (let index = 0; index < connections; index++) {
    const client = new Client(clientSettings)
    client.activate()
    
    client.onConnect = () => {
      console.log(`Connection ${index} established`)
    }
    
    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
    
    client.onDisconnect = () => {
      console.log(`Connection ${index} Terminated!!`)
    }

    client.onWebSocketClose = (closeEevent) => {
      console.log(`\n\nWebsocket ${index} Terminated!!`)
      console.log(`Reason: ${closeEevent.reason}`)
      console.log(`Code: ${closeEevent.code}\n\n`)
    }

    client.onWebSocketError = (event) => {
      console.log(`\n\nWebsocket ${index} Error`)
      console.log(`Reason: ${event.message}\n\n`)
    }
  }
}

export default idleConnections
