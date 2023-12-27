import { useAuth } from '@clerk/nextjs';
import { Button, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';

const UpdateTitle = ({ closeDrawer }) => {
  const { getToken } = useAuth();
  const { title, resumeId } = useResumeStore(state => state.data.resumeMeta);
  const updateTitel = useResumeStore(state => state.updateTitel);
  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Please provide the title.').min(3, 'Too Short'),
  });

  const showSnack = (message, variant) => {
    if (variant === 'success') {
      toast.success(message);
    } else if (variant === 'error') {
      toast.error(message);
    } else if (variant === 'default') {
      toast.message(message);
    } else if (variant === 'info') {
      toast.info(message);
    }
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
              const token = await getToken();

              showSnack(toastMessages.UPDATE_RESOURCE_REQUEST('Resume Title'), 'default');

              const { data } = await axios({
                url: `/api/resumes/${resumeId}`,
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  title: values.title,
                  resumeId,
                },
              });
              resetForm({
                title: '',
              });

              updateTitel(data.resume.title);
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
            <Button
              className="mt-6  text-white hover:bg-[#12836d]  bg-primary"
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTitle;
