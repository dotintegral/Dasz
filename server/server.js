var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')

var boards = []
var boardsDir = path.join(__dirname, '..', 'boards')
var boardConfigs = fs.readdirSync(boardsDir)

boardConfigs.forEach((file) => {
  boards.push( require(path.join(boardsDir, file)) )
})


boards.forEach((board) => {
  app.use('/' + board.url, express.static('client'))
})

app.listen(8080, function () {
  console.log('Server is up and running')
})
