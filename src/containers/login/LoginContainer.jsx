import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './login.scss'
import dualRing from './../../assets/dual-ring.svg'

import { logIn, autoLogin } from './../../actions/user-actions.js'

export default connect(
    state => ({
        login: state.login
    }),
    { logIn, autoLogin }
)(class LoginContainer extends React.Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        return (
            <div className='flex-v login-super-container'>
                <div className='spacer'></div>

                <div className='flex-h'>
                    <div className='spacer'></div>

                    <div className='login-container'>
                        <h1>Base Starter - Login</h1>

                        <input ref={c => this.inputEmail = c} type="text" placeholder="Email"/>
                        <input ref={c => this.inputPassword = c} type="text" placeholder="Password" type="password"/>

                        { this.renderErrorIfAny() }

                        { this.props.login.loading ? <img src={dualRing}/> : <a className='login-container-button' onClick={() => this.logIn()}>Go</a> }

                        <Link to='/register' className='login-container-block-link'>Need an account? Register here</Link>
                    </div>

                    <div className='spacer2'></div>
                </div>

                <div className='spacer'></div>
            </div>
        )
    }

    renderErrorIfAny() {
        if(!this.props.login.success
        && this.props.login.error != null) {
            return (
                <div className='error-message'>
                    <p>{ this.props.login.error }</p>
                </div>
            )
        }

        return null;
    }

    logIn() {
        const email = this.inputEmail.value
        const password = this.inputPassword.value

        this.props.logIn(email, password)
    }
})