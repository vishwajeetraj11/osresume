import {
	ADD_EDUCATION_DATA,
	ADD_EXPERIENCE_DATA,
	ADD_PERSONAL_DATA,
} from '../actionTypes/resumeActionTypes';

export const addPersonalData = (personalData) => (dispatch) => {
	dispatch({
		type: ADD_PERSONAL_DATA,
		payload: personalData,
	});
};

export const addExperienceData = (experiences) => (dispatch) => {
	dispatch({
		type: ADD_EXPERIENCE_DATA,
		payload: experiences,
	});
};

export const addEducationData = (education) => (dispatch) => {
	dispatch({
		type: ADD_EDUCATION_DATA,
		payload: education,
	});
};
