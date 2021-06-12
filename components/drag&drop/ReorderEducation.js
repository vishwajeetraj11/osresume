import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { addEducationData, addSampleEducationData, deleteSingleEducationData, } from '../../redux/actions/resumeActions';
import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import EducationCard from '../cards/EducationCard';
import EditSingleEducation from '../forms/EditSingleEducation';

const ReorderEducation = ({closeDrawer, anchor}) => {
	// media Query
	const matches = useMediaQuery('(min-width:1024px)');
	const dispatch = useDispatch();

	// Fetch Global State 
	const education = useSelector((state) => state.resume.data.education)

	// Local Education State for drag and drop
	const [edu, setEdu] = useState(education);
	const educationStates = {};
	edu.forEach((edu) => (educationStates[edu.id] = false));
	// 
	const [educationActive, setEducationActive] = useState({...educationStates});

	// This to keep track of localState if one of the education have been updated to update state in useEffect
	const [edit, setEdit] = useState(false)

	const eduDrawerStatesObj = {};
	edu.map((edu) => (eduDrawerStatesObj[edu.id] = false));

	useEffect(() => {
		if(!(education.length === edu.length)){
			setEdu(education)
		}
		if(edit) {
			setEdu(education)
			setEdit(false)
		}
	},[education, edu, edit])

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
	const [eduDrawerStates, setEduDrawerStates] = React.useState({ ...eduDrawerStatesObj });
	const toggleEduDrawerStates = (id, open) => (event) => {
		setEduDrawerStates({ ...eduDrawerStates, [id]: open });
	};
	const onDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(edu);
		const [reorderItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderItem);
		setEdu(items);
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

	const disableActiveEdu = () => {
		const clone = Object.create(educationActive)

		const ids = Object.keys(clone);

		// create an object that will be passed as in state 
		// which we will use to disable the rest state (false)
		// this will ensure at one time only one is active
		const fakeState = {}

		// assign each state false
		ids.forEach((id) => {fakeState[id] = false })

		// setActive only the one that gets clicked 
		setEducationActive(fakeState)	
	}


	const onClickEdu = ({id}) => {

		// CLone the activeEducation State
		const clone = Object.create(educationActive)

		// check if the clicked education is already active then disable it and return 
		if(clone[id]) {
			setEducationActive(p => ({
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
		setEducationActive(p => ({
			...ids,
			[id]: true
		}))
	}

	const onDelete = ({id}) => {
		dispatch(deleteSingleEducationData(id))
	}

	const save = () => {
		dispatch(addEducationData(edu));
		closeDrawer(anchor, false);
	}

	const onAdd = () => {
		dispatch(addSampleEducationData({
			id: uuidv4(),
			institution: 'Sample Institution',
			major: 'Sample Major',
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
			<AddIcon /><p className='ml-2 capitalize'>Add Education</p>
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
			<Droppable droppableId={'education'}>
				{(provided,snapshot) => (
					<div
						style={getListStyle(snapshot.isDraggingOver)}
						className='pb-10 pt-8 rounded'
						{...provided.droppableProps}
						ref={provided.innerRef}
						onClick={() => {
							if(snapshot.isDraggingOver) {
								disableActiveEdu()
							}
						}}
					>
						{edu.map((e, index) => (
							<Draggable
								key={e.id}
								draggableId={e.id}
								index={index}
							>
								{(provided,snapshot) => (
										<div
											onClick={() => onClickEdu({id: e.id})}
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
										<EducationCard
										{...e}
										onDelete={onDelete}
										openEditEduForm={toggleEduDrawerStates(e.id, true)}
										educationActive={educationActive} 
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
	
	{edu.map((edu) => (
		<div key={edu.id} >
		<Drawer
		anchor={'left'}
		open={eduDrawerStates[edu.id]}
		onClose={toggleEduDrawerStates(edu.id, false)}
		>
		<div
			className={clsx(classes.list)}
			role='presentation'
		>
			<div className='pt-10 pl-10'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleEduDrawerStates(edu.id, false)}
					color='default'
					variant='outlined'
				>
					<ArrowBackIcon /><p className='ml-2 capitalize'>Back</p>
				</Button>
				</div>
				<EditSingleEducation
				anchor={anchor}
				education={edu}
				setEdit={setEdit}
				closeDrawer={toggleEduDrawerStates(edu.id, false)}
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

export default ReorderEducation;


