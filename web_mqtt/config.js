import {} from 'dotenv/config'

const nodeEnv = process.env.NODE_ENV

const clientSettings = {
  host: process.env.MQTT_BROKER,
  options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    }
}

export { nodeEnv, clientSettings }
