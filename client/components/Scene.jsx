'use strict'

var React = require('react')

const renderWidgets = (widgets) => {
  return widgets.map((definition) => {
    const Widget = require('../widgets/' + definition.name + '/' + definition.name)
    return <Widget data={definition.data}/>
  })
}

const Scene = ({widgets}) => {
  return (
    <div>
      {renderWidgets(widgets)}
    </div>
  )
}

module.exports = Scene
