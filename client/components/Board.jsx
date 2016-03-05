'use strict'

require('./Board.scss')
var React = require('react')
var Scene = require('./Scene')
var io = require('socket.io-client')


const connectWebSockets = (board) => {
  var client = io('/', { query: `board=${board}` })

  client.on('update', function (data) {
    console.log('received data', data)
  })
}

const renderScenes = (scenes) => {
  return scenes.map( (sceneData) => (<Scene widgets={sceneData.widgets} />) )
}

const Board =  React.createClass({
  componentDidMount: function () {
    connectWebSockets(this.state.url)
  },
  getInitialState: function () {
    return this.props.state
  },
  render: function () {
    return (
      <div className="board">
        <h1>{this.state.name}</h1>
        {renderScenes(this.state.scenes)}
      </div>
    )
  }
})

module.exports = Board
