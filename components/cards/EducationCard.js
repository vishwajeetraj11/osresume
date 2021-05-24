import { Button } from '@material-ui/core';
import { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const EducationCard = ({institution, start, end, major, onDelete, openEditEduForm, country, educationActive, id }) => {
	return (
		<Fragment>
			<div className='flex justify-between items-center'>
				<p className='font-light text-lg'>{institution}</p>
				<p className='text-xs font-normal'>{start} &mdash; {end}</p>
			</div>
				<p className='text-sm font-medium tracking-wide mt-1 mb-0.5'>{major} &bull; {country}</p>
			<div 
			className='mt-3 -mb-2'
			style={{maxHeight:`${educationActive[id] ? '60px' : '0px' }`, transition: 'all 0.5s', overflow: 'hidden' }}>
				<Button onClick={() => openEditEduForm()} className='mr-4' variant='text'>
					<div className='flex items-center justify-center'>
						<EditIcon style={{color: '#fff'}} /> <p className='ml-2 text-white capitalize'>Edit</p>
					</div>
				</Button>
				<Button onClick={()=>onDelete({id})} variant='text'>
					<div className='flex items-center justify-center'>
						<DeleteIcon style={{color: '#fff'}} /> <p className='ml-2 text-white capitalize'>Delete</p>
					</div>
				</Button>
			</div>
		</Fragment>
	)
}

export default EducationCard
