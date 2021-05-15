import { combineReducers } from 'redux';
import { resumeReducer } from './reducers/resumeReducer';
import { sectionReducer } from './reducers/sectionReducer';
import { loginReducer } from './reducers/userReducer';

// COMBINED REDUCERS
const reducers = {
	login: loginReducer,
	resume: resumeReducer,
	sections: sectionReducer,
};

export default combineReducers(reducers);
