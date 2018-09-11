import React from 'react'

import reducers from './reducers'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import DevTools from './devtools.jsx'

// Create a history of your choosing (we're using a browser history in this case)
import history from './history.js'

const middleware = routerMiddleware(history)

// Add the reducer to your store on the 'router' key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(middleware),
    DevTools.instrument()
  )
)

export default store;