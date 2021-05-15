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

const useStyles = makeStyles({
	list: {
		width: '50vw',
	},
	fullList: {
		width: 'auto',
	},
});

const LeftSideBar = () => {
	const sections = useSelector((state) => state.sections);
	const sectionTitles = sections.data.map((e) => e.label);
	const sectionDrawerStates = {};
	sectionTitles.map((section) => (sectionDrawerStates[section] = false));
	const classes = useStyles();
	const [state, setState] = React.useState({ ...sectionDrawerStates });

	const toggleDrawer = (anchor, open) => (event) => {
		// if (
		// 	event.type === 'keydown' &&
		// 	(event.key === 'Tab' || event.key === 'Shift')
		// ) {
		// 	return;
		// }

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='pt-10 pl-10'>
				<Button
					className='px-4 py-2'
					onClick={toggleDrawer(anchor, false)}
					color='default'
					variant='outlined'
				>
					{' '}
					<ArrowBackIosIcon /> <p className='ml-2'>Back</p>
				</Button>
				{anchor === 'personal-data' && (
					<PersonalDataForm
						closeDrawer={toggleDrawer(anchor, false)}
						anchor={anchor}
					/>
				)}
			</div>
			{/*<Divider />*/}
		</div>
	);

	return (
		<div className='bg-green-400 pt-16 px-4 overflow-scroll left-sidebar'>
			{sections.data.map(({ title, Icon, id, label }) => (
				<div key={id} className='block my-8'>
					<Tooltip title={title} placement={'right'} arrow>
						<Button onClick={toggleDrawer(label, true)}>
							<Icon style={{ color: 'white' }} size='100px' />
						</Button>
					</Tooltip>
					<Drawer
						anchor={'left'}
						open={state[label]}
						onClose={toggleDrawer(label, false)}
					>
						{list(label)}
					</Drawer>
				</div>
			))}
		</div>
	);
};

export default LeftSideBar;
