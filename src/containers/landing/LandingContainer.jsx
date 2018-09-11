import React from 'react'
import { Link } from 'react-router-dom'

import './LandingContainer.scss'

export default class LandingContainer extends React.Component {
    render() {
        return (
            <div className='landing-container'>
                <div className='container'>
                    <h1>Welcome</h1>

                    <p>This is a starter app for Base.run.</p>

                    <p><Link to='/login'>Log in</Link> or <Link to='/login'>Register</Link></p>
                </div>
            </div>
        )
    }
}