'use strict'

var ReactDOM = require('react-dom')
var React = require('react')

var name = config.scenes[0].components[0].name
var Component = require('./components/' + name)

ReactDOM.render(<Component />, document.getElementById('content'))
