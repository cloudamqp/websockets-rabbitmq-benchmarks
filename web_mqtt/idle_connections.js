import * as mqtt from "mqtt";
import {} from 'dotenv/config'
import { clientSettings } from './config.js';


const host = clientSettings['host']
let options = clientSettings['options']

function connection(index) {
    let clientId = `publisher_${index.toString()}`
    options['clientId'] = clientId
    const client = mqtt.connect(host, options)
    
    client.on('error', (err) => {
        console.log('CONNECTION ERROR: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`CLIENT CONNECTED: ${clientId}`)
    })
}

function idleConnections(connections) {
    console.log(`connections: ${connections}`)
    for(let i = 0; i < connections; i++) {
        connection(i)
    }  
}

export default idleConnections



