import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { addExperienceData, addSampleExperienceData, deleteSingleExperienceData } from '../../redux/actions/resumeActions';
import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import EditSingleExperience from '../forms/EditSingleExperience';
import ExperienceCard from "../cards/ExperienceCard"

const ReorderExperience = ({closeDrawer, anchor}) => {
	// media Query
	const matches = useMediaQuery('(min-width:1024px)');
	const dispatch = useDispatch();

	// Fetch Global State 
	const experiences = useSelector((state) => state.resume.data.experiences)

	// Local Experiences State for drag and drop
	const [exp, setExp] = useState(experiences);
	const experienceStates = {};
	exp.forEach((exp) => (experienceStates[exp.id] = false));
	// 
	const [experienceActive, setExperienceActive] = useState({...experienceStates});

	// This to keep track of localState if one of the experiences have been updated to update state in useEffect
	const [edit, setEdit] = useState(false)

	const expDrawerStatesObj = {};
	exp.map((exp) => (expDrawerStatesObj[exp.id] = false));

	useEffect(() => {
		if(!(experiences.length === exp.length)){
			setExp(experiences)
		}
		if(edit) {
			setExp(experiences)
			setEdit(false)
		}
	},[experiences, exp, edit])

	const useStyles = makeStyles({
		list: {
			width: matches ? '50vw' : '100vw',
			// width: '50vw',
			minHeight: matches ? '0' : '100vh',
		},
		fullList: {
			width: 'auto',
		},
	});
	const classes = useStyles();

	// Nested Drawer States
	const [expDrawerStates, setExpDrawerStates] = React.useState({ ...expDrawerStatesObj });
	const toggleExpDrawerStates = (id, open) => (event) => {
		setExpDrawerStates({ ...expDrawerStates, [id]: open });
	};
	const onDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(exp);
		const [reorderItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderItem);
		setExp(items);
	};

	const grid = 10;
	const getItemStyle = (isDragging, draggableStyle) =>  ({
			// some basic styles to make the items look a bit nicer
			userSelect: 'none',
			padding: grid * 2,
			margin: `0 0 ${grid}px 0`,
			transition: 'height 0.2s',
			overflow: 'hidden',
	
			// change background colour if dragging
			background: isDragging ? '#1abc9c95' : '#1abc9c',
			
			// styles we need to apply on draggables
			...draggableStyle,
		});

	const getListStyle = (isDraggingOver) => ({
		// background: isDraggingOver ? '#ffffff' : '#16a085',		
	});

	const disableActiveExp = () => {
		const clone = Object.create(experienceActive)

		const ids = Object.keys(clone);

		// create an object that will be passed as in state 
		// which we will use to disable the rest state (false)
		// this will ensure at one time only one is active
		const fakeState = {}

		// assign each state false
		ids.forEach((id) => {fakeState[id] = false })

		// setActive only the one that gets clicked 
		setExperienceActive(fakeState)	
	}


	const onClickExp = ({id}) => {

		// CLone the activeExperiences State
		const clone = Object.create(experienceActive)

		// check if the clicked experience is already active then disable it and return 
		if(clone[id]) {
			setExperienceActive(p => ({
				...p,
				[id]: false
			}))
			return
		}
		
		// Get All Ids from state in an Array
		const ids = Object.keys(clone);

		// create an object that will be passed as in state 
		// which we will use to disable the rest state (false)
		// this will ensure at one time only one is active
		const fakeState = {}

		// assign each state false
		ids.forEach((id) => {fakeState[id] = false })

		// setActive only the one that gets clicked 
		setExperienceActive(p => ({
			...ids,
			[id]: true
		}))
	}

	const onDelete = ({id}) => {
		dispatch(deleteSingleExperienceData(id))
	}

	const save = () => {
		dispatch(addExperienceData(exp));
		closeDrawer(anchor, false);
	}

	const onAdd = () => {
		dispatch(addSampleExperienceData({
			id: uuidv4(),
			designation: 'Sample Designation',
			company: 'Company Description',
			description: 'Sample Description',
			start: undefined,
			end: undefined,
			years: '1',
			country: 'Sample Country',
		}))

	}

	return (
		<Fragment>
		<div className='flex items-center justify-start flex-wrap lg:flex-nowrap'>
		<div className='w-full md:w-auto mb-4 md:mb-0'>
		<Button
			className='lg:px-4 lg:py-2 mr-4'
			onClick={() => closeDrawer(anchor, false)}
			color='default'
			variant='text'
			>
			{' '}
			<ArrowBackIcon /><p className='ml-2 capitalize'>Back</p>
		</Button>
		</div>
		<Button
			className='lg:px-4 lg:py-2 mr-4'
			onClick={onAdd}
			color='primary'
			variant='outlined'
			>
			<AddIcon /><p className='ml-2 capitalize'>Add Experience</p>
		</Button>
		<Button
			className='lg:px-4 lg:py-2'
			onClick={save}
			color='primary'
			variant='contained'
			>
			<SaveIcon /><p className='ml-2 capitalize'>Save Order</p>
		</Button>
		</div>
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={'experiences'}>
				{(provided,snapshot) => (
					<div
						style={getListStyle(snapshot.isDraggingOver)}
						className='pb-10 pt-8 rounded'
						{...provided.droppableProps}
						ref={provided.innerRef}
						onClick={() => {
							if(snapshot.isDraggingOver) {
								disableActiveExp()
							}
						}}
					>
						{exp.map((e, index) => (
							<Draggable
								key={e.id}
								draggableId={e.id}
								index={index}
							>
								{(provided,snapshot) => (
										<div
											onClick={() => onClickExp({id: e.id})}
											className='p-6 text-white text-lg bg-primary rounded'
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											style={{...getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style,
											  ),
											}}
										>
										<ExperienceCard
										{...e}
										onDelete={onDelete}
										openEditExpForm={toggleExpDrawerStates(e.id, true)}
										experienceActive={experienceActive} 
										/>
										</div>
									)
								}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	
	{exp.map((exp) => (
		<div key={exp.id} >
		<Drawer
		anchor={'left'}
		open={expDrawerStates[exp.id]}
		onClose={toggleExpDrawerStates(exp.id, false)}
		>
		<div
			className={clsx(classes.list)}
			role='presentation'
		>
			<div className='pt-10 pl-10'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleExpDrawerStates(exp.id, false)}
					color='default'
					variant='outlined'
				>
					<ArrowBackIcon /><p className='ml-2 capitalize'>Back</p>
				</Button>
				</div>
				<EditSingleExperience
				anchor={anchor}
				experience={exp}
				setEdit={setEdit}
				closeDrawer={toggleExpDrawerStates(exp.id, false)}
				/>
			</div>
			{/*<Divider />*/}
		</div>
		</Drawer>
		</div>
	))}
	</Fragment>
		);
};

export default ReorderExperience;


const ButtonData = [
	{
		btnClasses: `lg:px-4 lg:py-2 mr-4`,
		color: 'default',
		variant: 'text',
		Icon: ArrowBackIcon,
		btnTextClasses: 'ml-2 capitalize',
	},
]

const DrawerButton = ({
	btnClasses,
	color,
	variant,
	Icon,
	btnTextClasses,
	children,
	onClick
}) => (
	<Button
		className={btnClasses}
		onClick={onClick}
		color={color}
		variant={variant}
	>
		<Icon />
		<p className={btnTextClasses}>{children}</p>
	</Button>
)
