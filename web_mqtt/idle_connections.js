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
    for(let index = 0; index < connections; index++) {
        connection(index)
    }
}

export default idleConnections
