import React from 'react';
import t1 from '../../styles/template1.module.scss';

class Resume extends React.Component {
	constructor(){
		super();
	}

	render() {
		return (
			<div
			id='t1'
			className={`resume-a4 bg-white flex justify-between ${t1.container}`}
		>
			<div className='left w-8/12 bg-yellow-4000'>
				<div className='header-left'>
					<div className='h-32 flex justify-center flex-col'>
						<h1 className='font-semibold text-t1-xl text-t1-black'>
							{demo.name}
						</h1>
						<h2 className='font-normal text-t1-lg text-t1-black'>
							{demo.designation}
						</h2>
					</div>
				</div>
				<div className=''>
					<p className='tracking-widest uppercase text-t1-md text-t1-black'>
						Experience
					</p>
					{demo.experience.map((exp, index) => (
						<div key={index} className='mb-4'>
							<h4 className='text-t1-md mb-1 font-medium text-t1-black'>
								{exp.designation}
							</h4>
							<h5 className='text-t1-sm mb-1 font-normal text-t1-black'>
								{exp.company}
							</h5>
							<p className='text-t1-xs text-t1-gray  mb-1 font-normal'>
								{exp.start} - {exp.end} - {exp.years}{' '}
								{exp.years === '1' ? 'year' : 'years'},{' '}
								{exp.country}
							</p>
							<p className='text-t1-md mb-1 font-normal text-t1-black'>
								{exp.description}
							</p>
						</div>
					))}
				</div>
				<div className=''>
					<p className='tracking-widest uppercase text-t1-md text-t1-black'>
						Education
					</p>
					{demo.education.map((edu, index) => (
						<div key={index} className='mb-4'>
							<h4 className='text-t1-md mb-1 font-medium text-t1-black'>
								{edu.major}
							</h4>
							<h5 className='text-t1-sm mb-1 font-normal text-t1-black'>
								{edu.institution}
							</h5>
							<p className='text-t1-xs text-t1-gray  mb-1 font-normal'>
								{edu.start} - {edu.end} - {edu.country}
							</p>
							
						</div>
					))}
				</div>
			</div>
			<div className='right w-3/12 bg-green-4000'>
				<div className='header-right h-32 flex items-center'>
					<div className={t1.profile_image_container}>
						<img src='/images/avatar.png' />
					</div>
				</div>
				<div className='mb-6'>
					<p className='text-t1-gray text-t1-sm'>{demo.email}</p>
					<p className='text-t1-gray text-t1-sm'>{demo.phone}</p>
					<p className='text-t1-gray text-t1-sm'>{demo.country}</p>
				</div>
				{demo.extras.map((item, index) => (
					<div key={index} className='mb-2'>
						<p className='text-t1-gray font-medium text-t1-sm'>
							{item.title}
						</p>
						{item.type === 'NEW_LINE' ? (
							item.items.map((e, index) => (
								<p
									className='text-t1-gray font-light text-t1-sm leading-6'
									key={index}
								>
									{e.text}
								</p>
							))
						) : (
							<p className='text-t1-gray font-light text-t1-sm leading-6'>
								{item.items.map((e, i) => `${e.text}, `)}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
		)
	}
}
const demo = {
	name: 'Vishwajeet Raj',
	designation: 'Senior Product Designer',
	email: 'vishwajeetraj@gmail.com',
	phone: '+91 8507407214',
	country: 'India',
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

export default Resume;
