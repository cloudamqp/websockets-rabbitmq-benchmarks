import { nodeEnv, clientSettings } from './config.js';
import idleConnections from './idle_connections.js';
import connectionsWithMessages from './connections_with_messages.js';


if (process.argv.length !== 3) {
  console.log("Usage: npm run [command] [connections]")
  process.exit()
}
const connections = parseInt(process.argv[2])

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
