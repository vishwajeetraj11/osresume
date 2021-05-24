import { Button } from '@material-ui/core';
import { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ExperienceCard = ({designation, start, end, company, description, onDelete, openEditExpForm, country, experienceActive, id }) => {
	return (
		<Fragment>
			<div className='flex justify-between items-center'>
				<p className='font-light text-lg'>{designation}</p>
				<p className='text-xs font-normal'>{start} &mdash; {end}</p>
			</div>
				<p className='text-sm font-medium tracking-wide mt-1 mb-0.5'>{company} &bull; {country}</p>
				<p className='text-xs font-light tracking-wide mt-1 mb-0.5'>{description.length > 180 ? description.slice(0, 180) + "..." : description}</p>
			<div 
			className='mt-3 -mb-2'
			style={{maxHeight:`${experienceActive[id] ? '60px' : '0px' }`, transition: 'all 0.5s', overflow: 'hidden' }}>
				<Button onClick={() => openEditExpForm()} className='mr-4' variant='text'>
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

export default ExperienceCard
