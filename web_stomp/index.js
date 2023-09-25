import { nodeEnv, clientSettings, connections } from './config.js';
import idleConnections from './idle_connections.js';
import connectionsWithMessages from './connections_with_messages.js';

switch (nodeEnv) {
  case 'connections':
    idleConnections(clientSettings, connections)
    break
  case 'messages':
    connectionsWithMessages(clientSettings, connections)
    break
  default:
    console.log('You have to decide which benchmark to run, connections or messages')
}
