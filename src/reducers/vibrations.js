import { GET_VIBRATIONS, POST_VIBRATIONS, REMOVE_VIBRATIONS } from '../actions/vibrationActions';

let initialState = {
    vibrations : [],
    get_status : false,
    error : false,
    created_status : false,
    deleted_status : false
}

const vibrations = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIBRATIONS:
            return {
                ...state,
                vibrations : action.payload.data,
                get_status : action.payload.status,
                error : action.payload.errorMessage
            }
            break;
        case POST_VIBRATIONS:
            return {
                ...state,
                created_vibrations : action.payload.data,
                created_status : action.payload.created_status,
                error_vibrations : action.payload.errorMessage
            }
            break;
        case REMOVE_VIBRATIONS:
            return {
                ...state,
                deleted_status : action.payload.deleted_status
            }
            break;
        default:
        return state
    }
}

export default vibrations
