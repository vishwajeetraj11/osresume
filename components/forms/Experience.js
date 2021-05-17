import {
    Button,
    Divider,
    FormHelperText,
    TextField,
} from '@material-ui/core';
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
import { addExperienceData } from '../../redux/actions/resumeActions';

const WorkExperienceForm = ({ closeDrawer, anchor }) => {

    // Dispatch
    const dispatch = useDispatch();

    // Get personalData State from globalState
    let experience = useSelector((state) => state.resume.data.experiences);
    // Validation Schema for PersonalData form
    const ValidationSchema = Yup.object().shape({
        experiences: Yup.array()
            .of(
                Yup.object().shape({
                    designation: Yup.string().required("Designation is required"),
                    company: Yup.string().required('Please enter the company name'),
                    years: Yup.string().min(1, 'Minimum 1 character in needed').max(2, 'Maximum 2 character Allowed').required('Please enter years of experience'),
                    start: Yup.date().required("Please enter start date"),
                    country: Yup.string().required('Please enter country name'),
                    end: Yup.date().required("Please enter end date"),
                })
            )
            .min(1, "Need at least one experience")
    });

    /*
      experiences: [
                    {
                        designation: '',
                        company: '',
                        description: '',
                        start: undefined,
                        end: undefined,
                        years: '',
                        country: '',
                    },
                ],
    */

    return (
        <Formik
            initialValues={{
                experiences: experience
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {

                    // const res = values.experiences.map(experience => {
                    //     // if (!experience.end) {
                    //     //     experience.end = new Date(2021, 5);
                    //     // }
                    //     // if (!experience.start) {
                    //     //     experience.start = new Date(2021, 1);
                    //     // }
                    //     // const currentMonth = new Date().toLocaleDateString('default', { month: 'long' });
                    //     // const currentYear = new Date().getUTCFullYear();

                    //     const startMonth = experience.start.toLocaleString('default', { month: 'long' });
                    //     const startYear = experience.start.getFullYear();
                    //     experience.start = `${startMonth} ${startYear}`;

                    //     const endMonth = experience.end.toLocaleString('default', { month: 'long' });
                    //     const endYear = experience.end.getFullYear();

                    //     experience.end = `${endMonth} ${endYear}`;

                    //     return experience;
                    // });

                    dispatch(addExperienceData(values.experiences));
                    resetForm({
                        experiences: [
                            {
                                designation: '',
                                company: '',
                                description: '',
                                start: undefined,
                                end: undefined,
                                years: '',
                                country: '',
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
                    <FieldArray name='experiences'>
                        {({ insert, remove, push }) => (
                            <div>
                                {values.experiences.length > 0 &&
                                    values.experiences.map(
                                        (experience, index) => (
                                            <Fragment key={index}>
                                                <div className=''>
                                                    <div className="flex align-center justify-between">

                                                        <h3 className='text-t1-lg font-medium mt-6'>Experience Block {index + 1}</h3>
                                                        <Button
                                                            className='mt-6 mr-10'
                                                            variant='outlined'
                                                            color='primary'
                                                            disabled={isSubmitting}
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            - Remove Experience
                                                    {/* <DeleteIcon fontSize='small' /> */}
                                                        </Button>
                                                    </div>
                                                    <TextField
                                                        id={`experiences.${index}.designation`}
                                                        className='mt-6 pr-10'
                                                        rows={1}
                                                        variant='outlined'
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label={'Enter Designation'}
                                                        value={values.experiences[index].designation}
                                                        error={!!(errors.experiences && errors.experiences[index]?.designation)}
                                                        helperText={errors.experiences && errors.experiences[index]?.designation}
                                                    />

                                                    <TextField
                                                        id={`experiences.${index}.company`}
                                                        className='mt-10 pr-10'
                                                        rows={1}
                                                        variant='outlined'
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label={'Enter Company'}
                                                        value={values.experiences[index].company}
                                                        error={!!(errors.experiences && errors.experiences[index]?.company)}
                                                        helperText={errors.experiences && errors.experiences[index]?.company}
                                                    />

                                                    <TextField
                                                        id={`experiences.${index}.description`}
                                                        className='mt-10 pr-10'
                                                        rows={3}
                                                        multiline
                                                        variant='outlined'
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label={'Enter Description'}
                                                        value={values.experiences[index].description}
                                                        error={!!(errors.experiences && errors.experiences[index]?.description)}
                                                        helperText={errors.experiences && errors.experiences[index]?.description}
                                                    />

                                                    <TextField
                                                        id={`experiences.${index}.years`}
                                                        className='mt-10 pr-10'
                                                        rows={1}
                                                        variant='outlined'
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label={'Enter Years of Experience'}
                                                        value={values.experiences[index].years}
                                                        error={!!(errors.experiences && errors.experiences[index]?.years)}
                                                        helperText={errors.experiences && errors.experiences[index]?.years}
                                                    />


                                                    <TextField
                                                        id={`experiences.${index}.country`}
                                                        className='mt-10 pr-10'
                                                        rows={1}
                                                        variant='outlined'
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label={'Enter Country'}
                                                        value={values.experiences[index].country}
                                                        error={!!(errors.experiences && errors.experiences[index]?.country)}
                                                        helperText={errors.experiences && errors.experiences[index]?.country}
                                                    />

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <div className='flex justify-between pr-10 mt-6'>
                                                            <KeyboardDatePicker
                                                                margin='normal'
                                                                id={`experiences.${index}.start`}
                                                                label='Enter Start Date'
                                                                views={["year", "month"]}
                                                                // format='dd/MM/yyyy'
                                                                value={values.experiences[index].start}
                                                                onChange={(date) => {
                                                                    const month = date.toLocaleString('default', { month: 'long' });
                                                                    const year = date.getUTCFullYear();
                                                                    setFieldValue(`experiences[${index}].start`, `${month} ${year}`);
                                                                }}
                                                                error={!!(errors.experiences && errors.experiences[index]?.start)}
                                                                helperText={errors.experiences && errors.experiences[index]?.start}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                            <KeyboardDatePicker
                                                                margin='normal'
                                                                id={`experiences.${index}.end`}
                                                                label='Enter End Date'
                                                                views={["year", "month"]}
                                                                // format='dd/MM/yyyy'
                                                                value={values.experiences[index].end}
                                                                onChange={(date) => {
                                                                    const month = date.toLocaleString('default', { month: 'long' });
                                                                    const year = date.getUTCFullYear();
                                                                    setFieldValue(`experiences[${index}].end`, `${month} ${year}`);
                                                                }}
                                                                error={!!(errors.experiences && errors.experiences[index]?.end)}
                                                                helperText={errors.experiences && errors.experiences[index]?.end}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </div>
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                                <Divider className='mt-8 -ml-10' />
                                            </Fragment>
                                        )
                                    )}
                                <FormHelperText className={'Mui-error'}>
                                    {errors.experiences === 'Need at least one experience' && errors.experiences}
                                </FormHelperText>
                                <Button
                                    className='mt-6 mr-10'
                                    variant='outlined'
                                    color='primary'
                                    disabled={isSubmitting}
                                    onClick={() =>
                                        push({
                                            designation: '',
                                            company: '',
                                            description: '',
                                            start: undefined,
                                            end: undefined,
                                            years: '',
                                            country: '',
                                        })
                                    }
                                >
                                    + Add More Experience
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

export default WorkExperienceForm;
