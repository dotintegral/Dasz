'use strict'

let redux = require('redux')

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SCENE':
      return Object.assign({}, state, {activeScene: action.sceneIndex})
      break;
    case 'UPDATE_STATE':
      return Object.assign({}, action.state)
    default:
      return state
  }
}

let store = redux.createStore(reducer)

module.exports = store
