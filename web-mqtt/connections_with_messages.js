import * as mqtt from "mqtt";
import {} from 'dotenv/config'


if (process.argv.length !== 3) {
    console.log("Usage: node connections_with_messages.js CONNECTIONS")
    process.exit()
}

const host = process.env.MQTT_BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const connections = parseInt(process.argv[2])
let options = {
    keepalive: 300,
    clean: true,
    username: username,
    password: password,
    connectTimeout: 30 * 1000,
}

function createPublishers(index, topic) {
    let clientId = `publisher_${index.toString()}`
    options['clientId'] = clientId
    
    const client = mqtt.connect(host, options)
    
    client.on('error', (err) => {
        console.log('CONNECTION ERROR: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`CLIENT CONNECTED: ${clientId}`)
        setInterval(() => {
            client.publish(topic, `Hello ${index}`)
        }, 10000)
    })
}

function createSubscribers(index, topic) {
    let clientId = `subscriber_${index.toString()}`
    options['clientId'] = clientId
    
    const client = mqtt.connect(host, options)
    
    client.on('error', (err) => {
        console.log('CONNECTION ERROR: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`CLIENT CONNECTED: ${clientId}`)
        client.subscribe(topic, { qos: 1 }, function (err) {
            if (err) {
                console.log('SUBSCRIPTION ERROR: ', err)
            }
        })
    })
    client.on('message', function (topic, message) {
        console.log(`TOPIC: ${topic} -- MESSAGE: ${message}`)
    })
}

// Create 1:1 topology between n number of publishers and n number of subscribers
// Each publisher will publish a message to a topic every 5 secs
// E.g if connections = 10 => 10 pubs, 10 subs
for(let i = 0; i < connections; i++) {
    let topic = `topic_${i.toString()}`
    createSubscribers(i, topic)
    createPublishers(i, topic)
}



