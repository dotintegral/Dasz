var path = require('path')
var ejs = require('ejs')
var fs = require('fs')

var clientDir = path.join(__dirname, '..', 'client')

module.exports = function boardManager(app) {

  function createBoard(boardDefinition) {

    var templateFile = path.join(clientDir, 'index.ejs')
    var onRead = (err, rawTemplate) => {
      if (err) {
        return console.error('Cannot read the index.ejs file!')
      }

      var render = ejs.compile(rawTemplate)

      app.use('/' + boardDefinition.url, (req, res) => {
        res.send(
          render({
            name: boardDefinition.name,
            url: boardDefinition.url,
            config: JSON.stringify(boardDefinition)
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
