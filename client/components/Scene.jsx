'use strict'

var React = require('react')

const renderWidgets = (widgets) => {
  return widgets.map((definition, index) => {
    const Widget = require('../../widgets/' + definition.name + '/widget')
    return <Widget key={index} data={definition.data}/>
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
