import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ADD_PERSONAL_DATA_STATE } from '../../redux/actionTypes/resumeActionTypes';
import { toastMessages } from '../../shared/contants';

const PersonalDataForm = ({ closeDrawer, anchor }) => {
  // Dispatch
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Get personalData State from globalState
  let personalData = useSelector(state => state.resume.data.personalData);
  const { resumeId } = useSelector(state => state.resume.metadata);

  // Remove +91 from phoneNumber
  let phoneNumber = personalData?.phoneNumber;
  phoneNumber = phoneNumber?.replace('+91', '');
  personalData = { ...personalData, phoneNumber };

  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please provide your full name.').min(3, 'Too Short'),
    email: Yup.string().email().required('Please provide a valid email.'),
    designation: Yup.string().required('Please provide your designation.'),
    country: Yup.string().required('Please provide your country.'),
    phoneNumber: Yup.string()
      .min(10, 'Phone Number must be at least 10 digits long.')
      .max(12, 'Phone Number cannot be more than 12 digits.'),
    objective: Yup.string().nullable(),
  });

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <>
      <Button className="px-4 py-2 mr-4 self-start" onClick={() => closeDrawer(anchor, false)} color="default" variant="text">
        {' '}
        <ArrowBackIcon />
        <p className="ml-2 capitalize">Back</p>
      </Button>
      <Formik
        initialValues={{
          ...personalData,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (values.phoneNumber) {
            if (!values.phoneNumber.startsWith('+91')) {
              // eslint-disable-next-line no-param-reassign
              values.phoneNumber = `+91${values.phoneNumber}`;
            }
          }
          setTimeout(async () => {
            try {
              showSnack(
                personalData._id
                  ? toastMessages.UPDATE_RESOURCE_REQUEST('Personal data')
                  : toastMessages.CREATE_RESOURCE_REQUEST('Personal data'),
                'default',
              );

              const { data } = await axios({
                url: `${personalData._id ? `/api/personals/${personalData._id}` : '/api/personals'}`,
                method: `${personalData._id ? 'PUT' : 'POST'}`,
                headers: {
                  'Content-Type': 'application/json',
                },
                data: {
                  name: values.name,
                  email: values.email,
                  designation: values.designation,
                  country: values.country,
                  objective: values.objective || '',
                  phoneNumber: values.phoneNumber || '',
                  resumeId,
                },
              });

              resetForm({
                name: '',
                email: '',
                phoneNumber: '',
                designation: '',
                country: '',
                objective: '',
              });

              dispatch({
                type: ADD_PERSONAL_DATA_STATE,
                payload: data.personal,
              });

              showSnack(
                personalData._id
                  ? toastMessages.UPDATE_RESOURCE_SUCCESS('Personal data')
                  : toastMessages.CREATE_RESOURCE_SUCCESS('Personal data'),
                'success',
              );

              setSubmitting(false);
              closeDrawer();
            } catch (error) {
              // console.log(error.response.data);
              showSnack(
                personalData._id
                  ? toastMessages.UPDATE_RESOURCE_ERROR('Personal data')
                  : toastMessages.CREATE_RESOURCE_ERROR('Personal data'),
                'error',
              );
              setSubmitting(false);
            }
          }, 100);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form className="pb-10" onSubmit={handleSubmit}>
            <TextField
              id="name"
              className="mt-6"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              label="Enter Name"
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              id="email"
              className="mt-8"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              label="Enter Email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="designation"
              className="mt-8"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.designation}
              label="Enter Designation"
              error={!!errors.designation}
              helperText={errors.designation}
            />

            <TextField
              id="objective"
              className="mt-8"
              rows={3}
              multiline
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Career Objective"
              value={values.objective}
              error={!!errors.objective}
              helperText={errors.objective}
            />

            <TextField
              id="country"
              className="mt-8"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.country}
              label="Enter Country"
              error={!!errors.country}
              helperText={errors.country}
            />

            <FormControl fullWidth className="mt-8" variant="outlined" margin="normal">
              <InputLabel htmlFor="phone-number-input">Your Phone Number</InputLabel>
              <OutlinedInput
                onChange={e => {
                  if (e.target.value === '') {
                    setFieldValue('phoneNumber', e.target.value);
                    return;
                  }
                  if (e.target.value.match(/^[0-9]+$/)) {
                    setFieldValue('phoneNumber', e.target.value);
                  }
                }}
                value={values.phoneNumber}
                placeholder="1234567890"
                id="phone-number-input"
                startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                fullWidth
                label="Your Phone Number"
                error={!!errors.phoneNumber}
              />
              <FormHelperText className="Mui-error">{errors.phoneNumber}</FormHelperText>
            </FormControl>

            <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PersonalDataForm;
