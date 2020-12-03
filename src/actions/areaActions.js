import axios from 'axios';
import { url } from '../config/backend';

export const GET_AREAS = "GET_AREAS";
export const POST_AREAS = "POST_AREAS";

export const getAreas = () => {
    return (dispatch) => {
        axios.get(url.development+'areas')
        .then(response => {
            dispatch({
                type : GET_AREAS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : GET_AREAS,
                payload : {
                    data : [],
                    errorMessage : error.message
                }
            })
        })
    }
}

export const postAreas = (data) => {
    return (dispatch) => {
        axios.post(url.development+'areas/add',data)
        .then(response => {
            dispatch({
                type : POST_AREAS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false,
                }
            })
        }).catch(error => {
            dispatch({
                type : POST_AREAS,
                payload : {
                    data : false,
                    errorMessage : error.message
                }
            })
        })
    }
}