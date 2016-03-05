var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stateHolder = require('./state_holder')
var boardManager = require('./board_manager')(app)

var boards = []
var clientDir = path.join(__dirname, '..', 'client')
var boardsDir = path.join(__dirname, '..', 'boards')
var boardConfigs = fs.readdirSync(boardsDir)

boardConfigs.forEach((file) => {
  var config = require(path.join(boardsDir, file))
  config.url = file.replace(/\.json/, '')
  boards.push(config)
})

boards.forEach(boardManager.createBoard)

http.listen(8080, function () {
  console.log('Server is up and running')
})

io.on('connection', function(socket){
  var boardUrl = socket.handshake.query.board
  boardManager.on('update', (board) => {
    if (boardUrl === board) {
      console.log('update ', board)
      socket.emit('update', stateHolder.boardStateString(board))
    }
  })
});
