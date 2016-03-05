var Immutable = require('immutable')

var boards = Immutable.Map({})

function createBoardState(boardDefinition) {
  boardDefinition.scenes.forEach((scene) => {
    scene.widgets.forEach((widget) => {
      widget.data = widget.config
    })
  })
  boards = boards.set(boardDefinition.url, Immutable.fromJS(boardDefinition))
}

function getBoardState(url) {
  return boards.get(url)
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
  createBoardState,
  getBoardState,
  boardStateString
}
