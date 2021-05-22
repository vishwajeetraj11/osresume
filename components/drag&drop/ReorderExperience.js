import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const ReorderExperience = () => {
	const experience = useSelector((state) => state.resume.data.experiences);
	const [exp, setExp] = useState(experience);
	const onDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(exp);
		const [reorderItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderItem);
		setExp(items);
	};

	const grid = 8;

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 0 ${grid}px 0`,

		// change background colour if dragging
		background: isDragging ? 'lightgreen' : 'grey',

		// styles we need to apply on draggables
		...draggableStyle,
	});

	const getListStyle = (isDraggingOver) => ({
		background: isDraggingOver ? 'lightblue' : 'lightgrey',
		padding: grid,
	});

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={'experiences'}>
				{(provided,snapshot) => (
					<div
						style={getListStyle(snapshot.isDraggingOver)}
						className='mt-10 mr-10'
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{exp.map((e, index) => (
							<Draggable
								key={e.id}
								draggableId={e.id}
								index={index}
							>
								{(provided,snapshot) => (
									<div
										onClick={() => null}
										className='p-6 text-white text-lg bg-primary text-gray-100 flex justify-between items-center'
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
                                        style={{...getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          ),
										}}
									>
										<p>{e.designation}</p>
										<p className='text-sm'>{e.start} &mdash; {e.end}</p>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ReorderExperience;
