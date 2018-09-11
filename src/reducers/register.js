import * as types from '../actions/action-types.js'
import update from 'immutability-helper'

const initialState = {
    loading: false,
    success: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.USER_REGISTER_REQUEST:
            return update(state, {
                loading: { $set: true },
                success: { $set: false },
                error: { $set: null }
            })

        case types.USER_REGISTER_REQUEST_FAILURE:
            return update(state, {
                loading: { $set: false },
                success: { $set: false },
                error: { $set: action.error }
            })

        case types.USER_LOGIN_REQUEST_SUCCESS:
            return update(state, {
                loading: { $set: false },
                success: { $set: true },
                error: { $set: null }
            })
    }

    return state
}