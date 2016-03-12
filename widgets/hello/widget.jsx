'use strict'

require('./style.scss')
var React = require('react')

const Hello = (props) => {
  return (
    <div className={"hello widget " + props.data.status}>
      <div className="title">Hello!</div>
      <div className="contents">
        {props.data.message}
      </div>
    </div>
  )
}

module.exports = Hello
