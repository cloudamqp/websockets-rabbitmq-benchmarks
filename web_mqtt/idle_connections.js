import * as mqtt from "mqtt"
import {} from 'dotenv/config'
import { clientSettings } from './config.js'


const host = clientSettings['host']
let options = clientSettings['options']

function connection(index) {
    let clientId = Math.random()
    options.clientId = clientId
    const client = mqtt.connect(host, options)

    client.on('error', (err) => {
        console.log('Connection error: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`Connection ${index} established`)
    })
}

function idleConnections(connections) {
    for(let index = 0; index < connections; index++) {
        connection(index)
    }
}

export default idleConnections
