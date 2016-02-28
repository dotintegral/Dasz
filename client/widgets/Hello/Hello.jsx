'use strict'

require('./Hello.scss')
var React = require('react')

const Hello = (props) => {
  return (
    <div className="hello widget">
      Hello! <br />
      I'm just a sample component. Please replace me with something more useful :-)
    </div>
  )
}

module.exports = Hello
