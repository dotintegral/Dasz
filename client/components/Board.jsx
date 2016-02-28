'use strict'

require('./Board.scss')
var React = require('react')
var Scene = require('./Scene')

const renderScenes = (scenes) => {
  return scenes.map( (sceneData) => (<Scene widgets={sceneData.widgets} />) )
}

const Board =  React.createClass({
  getInitialState: function () {
    return this.props
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
