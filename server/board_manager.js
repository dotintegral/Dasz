const path = require('path')
const events = require('events')

const clientDir = path.join(__dirname, '..', 'client')
const widgetDir = path.join(__dirname, '..', 'widgets')
const stateHolder = require('./state_holder')
const eventEmitter = new events.EventEmitter()
const workers = {}

const nextWidgetId = (function () {
  let id = 1
  return () => id++
}())

stateHolder.on('update', (url) => {
  eventEmitter.emit('update', url)
})

module.exports = function boardManager (app) {
  function getWidgetInitialState (url, widget) {
    let worker
    const name = widget.name
    const config = widget.config
    const id = widget.id

    if (!workers[name]) {
      worker = require(path.join(widgetDir, name, 'worker'))
      worker.on('update', (ids, state) => {
        stateHolder.update(url, ids, state)
      })
    } else {
      worker = workers[name]
    }

    return worker.getInitialState(id, config)
  }

  function getBoardInitialState (boardDefinition) {
    const state = boardDefinition
    state.scenes.forEach((scene) => {
      scene.widgets.forEach((widget) => {
        widget.id = nextWidgetId()
        widget.data = getWidgetInitialState(boardDefinition.url, widget)
      })
    })

    return state
  }

  function createBoard (boardDefinition) {
    const initialState = getBoardInitialState(boardDefinition)

    stateHolder.setState(initialState)

    const url = boardDefinition.url
    const renderTemplate = require(path.join(clientDir, 'index.template.js'))

    app.use('/' + url, (req, res) => {
      res.send(
        renderTemplate({
          name: stateHolder.getBoardState(url).get('name'),
          url: url,
          boardState: stateHolder.boardStateString(url)
        })
      )
    })
  }

  return {
    createBoard,
    on: eventEmitter.on.bind(eventEmitter),
    emit: eventEmitter.emit.bind(eventEmitter),
    removeListener: eventEmitter.removeListener.bind(eventEmitter)
  }
}
