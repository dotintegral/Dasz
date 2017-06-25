const React = require('react')

const renderWidgets = (widgets) => {
  return widgets.map(({name, data}, index) => {
    let Widget

    try {
      Widget = require('../../widgets/' + name + '/widget')
    } catch (e) {
      try {
        Widget = require('../../node_modules/dasz-widget-' + name + '/dist/widget')
      } catch (e) {
        throw new Error(`Cannot load widget named ${name}`)
      }
    }
    return <Widget key={index} data={data} />
  })
}

const Scene = ({widgets}) => {
  return (
    <div className='scene'>
      {renderWidgets(widgets)}
    </div>
  )
}

module.exports = Scene
