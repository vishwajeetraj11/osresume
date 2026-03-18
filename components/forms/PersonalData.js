import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Formik } from 'formik';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';

const PersonalDataForm = ({ closeDrawer, anchor }) => {
  const { getToken } = useAuth();

  let personalData = useResumeStore(useShallow(state => state.data.personal));
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  // Remove +91 from phoneNumber
  let phoneNumber = personalData?.phoneNumber;
  phoneNumber = phoneNumber?.replace('+91', '');
  personalData = { ...personalData, phoneNumber };
  // zustand
  const addPersonalData = useResumeStore(state => state.addPersonal);

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
    <>
      <button
        type="button"
        className="px-4 py-2 mr-4 self-start inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
        onClick={() => closeDrawer(anchor, false)}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="ml-2 capitalize">Back</span>
      </button>
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
              const token = await getToken();

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
                  Authorization: `Bearer ${token}`,
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

              addPersonalData(data.personal);

              showSnack(
                personalData._id
                  ? toastMessages.UPDATE_RESOURCE_SUCCESS('Personal data')
                  : toastMessages.CREATE_RESOURCE_SUCCESS('Personal data'),
                'success',
              );

              setSubmitting(false);
              closeDrawer();
            } catch (error) {
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
            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Enter Name
              </label>
              <input
                id="name"
                name="name"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>

            <div className="mt-8">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter Email
              </label>
              <input
                id="email"
                name="email"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>

            <div className="mt-8">
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

            <div className="mt-8">
              <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                Enter Career Objective
              </label>
              <textarea
                id="objective"
                name="objective"
                rows={3}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objective}
              />
              {errors.objective && <p className="mt-1 text-xs text-rose-600">{errors.objective}</p>}
            </div>

            <div className="mt-8">
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

            <div className="mt-8">
              <label htmlFor="phone-number-input" className="block text-sm font-medium text-gray-700">
                Your Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  +91
                </span>
                <input
                  id="phone-number-input"
                  name="phoneNumber"
                  className="block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-xs text-rose-600">{errors.phoneNumber}</p>}
            </div>

            <button
              type="submit"
              className="mr-6 mt-6 inline-flex items-center rounded bg-primary px-4 py-2 text-sm text-white hover:bg-[#12836d] disabled:opacity-60"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PersonalDataForm;
