import { nodeEnv } from './config.js';
import idleConnections from './idleConnections.js';
import connectionsWithMessages from './connectionsWithMessages.js';


if (process.argv.length !== 3) {
  console.log("Usage: npm run [command] [connections]")
  process.exit()
}
const connections = parseInt(process.argv[2])

switch (nodeEnv) {
  case 'connections':
    idleConnections(connections)
    break
  case 'messages':
    connectionsWithMessages(connections)
    break
  default:
    console.log('You have to decide which benchmark to run, connections or messages')
}
