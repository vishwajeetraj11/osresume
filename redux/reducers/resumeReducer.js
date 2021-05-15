import { ADD_PERSONAL_DATA } from '../actionTypes/resumeActionTypes';

const initialState = {
	personalData: {
		name: 'Your Name',
		designation: 'Senior Product Designer',
		email: 'youremail@gmail.com',
		phoneNumber: '+91 1234567890',
		country: 'Your Country',
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
	experience: [
		{
			designation: 'Senior UI/UX Product Designer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
			start: 'Aug 2018',
			end: 'Present',
			years: '1',
			country: 'Paris',
		},
		{
			designation: 'UI/UX Product Designer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'Aug 2013',
			end: 'Aug 2018',
			years: '5',
			country: 'Paris',
		},
		{
			designation: 'UI/UX Product Designer',
			company: 'Paypal',
			description:
				'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
			start: 'Aug 2013',
			end: 'Aug 2018',
			years: '5',
			country: 'Paris',
		},
		{
			designation: 'Senior UI/UX Product Designer',
			company: 'Google',
			description:
				'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
			start: 'Aug 2018',
			end: 'Present',
			years: '1',
			country: 'Paris',
		},
	],
	extras: [
		{
			title: 'Industry Knowledge',
			type: 'NEW_LINE',
			items: [
				{
					text: 'Product Design',
				},
				{
					text: 'User Interface',
				},
				{
					text: 'User Experience',
				},
				{
					text: 'Interaction Design',
				},
				{
					text: 'Wireframing',
				},
				{
					text: 'Rapid Prototyping',
				},
				{
					text: 'Design Research',
				},
			],
		},
		{
			title: 'Tools and Technologies',
			type: 'COMMA',
			items: [
				{
					text: 'Figma',
				},
				{
					text: 'Sketch',
				},
				{
					text: 'Protopie',
				},
				{
					text: 'Framer',
				},
				{
					text: 'Invision',
				},
				{
					text: 'Abstract',
				},
				{
					text: 'Zeplin',
				},
				{
					text: 'Google Analytics',
				},
				{
					text: 'Amplitude',
				},
				{
					text: 'Fullstory',
				},
				{
					text: 'Figma',
				},
			],
		},
		{
			title: 'Other Skills',
			type: 'COMMA',
			items: [
				{
					text: 'HTML',
				},
				{
					text: 'CSS',
				},
				{
					text: 'jQuery',
				},
			],
		},
		{
			title: 'Social',
			type: 'NEW_LINE',
			items: [
				{
					text: 'yoursite.com',
				},
				{
					text: 'linkedin.com/in/yourname',
				},
				{
					text: 'dribbble.com/yourname',
				},
			],
		},
	],
};

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
	}
};
