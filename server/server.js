var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var ejs = require('ejs')

var clientDir = path.join(__dirname, '..', 'client')

var boards = []
var boardsDir = path.join(__dirname, '..', 'boards')
var boardConfigs = fs.readdirSync(boardsDir)

boardConfigs.forEach((file) => {
  boards.push( require(path.join(boardsDir, file)) )
})


boards.forEach((board) => {
  var templateFile = path.join(clientDir, 'index.ejs')
  var onRead = (err, rawTemplate) => {
    if (err) {
      return console.error('Cannot read the index.ejs file!')
    }

    var render = ejs.compile(rawTemplate)

    app.use('/' + board.url, (req, res) => {
      res.send(
        render({
          name: board.name,
          url: board.url,
          config: JSON.stringify(board)
        })
      )
    })
  }

  fs.readFile(templateFile, 'utf-8', onRead)
})

app.listen(8080, function () {
  console.log('Server is up and running')
})
