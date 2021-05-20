import React from 'react'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import PrintIcon from '@material-ui/icons/Print';
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


const RightSideBar = ({handlePrint}) => {
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
			width: 'auto',
		},
	});

    const classes = useStyles();

    // Right Drawer States
	const [rightDrawerState, setRightDrawerState] = React.useState({ ...sectionDrawerStates });

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
			<div className='pt-10 pl-10 w-screen'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleRightDrawer(anchor, false)}
					color='default'
					variant='outlined'
				>
					{' '}
					<ArrowBackIosIcon /> <p className='ml-2'>Back</p>
				</Button>
				</div>

				{anchor === 'font-face' && (
					<div className='mt-8'>
					{fonts.map(font => {
						const onClick = (fontFamily, fontID) => {
							let fontAvailable;
							const resume = document.getElementById('t1');

							document.fonts.ready.then(() => {
								console.log('llb')
							 fontAvailable = document.fonts.check(`16px ${fontFamily}`);
							 
							if(fontAvailable) {
								resume.style['fontFamily'] = fontFamily
							} else {
								const head = document.getElementsByTagName('head')[0];
								const link = document.createElement('link');
								link.id = fontID;
								link.rel = 'stylesheet';
								link.type = 'text/css';
								link.href = 'http://fonts.googleapis.com/css?family='+fontID;
								link.media = 'all';
								head.appendChild(link);
								resume.style['fontFamily'] = fontFamily
							}
							}).catch(e => console.log(e));
							
						}
						return (
							<div key={font.id} className=''>
							<Button variant='outlined' className='mt-6' onClick={() => onClick(font.fontFamily, font.fontId)}><p className='capitalize'>{font.fontFamily}</p></Button>
							</div>
						)
					})}
					</div>
				)}
				
			</div>
		</div>
	);

    return (
        <div className='bg-primary lg:pt-16 px-4 fixed lg:static bottom-0 w-screen lg:w-auto flex lg:block justify-center left-sidebar'>
        {sections.map(({ title, Icon, id, label }) => (
            <div key={id} className='inline-block lg:block my-4 lg:my-8'>
                <Tooltip title={title} placement={matches ? 'right' : 'bottom'} arrow>
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
         <Tooltip title={'Print Resume'} placement={matches ? 'right' : 'bottom'} arrow>
                    <Button onClick={handlePrint}>
                        <PrintIcon style={{ color: 'white' }} size='100px' />
                    </Button>
                </Tooltip>
        </div>
    )
}

export default RightSideBar

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
]

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
]
