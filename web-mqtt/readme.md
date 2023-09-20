Benchmarking web-mqtt


## Steps to run
- Clone repo: `git clone https://github.com/cloudamqp/websockets-rabbitmq-benchmarks.git`
- Navigate into project: `cd websockets-rabbitmq-benchmarks`
- Install dependencies: `npm install`
- Create `.env` file from `.env-example`

## Testing connections
You can create n number of idle MQTT connections that send only MQTT Keep 
Alives after connection establishment with the `idle_connections.js` script: `node  idle_connections.js connections` - where connections is an int

## Stress testing
You can also set up a 1:1 topology between n publishers and n 
subscribers with the `connections_with_messages.js` script: script: `node  connections_with_messages.js connections` - where connections is an int

Each publisher will publish a qos1 message to qos1 subscriber every 10 secs.
