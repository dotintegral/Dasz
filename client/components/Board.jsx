'use strict'

require('./Board.scss')
var React = require('react')
var Scene = require('./Scene')

const renderScenes = (scenes) => {
  return scenes.map( (sceneData) => (<Scene widgets={sceneData.widgets} />) )
}

const Board = ({name, scenes}) => {
  return (
    <div className="board">
      <h1>{name}</h1>
      {renderScenes(scenes)}
    </div>
  )
}

module.exports = Board
