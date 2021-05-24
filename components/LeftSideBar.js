import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import PersonalDataForm from './forms/PersonalData';
// import WorkExperienceForm from './forms/Experience';
// import EducationForm from './forms/Education';
import ExtrasForm from './forms/ExtrasForm';
import UploadPhoto from './forms/UploadPhoto';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReorderExperience from './drag&drop/ReorderExperience';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import EditSingleExperience from "./forms/EditSingleExperience"
import ReorderEducation from './drag&drop/ReorderEducation';
import ReorderExtras from './drag&drop/ReorderExtras';


const LeftSideBar = () => {
	const matches = useMediaQuery('(min-width:1024px)');
	const sections = useSelector((state) => state.sections);
	const sectionTitles = sections.data.map((e) => e.label);
	const sectionDrawerStates = {};
	sectionTitles.map((section) => (sectionDrawerStates[section] = false));

	const useStyles = makeStyles({
		list: {
			// width: !matches ? '50vw' : '100vw',
			width: '50vw',
			minHeight: matches ? '0' : '100vh',
		},
		fullList: {
			width: 'auto',
		},
	});

	const classes = useStyles();

	// Left Drawer States
	const [leftDrawerState, setLeftDrawerState] = React.useState({ ...sectionDrawerStates });

	const toggleLeftDrawer = (anchor, open) => (event) => {
		// if (
		// 	event.type === 'keydown' &&
		// 	(event.key === 'Tab' || event.key === 'Shift')
		// ) {
		// 	return;
		// }

		setLeftDrawerState({ ...leftDrawerState, [anchor]: open });
	};

	const leftList = (anchor) => {
		const resume = useSelector(state => state.resume.data)
		const experiences = resume.experiences;
		const dispatch = useDispatch();

		return (
			<div
				// className={clsx(classes.list, {
				// 	[classes.fullList]: anchor === 'top' || anchor === 'bottom',
				// })}
				className={`${matches ? clsx(classes.list) : clsx(classes.fullList)} h-full`}
				// style={{backgroundColor: '#16a085'}}
				role='presentation'
				// onClick={toggleDrawer(anchor, false)}
				// onKeyDown={toggleDrawer(anchor, false)}
			>
				<div className='pt-10 pr-6 pl-6 lg:pt-10 lg:pl-10 lg:pr-10'>
					<div className='flex align-center'>
					</div>
					{anchor === 'personal-data' && (
						<PersonalDataForm
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)}
	
					{/* {anchor === 'work-experience' && (
						<WorkExperienceForm
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)} */}
					{anchor === 'work-experience' && (
					<ReorderExperience
						closeDrawer={toggleLeftDrawer(anchor, false)}
						anchor={anchor}
					/>
					)}

					{anchor === 'education' && (
					<ReorderEducation
						closeDrawer={toggleLeftDrawer(anchor, false)}
						anchor={anchor}
					/>
					)}

					{/* {anchor === 'education' && (
						<EducationForm
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)} */}
					{/* {anchor === 'extras' && (
						<ExtrasForm
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)} */}
					{anchor === 'extras' && (
						<ReorderExtras
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)}
					{anchor === 'upload-photo' && (
						<UploadPhoto
							closeDrawer={toggleLeftDrawer(anchor, false)}
							anchor={anchor}
						/>
					)}
				</div>
				{/*<Divider />*/}
			</div>
		)
	};

	return (
		<div className='bg-primary lg:pt-16 lg:px-4 flex lg:block fixed lg:static bottom-0 w-screen lg:w-auto justify-center left-sidebar order-3 lg:order-1'>
		{/* add overflow-scroll ||^^ if section are needed to scroll */}
			{sections.data.map(({ title, Icon, id, label }) => (
				<div key={id} className='inline-block lg:block my-4 lg:my-8'>
					<Tooltip title={title} placement={matches ? 'right' : 'bottom'} arrow>
						<Button onClick={toggleLeftDrawer(label, true)}>
							<Icon style={{ color: 'white' }} size='100px' />
						</Button>
					</Tooltip>
					<Drawer
						anchor={'left'}
						open={leftDrawerState[label]}
						onClose={toggleLeftDrawer(label, false)}
					>
						{leftList(label)}
					</Drawer>
				</div>
			))}
		</div>
	);
};

export default LeftSideBar;
