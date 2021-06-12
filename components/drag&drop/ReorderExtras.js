import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { addExtrasData, addSampleExtraData, deleteSingleExtraData } from '../../redux/actions/resumeActions';
import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import ExtrasCard from '../cards/ExtrasCard';
import EditSingleExtra from '../forms/EditSingleExtra';

const ReorderExtras = ({closeDrawer, anchor}) => {
	// media Query
	const matches = useMediaQuery('(min-width:1024px)');
	const dispatch = useDispatch();

	// Fetch Global State 
	const extras = useSelector((state) => state.resume.data.extras)

	// Local Extras State for drag and drop
	const [ext, setExt] = useState(extras);
	const extrasStates = {};
	ext.forEach((ext) => (extrasStates[ext.id] = false));
	// 
	const [extraActive, setExtraActive] = useState({...extrasStates});

	// This to keep track of localState if one of the extras have been updated to update state in useEffect
	const [edit, setEdit] = useState(false)

	const extDrawerStatesObj = {};
	ext.map((ext) => (extDrawerStatesObj[ext.id] = false));

	useEffect(() => {
		if(!(extras.length === ext.length)){
			setExt(extras)
		}
		if(edit) {
			setExt(extras)
			setEdit(false)
		}
	},[extras, ext, edit])

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
	const [extDrawerStates, setExtDrawerStates] = React.useState({ ...extDrawerStatesObj });
	const toggleExtDrawerStates = (id, open) => (event) => {
		setExtDrawerStates({ ...extDrawerStates, [id]: open });
	};
	const onDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(ext);
		const [reorderItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderItem);
		setExt(items);
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

	const disableActiveExt = () => {
		const clone = Object.create(extraActive)

		const ids = Object.keys(clone);

		// create an object that will be passed as in state 
		// which we will use to disable the rest state (false)
		// this will ensure at one time only one is active
		const fakeState = {}

		// assign each state false
		ids.forEach((id) => {fakeState[id] = false })

		// setActive only the one that gets clicked 
		setExtraActive(fakeState)	
	}


	const onClickExt = ({id}) => {

		// CLone the activeExtra State
		const clone = Object.create(extraActive)

		// check if the clicked extra is already active then disable it and return 
		if(clone[id]) {
			setExtraActive(p => ({
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
		setExtraActive(p => ({
			...ids,
			[id]: true
		}))
	}

	const onDelete = ({id}) => {
		dispatch(deleteSingleExtraData(id))
	}

	const save = () => {
		dispatch(addExtrasData(ext));
		closeDrawer(anchor, false);
	}

	const onAdd = () => {
		dispatch(addSampleExtraData({
			id: uuidv4(),
			title: 'Sample Title',
			type: 'COMMA',
			items: ['Sample Item 1', 'Sample Item 2'],
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
			<AddIcon /><p className='ml-2 capitalize'>Add Extra</p>
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
			<Droppable droppableId={'extras'}>
				{(provided,snapshot) => (
					<div
						style={getListStyle(snapshot.isDraggingOver)}
						className='pb-10 pt-8 rounded'
						{...provided.droppableProps}
						ref={provided.innerRef}
						onClick={() => {
							if(snapshot.isDraggingOver) {
								disableActiveExt()
							}
						}}
					>
						{ext.map((e, index) => (
							<Draggable
								key={e.id}
								draggableId={e.id}
								index={index}
							>
								{(provided,snapshot) => (
										<div
											onClick={() => onClickExt({id: e.id})}
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
										<ExtrasCard
										{...e}
										onDelete={onDelete}
										openEditExtForm={toggleExtDrawerStates(e.id, true)}
										extraActive={extraActive} 
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
	
	{ext.map((ext) => (
		<div key={ext.id}>
		<Drawer
		anchor={'left'}
		open={extDrawerStates[ext.id]}
		onClose={toggleExtDrawerStates(ext.id, false)}
		>
		<div
			className={clsx(classes.list)}
			role='presentation'
		>
			<div className='pt-10 pl-10 pr-10'>
				<div className='flex align-center'>
				<Button
					className='px-4 py-2'
					onClick={toggleExtDrawerStates(ext.id, false)}
					color='default'
					variant='outlined'
				>
					<ArrowBackIcon /><p className='ml-2 capitalize'>Back</p>
				</Button>
				</div>
				<EditSingleExtra
				anchor={anchor}
				extra={ext}
				setEdit={setEdit}
				closeDrawer={toggleExtDrawerStates(ext.id, false)}
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

export default ReorderExtras;


