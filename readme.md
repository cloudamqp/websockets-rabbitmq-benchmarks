Comparing the performances of web-mqtt, web-stomp and web-amqp. Metrics
to be tested for each protocol:

- Maximum number of connections
- Memory usage
- CPU usage

For better results, here are some bottlenecks to get rid of or minimize:

- Reduce connection tcp buffer sizes to reduce memory usage
- Increase the statistics collection interval - default is 5 secs
- Raise the maximum number of file handles the RabbitMQ node can have open