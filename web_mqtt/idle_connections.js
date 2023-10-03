import * as mqtt from "mqtt"
import {} from 'dotenv/config'
import { clientSettings } from './config.js'


function connection(i) {
    const client = mqtt.connect(
        clientSettings['host'], 
        clientSettings['options']
    )

    client.on('error', (err) => {
        console.log('Connection error: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`Connection number ${i} established`)
    })
}

function idleConnections(connections) {
    console.log(`connections: ${connections}`)
    for(let i = 0; i < connections; i++) {
        connection(i)
    }
}

export default idleConnections
