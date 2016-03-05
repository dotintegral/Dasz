var path = require('path')
var ejs = require('ejs')
var fs = require('fs')

var clientDir = path.join(__dirname, '..', 'client')
var stateHolder = require('./state_holder')


module.exports = function boardManager(app) {

  function createBoard(boardDefinition) {
    stateHolder.createBoardState(boardDefinition)

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
    createBoard
  }
}
