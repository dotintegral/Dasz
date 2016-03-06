var events = require('events')

var eventEmitter = new events.EventEmitter()

setInterval(() => {

  var status = !!(Math.random() * 2) ? 'success' : 'error'

  eventEmitter.emit('update', {
    status,
    message: 'Well, hello!'
  })
}, 5000)

module.exports = {
  on: eventEmitter.on.bind(eventEmitter)
}
