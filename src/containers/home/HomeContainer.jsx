import React from 'react'
import { connect } from 'react-redux'
import { logOut } from './../../actions/user-actions.js'
import moment from 'moment'

import './HomeContainer.scss'

export default connect(
    state => ({
        user: state.login.user
    }),
    { logOut }
)(class HomeContainer extends React.Component {
    render() {
        const {
            email,
            created_at
        } = this.props.user

        return (
            <div className='home-container'>
                <p>Hello <b>{ email }</b> ! </p>
                
                <p>You are logged in using <a href='https://docs.base.run/#authentication' target="_blank">Base.run Auth</a>. You registered <b>{ moment(created_at).fromNow() }</b>.</p>

                <p>This is just a starting app. Check out <a href='https://docs.base.run' target="_blank">Base.run API reference</a> or <a target="_blank" href="https://clay.gitbook.io/docs/">Base.run Guides</a>.</p>

                <p>You can also <a onClick={this.props.logOut}>log out</a>.</p>
            </div>
        )
    }
})