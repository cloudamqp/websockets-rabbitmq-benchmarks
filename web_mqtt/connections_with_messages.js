import * as mqtt from "mqtt";
import {} from 'dotenv/config'
import { clientSettings } from './config.js';
import randomInterval from '../random_interval.js'


const interval = randomInterval()

function connect(i) {
    const client = mqtt.connect(
        clientSettings.host, 
        clientSettings.options
    )
    const topic = `topic_${i.toString()}`
  
    client.on('connect', function () {
      console.log(`Connection number ${i} established`)
      client.subscribe(topic, { qos: 0 }, function (err) {
        if (err) {
          console.log('Could not subscribe: ', err)
        }
      })
      setInterval(() => {
        client.publish(topic, `Message from connection ${i}`)
      }, interval)
    })

    client.on('message', function (topic, message) {
        console.log(message.toString())
    })

    client.on('error', function(err) {
      console.log('ERROR: ', err)
      client.end();
    });
}
  
function connectionsWithMessages(connections) {
  for(let i = 0; i < connections; i++) {
    connect(i)
  }
}

export default connectionsWithMessages
