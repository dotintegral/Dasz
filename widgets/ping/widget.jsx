'use strict'

const React = require('react')

require('./style.scss')

const Ping = ({data}) => {
  return (
    <div className={'ping widget ' + data.status}>
      <div className='title'>{data.name}</div>
      <div className='contents'>
        {data.time}
      </div>
    </div>
  )
}

module.exports = Ping
