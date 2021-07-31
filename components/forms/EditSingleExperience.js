import DateFnsUtils from '@date-io/date-fns';
import { Button, Divider, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ADD_EXPERIENCE_DATA } from '../../redux/actionTypes/resumeActionTypes';
import { toastMessages } from '../../shared/contants';

const EditSingleExperience = ({ closeDrawer, anchor, experience: experienceProp, setEdit }) => {
  const { resumeId } = useSelector(state => state.resume.metadata);
  const experienceCollection = useSelector(state => state.resume.data.experiences);

  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  const experience = experienceProp || {
    designation: '',
    company: '',
    description: '',
    startedAt: undefined,
    endedAt: undefined,
    years: '',
    country: '',
  };

  // Dispatch
  const dispatch = useDispatch();

  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    designation: Yup.string().required('Designation is required'),
    company: Yup.string().required('Please enter the company name'),
    years: Yup.string()
      .min(1, 'Minimum 1 character in needed')
      .max(2, 'Maximum 2 character Allowed')
      .required('Please enter years of experience'),
    startedAt: Yup.date().required('Please enter start date'),
    country: Yup.string().required('Please enter country name'),
    endedAt: Yup.date().required('Please enter end date'),
  });

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
        ...experience,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          // dispatch(editSingleExperienceData(values));
          showSnack(
            experience._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Experience') : toastMessages.CREATE_RESOURCE_REQUEST('Experience'),
            'default',
          );
          try {
            const { data } = await axios({
              url: `${experience._id ? `/api/experiences/${experience._id}` : '/api/experiences'}`,
              method: `${experience._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                designation: values.designation,
                description: values.description,
                startedAt: values.startedAt,
                endedAt: values.endedAt,
                country: values.country,
                company: values.company,
                years: values.years,
                resumeId,
              },
            });

            const experienceExists = experienceCollection.find(exp => exp._id === data.experience._id);

            if (experienceExists) {
              const experience = experienceCollection.map(exp => (exp._id === data.experience._id ? data.experience : exp));
              dispatch({
                type: ADD_EXPERIENCE_DATA,
                payload: experience,
              });
            } else {
              const results = experienceCollection.map(exp => (exp.id === experience.id ? data.experience : exp));
              dispatch({
                type: ADD_EXPERIENCE_DATA,
                payload: results,
              });
            }
            showSnack(
              experience._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Experience') : toastMessages.CREATE_RESOURCE_SUCCESS('Experience'),
              'success',
            );
            resetForm({
              id: '',
              designation: '',
              company: '',
              description: '',
              startedAt: undefined,
              endedAt: undefined,
              years: '',
              country: '',
            });
            setEdit(true);
          } catch (error) {
            // console.log(error.response);
            showSnack(
              experience._id ? toastMessages.UPDATE_RESOURCE_ERROR('Experience') : toastMessages.CREATE_RESOURCE_ERROR('Experience'),
              'error',
            );
          } finally {
            setSubmitting(false);
            closeDrawer(anchor, false);
          }
        }, 400);
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
        <form className="pb-10" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex align-center justify-between">
              <h3 className="text-t1-lg font-medium mt-6">Experience Block</h3>
            </div>
            <TextField
              id="designation"
              className="mt-6 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Designation"
              value={values.designation}
              error={!!errors.designation}
              helperText={errors.designation}
            />

            <TextField
              id="company"
              className="mt-10 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Company"
              value={values.company}
              error={!!errors.company}
              helperText={errors.company}
            />

            <TextField
              id="description"
              className="mt-10 pr-10"
              rows={3}
              multiline
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Description"
              value={values.description}
              error={!!errors.description}
              helperText={errors.description}
            />

            <TextField
              id="years"
              className="mt-10 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Years of Experience"
              value={values.years}
              error={!!errors.years}
              helperText={errors.years}
            />

            <TextField
              id="country"
              className="mt-10 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Country"
              value={values.country}
              error={!!errors.country}
              helperText={errors.country}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex justify-between pr-10 mt-6 flex-wrap">
                <KeyboardDatePicker
                  className="w-full lg:w-auto"
                  InputProps={{ readOnly: true }}
                  margin="normal"
                  id="startedAt"
                  label="Enter Start Date"
                  views={['year', 'month']}
                  // format='/MM/yyyy'
                  onChange={date => {
                    const month = date.toLocaleString('default', { month: 'long' });
                    const year = date.getFullYear();
                    setFieldValue('startedAt', `${month} ${year}`);
                  }}
                  value={values.startedAt}
                  error={!!errors.startedAt}
                  helperText={errors.startedAt}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  className="w-full lg:w-auto"
                  margin="normal"
                  id="endedAt"
                  InputProps={{ readOnly: true }}
                  label="Enter End Date"
                  views={['year', 'month']}
                  // format='MM/yyyy'
                  onChange={date => {
                    const month = date.toLocaleString('default', { month: 'long' });
                    const year = date.getFullYear();
                    setFieldValue('endedAt', `${month} ${year}`);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={values.endedAt}
                  error={!!errors.endedAt}
                  helperText={errors.endedAt}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <Divider className="mt-8 -ml-10" />
          <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EditSingleExperience;
