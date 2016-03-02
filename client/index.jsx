'use strict'

var ReactDOM = require('react-dom')
var React = require('react')

var Board = require('./components/Board')

ReactDOM.render(
  <Board
    name={config.name}
    url={config.url}
    scenes={config.scenes}/>,
  document.getElementById('content')
)
