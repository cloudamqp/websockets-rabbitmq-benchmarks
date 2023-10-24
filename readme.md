Comparing the performances of web-mqtt, web-stomp and web-amqp. Metrics

## Steps to run

- Clone repo: `git clone https://github.com/cloudamqp/websockets-rabbitmq-benchmarks.git`
- Navigate into project: `cd websockets-rabbitmq-benchmarks`
- Install dependencies: `npm install`

## Environment variables

- set `BROKER_USERNAME` and `BROKER_PASSWORD` for credentials no matter which protocol you choose
- set `MQTT_BROKER`, `STOMP_BROKER` or `AMQP_BROKER` respectively for
  the full websocket URL (including protocol, host, port and path). For
  example ```export STOMP_BROKER=ws://127.0.0.1:15674/ws```

- set `VHOST` for the STOMP client

## Usage
You can either test idle connections or connections with messages

- Create n idle web-mqtt, web-stomp or web-amqp connections with:
    ```npm run [command] [number of connections]```

    Where [command] is one of: `mqtt-connections stomp-connections amqp-connections`

- Create n connections(with messages flowing)  with:
    ```npm run [command] [number of connections]```

    Where [command] is one of: `mqtt-messages stomp-messages amqp-messages`

## Bottlenecks

For better results, here are some bottlenecks to get rid of or minimize:

- Reduce connection tcp buffer sizes to reduce memory usage
- Increase the statistics collection interval - default is 5 secs
- Raise the maximum number of file handles the RabbitMQ node can have open
