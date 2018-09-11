import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from './../../actions/user-actions.js'

import './login.scss'
import dualRing from './../../assets/dual-ring.svg'

export default connect(
    state => ({
        registerState: state.register
    }),
    { register }
)(class RegisterContainer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = { }

        this.register = this._register.bind(this)
    }
    
    render() {
        return (
            <div className='flex-v login-super-container'>
                <div className='spacer'></div>

                <div className='flex-h'>
                    <div className='spacer'></div>

                    <div className='login-container'>
                        <h1>Base Starter - Register</h1>

                        <input ref={c => this.inputEmail = c} type="text" placeholder="Email"/>
                        <input ref={c => this.inputPassword = c} type="text" placeholder="Password" type="password"/>

                        { this.renderErrorIfAny() }

                        { this.props.registerState.loading ? <img src={dualRing}/> : <a className='login-container-button' onClick={() => this.register()}>Go</a> }

                        <Link to='/login' className='login-container-block-link'>Already have an account? Login here</Link>
                    </div>

                    <div className='spacer2'></div>
                </div>

                <div className='spacer'></div>
            </div>
        )
    }

    renderErrorIfAny() {
        if(!this.props.registerState.success
        && this.props.registerState.error != null) {
            return (
                <div className='error-message'>
                    <p>{ this.props.registerState.error }</p>
                </div>
            )
        }

        return null;
    }

    _register() {
        const email = this.inputEmail.value
        const password = this.inputPassword.value
        
        this.props.register(email, password)
    }
})