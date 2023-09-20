import * as mqtt from "mqtt";
import {} from 'dotenv/config'

if (process.argv.length !== 3) {
    console.log("Usage: node idle_connections.js CONNECTIONS")
    process.exit()
}

const host = process.env.MQTT_BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const connections = parseInt(process.argv[2])

function connectClient(i) {
    let clientId = `publisher_${i.toString()}`
    let options = {
        keepalive: 300,
        clientId: `publisher_${i.toString()}`,
        clean: false,
        username: username,
        password: password,
        connectTimeout: 30 * 1000,
    }

    const client = mqtt.connect(host, options)
    
    client.on('error', (err) => {
        console.log('CONNECTION ERROR: ', err)
        client.end()
    })
    
    client.on('connect', () => {
        console.log(`CLIENT CONNECTED: ${clientId}`)
    })
}

for(let i = 0; i < connections; i++) {
    connectClient(i)
}



