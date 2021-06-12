import {
	ADD_EDUCATION_DATA,
	ADD_EXPERIENCE_DATA,
	ADD_EXTRAS_DATA,
	ADD_PERSONAL_DATA,
	ADD_PHOTO_DATA,
	ADD_SAMPLE_EXPERIENCE_DATA,
	EDIT_SINGLE_EXPERIENCE_DATA,
	DELETE_SINGLE_EXPERIENCE_DATA,
	ADD_SAMPLE_EDUCATION_DATA,
	EDIT_SINGLE_EDUCATION_DATA,
	DELETE_SINGLE_EDUCATION_DATA,
	ADD_SAMPLE_EXTRA_DATA,
	EDIT_SINGLE_EXTRA_DATA,
	DELETE_SINGLE_EXTRA_DATA,
} from '../actionTypes/resumeActionTypes';

import { v4 as uuidv4 } from 'uuid';

// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
const initialState = {
	personalData: {
		name: 'Your Name',
		designation: 'Senior Product Designer',
		email: 'youremail@gmail.com',
		phoneNumber: '+91 1234567890',
		country: 'Your Country',
	},
	photo: {
		src: '/images/avatar.png',
	},
	education: [
		{
			id: uuidv4(),
			institution: `St. Karen's Secondary School`,
			major: 'Bachelor European in Graphic Design',
			start: '2008',
			end: '2009',
			country: 'Bagnolet',
		},
		{
			id: uuidv4(),
			institution: `St. Karen's Secondary School`,
			major: 'BTS Communication Visuelle option Multimédia',
			start: '2009',
			end: '2010',
			country: 'Bagnolet',
		},
	],
	experiences: [
		{
			id: uuidv4(),
			designation: 'Senior UI/UX Product Designer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
			start: 'Aug 2000',
			end: 'July 2004',
			years: '4',
			country: 'London',
		},
		{
			id: uuidv4(),
			designation: 'Full Stack Developer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'July 2004',
			end: 'Jan 2010',
			years: '6',
			country: 'Paris',
		},
		{
			id: uuidv4(),
			designation: 'Cloud Developer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'Jan 2010',
			end: 'May 2017',
			years: '7',
			country: 'San Francisco',
		},
		{
			id: uuidv4(),
			designation: 'DevOps Developer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate. with a lean design process: research, design, test, and iterate.',
			start: 'May 2017',
			end: 'Jan 2020',
			years: '3',
			country: 'United States Of America',
		},
	],
	extras: [
		{
			id: uuidv4(),
			title: 'Industry Knowledge',
			type: 'NEW_LINE',
			items: [
				'Product Design',
				'User Interface',
				'User Experience',
				'Interaction Design',
				'Wireframing',
				'Rapid Prototyping',
				'Design Research',
			],
		},
		{
			id: uuidv4(),
			title: 'Tools and Technologies',
			type: 'COMMA',
			items: [
				'Figma',
				'Sketch',
				'Protopie',
				'Framer',
				'Invision',
				'Abstract',
				'Zeplin',
				'Google Analytics',
				'Amplitude',
				'Fullstory',
				'Figma',
			],
		},
		{
			id: uuidv4(),
			title: 'Other Skills',
			type: 'COMMA',
			items: ['HTML', 'CSS', 'jQuery'],
		},
		{
			id: uuidv4(),
			title: 'Social',
			type: 'NEW_LINE',
			items: [
				'yoursite.com',
				'linkedin.com/in/yourname',
				'dribbble.com/yourname',
			],
		},
	],
};

// const emptyInitialState = {
// 	personalData: {},
// 	photo: {},
// 	education: [],
// 	experiences: [],
// 	extras: [],
// };

export const resumeReducer = (state = { data: initialState }, action) => {
	switch (action.type) {
		default:
			return state;
		case ADD_PERSONAL_DATA:
			return {
				data: {
					...state.data,
					personalData: action.payload,
				},
			};
		case ADD_EXPERIENCE_DATA:
			return {
				data: {
					...state.data,
					experiences: action.payload,
				},
			};
		case ADD_EDUCATION_DATA:
			return {
				data: {
					...state.data,
					education: action.payload,
				},
			};
		case ADD_EXTRAS_DATA:
			return {
				data: {
					...state.data,
					extras: action.payload,
				},
			};
		case ADD_PHOTO_DATA:
			return {
				data: {
					...state.data,
					photo: action.payload,
				},
			};
		case ADD_SAMPLE_EXPERIENCE_DATA:
			return {
				data: {
					...state.data,
					experiences: [action.payload, ...state.data.experiences],
				},
			};
		case EDIT_SINGLE_EXPERIENCE_DATA:
			return {
				data: {
					...state.data,
					experiences: action.payload,
				},
			};
		case DELETE_SINGLE_EXPERIENCE_DATA:
			return {
				data: {
					...state.data,
					experiences: action.payload,
				},
			};
		case ADD_SAMPLE_EDUCATION_DATA:
			return {
				data: {
					...state.data,
					education: [action.payload, ...state.data.education],
				},
			};
		case EDIT_SINGLE_EDUCATION_DATA:
			return {
				data: {
					...state.data,
					education: action.payload,
				},
			};
		case DELETE_SINGLE_EDUCATION_DATA:
			return {
				data: {
					...state.data,
					education: action.payload,
				},
			};
		case ADD_SAMPLE_EXTRA_DATA:
			return {
				data: {
					...state.data,
					extras: [action.payload, ...state.data.extras],
				},
			};
		case EDIT_SINGLE_EXTRA_DATA:
			return {
				data: {
					...state.data,
					extras: action.payload,
				},
			};
		case DELETE_SINGLE_EXTRA_DATA:
			return {
				data: {
					...state.data,
					extras: action.payload,
				},
			};
	}
};
