import {
	ADD_EDUCATION_DATA,
	ADD_EXPERIENCE_DATA,
	ADD_EXTRAS_DATA,
	ADD_PERSONAL_DATA,
	ADD_PHOTO_DATA,
	ADD_SAMPLE_EXPERIENCE_DATA,
	ADD_SINGLE_EXPERIENCE_DATA,
	DELETE_SINGLE_EXPERIENCE_DATA,
	EDIT_SINGLE_EXPERIENCE_DATA
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

export const addSingleExperienceData = (experience) => (dispatch) => {
	dispatch({
		type: ADD_SINGLE_EXPERIENCE_DATA,
		payload: experience,
	});
};

export const addSampleExperienceData = (experience) => (dispatch) => {
	dispatch({
		type: ADD_SAMPLE_EXPERIENCE_DATA,
		payload: experience,
	});
};

export const editSingleExperienceData = (experience) => (dispatch, getState) => {
	const state = getState();
	const experiences = state.resume.data.experiences;
	const newExperiences = experiences.map(exp => exp.id === experience.id ? experience : exp)
	dispatch({
		type: EDIT_SINGLE_EXPERIENCE_DATA,
		payload: newExperiences,
	});
};


export const deleteSingleExperienceData = (id) => (dispatch, getState) => {
	const state = getState();
	const experiences = state.resume.data.experiences;
	const newExperiences = experiences.filter(exp => exp.id !== id)
	dispatch({
		type: DELETE_SINGLE_EXPERIENCE_DATA,
		payload: newExperiences,
	});
};

export const addEducationData = (education) => (dispatch) => {
	dispatch({
		type: ADD_EDUCATION_DATA,
		payload: education,
	});
};

export const addExtrasData = (extras) => (dispatch) => {

	dispatch({
		type: ADD_EXTRAS_DATA,
		payload: extras,
	});
};


export const addPhoto = (photo) => (dispatch) => {

	dispatch({
		type: ADD_PHOTO_DATA,
		payload: photo,
	});
};
