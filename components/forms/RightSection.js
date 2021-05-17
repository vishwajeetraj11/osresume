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
import { addEducationData, addExperienceData } from '../../redux/actions/resumeActions';

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
