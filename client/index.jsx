'use strict'

var ReactDOM = require('react-dom')
var React = require('react')

var Board = require('./components/Board')

ReactDOM.render(<Board state={boardState}/>, document.getElementById('content')) 
