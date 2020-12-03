import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import users from './users'
import areas from './areas'
import vibrations from './vibrations'
import operations from './operations'

export default combineReducers({
    users, 
    areas,
    vibrations,
    operations,
    form : formReducer
})