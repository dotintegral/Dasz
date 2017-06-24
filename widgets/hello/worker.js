const events = require('events')

const eventEmitter = new events.EventEmitter()
const ids = []

setInterval(() => {
  const status = (Math.random() > 0.5) ? 'success' : 'error'
  const message = (status === 'success') ? 'Wow! Such green!' : 'Oh noes, much errors!'

  eventEmitter.emit('update', ids, {
    status,
    message
  })
}, 5000)

const getInitialState = (widgetId, config) => {
  ids.push(widgetId)

  return {
    status: 'success',
    message: config.message
  }
}

module.exports = {
  on: eventEmitter.on.bind(eventEmitter),
  getInitialState
}
