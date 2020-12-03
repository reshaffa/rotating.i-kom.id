import axios from 'axios';
import { url } from '../config/backend';

export const GET_USERS = "GET_USERS";
export const POST_USERS = "POST_USERS";

export const getUsers = () => {
    return (dispacth) => {
        axios.get(url.development+'users')
        .then(response => {
            dispacth({
                type : GET_USERS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false
                }
            })
        })
        .catch(error => {
            dispacth({
                type : GET_USERS,
                payload : {
                    data : [],
                    errorMessage : error.message
                }
            })
        })
    }
}

export const postUsers = (data) => {
    return (dispacth) => {
        axios.post(url.development+'users/add',data)
        .then(response => {
            dispacth({
                type : POST_USERS,
                payload : {
                    data : response.data.payload,
                    errorMessage : false
                }
            })
        })
        .catch(error => {
            dispacth({
                type : POST_USERS,
                payload : {
                    data : [],
                    errorMessage : error.message
                }
            })
        })
    }
}