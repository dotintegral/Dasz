const events = require('events')
const ping = require('node-http-ping')

const eventEmitter = new events.EventEmitter()
const instances = []

const performPing = (widgetId, config) => () =>
    ping(config.url, config.port || 80)
      .then((time) => {
        let status = 'slow'

        if (time < 100) {
          status = 'medium'
        }

        if (time < 50) {
          status = 'fast'
        }

        eventEmitter.emit('update', [widgetId], {
          name: config.name,
          status,
          time: time + 'ms'
        })
      })
      .catch(() => {
        eventEmitter.emit('update', [widgetId], {
          name: config.name,
          status: '',
          time: 'unknown'
        })
      })

const getInitialState = (widgetId, config) => {
  instances.push({
    widgetId,
    config
  })

  setInterval(performPing(widgetId, config), config.refresh || 5000)

  return {
    name: config.name,
    status: '',
    time: 'unknown'
  }
}

module.exports = {
  on: eventEmitter.on.bind(eventEmitter),
  getInitialState
}
