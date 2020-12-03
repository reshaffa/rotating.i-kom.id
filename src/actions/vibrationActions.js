import axios from 'axios';
import { url } from '../config/backend';

export const GET_VIBRATIONS = "GET_VIBRATIONS";
export const POST_VIBRATIONS = "POST_VIBRATIONS";

export const getVibrations = () => {
    return (dispatch) => {
        axios.get(url.development+'uploads/vibrations')
        .then(response => {
            dispatch({
                type : GET_VIBRATIONS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : GET_VIBRATIONS,
                payload : {
                    data : [],
                    errorMessage : error.message
                }
            })
        })
    }
}


export const postVibrations = (data) => {
    const params = {
        uploads : {
            filename : data.filename.name,
            month : data.month,
            week : data.week
        },
        projects : {
            projects : data.filename
        }
    }
    return (dispatch) => {
        axios.post(url.development+'vibrations/add', params)
        .then(response => {
            dispatch({
                type : POST_VIBRATIONS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : POST_VIBRATIONS,
                payload : {
                    data : false,
                    errorMessage : error.message
                }
            })
        })
    }
}