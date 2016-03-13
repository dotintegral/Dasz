'use strict'

require('./Board.scss')
var React = require('react')
var Scene = require('./Scene')
var io = require('socket.io-client')


const connectWebSockets = (board, onUpdate) => {
  var client = io('/', { query: `board=${board}` })
  client.on('update', onUpdate)
}

const renderScenes = ({scenes, activeScene}) => {
  let sceneData = scenes[activeScene]
  return (<Scene key={activeScene} widgets={sceneData.widgets} />)
}

const renderTab = (name, active) => {
  let className = 'tab ' + (active ? 'active' : '')
  return (<div className={className}>{name}</div>)
}

const renderTopBar = (state) => {
  return (
    <div className="top-bar">
      <h1>{state.name}</h1>
      {state.scenes.map((scene, index) => {
        return renderTab(scene.name, index === state.activeScene)
      })}
    </div>
  )
}

const addUserState = (state, oldState) => {
  if (oldState) {
    state.activeScene = oldState.activeScene
  } else {
    state.activeScene = 0
  }

  return state
}

class Board extends React.Component {

  constructor({state}) {
    state = addUserState(state)
    this.state = state
  }

  componentDidMount() {
    connectWebSockets(this.state.url, (data) => {
      let newState = addUserState(JSON.parse(data), this.state)
      console.log('New State', newState)
      this.setState(newState)
    })
  }

  render() {
    return (
      <div className="board">
        {renderTopBar(this.state)}
        {renderScenes(this.state)}
      </div>
    )
  }
}

module.exports = Board
