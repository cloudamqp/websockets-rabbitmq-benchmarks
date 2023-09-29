import * as mqtt from "mqtt";
import {} from 'dotenv/config'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'


const host = clientSettings['host']
let options = clientSettings['options']

function publish(index, topic) {
    let clientId = Math.random()
    options['clientId'] = clientId
    const client = mqtt.connect(host, options)

    client.on('error', (err) => {
        console.log('CONNECTION ERROR: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`CLIENT CONNECTED: ${index}`)
        setInterval(() => {
            client.publish(topic, `Hello ${index}`)
        }, randomInterval)
    })
}

function subscribe(index, topic) {
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

// Test with data flowing every 5 secs in a 1:1 topology between n number of
// publishers and n number of subscribers
function connectionsWithMessages(connections) {
    for(let i = 0; i < connections; i++) {
        let topic = `topic_${i.toString()}`
        publish(i, topic)
        subscribe(i, topic)
    }
}

export default connectionsWithMessages
