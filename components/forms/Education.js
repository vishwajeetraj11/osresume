import { Button, Divider, FormHelperText, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FieldArray, Formik } from 'formik';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import {
	addEducationData,
	addExperienceData,
} from '../../redux/actions/resumeActions';

const EducationForm = ({ closeDrawer, anchor }) => {
	// Dispatch
	const dispatch = useDispatch();

	// Get personalData State from globalState
	let education = useSelector((state) => state.resume.data.education);
	// Validation Schema for PersonalData form
	const ValidationSchema = Yup.object().shape({
		education: Yup.array()
			.of(
				Yup.object().shape({
					institution: Yup.string().required(
						'Institution is required'
					),
					major: Yup.string().required('Please enter the major'),
					start: Yup.date().required('Please enter start date'),
					end: Yup.date().required('Please enter end date'),
					country: Yup.string().required('Please enter country name'),
				})
			)
			.min(1, 'Need at least one education'),
	});

	/*
      education: [
                    {
                        institution: '',
                        major: '',
                        start: '',
                        end: '',
                        years: '',
                    },
                ],
    */

	return (
		<Formik
			initialValues={{
				education: education,
			}}
			validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
			validationSchema={ValidationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setTimeout(() => {
					dispatch(addEducationData(values.education));
					resetForm({
						education: [
							{
								institution: '',
								major: '',
								start: '',
								end: '',
								years: '',
							},
						],
					});
					setSubmitting(false);
					closeDrawer();
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
					<FieldArray name='education'>
						{({ insert, remove, push }) => (
							<div>
								{values.education.length > 0 &&
									values.education.map((education, index) => (
										<Fragment key={index}>
											<div className=''>
												<div className='flex align-center justify-between'>
													<h3 className='text-t1-lg font-medium mt-6'>
														Education Block{' '}
														{index + 1}
													</h3>
													<Button
														className='mt-6 mr-10'
														variant='outlined'
														color='primary'
														disabled={isSubmitting}
														onClick={() =>
															remove(index)
														}
													>
														- Remove Education
														{/* <DeleteIcon fontSize='small' /> */}
													</Button>
												</div>
												<TextField
													id={`education.${index}.institution`}
													className='mt-6 pr-10'
													rows={1}
													variant='outlined'
													fullWidth
													onBlur={handleBlur}
													onChange={handleChange}
													label={'Enter Institution'}
													value={
														values.education[index]
															.institution
													}
													error={
														!!(
															errors.education &&
															errors.education[
																index
															]?.institution
														)
													}
													helperText={
														errors.education &&
														errors.education[index]
															?.institution
													}
												/>

												<TextField
													id={`education.${index}.major`}
													className='mt-10 pr-10'
													rows={1}
													variant='outlined'
													fullWidth
													onBlur={handleBlur}
													onChange={handleChange}
													label={'Enter Major'}
													value={
														values.education[index]
															.major
													}
													error={
														!!(
															errors.education &&
															errors.education[
																index
															]?.major
														)
													}
													helperText={
														errors.education &&
														errors.education[index]
															?.major
													}
												/>

												<TextField
													id={`education.${index}.country`}
													className='mt-10 pr-10'
													rows={1}
													variant='outlined'
													fullWidth
													onBlur={handleBlur}
													onChange={handleChange}
													label={'Enter Country'}
													value={
														values.education[index]
															.country
													}
													error={
														!!(
															errors.education &&
															errors.education[
																index
															]?.country
														)
													}
													helperText={
														errors.education &&
														errors.education[index]
															?.country
													}
												/>

												<MuiPickersUtilsProvider
													utils={DateFnsUtils}
												>
													<div className='flex justify-between pr-10 mt-6'>
														<KeyboardDatePicker
															margin='normal'
															id={`education.${index}.start`}
															label='Enter Start Year'
															views={['year']}
															value={
																values
																	.education[
																	index
																].start
															}
															onChange={(
																date
															) => {
																const month =
																	date.toLocaleString(
																		'default',
																		{
																			month: 'long',
																		}
																	);
																const year =
																	date.getUTCFullYear();
																setFieldValue(
																	`education[${index}].start`,
																	`${year}`
																);
															}}
															error={
																!!(
																	errors.education &&
																	errors
																		.education[
																		index
																	]?.start
																)
															}
															helperText={
																errors.education &&
																errors
																	.education[
																	index
																]?.start
															}
															KeyboardButtonProps={{
																'aria-label':
																	'change date',
															}}
														/>
														<KeyboardDatePicker
															margin='normal'
															id={`education.${index}.end`}
															label='Enter End Year'
															views={['year']}
															value={
																values
																	.education[
																	index
																].end
															}
															onChange={(
																date
															) => {
																// const month =
																// 	date.toLocaleString(
																// 		'default',
																// 		{
																// 			month: 'long',
																// 		}
																// 	);
																const year =
																	date.getUTCFullYear();
																setFieldValue(
																	`education[${index}].end`,
																	`${year}`
																);
															}}
															error={
																!!(
																	errors.education &&
																	errors
																		.education[
																		index
																	]?.end
																)
															}
															helperText={
																errors.education &&
																errors
																	.education[
																	index
																]?.end
															}
															KeyboardButtonProps={{
																'aria-label':
																	'change date',
															}}
														/>
													</div>
												</MuiPickersUtilsProvider>
											</div>
											<Divider className='mt-8 -ml-10' />
										</Fragment>
									))}
								<FormHelperText className={'Mui-error'}>
									{errors.education ===
										'Need at least one education' &&
										errors.education}
								</FormHelperText>
								<Button
									className='mt-6 mr-10'
									variant='outlined'
									color='primary'
									disabled={isSubmitting}
									onClick={() =>
										push({
											institution: '',
											major: '',
											start: '',
											end: '',
											years: '',
										})
									}
								>
									+ Add More Education
								</Button>
							</div>
						)}
					</FieldArray>
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

export default EducationForm;
