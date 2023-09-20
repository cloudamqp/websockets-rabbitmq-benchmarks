import { AMQPWebSocketClient } from './js/amqp-websocket-client.mjs'

      const textarea = document.getElementById("textarea")
      const input = document.getElementById("message")

      const tls = window.location.protocol === "https:"
      const url = `${tls ? "wss" : "ws"}://${window.location.host}`
      const amqp = new AMQPWebSocketClient(url, "/", "guest", "guest")

      async function start() {
        try {
          const conn = await amqp.connect()
          const ch = await conn.channel()
          attachPublish(ch)
          const q = await ch.queue("")
          await q.bind("amq.fanout")
          const consumer = await q.subscribe({noAck: false}, (msg) => {
            console.log(msg)
            textarea.value += msg.bodyToString() + "\n"
            msg.ack()
          })
        } catch (err) {
          console.error("Error", err, "reconnecting in 1s")
          disablePublish()
          setTimeout(start, 1000)
        }
      }

      function attachPublish(ch) {
        document.forms[0].onsubmit = async (e) => {
          e.preventDefault()
          try {
            await ch.basicPublish("amq.fanout", "", input.value, { contentType: "text/plain" })
          } catch (err) {
            console.error("Error", err, "reconnecting in 1s")
            disablePublish()
            setTimeout(start, 1000)
          }
          input.value = ""
        }
      }

      function disablePublish() {
        document.forms[0].onsubmit = (e) => { alert("Disconnected, waiting to be reconnected") }
      }

      start()