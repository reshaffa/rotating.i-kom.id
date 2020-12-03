import { GET_USERS, POST_USERS } from '../actions/userActions';

let initialState = {
    users : [],
    error : false,
    created_users : false,
    created_error : false
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users : action.payload.data,
                error : action.payload.errorMessage
            }
            break;
        case POST_USERS:
            return {
                ...state,
                created_users : action.payload.data,
                created_error : action.payload.errorMessage
            }
            break;
        default:
            return state
    }
}

export default users
