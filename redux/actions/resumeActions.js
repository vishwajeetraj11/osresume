import {
	ADD_EDUCATION_DATA,
	ADD_EXPERIENCE_DATA,
	ADD_EXTRAS_DATA,
	ADD_PERSONAL_DATA,
	ADD_PHOTO_DATA,
	ADD_SAMPLE_EXPERIENCE_DATA,
	DELETE_SINGLE_EXPERIENCE_DATA,
	EDIT_SINGLE_EXPERIENCE_DATA,
	ADD_SAMPLE_EDUCATION_DATA,
	EDIT_SINGLE_EDUCATION_DATA,
	DELETE_SINGLE_EDUCATION_DATA,
	ADD_SAMPLE_EXTRA_DATA,
	EDIT_SINGLE_EXTRA_DATA,
	DELETE_SINGLE_EXTRA_DATA
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

export const addSampleEducationData = (education) => (dispatch) => {
	dispatch({
		type: ADD_SAMPLE_EDUCATION_DATA,
		payload: education,
	});
};

export const editSingleEducationData = (education) => (dispatch, getState) => {
	const state = getState();
	const educations = state.resume.data.education;
	const newEducation = educations.map(edu => edu.id === education.id ? education : edu)
	dispatch({
		type: EDIT_SINGLE_EDUCATION_DATA,
		payload: newEducation,
	});
};


export const deleteSingleEducationData = (id) => (dispatch, getState) => {
	const state = getState();
	const education = state.resume.data.education;
	const newEducation = education.filter(edu => edu.id !== id)
	dispatch({
		type: DELETE_SINGLE_EDUCATION_DATA,
		payload: newEducation,
	});
};

export const addEducationData = (education) => (dispatch) => {
	dispatch({
		type: ADD_EDUCATION_DATA,
		payload: education,
	});
};

export const addSampleExtraData = (extra) => (dispatch) => {
	dispatch({
		type: ADD_SAMPLE_EXTRA_DATA,
		payload: extra,
	});
};

export const editSingleExtraData = (extra) => (dispatch, getState) => {
	const state = getState();
	const extras = state.resume.data.extras;
	const newExtras = extras.map(ext => ext.id === extra.id ? extra : ext)
	dispatch({
		type: EDIT_SINGLE_EXTRA_DATA,
		payload: newExtras,
	});
};


export const deleteSingleExtraData = (id) => (dispatch, getState) => {
	const state = getState();
	const extras = state.resume.data.extras;
	const newExtras = extras.filter(ext => ext.id !== id)
	dispatch({
		type: DELETE_SINGLE_EXTRA_DATA,
		payload: newExtras,
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
