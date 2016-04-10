'use strict'

require('./Board.scss')
let React = require('react')
let Scene = require('./Scene')
let io = require('socket.io-client')
let store = require('../store')


const connectWebSockets = (board, onUpdate) => {
  let client = io('/', { query: `board=${board}` })
  client.on('update', onUpdate)
}

const renderScenes = ({scenes, activeScene}) => {
  let sceneData = scenes[activeScene]
  return (<Scene key={activeScene} widgets={sceneData.widgets} />)
}

const renderTab = (name, active, index) => {
  let className = 'tab ' + (active ? 'active' : '')

  function onClick () {
    store.dispatch({
      type: 'CHANGE_SCENE',
      sceneIndex: index
    })
  }

  return (<div className={className} onClick={onClick}>{name}</div>)
}

const renderTopBar = (state) => {
  return (
    <div className="top-bar">
      <h1>{state.name}</h1>
      {state.scenes.map((scene, index) => {
        return renderTab(scene.name, index === state.activeScene, index)
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
    super(...arguments)
    state = addUserState(state)
    this.state = state
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState())
    })

    connectWebSockets(this.state.url, (data) => {
      let newState = addUserState(JSON.parse(data), this.state)

      store.dispatch({
        type: 'UPDATE_STATE',
        state: newState
      })
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
