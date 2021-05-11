import { combineReducers } from 'redux'
import { loginReducer } from './reducers/userReducer';

// COMBINED REDUCERS
const reducers = {
    login: loginReducer,
  }
  
  export default combineReducers(reducers)
