Comparing the performances of web-mqtt, web-stomp and web-amqp. Metrics

## Steps to run

- Clone repo: `git clone https://github.com/cloudamqp/websockets-rabbitmq-benchmarks.git`
- Navigate into project: `cd websockets-rabbitmq-benchmarks`
- Install dependencies: `npm install`

## Usage
You can either test idle connections or connections with messages

### Testing connections

You can create n number of idle web-mqtt, web-stomp or web-amqp connections with:
`npm run [command] [number of connections]`

Where [command] is one of: `mqtt-connections stomp-connections amqp-connections`

## Stress testing

You can also set up a 1:1 topology between n publishers and n 
subscribers with:
`npm run [command] [number of connections]`

Where [command] is one of: `mqtt-messages stomp-messages amqp-messages`

## Bottlenecks

For better results, here are some bottlenecks to get rid of or minimize:

- Reduce connection tcp buffer sizes to reduce memory usage
- Increase the statistics collection interval - default is 5 secs
- Raise the maximum number of file handles the RabbitMQ node can have open