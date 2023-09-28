import {} from 'dotenv/config'


const host = process.env.MQTT_BROKER
const username = process.env.USERNAME
const password = process.env.PASSWORD
const nodeEnv = process.env.NODE_ENV

const clientSettings = {
    host: host,
    options: {
        keepalive: 60000,
        clean: true,
        username: username,
        password: password,
        connectTimeout: 60000,
    }
}

export { nodeEnv, clientSettings }
