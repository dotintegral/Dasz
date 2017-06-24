const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const stateHolder = require('./state_holder')
const boardManager = require('./board_manager')(app)

const boards = []
const boardsDir = path.join(__dirname, '..', 'boards')
const boardConfigs = fs.readdirSync(boardsDir)

boardConfigs.forEach((file) => {
  const config = require(path.join(boardsDir, file))
  config.url = file.replace(/\.json/, '')
  boards.push(config)
})

boards.forEach(boardManager.createBoard)

http.listen(8080, function () {
  console.log('Server is up and running')
})

io.on('connection', function (socket) {
  const boardUrl = socket.handshake.query.board
  boardManager.on('update', (board) => {
    if (boardUrl === board) {
      socket.emit('update', stateHolder.boardStateString(board))
    }
  })
})
