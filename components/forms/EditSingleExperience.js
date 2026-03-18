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
const EditSingleExperience = ({ closeDrawer, anchor, experience: experienceProp, setEdit }) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const experienceCollection = useResumeStore(useShallow(state => state.data.experience));
  const addExperiencedata = useResumeStore(state => state.addExperience);

  const { getToken } = useAuth();

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

  const experience = experienceProp || {
    designation: '',
    company: '',
    description: '',
    startedAt: undefined,
    endedAt: undefined,
    years: '',
    country: '',
  };

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
          showSnack(
            experience._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Experience') : toastMessages.CREATE_RESOURCE_REQUEST('Experience'),
            'default',
          );
          try {
            const token = await getToken();

            const { data } = await axios({
              url: `${experience._id ? `/api/experiences/${experience._id}` : '/api/experiences'}`,
              method: `${experience._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
              addExperiencedata(experience);
            } else {
              const results = experienceCollection.map(exp => (exp.id === experience.id ? data.experience : exp));
              addExperiencedata(results);
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
            <div className="mt-6 pr-10">
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                Enter Designation
              </label>
              <input
                id="designation"
                name="designation"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
              />
              {errors.designation && <p className="mt-1 text-xs text-rose-600">{errors.designation}</p>}
            </div>

            <div className="mt-10 pr-10">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Enter Company
              </label>
              <input
                id="company"
                name="company"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
              />
              {errors.company && <p className="mt-1 text-xs text-rose-600">{errors.company}</p>}
            </div>

            <div className="mt-10 pr-10">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Enter Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
              {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
            </div>

            <div className="mt-10 pr-10">
              <label htmlFor="years" className="block text-sm font-medium text-gray-700">
                Enter Years of Experience
              </label>
              <input
                id="years"
                name="years"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.years}
              />
              {errors.years && <p className="mt-1 text-xs text-rose-600">{errors.years}</p>}
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

export default EditSingleExperience;
