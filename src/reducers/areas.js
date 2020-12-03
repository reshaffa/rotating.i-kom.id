import { GET_AREAS, POST_AREAS } from '../actions/areaActions';

let initialState = {
    areas : [],
    error : false
}

const areas = (state = initialState, action) => {
    switch (action.type) {
        case GET_AREAS:
            return {
                ...state,
                areas : action.payload.data,
                error : action.payload.errorMessage
            }
            break;
        case POST_AREAS:
            return {
                ...state,
                created_areas : action.payload.data,
                created_error : action.payload.errorMessage
            }
            break;

        default:
           return state
    }
}

export default areas
