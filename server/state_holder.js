var Immutable = require('immutable')
var events = require('events')

var boards = Immutable.Map({})

var eventEmitter = new events.EventEmitter()

function setState(boardDefinition) {
  boards = boards.set(boardDefinition.url, Immutable.fromJS(boardDefinition))
}

function getBoardState(url) {
  return boards.get(url)
}

function update(boardUrl, widgetIds, data) {
  console.log(boardUrl, widgetIds, data)

  var board = boards.get(boardUrl)
  board.get('scenes').forEach((scene) => {
    scene.get('widgets').forEach((widget) => {
      var id = widget.get('id')
      if (widgetIds.indexOf(id) > -1) {
        widget.set('data', data)
      }
    })
  })

  eventEmitter.emit('update', boardUrl)
}

function boardStateString(url) {
  var boardJSON = boards.get(url).toJSON()

  boardJSON.scenes.forEach((scene) => {
    scene.widgets.forEach((widget) => {
      delete widget.config
    })
  })

  return JSON.stringify(boardJSON)
}

module.exports ={
  on: eventEmitter.on.bind(eventEmitter),
  setState,
  update,
  getBoardState,
  boardStateString
}
