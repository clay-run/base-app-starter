import React from 'react'
import { connect } from 'react-redux'

import { autoLogin } from './../../actions/user-actions.js'

import LoginContainer from './../login/LoginContainer.jsx'
import HomeContainer from './../home/HomeContainer.jsx'

export default connect(
    state => ({
        login: state.login
    }),
    { autoLogin }
)(class AppContainer extends React.Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        const loggedIn = this.props.login.success
        const isInitialized = this.props.login.initialized

        if(!isInitialized) {
            return <div></div>
        }

        if(loggedIn) {
            return <HomeContainer/>
        }

        return <LoginContainer/>
    }
})