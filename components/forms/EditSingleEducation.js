import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';
const EditSingleEducation = ({ closeDrawer, anchor, education, setEdit }) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const educationCollection = useResumeStore(useShallow(state => state.data.education));
  const { getToken } = useAuth();
  const addEducation = useResumeStore(state => state.addEducation);

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

  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    institution: Yup.string().required('Institution is required.'),
    major: Yup.string().required('Please enter the major.'),
    startedAt: Yup.date().required('Please enter start date.'),
    endedAt: Yup.date().required('Please enter end date.'),
    country: Yup.string().required('Please enter country name.'),
  });

  const toDateValue = value => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const formatMonthYear = value => {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  /*
                   {
                        institution: '',
                        major: '',
                        start: '',
                        end: '',
                        years: '',
                    },

    */

  return (
    <Formik
      initialValues={{
        ...education,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          showSnack(
            education._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Education') : toastMessages.CREATE_RESOURCE_REQUEST('Education'),
            'default',
          );
          try {
            const token = await getToken();

            const { data } = await axios({
              url: `${education._id ? `/api/educations/${education._id}` : '/api/educations'}`,
              method: `${education._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              data: {
                institution: values.institution,
                major: values.major,
                startedAt: values.startedAt,
                endedAt: values.endedAt,
                country: values.country,
                resumeId,
              },
            });

            const educationExists = educationCollection.find(edu => edu._id === data.education._id);

            if (educationExists) {
              const education = educationCollection.map(edu => (edu._id === data.education._id ? data.education : edu));
              addEducation(education);
            } else {
              const results = educationCollection.map(edu => (edu.id === education.id ? data.education : edu));
              addEducation(results);
            }
            showSnack(
              education._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Education') : toastMessages.CREATE_RESOURCE_SUCCESS('Education'),
              'success',
            );
            resetForm({
              institution: '',
              major: '',
              startedAt: '',
              endedAt: '',
              country: '',
            });
            setEdit(true);
          } catch (error) {
            showSnack(
              education._id ? toastMessages.UPDATE_RESOURCE_ERROR('Education') : toastMessages.CREATE_RESOURCE_ERROR('Education'),
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
              <h3 className="text-t1-lg font-medium mt-6">Education Block</h3>
            </div>
            <div className="mt-6 pr-10">
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Enter Institution
              </label>
              <input
                id="institution"
                name="institution"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.institution}
              />
              {errors.institution && <p className="mt-1 text-xs text-rose-600">{errors.institution}</p>}
            </div>

            <div className="mt-10 pr-10">
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Enter Major
              </label>
              <input
                id="major"
                name="major"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.major}
              />
              {errors.major && <p className="mt-1 text-xs text-rose-600">{errors.major}</p>}
            </div>

            <div className="mt-10 pr-10">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Enter Country
              </label>
              <input
                id="country"
                name="country"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
              />
              {errors.country && <p className="mt-1 text-xs text-rose-600">{errors.country}</p>}
            </div>

            <div className="flex justify-between pr-10 mt-6 flex-wrap gap-4">
              <div className="w-full lg:w-auto">
                <label htmlFor="startedAt" className="block text-sm font-medium text-gray-700">
                  Enter Start Date
                </label>
                <Datepicker
                  asSingle
                  useRange={false}
                  readOnly
                  inputId="startedAt"
                  inputName="startedAt"
                  value={{
                    startDate: toDateValue(values.startedAt),
                    endDate: toDateValue(values.startedAt),
                  }}
                  onChange={date => {
                    setFieldValue('startedAt', formatMonthYear(date?.startDate));
                  }}
                  displayFormat="MMM YYYY"
                  inputClassName="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.startedAt && <p className="mt-1 text-xs text-rose-600">{errors.startedAt}</p>}
              </div>
              <div className="w-full lg:w-auto">
                <label htmlFor="endedAt" className="block text-sm font-medium text-gray-700">
                  Enter End Date
                </label>
                <Datepicker
                  asSingle
                  useRange={false}
                  readOnly
                  inputId="endedAt"
                  inputName="endedAt"
                  value={{
                    startDate: toDateValue(values.endedAt),
                    endDate: toDateValue(values.endedAt),
                  }}
                  onChange={date => {
                    setFieldValue('endedAt', formatMonthYear(date?.startDate));
                  }}
                  displayFormat="MMM YYYY"
                  inputClassName="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors.endedAt && <p className="mt-1 text-xs text-rose-600">{errors.endedAt}</p>}
              </div>
            </div>
          </div>
          <div className="mt-8 -ml-10 h-px bg-gray-200" />
          <button
            className="mt-6 inline-flex items-center rounded bg-primary px-4 py-2 text-sm text-white hover:bg-[#12836d] disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditSingleEducation;
