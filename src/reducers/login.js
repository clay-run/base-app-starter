import * as types from '../actions/action-types.js'
import update from 'immutability-helper'

const initialState = {
    loading: false,
    success: false,
    error: null,
    initialized: false,
    user: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.USER_LOGIN_REQUEST:
            return update(state, {
                loading: { $set: true }
            })
            break;
        
        case types.USER_LOGIN_REQUEST_SUCCESS:
            return update(state, {
                loading: { $set: false },
                success: { $set: true },
                user: { $set: action.user },
                initialized: { $set: true },
                error: { $set: null }
            }) 
            break;

        case types.USER_LOGIN_REQUEST_FAILURE:
            return update(state, {
                loading: { $set: false },
                success: { $set: false },
                initialized: { $set: true },
                user: { $set: null },
                error: { $set: action.error }
            }) 
            break;

        case types.USER_LOGOUT:
            return update(state, {
                loading: { $set: false },
                success: { $set: false },
                user: { $set: null },
                error: { $set: null }
            }) 
        
    }

    return state
}