import { Button, Divider, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import {editSingleExtraData} from '../../redux/actions/resumeActions';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const EditSingleExtra = ({ closeDrawer, anchor, extra, setEdit }) => {
	// Dispatch
	const dispatch = useDispatch();

	// Validation Schema for PersonalData form
	const ValidationSchema = Yup.object().shape({
		title: Yup.string().required('Title of the Extra is must.'),
		type: Yup.string().oneOf(['NEW_LINE', 'COMMA']),
	});

	/* 
                {
                    title: '',
                    type: '',
                    items: [],
                },
                
    */

	const classes = useStyles();

	return (
		<Formik
			initialValues={{
				...extra,
			}}
			validateOnChange={false}
			validateOnBlur={false}
			validateOnMount={false}
			validationSchema={ValidationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setTimeout(() => {
					dispatch(editSingleExtraData(values));
					resetForm({
						title: '',
						type: '',
						items: [],
					});
					setSubmitting(false);
					closeDrawer(anchor, false);
					setEdit(true);
				}, 400);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				isSubmitting,
			}) => (
				<form className='pb-10' onSubmit={handleSubmit}>
					<div className=''>
						<div className='flex align-center justify-between'>
							<h3 className='text-t1-lg font-medium mt-6'>
								Extra Block
							</h3>
						</div>
						<TextField
							id={`title`}
							className='mt-6'
							rows={1}
							variant='outlined'
							fullWidth
							onBlur={handleBlur}
							onChange={handleChange}
							label={'Enter Title'}
							value={values.title}
							error={!!errors.title}
							helperText={errors.title}
						/>

						<FormControl
							variant='outlined'
							className={`${classes.formControl} mr-10 mt-10`}
							fullWidth
						>
							<InputLabel id='demo-simple-select-outlined-label'>
								Type of Extra Item
							</InputLabel>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={values.type}
								onChange={(e) => {
									setFieldValue(
										`type`,
										e.target.value
									);
								}}
								label='Type of Extra Item'
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={'NEW_LINE'}>
									Every Item in new Line
								</MenuItem>
								<MenuItem value={'COMMA'}>
									Every Item in the same line
								</MenuItem>
							</Select>
							{values.type === 'NEW_LINE' && (
								<Fragment>
								<ChipInput
									// inputValue={value}
									label='Items'
									fullWidth
									className='mt-6 mr-10'
									placeholder='Enter items and hit ENTER'
									allowDuplicates={false}
									alwaysShowPlaceholder={true}
									value={values.items}
									onAdd={(chip) => {
										setFieldValue(
											`items`,
											values.items.concat(
												chip
											)
										);
									}}
									onDelete={(chip, indexChip) => {
										const items = values.items.filter((_, i) => {
											return i !== indexChip;
										});
										setFieldValue(
											`items`,
											items
										);
									}}
								/>					
								{/* <Button className='mt-4' onClick={() => console.log()} variant='contained' color='primary'>Add</Button> */}
								</Fragment>
							)}
							{values.type === 'COMMA' && (
								<Fragment>
								<ChipInput
									label='Items'
									InputLabelProps={{ shrink: true }}
									fullWidth
									className='mt-4 mr-10'
									placeholder='Enter items and hit ENTER'
									allowDuplicates={false}
									alwaysShowPlaceholder={true}
									value={values.items}
									onAdd={(chip) => {
										setFieldValue(
											`.items`,
											values.items.push(
												chip
											)
										);
									}}
									onDelete={(chip, indexChip) => {
										const items = values.items.filter((_, i) => {
											return i !== indexChip;
										});
										setFieldValue(
											`items`,
											items
										);
									}}
								/>
								{/* <Button className='mt-4' onClick={() => console.log()} variant='contained' color='primary'>Add</Button> */}
								</Fragment>
							)}
						</FormControl>
					</div>
					<Divider className='mt-8 -ml-10' />
					<Button
						className='mt-6'
						variant='contained'
						color='primary'
						type='submit'
						disabled={isSubmitting}
					>
						Submit
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default EditSingleExtra;
