import { Client } from '@stomp/stompjs'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'
Object.assign(global, { WebSocket })

const interval = randomInterval()

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
        client.publish({ 
          destination: `/queue/test_${clientId}`, 
          body: `Message from connection ${index}`,
          headers: { durable: false }, 
        })
      }, interval)
    }

    client.onStompError = (frame) => {
      console.log('\n\nBroker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
    
    client.onDisconnect = () => {
      console.log(`\n\nConnection ${index} Terminated!!\n\n`)
    }

    client.onWebSocketClose = (closeEevent) => {
      console.log(`\n\nWebsocket ${index} Terminated!!`)
      console.log(`Reason: ${closeEevent.reason} Terminated!!`)
      console.log(`Code: ${closeEevent.code} Terminated!!\n\n`)
    }

    client.onWebSocketError = (event) => {
      console.log(`\n\nWebsocket ${index} Error`)
      console.log(`Reason: ${event.message}\n\n`)
    }

    client.activate()
  }
}

export default connectionsWithMessages