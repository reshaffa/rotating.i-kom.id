import axios from 'axios';
import { url } from '../config/backend';

export const GET_VIBRATIONS = "GET_VIBRATIONS";
export const POST_VIBRATIONS = "POST_VIBRATIONS";
export const REMOVE_VIBRATIONS = "REMOVE_VIBRATIONS";

export const getVibrations = () => {
    return (dispatch) => {
        axios.get(url.development+'uploads/vibrations')
        .then(response => {
            dispatch({
                type : GET_VIBRATIONS,
                payload : {
                    data : response.data.payload,
                    status : response.data.success,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : GET_VIBRATIONS,
                payload : {
                    data : [],
                    status : false,
                    errorMessage : error.message
                }
            })
        })
    }
}


export const postVibrations = (data) => {
    const params = {
        uploads : {
            filename : data.file[0].filename,
            year : data.year,
            month : data.month,
            week : data.week
        },
        projects : data.file[0].items
    }
    return (dispatch) => {
        axios.post(url.development+'vibrations/add', params)
        .then(response => {
            dispatch({
                type : POST_VIBRATIONS,
                payload : {
                    data : response.data.payload,
                    created_status : true,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : POST_VIBRATIONS,
                payload : {
                    data : false,
                    created_status : false,
                    errorMessage : error.message
                }
            })
        })
    }
}

export const deleteVibrations = (id) => {
    return (dispatch) => {
        axios.delete(url.development+'vibrations/remove/'+id)
        .then(response => {
            dispatch({
                type : REMOVE_VIBRATIONS,
                payload : {
                    deleted_status : true,
                    errorMessage : false
                }
            })
        }).catch(error => {
            dispatch({
                type : REMOVE_VIBRATIONS,
                payload : {
                    deleted_status : false,
                    errorMessage : error.message
                }
            })
        })
    }
}