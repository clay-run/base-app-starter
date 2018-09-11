import * as types from './action-types.js'
import api from './../services/api.js'
import { push } from 'react-router-redux'

export function logIn(email, password) {
    return dispatch => {
        dispatch({ type: types.USER_LOGIN_REQUEST })

        api.post('/auth/login').send({
            email,
            password
        }).then(res => {
            console.log(res.body)

            if(!res.body.success) {
                return dispatch({ type: types.USER_LOGIN_REQUEST_FAILURE, error: res.body.message })
            }

            const user = res.body.result
            const token = user.token

            window.token = token
            window.localStorage.setItem('base_token', token)

            dispatch(push('/home'))

            return dispatch({ type: types.USER_LOGIN_REQUEST_SUCCESS, user })
        })
    }
}

export function autoLogin() {
    return dispatch => {
        const token = window.localStorage.getItem('base_token')
        window.token = token
        
        dispatch({ type: types.USER_LOGIN_REQUEST })

        api.get('/me').then(res => {
            const user = res.body.result

            if(res.body.success) {
                return dispatch({ type: types.USER_LOGIN_REQUEST_SUCCESS, user })
            }

            return dispatch({ type: types.USER_LOGIN_REQUEST_FAILURE })
        }, err => {
            dispatch({ type: types.USER_LOGIN_REQUEST_FAILURE, error: err.message })
        })
    }
}

export function register(email, password) {
    return dispatch => {
        dispatch({ type: types.USER_REGISTER_REQUEST })

        api.post('/auth/register').send({
            email,
            password
        }).then(res => {
            const user = res.body.result

            if(res.body.success) {
                const user = res.body.result
                const token = user.token
    
                window.token = token
                window.localStorage.setItem('base_token', token)

                dispatch(push('/home'))

                return dispatch({ type: types.USER_REGISTER_REQUEST_SUCCESS })
            }

            return dispatch({ type: types.USER_REGISTER_REQUEST_FAILURE, error: res.body.message })
        }, err => {
            dispatch({ type: types.USER_REGISTER_REQUEST_FAILURE, error: err.message })
        })
    }
}

export function logOut() {
    return dispatch => {
        window.token = null
        window.localStorage.removeItem('base_token')

        dispatch(push('/login'))

        return dispatch({ type: types.USER_LOGOUT })
    }
}