import { useAuth } from '@clerk/nextjs';
import { Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { apiRequest } from '../../shared/utils/apiClient';
import { useResumeStore } from '../../zustand/zustand';

const UpdateTitle = ({ closeDrawer }) => {
  const { getToken } = useAuth();
  const { title, resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
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
      <button
        type="button"
        className="px-4 py-2 inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
        onClick={() => closeDrawer()}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="ml-2">Back</span>
      </button>
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

	              const data = await apiRequest(`/api/resumes/${resumeId}`, {
	                method: 'PATCH',
	                token,
	                body: {
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
              showSnack(toastMessages.UPDATE_RESOURCE_REQUEST('Resume Title'), 'error');
              setSubmitting(false);
            }
          }, 100);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="pb-10" onSubmit={handleSubmit}>
            <div className="mt-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Enter Title
              </label>
              <input
                id="title"
                name="title"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
              />
              {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-[#12836d] disabled:opacity-60"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTitle;
