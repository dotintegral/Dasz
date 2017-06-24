const Immutable = require('immutable')
const events = require('events')

let boards = Immutable.Map({})

const eventEmitter = new events.EventEmitter()

function setState (boardDefinition) {
  boards = boards.set(boardDefinition.url, Immutable.fromJS(boardDefinition))
}

function getBoardState (url) {
  return boards.get(url)
}

function update (boardUrl, widgetIds, data) {
  const oldBoards = boards

  let board = boards.get(boardUrl)
  board.get('scenes').forEach((scene, sceneIndex) => {
    scene.get('widgets').forEach((widget, widgetIndex) => {
      const id = widget.get('id')
      if (widgetIds.indexOf(id) > -1) {
        const path = [boardUrl, 'scenes', sceneIndex, 'widgets', widgetIndex, 'data']
        boards = boards.setIn(path, data)
      }
    })
  })

  if (oldBoards !== boards) {
    eventEmitter.emit('update', boardUrl)
  }
}

function boardStateString (url) {
  const boardJSON = boards.get(url).toJSON()

  boardJSON.scenes.forEach((scene) => {
    scene.widgets.forEach((widget) => {
      delete widget.config
    })
  })

  return JSON.stringify(boardJSON)
}

module.exports = {
  on: eventEmitter.on.bind(eventEmitter),
  setState,
  update,
  getBoardState,
  boardStateString
}
