'use strict'

require('./Hello.scss')
var React = require('react')

const Hello = (props) => {
  return (
    <div className="hello widget">
      <div className="title">Hello!</div>
      <div className="contents">
        {props.data.message}
      </div>
    </div>
  )
}

module.exports = Hello
