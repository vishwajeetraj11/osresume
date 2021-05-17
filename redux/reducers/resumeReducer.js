import {
	ADD_EDUCATION_DATA,
	ADD_EXPERIENCE_DATA,
	ADD_EXTRAS_DATA,
	ADD_PERSONAL_DATA,
	ADD_PHOTO_DATA,
} from '../actionTypes/resumeActionTypes';

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
		src: '/images/avatar.png'
	},
	education: [
		{
			institution: `St. Karen's Secondary School`,
			major: 'Bachelor European in Graphic Design',
			start: '2008',
			end: '2009',
			country: 'Bagnolet',
		},
		{
			institution: `St. Karen's Secondary School`,
			major: 'BTS Communication Visuelle option Multimédia',
			start: '2009',
			end: '2010',
			country: 'Bagnolet',
		},
	],
	experiences: [
		{
			designation: 'Senior UI/UX Product Designer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
			start: 'Aug 2019',
			end: 'Aug 2019',
			years: '1',
			country: 'Paris',
		},
		{
			designation: 'UI/UX Product Designer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'Aug 2019',
			end: 'Aug 2019',
			years: '5',
			country: 'Paris',
		},
		{
			designation: 'UI/UX Product Designer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'Aug 2019',
			end: 'Aug 2019',
			years: '5',
			country: 'Paris',
		},
		{
			designation: 'Senior UI/UX Product Designer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
			start: 'Aug 2019',
			end: 'Aug 2019',
			years: '1',
			country: 'Paris',
		},
	],
	extras: [
		{
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
			title: 'Other Skills',
			type: 'COMMA',
			items: ['HTML', 'CSS', 'jQuery'],
		},
		{
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
	}
};
