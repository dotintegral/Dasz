'use strict'

var React = require('react')

const renderWidgets = (widgets) => {
  return widgets.map((widgetData) => {
    const Widget = require('./widgets/' + widgetData.name)
    return <Widget />
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
