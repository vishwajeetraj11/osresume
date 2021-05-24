import {
    Button,
    Divider,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import React, {Fragment, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { editSingleExperienceData } from '../../redux/actions/resumeActions';

const EditSingleExperience = ({ closeDrawer, anchor, experience: experienceProp, setEdit }) => {
    const experience = experienceProp ? experienceProp : {
        designation: '',
        company: '',
        description: '',
        start: undefined,
        end: undefined,
        years: '',
        country: '',
    };

    // Dispatch
    const dispatch = useDispatch();

    // Validation Schema for PersonalData form
    const ValidationSchema =  Yup.object().shape({
        designation: Yup.string().required("Designation is required"),
        company: Yup.string().required('Please enter the company name'),
        years: Yup.string().min(1, 'Minimum 1 character in needed').max(2, 'Maximum 2 character Allowed').required('Please enter years of experience'),
        start: Yup.date().required("Please enter start date"),
        country: Yup.string().required('Please enter country name'),
        end: Yup.date().required("Please enter end date"),
    })

    /* 
                    {
                        designation: '',
                        company: '',
                        description: '',
                        start: undefined,
                        end: undefined,
                        years: '',
                        country: '',
                    },
                
    */

    return (
        <Formik
            initialValues={{
                ...experience
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    dispatch(editSingleExperienceData(values));
                    resetForm({
                        id: '',
                        designation: '',
                        company: '',
                        description: '',
                        start: undefined,
                        end: undefined,
                        years: '',
                        country: '',
                    });
                    setSubmitting(false);
                    closeDrawer(anchor, false);
                    setEdit(true)
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
                    <div className="flex align-center justify-between">
                        <h3 className='text-t1-lg font-medium mt-6'>Experience Block</h3>
                    </div>
                    <TextField
                        id={`designation`}
                        className='mt-6 pr-10'
                        rows={1}
                        variant='outlined'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Enter Designation'}
                        value={values.designation}
                        error={!!errors.designation}
                        helperText={errors.designation}
                    />

                    <TextField
                        id={`company`}
                        className='mt-10 pr-10'
                        rows={1}
                        variant='outlined'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Enter Company'}
                        value={values.company}
                        error={!!errors.company}
                        helperText={errors.company}
                    />

                    <TextField
                        id={`description`}
                        className='mt-10 pr-10'
                        rows={3}
                        multiline
                        variant='outlined'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Enter Description'}
                        value={values.description}
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <TextField
                        id={`years`}
                        className='mt-10 pr-10'
                        rows={1}
                        variant='outlined'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Enter Years of Experience'}
                        value={values.years}
                        error={!!errors.years}
                        helperText={errors.years}
                    />


                    <TextField
                        id={`country`}
                        className='mt-10 pr-10'
                        rows={1}
                        variant='outlined'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Enter Country'}
                        value={values.country}
                        error={!!errors.country}
                        helperText={errors.country}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className='flex justify-between pr-10 mt-6 flex-wrap'>
                            <KeyboardDatePicker
                                className='w-full lg:w-auto'
                                InputProps={{readOnly: true}}
                                margin='normal'
                                id={`start`}
                                label='Enter Start Date'
                                views={["year", "month"]}
                                // format='/MM/yyyy'
                                onChange={(date) => {
                                    const month = date.toLocaleString('default', { month: 'long' });
                                    const year = date.getUTCFullYear();
                                    setFieldValue(`start`, `${month} ${year}`);
                                }}
                                value={values.start}
                                error={!!errors.start}
                                helperText={errors.start}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                className='w-full lg:w-auto'
                                margin='normal'
                                id={`end`}
                                InputProps={{readOnly: true}}
                                label='Enter End Date'
                                views={["year", "month"]}
                                // format='MM/yyyy'
                                onChange={(date) => {
                                    const month = date.toLocaleString('default', { month: 'long' });
                                    const year = date.getUTCFullYear();
                                    setFieldValue(`end`, `${month} ${year}`);
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                value={values.end}
                                error={!!errors.end}
                                helperText={errors.end}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
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

export default EditSingleExperience;
