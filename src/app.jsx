import React from 'react'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router, 
    Route,
    Redirect
} from 'react-router-dom'

import './general.scss'

import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Switch } from 'react-router'

import store from './store.js'
import DevTools from './devtools.jsx'
import history from './history.js'

import AppContainer from './containers/app/AppContainer.jsx'
import LoginContainer from './containers/login/LoginContainer.jsx'
import RegisterContainer from './containers/login/RegisterContainer.jsx'
import LandingContainer from './containers/landing/LandingContainer.jsx'

var mountEl = document.getElementById('base-app')

var Paths =
<Provider store={store}>
  <div>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/register" component={RegisterContainer}/>
            <Route path="/" exact component={LandingContainer}/>
            <Route path="/" component={AppContainer}/>
        </Switch>
    </ConnectedRouter>
    <DevTools />
  </div>
</Provider>;

ReactDOM.render(Paths, mountEl);