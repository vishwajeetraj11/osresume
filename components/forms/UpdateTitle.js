import { Button, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_TITLE } from '../../redux/actionTypes/resumeActionTypes';
import { toastMessages } from '../../shared/contants';

const UpdateTitle = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { title, resumeId } = useSelector(state => state.resume.metadata);

  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Please provide the title.').min(3, 'Too Short'),
  });

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <div className="p-10">
      <Button className="px-4 py-2" onClick={() => closeDrawer()} color="default" variant="text">
        {' '}
        <ArrowBackIcon />
        <p className="ml-2">Back</p>
      </Button>
      <Formik
        initialValues={{
          title,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            try {
              showSnack(toastMessages.UPDATE_RESOURCE_REQUEST('Resume Title'), 'default');

              const { data } = await axios({
                url: `/api/resumes/${resumeId}`,
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                data: {
                  title: values.title,
                  resumeId,
                },
              });
              resetForm({
                title: '',
              });

              dispatch({
                type: UPDATE_TITLE,
                payload: data.resume.title,
              });

              showSnack(toastMessages.UPDATE_RESOURCE_SUCCESS('Resume Title'), 'success');

              setSubmitting(false);
              closeDrawer();
            } catch (error) {
              // console.log(error.response.data);
              showSnack(toastMessages.UPDATE_RESOURCE_REQUEST('Resume Title'), 'error');
              setSubmitting(false);
            }
          }, 100);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="pb-10" onSubmit={handleSubmit}>
            <TextField
              id="title"
              className="mt-6"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              label="Enter Title"
              error={!!errors.title}
              helperText={errors.title}
            />
            <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTitle;
