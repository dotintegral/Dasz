var path = require('path')
var ejs = require('ejs')
var fs = require('fs')
var Immutable = require('immutable')

var clientDir = path.join(__dirname, '..', 'client')

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

module.exports = function boardManager(app) {

  function createBoard(boardDefinition) {
    createBoardState(boardDefinition)

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
            name: getBoardState(url).get('name'),
            url: url,
            boardState: boardStateString(url)
          })
        )
      })

    }

    fs.readFile(templateFile, 'utf-8', onRead)
  }

  return {
    createBoard
  }
}
