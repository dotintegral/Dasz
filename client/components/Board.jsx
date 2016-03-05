'use strict'

require('./Board.scss')
var React = require('react')
var Scene = require('./Scene')
var io = require('socket.io-client')


const connectWebSockets = (board, onUpdate) => {
  var client = io('/', { query: `board=${board}` })
  client.on('update', onUpdate)
}

const renderScenes = (scenes) => {
  return scenes.map( (sceneData) => (<Scene widgets={sceneData.widgets} />) )
}

class Board extends React.Component {

  constructor({state}) {
    this.state = state
  }

  componentDidMount() {
    connectWebSockets(this.state.url, (data) => {
      console.log('received data', data)
      this.setState(JSON.parse(data))
    })
  }

  render() {
    return (
      <div className="board">
        <h1>{this.state.name}</h1>
        {renderScenes(this.state.scenes)}
      </div>
    )
  }
}

module.exports = Board
