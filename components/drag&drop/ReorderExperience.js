import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { addExperienceData } from '../../redux/actions/resumeActions';

const ReorderExperience = ({closeDrawer, anchor, openForm}) => {
	const dispatch = useDispatch();
	const experiences = useSelector((state) => state.resume.data.experiences);
	const [exp, setExp] = useState(useSelector((state) => state.resume.data.experiences));
	const experienceStates = {};
	experiences.forEach((exp) => (experienceStates[exp.id] = false));
	const [experienceActive, setExperienceActive] = useState({...experienceStates});
	
	const onDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(exp);
		const [reorderItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderItem);
		setExp(items);
	};

	useEffect(() => {
		setExp(experiences)
	},[experiences])

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
		setExp(p => {
			return p.filter(e => e.id !== id)
		})
	}

	const save = () => {
		dispatch(addExperienceData(exp));
		closeDrawer(anchor, false);
	}

	return (
		<Fragment>
		<div className='flex items-center justify-start'>
		<Button
			className='px-4 py-2 mr-4'
			onClick={() => closeDrawer(anchor, false)}
			color='default'
			variant='text'
			>
			{' '}
			<ArrowBackIcon /><p className='ml-2'>Back</p>
		</Button>
		<Button
			className='px-4 py-2 mr-4'
			onClick={() => openForm(anchor, true)}
			color='primary'
			variant='outlined'
			>
			<AddIcon /><p className='ml-2'>Add Experience</p>
		</Button>
		<Button
			className='px-4 py-2'
			onClick={save}
			color='primary'
			variant='contained'
			>
			<SaveIcon /><p className='ml-2'>Save Order</p>
		</Button>
		</div>
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={'experiences'}>
				{(provided,snapshot) => (
					<div
						style={getListStyle(snapshot.isDraggingOver)}
						className='py-10 rounded'
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
										<div className='flex justify-between items-center'>
										<p className='font-light text-lg'>{e.designation}</p>
										<p className='text-xs font-normal'>{e.start} &mdash; {e.end}</p>
										</div>
										<p className='text-sm font-medium tracking-wide mt-1 mb-0.5'>{e.company} &bull; {e.country}</p>
										<p className='text-xs font-light tracking-wide mt-1 mb-0.5'>{e.description.length > 180 ? e.description.slice(0, 180) + "..." : e.description}</p>
										<div 
										className='mt-3 -mb-2'
										style={{maxHeight:`${experienceActive[e.id] ? '60px' : '0px' }`, transition: 'all 0.5s', overflow: 'hidden' }}>
											<Button className='mr-4' variant='text'>
											<div className='flex items-center justify-center'>
											<EditIcon style={{color: '#fff'}} /> <p className='ml-2 text-white capitalize'>Edit</p>
											</div>
											</Button>
											<Button onClick={()=>onDelete({id:e.id})} variant='text'>
											<div className='flex items-center justify-center'>
											<DeleteIcon style={{color: '#fff'}} /> <p className='ml-2 text-white capitalize'>Delete</p>
											</div>
											</Button>
											</div>
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
		</Fragment>
		);
};

export default ReorderExperience;
