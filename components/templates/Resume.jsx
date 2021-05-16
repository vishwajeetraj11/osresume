import React from 'react';
import t1 from '../../styles/template1.module.scss';

class Resume extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { data } = this.props;
		// const experiences = data?.experiences.map((experience) => {
		// 	if (!experience.end) {
		// 		experience.end = new Date(2021, 5);
		// 	}
		// 	if (!experience.start) {
		// 		experience.start = new Date(2021, 1);
		// 	}
		// 	const currentMonth = new Date().toLocaleDateString('default', {
		// 		month: 'long',
		// 	});
		// 	const currentYear = new Date().getFullYear();

		// 	const startMonth = experience.start.toLocaleString('default', {
		// 		month: 'long',
		// 	});
		// 	const startYear = experience.start.getFullYear();
		// 	experience.start = `${startMonth} ${startYear}`;

		// 	const endMonth = experience.end.toLocaleString('default', {
		// 		month: 'long',
		// 	});
		// 	const endYear = experience.end.getFullYear();
		// 	if (endMonth === currentMonth && endYear === currentYear) {
		// 		experience.end = 'Present';
		// 	} else {
		// 		experience.end = `${endMonth} ${endYear}`;
		// 	}
		// 	return experience;
		// });
		return (
			<div
				id='t1'
				className={`resume-a4 bg-white flex justify-between ${t1.container}`}
			>
				<div className='left w-8/12 bg-yellow-4000'>
					<div className='header-left'>
						<div className='h-32 flex justify-center flex-col'>
							<h1 className='font-semibold text-t1-xl text-t1-black capitalize'>
								{data.personalData.name}
							</h1>
							<h2 className='font-normal text-t1-lg text-t1-black capitalize'>
								{data.personalData.designation}
							</h2>
						</div>
					</div>
					<div className=''>
						<p className='tracking-widest uppercase text-t1-md text-t1-black'>
							Experience
						</p>
						{data.experiences.map((exp, index) => (
							<div key={index} className='mb-4'>
								<h4 className='capitalize text-t1-md mb-1 font-medium text-t1-black'>
									{exp.designation}
								</h4>
								<h5 className='capitalize text-t1-sm mb-1 font-normal text-t1-black'>
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
						{data.education.map((edu, index) => (
							<div key={index} className='mb-4'>
								<h4 className='capitalize text-t1-md mb-1 font-medium text-t1-black'>
									{edu.major}
								</h4>
								<h5 className='capitalize text-t1-sm mb-1 font-normal text-t1-black'>
									{edu.institution}
								</h5>
								<p className='text-t1-xs text-t1-gray  mb-1 font-normal'>
									{edu.start} - {edu.end} -{' '}
									<span className='capitalize'>
										{edu.country}
									</span>
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
						<p className='text-t1-gray text-t1-sm'>
							{data.personalData.email}
						</p>
						<p className='text-t1-gray text-t1-sm'>
							{data.personalData.phoneNumber}
						</p>
						<p className='text-t1-gray text-t1-sm'>
							{data.personalData.country}
						</p>
					</div>
					{data.extras.map((item, index) => (
						<div key={index} className='mb-2'>
							<p className='text-t1-gray capitalize font-medium text-t1-sm'>
								{item.title}
							</p>
							{item.type === 'NEW_LINE' ? (
								item.items.map((e, index) => (
									<p
										className='capitalize text-t1-gray font-light text-t1-sm leading-6'
										key={index}
									>
										{e.text}
									</p>
								))
							) : (
								<p className='capitalize text-t1-gray font-light text-t1-sm leading-6'>
									{item.items.map((e, i) => `${e.text}, `)}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Resume;
