var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var ejs = require('ejs')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientDir = path.join(__dirname, '..', 'client')

var boards = []
var boardsDir = path.join(__dirname, '..', 'boards')
var boardConfigs = fs.readdirSync(boardsDir)

boardConfigs.forEach((file) => {
  var config = require(path.join(boardsDir, file))
  config.url = file.replace(/\.json/, '')
  boards.push(config)
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

http.listen(8080, function () {
  console.log('Server is up and running')
})

io.on('connection', function(socket){
  var board = socket.handshake.query.board

  setInterval(function () {
    var config = fs.readFileSync(path.join(boardsDir, board + '.json'), 'utf-8')
    socket.emit('update', JSON.parse(config))
  }, 5000)
});
