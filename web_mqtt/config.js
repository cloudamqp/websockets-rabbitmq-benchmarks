import {} from 'dotenv/config'

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
    host: process.env.MQTT_BROKER,
    options: {
        keepalive: 0,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        connectTimeout: 60000,
        reconnectPeriod: 20000,
        rejectUnauthorized: false
    }
}

export { nodeEnv, clientSettings }
