import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PersonalDataForm from './forms/PersonalData';
import WorkExperienceForm from './forms/Experience';
import EducationForm from './forms/Education';
import ExtrasForm from './forms/ExtrasForm';
import UploadPhoto from './forms/UploadPhoto';
import useMediaQuery from '@material-ui/core/useMediaQuery';



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

	// Top Drawer States
	const [topDrawerState, setTopDrawerState] = React.useState({ ...sectionDrawerStates });

	const toggleTopDrawer = (anchor, open) => (event) => {
		// if (
		// 	event.type === 'keydown' &&
		// 	(event.key === 'Tab' || event.key === 'Shift')
		// ) {
		// 	return;
		// }

		setTopDrawerState({ ...leftDrawerState, [anchor]: open });
	};
	const toggleLeftDrawer = (anchor, open) => (event) => {
		// if (
		// 	event.type === 'keydown' &&
		// 	(event.key === 'Tab' || event.key === 'Shift')
		// ) {
		// 	return;
		// }

		setLeftDrawerState({ ...leftDrawerState, [anchor]: open });
	};

	const topList = (anchor) => (
		<div
			// className={clsx(classes.list, {
			// 	[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			// })}
			className={clsx(classes.list)}
			role='presentation'
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='pt-10 pl-10'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleTopDrawer(anchor, false)}
					color='default'
					variant='outlined'
				>
					{' '}
					<ArrowBackIosIcon /> <p className='ml-2'>Back</p>
				</Button>
				</div>

			</div>
			{/*<Divider />*/}
		</div>
	)

	const leftList = (anchor) => (
		<div
			// className={clsx(classes.list, {
			// 	[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			// })}
			className={matches ? clsx(classes.list) : clsx(classes.fullList)}
			role='presentation'
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='pt-10 pl-10'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleLeftDrawer(anchor, false)}
					color='default'
					variant='outlined'
				>
					{' '}
					<ArrowBackIosIcon /> <p className='ml-2'>Back</p>
				</Button>
				<Button
					variant='outlined'
					className='px-4 py-2 ml-10'
					onClick={toggleTopDrawer(anchor, true)}
					color='primary'
					variant='contained'
				> Reorder
				</Button>
				</div>
				{anchor === 'personal-data' && (
					<PersonalDataForm
						closeDrawer={toggleLeftDrawer(anchor, false)}
						anchor={anchor}
					/>
				)}
				{anchor === 'work-experience' && (
					<WorkExperienceForm
						closeDrawer={toggleLeftDrawer(anchor, false)}
						anchor={anchor}
					/>
				)}
				{anchor === 'education' && (
					<EducationForm
						closeDrawer={toggleLeftDrawer(anchor, false)}
						anchor={anchor}
					/>
				)}
				{anchor === 'extras' && (
					<ExtrasForm
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
	);

	return (
		<div className='bg-green-400 lg:pt-16 px-4 flex lg:block justify-center overflow-scroll left-sidebar'>
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
					<Drawer
						anchor={'top'}
						open={topDrawerState[label]}
						onClose={toggleTopDrawer(label, false)}
					>
						{topList(label)}
					</Drawer>
				</div>
			))}
		</div>
	);
};

export default LeftSideBar;
