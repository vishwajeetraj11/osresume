import { combineReducers } from 'redux';
import { resumeReducer } from './reducers/resumeReducer';
import { sectionReducer } from './reducers/sectionReducer';

// COMBINED REDUCERS
const reducers = {
  resume: resumeReducer,
  sections: sectionReducer,
};

export default combineReducers(reducers);
