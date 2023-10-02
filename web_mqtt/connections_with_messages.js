import * as mqtt from "mqtt";
import {} from 'dotenv/config'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'


const host = clientSettings.host
let options = clientSettings.options

function publish(index, topic) {
    let clientId = Math.random()
    options['clientId'] = clientId
    const client = mqtt.connect(host, options)

    client.on('error', (err) => {
        console.log('Connection error: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`Connection ${index} established`)
        setInterval(() => {
            client.publish(topic, `Message from connection ${index}`)
        }, randomInterval)
    })
}

function subscribe(index, topic) {
    let clientId = Math.random()
    options['clientId'] = clientId
    const client = mqtt.connect(host, options)

    client.on('error', (err) => {
        console.log('Connection error: ', err)
        client.end()
    })
    client.on('connect', () => {
        console.log(`Connection ${index} established`)
        client.subscribe(topic, { qos: 1 }, function (err) {
            if (err) {
                console.log('Subscribe error: ', err)
            }
        })
    })
    client.on('message', function (topic, message) {
        console.log(`${message}`)
    })
}

// Test with data flowing every 5 secs in a 1:1 topology between n number of
// publishers and n number of subscribers
function connectionsWithMessages(connections) {
    for(let index = 0; index < connections; index++) {
        let topic = `topic_${index.toString()}`
        publish(index, topic)
        subscribe(index, topic)
    }
}

export default connectionsWithMessages
