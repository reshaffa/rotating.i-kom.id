import { GET_VIBRATIONS, POST_VIBRATIONS } from '../actions/vibrationActions';

let initialState = {
    vibrations : [],
    error : false,
    crated_vibrations : false,
    error_vibrations : false
}

const vibrations = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIBRATIONS:
            return {
                ...state,
                vibrations : action.payload.data,
                error : action.payload.errorMessage
            }
            break;
        case POST_VIBRATIONS:
            return {
                ...state,
                crated_vibrations : action.payload.data,
                error_vibrations : action.payload.errorMessage
            }
            break;
        default:
        return state
    }
}

export default vibrations
