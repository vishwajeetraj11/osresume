import React from 'react';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import PrintIcon from '@material-ui/icons/Print';
import { useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GoogleFontsList from './fonts/GoogleFontsList';

const RightSideBar = ({ handlePrint }) => {
	const matches = useMediaQuery('(min-width:1024px)');
	const sectionTitles = sections.map((e) => e.label);
	const sectionDrawerStates = {};
	sectionTitles.map((section) => (sectionDrawerStates[section] = false));

	const useStyles = makeStyles({
		list: {
			// width: !matches ? '50vw' : '100vw',
			width: '50vw',
			minHeight: matches ? '0' : '100vh',
		},
		fullList: {
			width: '100vw',
		},
	});

	const classes = useStyles();

	// Right Drawer States
	const [rightDrawerState, setRightDrawerState] = React.useState({
		...sectionDrawerStates,
	});

	const toggleRightDrawer = (anchor, open) => (event) => {
		// if (
		// 	event.type === 'keydown' &&
		// 	(event.key === 'Tab' || event.key === 'Shift')
		// ) {
		// 	return;
		// }

		setRightDrawerState({ ...rightDrawerState, [anchor]: open });
	};

	const rightList = (anchor) => (
		<div
			// className={clsx(classes.list, {
			// 	[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			// })}
			className={matches ? clsx(classes.list) : clsx(classes.fullList)}
			role='presentation'
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
		>
		{anchor === 'font-face' && (
			<GoogleFontsList 
				closeDrawer={toggleRightDrawer(anchor, false)}
				anchor={anchor}
			/>
		)}
		</div>
	);

	return (
		<div className='bg-primary lg:pt-16 px-4 w-full lg:w-auto flex lg:block justify-center left-sidebar order-1 lg:order-3'>
			{sections.map(({ title, Icon, id, label }) => (
				<div key={id} className='inline-block lg:block my-4 lg:my-8'>
					<Tooltip
						title={title}
						placement={matches ? 'right' : 'bottom'}
						arrow
					>
						<Button onClick={toggleRightDrawer(label, true)}>
							<Icon style={{ color: 'white' }} size='100px' />
						</Button>
					</Tooltip>
					<Drawer
						anchor={'right'}
						open={rightDrawerState[label]}
						onClose={toggleRightDrawer(label, false)}
					>
						{rightList(label)}
					</Drawer>
				</div>
			))}
			<Tooltip
				title={'Print Resume'}
				placement={matches ? 'right' : 'bottom'}
				arrow
			>
				<Button onClick={handlePrint}>
					<PrintIcon style={{ color: 'white' }} size='100px' />
				</Button>
			</Tooltip>
		</div>
	);
};

export default RightSideBar;

const fonts = [
	{
		id: '1',
		fontFamily: 'Montserrat',
		fontId: 'Montserrat',
	},
	{
		id: '2',
		fontFamily: 'Lato',
		fontId: 'Lato',
	},
	{
		id: '3',
		fontFamily: 'Poppins',
		fontId: 'Poppins',
	},
	{
		id: '4',
		fontFamily: 'Raleway',
		fontId: 'Raleway',
	},
	{
		id: '5',
		fontFamily: 'Ubuntu',
		fontId: 'Ubuntu',
	},
	{
		id: '6',
		fontFamily: 'Pattaya',
		fontId: 'Pattaya',
	},
	{
		id: '7',
		fontFamily: 'KoHo',
		fontId: 'KoHo',
	},
	{
		id: '8',
		fontFamily: 'Open Sans',
		fontId: 'Open+Sans',
	},
	{
		id: '9',
		fontFamily: 'Quicksand',
		fontId: 'Quicksand',
	},
	{
		id: '10',
		fontFamily: 'Dancing Script',
		fontId: 'Dancing+Script',
	},
	{
		id: '11',
		fontFamily: 'Josefin Slab',
		fontId: 'Josefin+Slab',
	},
	{
		id: '12',
		fontFamily: 'Cormorant',
		fontId: 'Cormorant',
	},
];

const sections = [
	{
		id: '1',
		title: 'Font Face',
		label: 'font-face',
		Icon: FormatColorTextIcon,
	},
	{
		id: '2',
		title: 'Font Color',
		label: 'font-color',
		Icon: FormatColorFillIcon,
	},
	// {
	// 	id: '3',
	// 	title: 'Print Resume',
	// 	label: 'print-resume',
	// 	Icon: PrintIcon,
	// },
];
