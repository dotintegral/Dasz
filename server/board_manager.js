var path = require('path')
var ejs = require('ejs')
var fs = require('fs')
var events = require('events')

var clientDir = path.join(__dirname, '..', 'client')
var widgetDir = path.join(__dirname, '..', 'widgets')
var stateHolder = require('./state_holder')
var eventEmitter = new events.EventEmitter()
var workers = {}

var nextWidgetId = (function () {
  var id = 1
  return () => id++
}())


stateHolder.on('update', (url) => {
  eventEmitter.emit('update', url)
})

module.exports = function boardManager(app) {

  function getWidgetInitialState(url, widget) {
    var worker
    var name = widget.name
    var config = widget.config
    var id = widget.id

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

  function getBoardInitialState(boardDefinition) {
    var state = boardDefinition
    state.scenes.forEach((scene) => {
      scene.widgets.forEach((widget) => {
        widget.id = nextWidgetId()
        widget.data = getWidgetInitialState(boardDefinition.url, widget)
      })
    })

    return state
  }

  function createBoard(boardDefinition) {
    var initialState = getBoardInitialState(boardDefinition)

    stateHolder.setState(initialState)

    var url = boardDefinition.url;
    var templateFile = path.join(clientDir, 'index.ejs')
    var onRead = (err, rawTemplate) => {
      if (err) {
        return console.error('Cannot read the index.ejs file!')
      }

      var render = ejs.compile(rawTemplate)

      app.use('/' + url, (req, res) => {
        res.send(
          render({
            name: stateHolder.getBoardState(url).get('name'),
            url: url,
            boardState: stateHolder.boardStateString(url)
          })
        )
      })
    }

    fs.readFile(templateFile, 'utf-8', onRead)
  }

  return {
    createBoard,
    on: eventEmitter.on.bind(eventEmitter),
    emit: eventEmitter.emit.bind(eventEmitter),
    removeListener: eventEmitter.removeListener.bind(eventEmitter)
  }
}
